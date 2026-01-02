'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faComments, faLock, faCheckCircle, faUserMd, faSpinner, faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import { useRepresentativeDoctors } from '@/hooks/useDoctors';
import { createConsultation } from '@/hooks/useConsultations';
import { ConsultationFormSchema, type ConsultationForm } from '@/lib/schemas';

// 상담 분야 옵션
const CONSULTATION_CATEGORIES = [
    { value: '시력교정 (라식/라섹)', label: '시력교정 (라식/라섹)' },
    { value: '노안/백내장', label: '노안/백내장' },
    { value: '망막/녹내장', label: '망막/녹내장' },
    { value: '드림렌즈/기타', label: '드림렌즈/기타' },
] as const;

// 전문분야 → 상담분야 매핑
const SPECIALTY_TO_CATEGORY: Record<string, string> = {
    '시력교정': '시력교정 (라식/라섹)',
    '망막': '망막/녹내장',
    '녹내장': '망막/녹내장',
    '백내장': '노안/백내장',
    '노안': '노안/백내장',
    '드림렌즈': '드림렌즈/기타',
    '안성형': '드림렌즈/기타',
};

// 폼 에러 메시지 컴포넌트
function FormError({ message }: { message?: string }) {
    if (!message) return null;
    return (
        <p className="mt-2 text-sm text-red-500 flex items-center gap-1.5">
            <FontAwesomeIcon icon={faCircleExclamation} className="text-xs" />
            {message}
        </p>
    );
}

// 폼 컴포넌트 (useSearchParams 사용)
function ConsultationForm() {
    const searchParams = useSearchParams();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitResult, setSubmitResult] = useState<{ success: boolean; message: string } | null>(null);
    
    // SWR 훅으로 캐싱 자동 적용
    const { doctors, isLoading: isLoadingDoctors } = useRepresentativeDoctors();
    
    // URL 쿼리 파라미터에서 의사 정보 가져오기
    const doctorFromUrl = searchParams.get('doctor');
    const specialtyFromUrl = searchParams.get('specialty');

    // React Hook Form + Zod
    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
    } = useForm<ConsultationForm>({
        resolver: zodResolver(ConsultationFormSchema),
        defaultValues: {
            name: '',
            phone: '',
            doctorName: '',
            category: '',
            content: '',
            privacyAgreed: false,
        },
    });

    const watchedDoctorName = watch('doctorName');

    // URL 파라미터로 폼 자동 입력 (최초 1회만)
    useEffect(() => {
        if (!isLoadingDoctors && doctors.length > 0) {
            if (doctorFromUrl) {
                const doctor = doctors.find(d => d.name === doctorFromUrl);
                if (doctor) {
                    setValue('doctorId', doctor.id);
                    setValue('doctorName', doctor.name);
                    setValue('content', `${doctorFromUrl} 선생님께 진료 예약 상담을 요청합니다.`);
                }
            }
            
            if (specialtyFromUrl) {
                const matchedCategory = Object.entries(SPECIALTY_TO_CATEGORY).find(([key]) => 
                    specialtyFromUrl.includes(key)
                );
                if (matchedCategory) {
                    setValue('category', matchedCategory[1]);
                }
            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoadingDoctors, doctors.length]);

    // 의사 선택 시 doctorId도 함께 설정
    const handleDoctorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedName = e.target.value;
        setValue('doctorName', selectedName);
        
        if (selectedName) {
            const doctor = doctors.find(d => d.name === selectedName);
            if (doctor) {
                setValue('doctorId', doctor.id);
            }
        } else {
            setValue('doctorId', undefined);
        }
    };

    // 폼 제출 핸들러
    const onSubmit = async (data: ConsultationForm) => {
        setIsSubmitting(true);
        setSubmitResult(null);
        
        try {
            await createConsultation(data);
            
            setSubmitResult({
                success: true,
                message: '상담 신청이 완료되었습니다. 빠른 시일 내에 연락드리겠습니다.',
            });
        } catch (error) {
            console.error('상담 신청 실패:', error);
            setSubmitResult({
                success: false,
                message: '상담 신청 중 오류가 발생했습니다. 다시 시도해주세요.',
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            {/* 의사 선택 안내 배너 */}
            {doctorFromUrl && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="mt-6 bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-100 rounded-2xl p-5 flex items-center gap-4"
                >
                    <div className="w-12 h-12 bg-[#00B8FF] rounded-xl flex items-center justify-center shrink-0">
                        <FontAwesomeIcon icon={faUserMd} className="text-white text-xl" />
                    </div>
                    <div>
                        <p className="text-[#191F28] font-bold">
                            {doctorFromUrl} 선생님에게 상담 예약
                        </p>
                        <p className="text-sm text-[#4E5968]">
                            {specialtyFromUrl && `전문 분야: ${specialtyFromUrl}`}
                        </p>
                    </div>
                </motion.div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mt-16">
                {/* Form Section */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="lg:col-span-2 bg-white border border-gray-100 p-8 md:p-10 rounded-3xl shadow-xl shadow-gray-200/50"
                >
                    {/* 제출 결과 메시지 */}
                    {submitResult && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={`mb-8 p-5 rounded-2xl ${
                                submitResult.success 
                                    ? 'bg-green-50 border border-green-200 text-green-800' 
                                    : 'bg-red-50 border border-red-200 text-red-800'
                            }`}
                        >
                            <p className="font-medium flex items-center gap-2">
                                <FontAwesomeIcon 
                                    icon={submitResult.success ? faCheckCircle : faCircleExclamation} 
                                />
                                {submitResult.message}
                            </p>
                        </motion.div>
                    )}

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-bold text-[#191F28] mb-3">
                                    성함 <span className="text-red-500">*</span>
                                </label>
                                <input 
                                    type="text"
                                    {...register('name')}
                                    className={`w-full p-4 bg-gray-50 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow duration-200 ${
                                        errors.name ? 'border-red-300 bg-red-50' : 'border-gray-100'
                                    }`}
                                    placeholder="성함을 입력하세요" 
                                />
                                <FormError message={errors.name?.message} />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-[#191F28] mb-3">
                                    연락처 <span className="text-red-500">*</span>
                                </label>
                                <input 
                                    type="text"
                                    {...register('phone')}
                                    className={`w-full p-4 bg-gray-50 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow duration-200 ${
                                        errors.phone ? 'border-red-300 bg-red-50' : 'border-gray-100'
                                    }`}
                                    placeholder="010-0000-0000" 
                                />
                                <FormError message={errors.phone?.message} />
                            </div>
                        </div>

                        {/* 담당 의사 선택 */}
                        <div>
                            <label className="block text-sm font-bold text-[#191F28] mb-3">
                                담당 의사 선택 
                                <span className="text-gray-400 font-normal ml-2">(선택사항)</span>
                            </label>
                            <select 
                                className={`w-full p-4 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-[box-shadow,background-color,border-color] duration-200 appearance-none ${
                                    watchedDoctorName ? 'bg-blue-50 border-blue-200' : 'bg-gray-50'
                                }`}
                                value={watchedDoctorName || ''}
                                onChange={handleDoctorChange}
                            >
                                <option value="">담당 의사를 선택하세요 (선택안함)</option>
                                {isLoadingDoctors ? (
                                    <option disabled>불러오는 중...</option>
                                ) : (
                                    doctors.map((doctor) => (
                                        <option key={doctor.id} value={doctor.name}>
                                            {doctor.name} ({doctor.specialty})
                                        </option>
                                    ))
                                )}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-[#191F28] mb-3">
                                상담 분야 <span className="text-red-500">*</span>
                            </label>
                            <select 
                                {...register('category')}
                                className={`w-full p-4 bg-gray-50 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow duration-200 appearance-none ${
                                    errors.category ? 'border-red-300 bg-red-50' : 'border-gray-100'
                                }`}
                            >
                                <option value="">상담 분야를 선택하세요</option>
                                {CONSULTATION_CATEGORIES.map((cat) => (
                                    <option key={cat.value} value={cat.value}>
                                        {cat.label}
                                    </option>
                                ))}
                            </select>
                            <FormError message={errors.category?.message} />
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-[#191F28] mb-3">
                                상담 내용 <span className="text-red-500">*</span>
                            </label>
                            <textarea 
                                {...register('content')}
                                className={`w-full p-4 bg-gray-50 border rounded-xl h-48 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow duration-200 resize-none ${
                                    errors.content ? 'border-red-300 bg-red-50' : 'border-gray-100'
                                }`}
                                placeholder="문의하실 내용을 상세히 입력해주세요. (최소 10자)"
                            />
                            <FormError message={errors.content?.message} />
                        </div>

                        <div className={`flex items-center gap-3 p-4 rounded-xl ${
                            errors.privacyAgreed ? 'bg-red-50 border border-red-200' : 'bg-blue-50'
                        }`}>
                            <input 
                                type="checkbox"
                                id="privacy"
                                {...register('privacyAgreed')}
                                className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500" 
                            />
                            <label htmlFor="privacy" className="text-sm text-gray-700">
                                <span className="font-bold text-blue-700">[필수]</span> 개인정보 수집 및 이용에 동의합니다.
                            </label>
                            <button type="button" className="ml-auto text-xs text-gray-400 underline">약관보기</button>
                        </div>
                        {errors.privacyAgreed && (
                            <FormError message={errors.privacyAgreed.message} />
                        )}

                        <button 
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-[#191F28] text-white py-5 rounded-2xl font-bold text-lg hover:bg-black transition-colors duration-200 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-3"
                        >
                            {isSubmitting ? (
                                <>
                                    <FontAwesomeIcon icon={faSpinner} className="animate-spin" />
                                    상담 신청 중...
                                </>
                            ) : (
                                '상담 신청하기'
                            )}
                        </button>
                    </form>
                </motion.div>

                {/* Info Section */}
                <div className="space-y-8">
                    <motion.div 
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                        className="bg-blue-600 rounded-3xl p-8 text-white"
                    >
                        <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
                            <FontAwesomeIcon icon={faPhone} />
                            빠른 전화 상담
                        </h3>
                        <p className="text-blue-100 mb-4 text-sm leading-relaxed">
                            통화 가능 시간에 맞춰 <br />
                            전담 상담사가 직접 연락을 드립니다.
                        </p>
                        <p className="text-3xl font-black tracking-tight">02-1234-5678</p>
                    </motion.div>

                    <motion.div 
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                        className="bg-gray-50 rounded-3xl p-8 border border-gray-100"
                    >
                        <h3 className="text-[#191F28] font-bold mb-6 flex items-center gap-3">
                            <FontAwesomeIcon icon={faComments} className="text-blue-600" />
                            상담 안내
                        </h3>
                        <ul className="space-y-4 text-sm text-gray-600">
                            <li className="flex items-start gap-3">
                                <FontAwesomeIcon icon={faCheckCircle} className="text-blue-500 mt-1" />
                                <span>상담 내용은 의료진이 직접 확인 후 답변해 드립니다.</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <FontAwesomeIcon icon={faLock} className="text-blue-500 mt-1" />
                                <span>상담 내용은 본인과 관리자만 확인 가능합니다.</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <FontAwesomeIcon icon={faCheckCircle} className="text-blue-500 mt-1" />
                                <span>주말 및 공휴일 상담은 평일에 순차적으로 답변됩니다.</span>
                            </li>
                        </ul>
                    </motion.div>
                </div>
            </div>
        </>
    );
}

// 로딩 폴백 컴포넌트
function FormSkeleton() {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mt-16">
            <div className="lg:col-span-2 bg-white border border-gray-100 p-8 md:p-10 rounded-3xl shadow-xl shadow-gray-200/50">
                <div className="space-y-8 animate-pulse">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="h-20 bg-gray-100 rounded-xl"></div>
                        <div className="h-20 bg-gray-100 rounded-xl"></div>
                    </div>
                    <div className="h-20 bg-gray-100 rounded-xl"></div>
                    <div className="h-20 bg-gray-100 rounded-xl"></div>
                    <div className="h-48 bg-gray-100 rounded-xl"></div>
                    <div className="h-16 bg-gray-100 rounded-xl"></div>
                    <div className="h-16 bg-gray-200 rounded-2xl"></div>
                </div>
            </div>
            <div className="space-y-8">
                <div className="h-48 bg-blue-100 rounded-3xl animate-pulse"></div>
                <div className="h-48 bg-gray-100 rounded-3xl animate-pulse"></div>
            </div>
        </div>
    );
}

export default function Page() {
    return (
        <div className="pt-48 pb-24 px-6 max-w-5xl mx-auto min-h-screen">
            {/* Header */}
            <div className="mb-0">
                <motion.h1 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-4xl md:text-5xl font-bold mb-6 text-[#191F28]"
                >
                    온라인 상담
                </motion.h1>
                <motion.p 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-lg text-gray-600 leading-relaxed"
                >
                    궁금하신 점을 남겨주시면 전문 상담사가 친절하게 답변해 드립니다. <br />
                    비공개 상담을 통해 안심하고 문의하실 수 있습니다.
                </motion.p>
            </div>

            <Suspense fallback={<FormSkeleton />}>
                <ConsultationForm />
            </Suspense>
        </div>
    );
}
