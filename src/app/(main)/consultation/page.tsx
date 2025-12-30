'use client';

import { Suspense, useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faComments, faLock, faCheckCircle, faUserMd } from '@fortawesome/free-solid-svg-icons';
import { useRepresentativeDoctors } from '@/lib/api';

// 폼 컴포넌트 (useSearchParams 사용)
function ConsultationForm() {
    const searchParams = useSearchParams();
    
    // SWR 훅으로 캐싱 자동 적용
    const { doctors, isLoading: isLoadingDoctors } = useRepresentativeDoctors();
    
    // Form state
    const [selectedDoctor, setSelectedDoctor] = useState<string>('');
    const [consultField, setConsultField] = useState<string>('');
    const [message, setMessage] = useState<string>('');
    const [isInitialized, setIsInitialized] = useState(false);

    // URL 쿼리 파라미터에서 의사 정보 가져오기
    const doctorFromUrl = searchParams.get('doctor');
    const specialtyFromUrl = searchParams.get('specialty');

    // URL 파라미터로 폼 자동 입력 (최초 1회만)
    useEffect(() => {
        if (!isLoadingDoctors && doctors.length > 0 && !isInitialized) {
            if (doctorFromUrl) {
                setSelectedDoctor(doctorFromUrl);
                
                // 자동 메시지 생성
                const autoMessage = `${doctorFromUrl} 선생님께 진료 예약 상담을 요청합니다.`;
                setMessage(autoMessage);
            }
            
            if (specialtyFromUrl) {
                // 전문 분야에 맞는 상담 분야 자동 선택
                const specialtyMap: Record<string, string> = {
                    '시력교정': '시력교정 (라식/라섹)',
                    '망막': '망막/녹내장',
                    '녹내장': '망막/녹내장',
                    '백내장': '노안/백내장',
                    '노안': '노안/백내장',
                    '드림렌즈': '드림렌즈/기타',
                    '안성형': '드림렌즈/기타',
                };
                
                const matchedField = Object.entries(specialtyMap).find(([key]) => 
                    specialtyFromUrl.includes(key)
                );
                if (matchedField) {
                    setConsultField(matchedField[1]);
                }
            }
            
            setIsInitialized(true);
        }
    }, [isLoadingDoctors, doctors, doctorFromUrl, specialtyFromUrl, isInitialized]);

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
                    <form className="space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-bold text-[#191F28] mb-3">성함</label>
                                <input 
                                    type="text" 
                                    className="w-full p-4 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all" 
                                    placeholder="성함을 입력하세요" 
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-[#191F28] mb-3">연락처</label>
                                <input 
                                    type="text" 
                                    className="w-full p-4 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all" 
                                    placeholder="010-0000-0000" 
                                />
                            </div>
                        </div>

                        {/* 담당 의사 선택 */}
                        <div>
                            <label className="block text-sm font-bold text-[#191F28] mb-3">
                                담당 의사 선택 
                                <span className="text-gray-400 font-normal ml-2">(선택사항)</span>
                            </label>
                            <select 
                                className={`w-full p-4 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all appearance-none ${
                                    selectedDoctor ? 'bg-blue-50 border-blue-200' : 'bg-gray-50'
                                }`}
                                value={selectedDoctor}
                                onChange={(e) => setSelectedDoctor(e.target.value)}
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
                            <label className="block text-sm font-bold text-[#191F28] mb-3">상담 분야</label>
                            <select 
                                className="w-full p-4 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all appearance-none"
                                value={consultField}
                                onChange={(e) => setConsultField(e.target.value)}
                            >
                                <option value="">상담 분야를 선택하세요</option>
                                <option value="시력교정 (라식/라섹)">시력교정 (라식/라섹)</option>
                                <option value="노안/백내장">노안/백내장</option>
                                <option value="망막/녹내장">망막/녹내장</option>
                                <option value="드림렌즈/기타">드림렌즈/기타</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-[#191F28] mb-3">상담 내용</label>
                            <textarea 
                                className="w-full p-4 bg-gray-50 border border-gray-100 rounded-xl h-48 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none" 
                                placeholder="문의하실 내용을 상세히 입력해주세요."
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                            ></textarea>
                        </div>

                        <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-xl">
                            <input type="checkbox" id="privacy" className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                            <label htmlFor="privacy" className="text-sm text-gray-700">
                                <span className="font-bold text-blue-700">[필수]</span> 개인정보 수집 및 이용에 동의합니다.
                            </label>
                            <button type="button" className="ml-auto text-xs text-gray-400 underline">약관보기</button>
                        </div>

                        <button className="w-full bg-[#191F28] text-white py-5 rounded-2xl font-bold text-lg hover:bg-black transition-all transform hover:scale-[1.01] active:scale-[0.99]">
                            상담 신청하기
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
