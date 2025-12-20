"use client"

import style from "@/css/Index.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown, faArrowUp, faQuoteLeft } from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image'
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

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

const DOCTORS = [
    {
        name: "김명안 대표원장",
        role: "Representative Director",
        catchphrase: "20년의 노하우,\n빛을 선물합니다.",
        description: "환자분의 눈을 제 눈처럼 생각하며 진료해왔습니다. 대학병원 교수 출신의 풍부한 임상 경험을 바탕으로, 가장 안전하고 정확한 최상의 의료 서비스를 약속드립니다.",
        imageSrc: "/img/profile_doctor-1.jpg",
        bgClass: "primary-bg-1",
        layoutType: "center-focus"
    },
    {
        name: "이시력 원장",
        role: "Vision Correction Center",
        catchphrase: "0.1mm의 오차도\n허용하지 않는 정밀함",
        description: "스마일 라식, 라섹 등 시력 교정술은 정밀함이 생명입니다. 최신 장비와 끊임없는 연구로 당신에게 가장 선명한 세상을 찾아드리겠습니다.",
        imageSrc: "/img/profile_doctor-3.jpg",
        bgClass: "primary-bg-2",
        layoutType: "asymmetric-left"
    },
    {
        name: "박소아 원장",
        role: "Pediatric Ophthalmology",
        catchphrase: "우리 아이의 눈,\n평생 건강의 시작입니다",
        description: "아이들의 눈은 어른과 다릅니다. 겁 많은 아이들도 웃으며 진료받을 수 있는 따뜻한 진료실. 엄마의 마음으로 꼼꼼하게 살피겠습니다.",
        imageSrc: "/img/profile_doctor-4.jpg",
        bgClass: "primary-bg-3",
        layoutType: "soft-rounded"
    },
    {
        name: "최망막 원장",
        role: "Retina & Cataract Center",
        catchphrase: "흐릿해진 시야를\n다시 맑고 투명하게",
        description: "노안, 백내장은 누구나 겪게 되는 과정입니다. 불편함을 참지 마세요. 제2의 시력 인생을 위한 맞춤형 솔루션을 제시해 드립니다.",
        imageSrc: "/img/profile_doctor-2.jpg",
        bgClass: "primary-bg-4",
        layoutType: "magazine-overlap"
    },
];

function DoctorCard({ doctor }: { doctor: any }) {
    const renderLayout = () => {
        switch (doctor.layoutType) {
            case "center-focus":
                return (
                    <div className="flex flex-col items-center text-center">
                        <span className="text-blue-100 font-semibold tracking-widest mb-4 uppercase">{doctor.role}</span>
                        <h2 className="text-4xl md:text-6xl font-bold mb-6 leading-tight whitespace-pre-line drop-shadow-lg">{doctor.catchphrase}</h2>
                        <p className="max-w-2xl text-lg text-white/90 mb-12 leading-relaxed">{doctor.description}</p>
                        <div className="relative w-full max-w-[600px] aspect-[4/5] shadow-2xl rounded-t-full overflow-hidden border-4 border-white/20">
                            <Image src={doctor.imageSrc} alt={doctor.name} fill className="object-cover" />
                            <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 to-transparent p-6">
                                <h3 className="text-2xl font-bold text-white">{doctor.name}</h3>
                            </div>
                        </div>
                    </div>
                );
            case "asymmetric-left":
                return (
                    <div className="flex flex-col md:flex-row items-center justify-between gap-10 w-full">
                        <div className="flex-1 text-left">
                            <div className="w-20 h-1 bg-white mb-8"></div>
                            <h2 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight whitespace-pre-line tracking-tighter">{doctor.catchphrase}</h2>
                            <h3 className="text-2xl font-bold text-blue-100 mb-4">{doctor.name} <span className="text-lg font-normal text-white/70">| {doctor.role}</span></h3>
                            <p className="text-lg text-white/80 leading-relaxed max-w-md">{doctor.description}</p>
                        </div>
                        <div className="flex-1 relative w-full aspect-square md:aspect-[3/4] max-w-[500px]">
                            <div className="absolute inset-0 border-[1px] border-white/30 translate-x-4 translate-y-4 rounded-xl"></div>
                            <Image src={doctor.imageSrc} alt={doctor.name} fill className="object-cover rounded-xl shadow-2xl relative z-10" />
                        </div>
                    </div>
                );
            case "soft-rounded":
                return (
                    <div className="flex flex-col-reverse md:flex-row items-center gap-12 w-full">
                        <div className="flex-1 relative w-full max-w-[450px] aspect-square">
                            <Image src={doctor.imageSrc} alt={doctor.name} fill className="object-cover rounded-full border-8 border-white/10 shadow-xl" />
                        </div>
                        <div className="flex-1 text-center md:text-left">
                            <FontAwesomeIcon icon={faQuoteLeft} className="text-4xl text-white/30 mb-6" />
                            <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-snug whitespace-pre-line">{doctor.catchphrase}</h2>
                            <p className="text-xl text-white/90 leading-loose font-light">{doctor.description}</p>
                            <div className="mt-8">
                                <span className="block text-2xl font-bold">{doctor.name}</span>
                                <span className="block text-sm text-white/70 uppercase tracking-widest mt-1">{doctor.role}</span>
                            </div>
                        </div>
                    </div>
                );
            case "magazine-overlap":
                return (
                    <div className="relative w-full py-10">
                        <div className="flex flex-col md:flex-row items-center">
                            <div className="w-full md:w-2/3 relative aspect-video shadow-2xl overflow-hidden rounded-lg">
                                <Image src={doctor.imageSrc} alt={doctor.name} fill className="object-cover opacity-90" />
                                <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent"></div>
                            </div>
                            <div className="w-full md:w-1/2 md:-ml-20 mt-[-50px] md:mt-0 relative z-10 bg-white/10 backdrop-blur-md p-8 md:p-12 border-l-4 border-white shadow-xl rounded-r-lg">
                                <span className="text-sm font-bold tracking-widest uppercase text-blue-200 mb-2 block">{doctor.role}</span>
                                <h2 className="text-3xl md:text-4xl font-bold mb-6 whitespace-pre-line">{doctor.catchphrase}</h2>
                                <p className="text-base text-white/90 leading-relaxed mb-6">{doctor.description}</p>
                                <h3 className="text-xl font-bold text-right">- {doctor.name}</h3>
                            </div>
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div id={`doctor-${doctor.name.split(' ')[0]}`} className={`relative ${doctor.bgClass} py-32 min-h-[80vh] flex items-center justify-center overflow-hidden`}>
            <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-white/20 to-transparent pointer-events-none mix-blend-overlay" />
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="w-full max-w-7xl mx-auto px-6 md:px-12 relative z-10"
            >
                {renderLayout()}
            </motion.div>
            <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black/10 to-transparent pointer-events-none" />
        </div>
    )
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

export default function Home() {
    return (
        <>
            <ScrollToTop />
            <div className={style.videoContainer}>
                <video autoPlay loop muted src={"/vid/mainVideo.mp4"}></video>
                <div className="absolute inset-0 bg-black/20 z-0" />
                <span className={`${style.floatCenterText} z-10 w-full px-6`}>
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
            <div className={style.floatArrow}>
                <FontAwesomeIcon icon={faArrowDown} beatFade={true}
                    className={"text-xl sm:text-2xl md:text-3xl xl:text-4xl text-gray-400"} />
            </div>

            <div className="bg-white py-20 px-6">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-8 text-[#191F28]">환영합니다</h2>
                    <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
                        저희 병원 홈페이지에 오신 것을 환영합니다. <br />
                        최상의 의료 서비스로 보답하겠습니다.
                    </p>
                </div>
            </div>

            <div className={style.contentContainer}>
                {DOCTORS.map((doctor, index) => (
                    <DoctorCard
                        key={index}
                        doctor={doctor}
                    />
                ))}
            </div>

            {/* Major Services Section */}
            <section className="py-32 bg-white">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-[#191F28] mb-4">주요 진료 과목</h2>
                        <p className="text-lg text-[#4E5968]">분야별 전문의가 제안하는 맞춤형 안과 진료</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { title: "시력교정센터", desc: "스마일라식, 라섹, 안내렌즈삽입술", icon: "👁️", target: "#doctor-이시력" },
                            { title: "노안·백내장", desc: "다초점 인공수정체 삽입술, 레이저 수술", icon: "👓", target: "#doctor-최망막" },
                            { title: "망막·드림렌즈", desc: "황반변성, 당뇨망막병증, 영유아 검진", icon: "✨", target: "#doctor-박소아" },
                        ].map((service, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 15 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.05, duration: 0.5 }}
                                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                                className="group p-10 rounded-3xl bg-[#F9FAFB] border border-[#EEEEEE] hover:border-[#00B8FF] hover:bg-white transition-colors duration-300 cursor-pointer shadow-sm hover:shadow-xl"
                            >
                                <div className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]">{service.icon}</div>
                                <h3 className="text-2xl font-bold text-[#191F28] mb-3">{service.title}</h3>
                                <p className="text-[#8B95A1] leading-relaxed">{service.desc}</p>
                                <SmoothLink href={service.target} className="mt-8 text-[#00B8FF] font-bold inline-flex items-center">
                                    자세히 보기 <span className="ml-2 group-hover:translate-x-1 transition-transform duration-300">→</span>
                                </SmoothLink>
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
                        <button className="text-[#4E5968] font-medium border-b border-gray-400 hover:text-black">전체보기</button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            { date: "2025.12.20", title: "12월 성탄절 및 연말 진료 일정 안내", type: "공지" },
                            { date: "2025.12.15", title: "최첨단 5세대 레이저 장비 '비쥬맥스 800' 도입", type: "뉴스" },
                            { date: "2025.12.01", title: "겨울방학 맞이 드림렌즈 특별 이벤트", type: "이벤트" },
                        ].map((post, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, scale: 0.98 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.05, duration: 0.2 }}
                                whileHover={{ scale: 1.02, y: -3 }}
                                className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-colors duration-300 cursor-pointer border border-transparent hover:border-[#EEEEEE]"
                            >
                                <span className="inline-block px-3 py-1 bg-blue-50 text-[#00B8FF] text-xs font-bold rounded-md mb-4">{post.type}</span>
                                <h3 className="text-xl font-bold text-[#191F28] mb-8 line-clamp-2 h-14">{post.title}</h3>
                                <p className="text-sm text-[#B0B8C1]">{post.date}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Location Section */}
            <section className="py-32 bg-white">
                <motion.div
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    className="max-w-7xl mx-auto px-6"
                >
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <h2 className="text-4xl font-bold text-[#191F28] mb-8">오시는 길</h2>
                            <div className="space-y-6">
                                <div className="flex items-start">
                                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mr-4 shrink-0">📍</div>
                                    <div>
                                        <h4 className="font-bold text-[#191F28] mb-1">위치</h4>
                                        <p className="text-[#4E5968]">서울특별시 강남구 테헤란로 123, 4층 (강남역 12번 출구)</p>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mr-4 shrink-0">📞</div>
                                    <div>
                                        <h4 className="font-bold text-[#191F28] mb-1">전화</h4>
                                        <p className="text-[#4E5968]">1588-1234</p>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mr-4 shrink-0">⏰</div>
                                    <div>
                                        <h4 className="font-bold text-[#191F28] mb-1">진료시간</h4>
                                        <p className="text-[#4E5968]">평일 09:00 ~ 18:00 (점심시간 13:00 ~ 14:00)</p>
                                        <p className="text-[#4E5968]">토요일 09:00 ~ 13:00 (일요일/공휴일 휴진)</p>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-12 flex gap-4">
                                <button className="px-8 py-4 bg-[#191F28] text-white rounded-xl font-bold hover:bg-black transition-colors cursor-pointer">네이버지도</button>
                                <button className="px-8 py-4 bg-[#FEE500] text-[#191F28] rounded-xl font-bold hover:opacity-90 transition-opacity cursor-pointer">카카오맵</button>
                            </div>
                        </div>
                        <div className="h-[400px] bg-gray-200 rounded-3xl overflow-hidden relative shadow-inner">
                            {/* Placeholder for Map */}
                            <div className="absolute inset-0 flex flex-col items-center justify-center text-[#8B95A1] p-10 text-center">
                                <span className="text-6xl mb-4">🗺️</span>
                                <p className="font-medium">지도가 표시되는 영역입니다.<br />실제 서비스에서는 지도를 로드합니다.</p>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </section>
        </>
    );
}
