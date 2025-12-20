"use client"

import style from "@/css/Index.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown, faArrowUp, faQuoteLeft } from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image'
import {useEffect, useRef, useState} from "react";

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
        <button
            onClick={scrollToTop}
            className={`fixed bottom-10 right-10 z-[150] w-14 h-14 bg-white/80 backdrop-blur-md text-[#191F28] rounded-full shadow-xl flex items-center justify-center transition-all duration-300 border border-gray-100 hover:bg-white hover:scale-110 active:scale-95 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"
            }`}
            aria-label="Scroll to top"
        >
            <FontAwesomeIcon icon={faArrowUp} className="text-xl" />
        </button>
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
    const ref = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.15 }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => observer.disconnect();
    }, []);

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
        <div className={`relative ${doctor.bgClass} py-32 min-h-[80vh] flex items-center justify-center overflow-hidden`}>
            <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-white/20 to-transparent pointer-events-none mix-blend-overlay" />
            <div
                ref={ref}
                className={`w-full max-w-7xl mx-auto px-6 md:px-12 transform transition-all duration-1000 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-24"}`}>
                {renderLayout()}
            </div>
            <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black/10 to-transparent pointer-events-none" />
        </div>
    )
}

export default function Home() {
    return (
        <>
            <ScrollToTop />
            <div className={style.videoContainer}>
                <video autoPlay loop muted src={"/vid/mainVideo.mp4"}></video>
                <div className="absolute inset-0 bg-black/20 z-0" />
                <span className={`${style.floatCenterText} z-10 w-full px-6`}>
                    <div className="flex flex-col items-center animate-in fade-in slide-in-from-bottom-8 duration-1000 ease-out">
                        <span className="text-[#00B8FF] text-sm md:text-lg font-bold tracking-[0.2em] mb-4 uppercase drop-shadow-sm">
                            Premium Eye Care Service
                        </span>
                        <h1 className="text-white text-4xl md:text-7xl xl:text-8xl font-bold tracking-tight text-center leading-[1.1] drop-shadow-2xl">
                            가장 선명한 순간,<br/>
                            <span className="font-light opacity-90">마이병원과 함께</span>
                        </h1>
                        <p className="mt-8 text-white/70 text-base md:text-xl font-medium tracking-wide text-center max-w-2xl drop-shadow-md">
                            20년 전통의 노하우와 최첨단 장비로<br className="md:hidden"/> 당신의 소중한 눈을 지켜드립니다.
                        </p>
                    </div>
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
        </>
    );
}
