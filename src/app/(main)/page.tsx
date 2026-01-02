"use client"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown, faArrowUp, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image'
import Link from 'next/link'
import { Suspense, useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRepresentativeDoctors } from "@/hooks/useDoctors";
import { usePinnedPosts } from "@/hooks/usePosts";
import { Doctor } from "@/types/doctor";
import { CATEGORY_LABELS, CATEGORY_STYLES } from "@/types/post";
import { SERVICES } from "@/data/services";
import { DoctorSliderSkeleton, DoctorCardGridSkeleton } from "@/component/Skeleton";
import LocationSection from "@/component/LocationSection";

function ScrollToTop() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.pageYOffset > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener("scroll", toggleVisibility);
        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.button
                    initial={{ opacity: 0, y: 20, scale: 0.8 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 20, scale: 0.8 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={scrollToTop}
                    className="fixed bottom-10 right-10 z-[150] w-14 h-14 bg-white/80 backdrop-blur-md text-[#191F28] rounded-full shadow-xl flex items-center justify-center border border-gray-100 cursor-pointer"
                    aria-label="Scroll to top"
                >
                    <FontAwesomeIcon icon={faArrowUp} className="text-xl" />
                </motion.button>
            )}
        </AnimatePresence>
    );
}

// 히어로 스크롤 화살표 (스크롤 시 사라짐)
function HeroScrollArrow() {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const handleScroll = () => {
            setIsVisible(window.pageYOffset < 100);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="flex justify-center items-center relative z-50"
                >
                    <div className="absolute top-[-3rem]">
                        <FontAwesomeIcon 
                            icon={faArrowDown} 
                            beatFade={true}
                            className="text-xl sm:text-2xl md:text-3xl xl:text-4xl primary-text-2 drop-shadow-lg" 
                        />
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

// 의사별 배경/텍스트 색상 설정
const DOCTOR_COLORS: Record<string, { bg: string; accent: string; text: string; subtext: string }> = {
    "primary-bg-1": {
        bg: "linear-gradient(135deg, rgba(56, 198, 244, 0.08) 0%, rgba(0, 122, 255, 0.12) 100%)",
        accent: "#007AFF",
        text: "#191F28",
        subtext: "#4E5968"
    },
    "primary-bg-2": {
        bg: "linear-gradient(135deg, rgba(0, 210, 211, 0.08) 0%, rgba(46, 134, 222, 0.12) 100%)",
        accent: "#00D2D3",
        text: "#191F28",
        subtext: "#4E5968"
    },
    "primary-bg-3": {
        bg: "linear-gradient(135deg, rgba(84, 160, 255, 0.08) 0%, rgba(0, 98, 102, 0.12) 100%)",
        accent: "#54A0FF",
        text: "#191F28",
        subtext: "#4E5968"
    },
    "primary-bg-4": {
        bg: "linear-gradient(135deg, rgba(72, 219, 251, 0.08) 0%, rgba(95, 39, 205, 0.12) 100%)",
        accent: "#5F27CD",
        text: "#191F28",
        subtext: "#4E5968"
    },
};

// 쏘카 스타일 의료진 슬라이더 컴포넌트
function DoctorSlider({ doctors }: { doctors: Doctor[] }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % doctors.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev - 1 + doctors.length) % doctors.length);
    };

    const goToSlide = (index: number) => {
        setCurrentIndex(index);
    };

    useEffect(() => {
        if (isAutoPlaying && doctors.length > 0) {
            intervalRef.current = setInterval(nextSlide, 5000);
        }
        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [isAutoPlaying, doctors.length]);

    const handleMouseEnter = () => setIsAutoPlaying(false);
    const handleMouseLeave = () => setIsAutoPlaying(true);

    if (doctors.length === 0) return null;

    const currentDoctor = doctors[currentIndex];
    const colors = DOCTOR_COLORS[currentDoctor.bgClass] || DOCTOR_COLORS["primary-bg-1"];

    return (
        <section 
            className="relative overflow-hidden"
            style={{ background: colors.bg }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {/* 메인 슬라이드 영역 */}
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[600px] lg:min-h-[700px]">
                    {/* 좌측: 텍스트 영역 */}
                    <div className="flex flex-col justify-center px-8 md:px-16 lg:px-20 py-16 lg:py-24 order-2 lg:order-1">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentIndex}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                            >
                                <motion.span 
                                    className="inline-block text-sm font-bold tracking-wider mb-4"
                                    animate={{ color: colors.accent }}
                                    transition={{ duration: 0.5 }}
                                >
                                    {currentDoctor.specialty}
                                </motion.span>
                                <motion.h2 
                                    className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight whitespace-pre-line"
                                    animate={{ color: colors.text }}
                                    transition={{ duration: 0.5 }}
                                >
                                    {currentDoctor.catchphrase}
                                </motion.h2>
                                <motion.p 
                                    className="text-lg leading-relaxed mb-8 max-w-md"
                                    animate={{ color: colors.subtext }}
                                    transition={{ duration: 0.5 }}
                                >
                                    {currentDoctor.description}
                                </motion.p>
                                <div className="flex items-center gap-4 mb-10">
                                    <motion.div 
                                        className="w-14 h-14 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg"
                                        animate={{ 
                                            background: `linear-gradient(135deg, ${colors.accent} 0%, ${colors.accent}cc 100%)`
                                        }}
                                        transition={{ duration: 0.5 }}
                                    >
                                        {currentDoctor.name.charAt(0)}
                                    </motion.div>
                                    <div>
                                        <motion.p 
                                            className="font-bold text-xl"
                                            animate={{ color: colors.text }}
                                            transition={{ duration: 0.5 }}
                                        >
                                            {currentDoctor.name}
                                        </motion.p>
                                        <p className="text-[#8B95A1] text-sm">{currentDoctor.role}</p>
                                    </div>
                                </div>
                                <Link 
                                    href={`/introduce/doctors#doctor-${currentDoctor.id}`}
                                    className="inline-flex items-center gap-2 bg-[#191F28] text-white px-8 py-4 rounded-full font-bold hover:bg-[#333D4B] transition-colors duration-200 group"
                                >
                                    자세히 보기
                                    <FontAwesomeIcon 
                                        icon={faChevronRight} 
                                        className="text-sm group-hover:translate-x-1 transition-transform" 
                                    />
                                </Link>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* 우측: 이미지 영역 */}
                    <div className="relative order-1 lg:order-2 min-h-[400px] lg:min-h-full">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentIndex}
                                initial={{ opacity: 0, scale: 1.05 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                                className="absolute inset-0"
                            >
                                <Image
                                    src={currentDoctor.imageSrc}
                                    alt={currentDoctor.name}
                                    fill
                                    className="object-cover object-top"
                                    priority
                                />
                                {/* 그라데이션 오버레이 - 배경색과 어울리게 */}
                                <motion.div 
                                    className="absolute inset-0 lg:bg-gradient-to-r from-white/80 via-transparent to-transparent"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 0.7 }}
                                    transition={{ duration: 0.5 }}
                                />
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </div>

            {/* 하단 네비게이션 */}
            <div className="absolute bottom-8 left-8 md:left-16 lg:left-20 flex items-center gap-6 z-10">
                {/* 화살표 버튼 */}
                <div className="flex items-center gap-2">
                    <button
                        onClick={prevSlide}
                        className="w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm border border-gray-200 flex items-center justify-center text-[#191F28] hover:bg-white hover:shadow-lg transition-[background,box-shadow] duration-200 cursor-pointer"
                        aria-label="Previous doctor"
                    >
                        <FontAwesomeIcon icon={faChevronLeft} className="text-sm" />
                    </button>
                    <button
                        onClick={nextSlide}
                        className="w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm border border-gray-200 flex items-center justify-center text-[#191F28] hover:bg-white hover:shadow-lg transition-[background,box-shadow] duration-200 cursor-pointer"
                        aria-label="Next doctor"
                    >
                        <FontAwesomeIcon icon={faChevronRight} className="text-sm" />
                    </button>
                </div>

                {/* 인디케이터 - 각 의사 색상 반영 */}
                <div className="flex items-center gap-2">
                    {doctors.map((doctor, index) => {
                        const dotColor = DOCTOR_COLORS[doctor.bgClass]?.accent || "#00B8FF";
                        return (
                            <button
                                key={index}
                                onClick={() => goToSlide(index)}
                                className="h-1.5 rounded-full transition-[width,background-color] duration-200 cursor-pointer"
                                style={{
                                    width: index === currentIndex ? '32px' : '16px',
                                    backgroundColor: index === currentIndex ? dotColor : '#D1D5DB'
                                }}
                                aria-label={`Go to slide ${index + 1}`}
                            />
                        );
                    })}
                </div>

                {/* 현재 슬라이드 번호 */}
                <span className="text-sm text-[#8B95A1] font-medium">
                    <motion.span 
                        className="font-bold"
                        animate={{ color: colors.accent }}
                        transition={{ duration: 0.3 }}
                    >
                        {String(currentIndex + 1).padStart(2, '0')}
                    </motion.span>
                    <span className="mx-1">/</span>
                    <span>{String(doctors.length).padStart(2, '0')}</span>
                </span>
            </div>
        </section>
    );
}

// 의료진 카드 그리드 (쏘카 서비스 카드 스타일)
function DoctorCardGrid({ doctors }: { doctors: Doctor[] }) {
    return (
        <section className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-6 md:px-12">
                <div className="text-center mb-16">
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-block text-[#00B8FF] text-sm font-bold tracking-wider mb-4"
                    >
                        OUR SPECIALISTS
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-3xl md:text-4xl font-bold text-[#191F28] mb-4"
                    >
                        분야별 전문 의료진
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-[#4E5968] text-lg"
                    >
                        각 분야 최고의 전문의가 최상의 진료를 약속합니다
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {doctors.map((doctor, index) => {
                        const colors = DOCTOR_COLORS[doctor.bgClass] || DOCTOR_COLORS["primary-bg-1"];
                        return (
                            <motion.div
                                key={doctor.id}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ 
                                    delay: index * 0.1, 
                                    duration: 0.7,
                                    ease: [0.25, 0.46, 0.45, 0.94]
                                }}
                            >
                                <Link 
                                    href={`/introduce/doctors#doctor-${doctor.id}`}
                                    className="group block cursor-pointer"
                                >
                                    <div 
                                        className="relative aspect-[3/4] rounded-2xl overflow-hidden mb-5 transition-shadow duration-500 ease-out group-hover:shadow-2xl"
                                        style={{ background: colors.bg }}
                                    >
                                        <Image
                                            src={doctor.imageSrc}
                                            alt={doctor.name}
                                            fill
                                            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                                        />
                                        {/* 의사별 색상 그라데이션 오버레이 */}
                                        <div 
                                            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out"
                                            style={{ 
                                                background: `linear-gradient(to top, ${colors.accent}cc 0%, transparent 60%)` 
                                            }}
                                        />
                                        
                                        {/* 호버 시 나타나는 버튼 */}
                                        <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 translate-y-3 group-hover:translate-y-0 transition-all duration-500 ease-out">
                                            <span 
                                                className="block w-full py-3 rounded-xl font-bold text-sm text-center shadow-lg backdrop-blur-sm"
                                                style={{ 
                                                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                                                    color: colors.accent
                                                }}
                                            >
                                                프로필 보기
                                            </span>
                                        </div>
                                    </div>
                                    
                                    <div className="px-1">
                                        <span 
                                            className="text-xs font-bold tracking-wide"
                                            style={{ color: colors.accent }}
                                        >
                                            {doctor.specialty}
                                        </span>
                                        <h3 
                                            className="text-xl font-bold mt-2 mb-1 transition-colors"
                                            style={{ color: colors.text }}
                                        >
                                            {doctor.name} <span className="font-medium text-[#8B95A1]">{doctor.role}</span>
                                        </h3>
                                        <p className="text-[#8B95A1] text-sm line-clamp-2 leading-relaxed">
                                            {doctor.catchphrase.replace(/\n/g, ' ')}
                                        </p>
                                    </div>
                                </Link>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

function SmoothLink({ href, children, className }: { href: string; children: React.ReactNode; className?: string }) {
    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        if (href.startsWith("#")) {
            e.preventDefault();
            const id = href.substring(1);
            const element = document.getElementById(id);
            if (element) {
                element.scrollIntoView({ behavior: "smooth" });
                window.history.pushState(null, "", href);
            }
        }
    };

    return (
        <a href={href} onClick={handleClick} className={className}>
            {children}
        </a>
    );
}

// 뉴스 카드 스켈레톤
function NewsCardsSkeleton() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white p-8 rounded-2xl shadow-sm animate-pulse">
                    <div className="w-16 h-6 bg-gray-200 rounded-md mb-4" />
                    <div className="h-6 bg-gray-200 rounded mb-2" />
                    <div className="h-6 bg-gray-200 rounded w-3/4 mb-8" />
                    <div className="w-24 h-4 bg-gray-100 rounded" />
                </div>
            ))}
        </div>
    );
}

// Pinned 뉴스 카드 (API 연동)
function PinnedNewsCards() {
    const { posts, isLoading } = usePinnedPosts(3);

    if (isLoading) {
        return <NewsCardsSkeleton />;
    }

    // 데이터가 없으면 빈 상태 표시
    if (posts.length === 0) {
        return (
            <div className="text-center py-16 text-[#8B95A1]">
                <p>등록된 소식이 없습니다.</p>
            </div>
        );
    }

    // 날짜 포맷팅 함수
    const formatDate = (dateStr: string) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\. /g, '.').replace(/\.$/, '');
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post, idx) => {
                const categoryStyle = CATEGORY_STYLES[post.category] || CATEGORY_STYLES['공지'];
                const categoryLabel = CATEGORY_LABELS[post.category] || post.category;
                
                return (
                    <motion.div
                        key={post.id}
                        initial={{ opacity: 0, scale: 0.98 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.05, duration: 0.2 }}
                        whileHover={{ scale: 1.02, y: -3 }}
                        className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl cursor-pointer border border-transparent hover:border-[#EEEEEE]"
                    >
                        <Link href={`/news/${post.id}`} className="block">
                            <span className={`inline-block px-3 py-1 ${categoryStyle.bg} ${categoryStyle.text} text-xs font-bold rounded-md mb-4`}>
                                {categoryLabel}
                            </span>
                            <h3 className="text-xl font-bold text-[#191F28] mb-3 line-clamp-2 h-14">
                                {post.title}
                            </h3>
                            {post.summary && (
                                <p className="text-sm text-[#8B95A1] mb-4 line-clamp-2">
                                    {post.summary}
                                </p>
                            )}
                            <p className="text-sm text-[#B0B8C1]">{formatDate(post.createdAt)}</p>
                        </Link>
                    </motion.div>
                );
            })}
        </div>
    );
}

export default function Home() {
    const { doctors, isLoading } = useRepresentativeDoctors();

    return (
        <>
            <ScrollToTop />
            <div className="w-full pointer-events-none relative z-0">
                <video className="w-full h-[100vh] object-cover" autoPlay loop muted src={"/vid/mainVideo.mp4"}></video>
                <div className="absolute inset-0 bg-black/20 z-0" />
                <span className="absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 text-2xl text-white z-10 w-full px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        className="flex flex-col items-center"
                    >
                        <motion.span
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.2, duration: 0.8 }}
                            className="text-[#00B8FF] text-sm md:text-lg font-bold tracking-[0.2em] mb-4 uppercase drop-shadow-sm"
                        >
                            Premium Eye Care Service
                        </motion.span>
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4, duration: 0.8 }}
                            className="text-white text-4xl md:text-7xl xl:text-8xl font-bold tracking-tight text-center leading-[1.1] drop-shadow-2xl"
                        >
                            가장 선명한 순간,<br />
                            <span className="font-light opacity-90">마이병원과 함께</span>
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6, duration: 1 }}
                            className="mt-8 text-white/70 text-base md:text-xl font-medium tracking-wide text-center max-w-2xl drop-shadow-md"
                        >
                            20년 전통의 노하우와 최첨단 장비로<br className="md:hidden" /> 당신의 소중한 눈을 지켜드립니다.
                        </motion.p>
                    </motion.div>
                </span>
            </div>
            <HeroScrollArrow />

            {/* 의료진 슬라이더 섹션 */}
            {isLoading ? (
                <>
                    <DoctorSliderSkeleton />
                    <DoctorCardGridSkeleton />
                </>
            ) : (
                <>
                    <DoctorSlider doctors={doctors} />
                    <DoctorCardGrid doctors={doctors} />
                </>
            )}

            {/* Major Services Section */}
            <section className="py-32 bg-white">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-[#191F28] mb-4">주요 진료 과목</h2>
                        <p className="text-lg text-[#4E5968]">분야별 전문의가 제안하는 맞춤형 안과 진료</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {SERVICES.map((service, idx) => (
                            <motion.div
                                key={service.id}
                                initial={{ opacity: 0, y: 15 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.05, duration: 0.5 }}
                                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                                className="group p-10 rounded-3xl bg-[#F9FAFB] border border-[#EEEEEE] hover:border-[#00B8FF] hover:bg-white transition-colors duration-300 shadow-sm hover:shadow-xl"
                            >
                                <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                    <FontAwesomeIcon icon={service.icon} className="text-2xl text-blue-600" />
                                </div>
                                <h3 className="text-2xl font-bold text-[#191F28] mb-3">{service.title}</h3>
                                <p className="text-[#8B95A1] leading-relaxed mb-4">{service.description}</p>
                                <div className="text-sm text-[#4E5968] mb-6">
                                    {service.items.slice(0, 3).join(' · ')}
                                </div>
                                <Link href="/services" className="text-[#00B8FF] font-bold inline-flex items-center">
                                    자세히 보기 <span className="ml-2 group-hover:translate-x-1 transition-transform duration-300">→</span>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Latest News Section */}
            <section className="py-32 bg-[#F9FAFB]">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex justify-between items-end mb-16">
                        <div>
                            <h2 className="text-4xl font-bold text-[#191F28] mb-4">병원 소식</h2>
                            <p className="text-lg text-[#4E5968]">마이병원의 새로운 소식을 전해드립니다.</p>
                        </div>
                        <Link href="/news" className="text-[#4E5968] font-medium border-b border-gray-400 hover:text-black transition-colors duration-200">전체보기</Link>
                    </div>
                    <Suspense fallback={<NewsCardsSkeleton />}>
                        <PinnedNewsCards />
                    </Suspense>
                </div>
            </section>

            {/* Location Section */}
            <section id="location" className="py-32 bg-white scroll-mt-20">
                <LocationSection className="max-w-7xl mx-auto px-6" />
            </section>
        </>
    );
}
