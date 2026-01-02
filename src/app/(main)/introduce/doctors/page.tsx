"use client";

import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuoteLeft, faChevronDown, faGraduationCap, faBriefcase, faAward } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRepresentativeDoctors, useDoctorDetail } from "@/hooks/useDoctors";
import { DoctorListSkeleton } from "@/component/Skeleton";

function DoctorImage({ src, alt, isActive }: { src: string; alt: string; isActive: boolean }) {
    const [isLoaded, setIsLoaded] = useState(false);

    return (
        <motion.div 
            className="w-full md:w-2/5 aspect-[4/5] relative rounded-3xl overflow-hidden shadow-2xl bg-gray-100"
            animate={{ 
                scale: isActive ? 1.03 : 1,
                boxShadow: isActive 
                    ? "0 25px 50px -12px rgba(0, 184, 255, 0.25)" 
                    : "0 25px 50px -12px rgba(0, 0, 0, 0.15)"
            }}
            transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
            {/* Skeleton / Placeholder */}
            {!isLoaded && (
                <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 animate-pulse z-10" />
            )}
            <Image
                src={src}
                alt={alt}
                fill
                className={`object-cover transition-opacity duration-700 ease-in-out ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
                onLoad={() => setIsLoaded(true)}
                priority={true}
            />
            {/* 활성화 시 테두리 효과 */}
            <motion.div 
                className="absolute inset-0 rounded-3xl border-4 pointer-events-none z-30"
                animate={{
                    borderColor: isActive ? "rgba(0, 184, 255, 0.5)" : "transparent",
                }}
                transition={{ duration: 0.3 }}
            />
            <div className={`absolute inset-0 bg-gradient-to-t from-[#191F28]/40 to-transparent transition-opacity duration-500 z-20 ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`} />
        </motion.div>
    );
}

// 상세 약력 아코디언 컴포넌트 (SWR 캐싱 적용)
function DoctorDetailAccordion({ doctorId, isOpen, onToggle }: { doctorId: number; isOpen: boolean; onToggle: () => void }) {
    // SWR 훅으로 캐싱 자동 적용 - isOpen일 때만 fetch
    const { detail, isLoading } = useDoctorDetail(isOpen ? doctorId : null);

    return (
        <div className="mt-6">
            <button
                onClick={onToggle}
                className="w-full bg-white text-[#191F28] py-4 rounded-xl font-bold border border-[#F2F4F6] hover:bg-gray-50 transition-colors duration-200 cursor-pointer flex items-center justify-center gap-2"
            >
                상세 약력보기
                <motion.span
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <FontAwesomeIcon icon={faChevronDown} className="text-sm" />
                </motion.span>
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                        className="overflow-hidden"
                    >
                        <div className="pt-6 pb-2">
                            {isLoading ? (
                                <div className="flex justify-center py-8">
                                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#00B8FF]"></div>
                                </div>
                            ) : detail ? (
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    {/* 학력 */}
                                    {detail.education && detail.education.length > 0 && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.1 }}
                                            className="bg-[#F8F9FA] rounded-2xl p-6"
                                        >
                                            <div className="flex items-center gap-3 mb-4">
                                                <div className="w-10 h-10 bg-[#00B8FF]/10 rounded-xl flex items-center justify-center">
                                                    <FontAwesomeIcon icon={faGraduationCap} className="text-[#00B8FF]" />
                                                </div>
                                                <h4 className="font-bold text-[#191F28]">학력</h4>
                                            </div>
                                            <ul className="space-y-2">
                                                {detail.education.map((item: string, idx: number) => (
                                                    <li key={idx} className="text-sm text-[#4E5968] flex items-start gap-2">
                                                        <span className="w-1.5 h-1.5 rounded-full bg-[#00B8FF] mt-1.5 shrink-0"></span>
                                                        {item}
                                                    </li>
                                                ))}
                                            </ul>
                                        </motion.div>
                                    )}

                                    {/* 경력 */}
                                    {detail.career && detail.career.length > 0 && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.2 }}
                                            className="bg-[#F8F9FA] rounded-2xl p-6"
                                        >
                                            <div className="flex items-center gap-3 mb-4">
                                                <div className="w-10 h-10 bg-[#00B8FF]/10 rounded-xl flex items-center justify-center">
                                                    <FontAwesomeIcon icon={faBriefcase} className="text-[#00B8FF]" />
                                                </div>
                                                <h4 className="font-bold text-[#191F28]">경력</h4>
                                            </div>
                                            <ul className="space-y-2">
                                                {detail.career.map((item: string, idx: number) => (
                                                    <li key={idx} className="text-sm text-[#4E5968] flex items-start gap-2">
                                                        <span className="w-1.5 h-1.5 rounded-full bg-[#00B8FF] mt-1.5 shrink-0"></span>
                                                        {item}
                                                    </li>
                                                ))}
                                            </ul>
                                        </motion.div>
                                    )}

                                    {/* 자격/수상 */}
                                    {detail.certifications && detail.certifications.length > 0 && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.3 }}
                                            className="bg-[#F8F9FA] rounded-2xl p-6"
                                        >
                                            <div className="flex items-center gap-3 mb-4">
                                                <div className="w-10 h-10 bg-[#00B8FF]/10 rounded-xl flex items-center justify-center">
                                                    <FontAwesomeIcon icon={faAward} className="text-[#00B8FF]" />
                                                </div>
                                                <h4 className="font-bold text-[#191F28]">자격/학회</h4>
                                            </div>
                                            <ul className="space-y-2">
                                                {detail.certifications.map((item: string, idx: number) => (
                                                    <li key={idx} className="text-sm text-[#4E5968] flex items-start gap-2">
                                                        <span className="w-1.5 h-1.5 rounded-full bg-[#00B8FF] mt-1.5 shrink-0"></span>
                                                        {item}
                                                    </li>
                                                ))}
                                            </ul>
                                        </motion.div>
                                    )}
                                </div>
                            ) : (
                                <p className="text-center text-[#8B95A1] py-4">상세 정보를 불러올 수 없습니다.</p>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default function DoctorsPage() {
    // SWR 훅으로 캐싱 자동 적용
    const { doctors, isLoading } = useRepresentativeDoctors();
    const [openAccordionId, setOpenAccordionId] = useState<number | null>(null);

    // 데이터 로딩 완료 후 해시로 스크롤
    useEffect(() => {
        if (!isLoading && doctors.length > 0 && window.location.hash) {
            const hash = window.location.hash.substring(1);
            setTimeout(() => {
                const element = document.getElementById(hash);
                if (element) {
                    const top = element.getBoundingClientRect().top + window.scrollY - 128;
                    window.scrollTo({ top });
                }
            }, 100);
        }
    }, [isLoading, doctors]);

    // 페이지 마운트 시 smooth scroll 활성화, 언마운트 시 복원
    useEffect(() => {
        document.documentElement.style.scrollBehavior = 'smooth';
        return () => {
            document.documentElement.style.scrollBehavior = '';
        };
    }, []);

    const handleAccordionToggle = (doctorId: number) => {
        setOpenAccordionId(prev => prev === doctorId ? null : doctorId);
    };

    return (
        <div className="pt-48 pb-24 bg-white min-h-screen">
            <div className="max-w-7xl mx-auto px-6">
                {/* Header Section */}
                <div className="mb-20 animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <span className="text-[#00B8FF] font-bold tracking-widest uppercase text-sm mb-4 block">Our Professionals</span>
                    <h1 className="text-4xl md:text-6xl font-bold text-[#191F28] mb-6">최고의 의료진이<br />함께합니다</h1>
                    <p className="text-xl text-[#4E5968] max-w-2xl leading-relaxed">
                        각 분야의 전문의들이 협진하여 환자분들에게 가장 안전하고 정확한 최상의 의료 서비스를 제공합니다.
                    </p>
                </div>

                {/* Doctors Grid */}
                {isLoading ? (
                    <DoctorListSkeleton />
                ) : (
                    <div className="grid grid-cols-1 gap-24">
                        {doctors.map((doctor, index) => (
                            <div
                                key={doctor.id}
                                id={`doctor-${doctor.id}`}
                                className={`flex flex-col ${index % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-12 md:gap-20 group scroll-mt-32`}
                            >
                                <DoctorImage src={doctor.imageSrc} alt={doctor.name} isActive={openAccordionId === doctor.id} />

                                {/* Info Container */}
                                <div className="w-full md:w-3/5 flex flex-col justify-center">
                                    <div className="mb-6 flex items-center gap-3">
                                        <span className="bg-[#F2F4F6] text-[#4E5968] px-3 py-1 rounded-full text-sm font-bold uppercase tracking-wider">{doctor.specialty}</span>
                                    </div>
                                    <h2 className="text-3xl md:text-5xl font-bold text-[#191F28] mb-4 flex items-baseline gap-2">
                                        {doctor.name} <span className="text-xl font-medium text-gray-400">{doctor.role}</span>
                                    </h2>
                                    <p className="text-[#00B8FF] text-xl md:text-2xl font-bold mb-8 leading-tight">
                                        &quot;{doctor.catchphrase.replace(/\n/g, ' ')}&quot;
                                    </p>

                                    <div className="relative">
                                        <FontAwesomeIcon icon={faQuoteLeft} className="absolute -top-6 -left-4 text-4xl text-gray-100 -z-10" />
                                        <p className="text-lg text-[#4E5968] leading-loose mb-10 border-l-4 border-[#00B8FF] pl-6 py-2 italic text-left">
                                            {doctor.description}
                                        </p>
                                    </div>

                                    <div className="grid grid-cols-1 gap-4">
                                        <Link 
                                            href={`/consultation?doctor=${encodeURIComponent(doctor.name)}&specialty=${encodeURIComponent(doctor.specialty)}`}
                                            className="bg-[#191F28] text-white py-4 rounded-xl font-bold hover:bg-[#333D4B] transition-colors duration-200 cursor-pointer text-center block"
                                        >
                                            진료 예약하기
                                        </Link>
                                        <DoctorDetailAccordion 
                                            doctorId={doctor.id}
                                            isOpen={openAccordionId === doctor.id}
                                            onToggle={() => handleAccordionToggle(doctor.id)}
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
