"use client";

import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuoteLeft } from "@fortawesome/free-solid-svg-icons";

const DOCTORS = [
    {
        id: "kim-myeongan",
        name: "김명안",
        role: "대표원장",
        specialty: "Representative Director",
        catchphrase: "20년의 노하우, 빛을 선물합니다.",
        description: "환자분의 눈을 제 눈처럼 생각하며 진료해왔습니다. 대학병원 교수 출신의 풍부한 임상 경험을 바탕으로, 가장 안전하고 정확한 최상의 의료 서비스를 약속드립니다.",
        imageSrc: "/img/profile_doctor-1.jpg",
    },
    {
        id: "lee-siryeok",
        name: "이시력",
        role: "원장",
        specialty: "Vision Correction Center",
        catchphrase: "0.1mm의 오차도 허용하지 않는 정밀함",
        description: "스마일 라식, 라섹 등 시력 교정술은 정밀함이 생명입니다. 최신 장비와 끊임없는 연구로 당신에게 가장 선명한 세상을 찾아드리겠습니다.",
        imageSrc: "/img/profile_doctor-3.jpg",
    },
    {
        id: "park-soa",
        name: "박소아",
        role: "원장",
        specialty: "Pediatric Ophthalmology",
        catchphrase: "우리 아이의 눈, 평생 건강의 시작입니다",
        description: "아이들의 눈은 어른과 다릅니다. 겁 많은 아이들도 웃으며 진료받을 수 있는 따뜻한 진료실. 엄마의 마음으로 꼼꼼하게 살피겠습니다.",
        imageSrc: "/img/profile_doctor-4.jpg",
    },
    {
        id: "choi-mangmak",
        name: "최망막",
        role: "원장",
        specialty: "Retina & Cataract Center",
        catchphrase: "흐릿해진 시야를 다시 맑고 투명하게",
        description: "노안, 백내장은 누구나 겪게 되는 과정입니다. 불편함을 참지 마세요. 제2의 시력 인생을 위한 맞춤형 솔루션을 제시해 드립니다.",
        imageSrc: "/img/profile_doctor-2.jpg",
    },
];

export default function DoctorsPage() {
    return (
        <div className="pt-48 pb-24 bg-white min-h-screen">
            <div className="max-w-7xl mx-auto px-6">
                {/* Header Section */}
                <div className="mb-20 animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <span className="text-[#00B8FF] font-bold tracking-widest uppercase text-sm mb-4 block">Our Professionals</span>
                    <h1 className="text-4xl md:text-6xl font-bold text-[#191F28] mb-6">최고의 의료진이<br/>함께합니다</h1>
                    <p className="text-xl text-[#4E5968] max-w-2xl leading-relaxed">
                        각 분야의 전문의들이 협진하여 환자분들에게 가장 안전하고 정확한 최상의 의료 서비스를 제공합니다.
                    </p>
                </div>

                {/* Doctors Grid */}
                <div className="grid grid-cols-1 gap-24">
                    {DOCTORS.map((doctor, index) => (
                        <div 
                            key={index}
                            id={doctor.id}
                            className={`flex flex-col ${index % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-12 md:gap-20 group scroll-mt-32`}
                        >
                            {/* Image Container */}
                            <div className="w-full md:w-2/5 aspect-[4/5] relative rounded-3xl overflow-hidden shadow-2xl transition-transform duration-500 group-hover:scale-[1.02]">
                                <Image 
                                    src={doctor.imageSrc} 
                                    alt={doctor.name} 
                                    fill 
                                    className="object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#191F28]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            </div>

                            {/* Info Container */}
                            <div className="w-full md:w-3/5 flex flex-col justify-center">
                                <div className="mb-6 flex items-center gap-3">
                                    <span className="bg-[#F2F4F6] text-[#4E5968] px-3 py-1 rounded-full text-sm font-bold uppercase tracking-wider">{doctor.specialty}</span>
                                </div>
                                <h2 className="text-3xl md:text-5xl font-bold text-[#191F28] mb-4 flex items-baseline gap-2">
                                    {doctor.name} <span className="text-xl font-medium text-gray-400">{doctor.role}</span>
                                </h2>
                                <p className="text-[#00B8FF] text-xl md:text-2xl font-bold mb-8 leading-tight">
                                    "{doctor.catchphrase}"
                                </p>
                                
                                <div className="relative">
                                    <FontAwesomeIcon icon={faQuoteLeft} className="absolute -top-6 -left-4 text-4xl text-gray-100 -z-10" />
                                    <p className="text-lg text-[#4E5968] leading-loose mb-10 border-l-4 border-[#00B8FF] pl-6 py-2 italic">
                                        {doctor.description}
                                    </p>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <button className="bg-[#191F28] text-white py-4 rounded-xl font-bold hover:bg-[#333D4B] transition-all">진료 예약하기</button>
                                    <button className="bg-white text-[#191F28] py-4 rounded-xl font-bold border border-[#F2F4F6] hover:bg-gray-50 transition-all">상세 약력보기</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
