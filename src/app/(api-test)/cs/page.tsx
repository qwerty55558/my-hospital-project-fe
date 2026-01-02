'use client';

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faRefresh, 
    faTrash, 
    faEye, 
    faFilter,
    faSpinner,
    faCheckCircle,
    faClock,
    faTimesCircle,
    faChevronDown,
    faChevronUp
} from '@fortawesome/free-solid-svg-icons';
import { useConsultations, deleteConsultation } from '@/hooks/useConsultations';
import { 
    CONSULTATION_STATUS_LABELS, 
    CONSULTATION_STATUS_COLORS,
    type ConsultationStatus 
} from '@/types/consultation';
import { mutate } from 'swr';

const STATUS_ICONS = {
    pending: faClock,
    answered: faCheckCircle,
    closed: faTimesCircle,
} as const;

export default function CSTestPage() {
    const [statusFilter, setStatusFilter] = useState<ConsultationStatus | undefined>(undefined);
    const [expandedId, setExpandedId] = useState<number | null>(null);
    const [deletingId, setDeletingId] = useState<number | null>(null);

    const { consultations, isLoading, isValidating, error } = useConsultations(statusFilter);

    const handleRefresh = () => {
        mutate((key) => typeof key === 'string' && key.startsWith('/consultations'));
    };

    const handleDelete = async (id: number) => {
        if (!confirm(`상담 #${id}를 삭제하시겠습니까?`)) return;
        
        setDeletingId(id);
        try {
            await deleteConsultation(id);
        } catch (err) {
            console.error('삭제 실패:', err);
            alert('삭제에 실패했습니다.');
        } finally {
            setDeletingId(null);
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleString('ko-KR', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    const formatPhone = (phone: string) => {
        // 010-1234-5678 형태로 포맷팅
        const cleaned = phone.replace(/-/g, '');
        if (cleaned.length === 11) {
            return `${cleaned.slice(0, 3)}-${cleaned.slice(3, 7)}-${cleaned.slice(7)}`;
        }
        return phone;
    };

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        CS 상담 내역 관리
                        <span className="ml-3 text-sm font-normal text-gray-500 bg-yellow-100 px-2 py-1 rounded">
                            DEV
                        </span>
                    </h1>
                    <p className="text-gray-600">
                        온라인 상담 신청 내역을 확인하고 관리합니다.
                    </p>
                </div>

                {/* Controls */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
                    <div className="flex flex-wrap items-center gap-4">
                        {/* Status Filter */}
                        <div className="flex items-center gap-2">
                            <FontAwesomeIcon icon={faFilter} className="text-gray-400" />
                            <select
                                value={statusFilter || ''}
                                onChange={(e) => setStatusFilter(e.target.value as ConsultationStatus || undefined)}
                                className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="">전체 상태</option>
                                <option value="pending">대기중</option>
                                <option value="answered">답변완료</option>
                                <option value="closed">종료</option>
                            </select>
                        </div>

                        {/* Refresh Button */}
                        <button
                            onClick={handleRefresh}
                            disabled={isValidating}
                            className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 transition-colors"
                        >
                            <FontAwesomeIcon 
                                icon={faRefresh} 
                                className={isValidating ? 'animate-spin' : ''} 
                            />
                            새로고침
                        </button>

                        {/* Stats */}
                        <div className="ml-auto text-sm text-gray-600">
                            총 <span className="font-bold text-blue-600">{consultations.length}</span>건
                        </div>
                    </div>
                </div>

                {/* Error State */}
                {error && (
                    <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6 text-red-700">
                        데이터를 불러오는 중 오류가 발생했습니다: {error.message}
                    </div>
                )}

                {/* Loading State */}
                {isLoading ? (
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
                        <FontAwesomeIcon icon={faSpinner} className="text-4xl text-blue-500 animate-spin mb-4" />
                        <p className="text-gray-600">상담 내역을 불러오는 중...</p>
                    </div>
                ) : consultations.length === 0 ? (
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
                        <p className="text-gray-500">상담 내역이 없습니다.</p>
                    </div>
                ) : (
                    /* Consultation List */
                    <div className="space-y-4">
                        {consultations.map((cs) => (
                            <div 
                                key={cs.id}
                                className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
                            >
                                {/* Summary Row */}
                                <div 
                                    className="p-4 flex items-center gap-4 cursor-pointer hover:bg-gray-50 transition-colors"
                                    onClick={() => setExpandedId(expandedId === cs.id ? null : cs.id)}
                                >
                                    {/* ID */}
                                    <div className="w-16 text-center">
                                        <span className="text-xs text-gray-400">#{cs.id}</span>
                                    </div>

                                    {/* Status Badge */}
                                    <div className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1.5 ${CONSULTATION_STATUS_COLORS[cs.status]}`}>
                                        <FontAwesomeIcon icon={STATUS_ICONS[cs.status]} className="text-[10px]" />
                                        {CONSULTATION_STATUS_LABELS[cs.status]}
                                    </div>

                                    {/* Name & Phone */}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-3">
                                            <span className="font-medium text-gray-900">{cs.name}</span>
                                            <span className="text-sm text-gray-500">{formatPhone(cs.phone)}</span>
                                        </div>
                                        <p className="text-sm text-gray-600 truncate mt-0.5">
                                            {cs.content.slice(0, 50)}...
                                        </p>
                                    </div>

                                    {/* Category */}
                                    <div className="hidden md:block">
                                        <span className="px-2 py-1 bg-gray-100 rounded text-xs text-gray-600">
                                            {cs.category}
                                        </span>
                                    </div>

                                    {/* Doctor */}
                                    {cs.doctorName && (
                                        <div className="hidden lg:block text-sm text-gray-600">
                                            {cs.doctorName}
                                        </div>
                                    )}

                                    {/* Date */}
                                    <div className="hidden sm:block text-xs text-gray-400 whitespace-nowrap">
                                        {formatDate(cs.createdAt)}
                                    </div>

                                    {/* Actions */}
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleDelete(cs.id);
                                            }}
                                            disabled={deletingId === cs.id}
                                            className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                                            title="삭제"
                                        >
                                            {deletingId === cs.id ? (
                                                <FontAwesomeIcon icon={faSpinner} className="animate-spin" />
                                            ) : (
                                                <FontAwesomeIcon icon={faTrash} />
                                            )}
                                        </button>
                                        <FontAwesomeIcon 
                                            icon={expandedId === cs.id ? faChevronUp : faChevronDown} 
                                            className="text-gray-400"
                                        />
                                    </div>
                                </div>

                                {/* Expanded Detail */}
                                {expandedId === cs.id && (
                                    <div className="border-t border-gray-100 p-6 bg-gray-50">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            {/* Left Column */}
                                            <div className="space-y-4">
                                                <div>
                                                    <label className="text-xs font-medium text-gray-400 uppercase">고객 정보</label>
                                                    <div className="mt-1 p-3 bg-white rounded-lg border border-gray-200">
                                                        <p><strong>이름:</strong> {cs.name}</p>
                                                        <p><strong>연락처:</strong> {formatPhone(cs.phone)}</p>
                                                        <p><strong>상담 분야:</strong> {cs.category}</p>
                                                        {cs.doctorName && <p><strong>담당 의사:</strong> {cs.doctorName}</p>}
                                                    </div>
                                                </div>
                                                <div>
                                                    <label className="text-xs font-medium text-gray-400 uppercase">상담 내용</label>
                                                    <div className="mt-1 p-3 bg-white rounded-lg border border-gray-200 whitespace-pre-wrap">
                                                        {cs.content}
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Right Column */}
                                            <div className="space-y-4">
                                                <div>
                                                    <label className="text-xs font-medium text-gray-400 uppercase">상태 정보</label>
                                                    <div className="mt-1 p-3 bg-white rounded-lg border border-gray-200">
                                                        <p><strong>상태:</strong> {CONSULTATION_STATUS_LABELS[cs.status]}</p>
                                                        <p><strong>신청일:</strong> {formatDate(cs.createdAt)}</p>
                                                        {cs.answeredAt && <p><strong>답변일:</strong> {formatDate(cs.answeredAt)}</p>}
                                                    </div>
                                                </div>
                                                {cs.answer && (
                                                    <div>
                                                        <label className="text-xs font-medium text-gray-400 uppercase">답변 내용</label>
                                                        <div className="mt-1 p-3 bg-blue-50 rounded-lg border border-blue-200 whitespace-pre-wrap text-blue-900">
                                                            {cs.answer}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        {/* Raw JSON (for debugging) */}
                                        <details className="mt-6">
                                            <summary className="text-xs text-gray-400 cursor-pointer hover:text-gray-600">
                                                <FontAwesomeIcon icon={faEye} className="mr-1" />
                                                Raw JSON 보기
                                            </summary>
                                            <pre className="mt-2 p-3 bg-gray-800 text-green-400 text-xs rounded-lg overflow-x-auto">
                                                {JSON.stringify(cs, null, 2)}
                                            </pre>
                                        </details>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
