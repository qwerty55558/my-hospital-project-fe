"use client";

import Image from "next/image";

export default function IntroducePage() {
    return (
        <div className="bg-white min-h-screen">
            {/* 1. Hero Section */}
            <section className="relative h-[80vh] flex items-center justify-center overflow-hidden bg-[#191F28]">
                <div className="absolute inset-0 opacity-40">
                    <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-[#191F28]" />
                    {/* 여기에 병원 전경이나 상징적인 이미지를 배치할 수 있습니다. */}
                    <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=2053&auto=format&fit=crop')] bg-cover bg-center" />
                </div>
                
                <div className="relative z-10 max-w-7xl mx-auto px-6 text-center animate-in fade-in slide-in-from-bottom-10 duration-1000">
                    <span className="text-[#00B8FF] font-bold tracking-[0.3em] uppercase mb-6 block text-sm md:text-base">
                        About My Hospital
                    </span>
                    <h1 className="text-white text-5xl md:text-8xl font-bold tracking-tight leading-[1.1] mb-8">
                        기술을 넘어,<br/>
                        <span className="text-white/80">진심으로 닿는 의료</span>
                    </h1>
                </div>
            </section>

            {/* 2. Mission Section */}
            <section className="py-32 px-6 bg-white">
                <div className="max-w-5xl mx-auto">
                    <div className="flex flex-col md:flex-row gap-16 items-start">
                        <div className="flex-1">
                            <h2 className="text-[#191F28] text-4xl md:text-6xl font-bold leading-tight">
                                우리는 더 맑은<br/>세상을 위해<br/>존재합니다.
                            </h2>
                        </div>
                        <div className="flex-1 space-y-8 pt-4">
                            <p className="text-xl md:text-2xl text-[#4E5968] leading-relaxed font-light">
                                마이병원은 2005년 작은 진료실에서 시작되었습니다. 
                                단순한 치료를 넘어, 환자가 다시 마주할 선명한 세상을 위해 
                                우리는 매일 혁신하고 끊임없이 연구합니다.
                            </p>
                            <p className="text-lg text-[#8B95A1] leading-relaxed">
                                최첨단 의료 기술과 인간 중심의 따뜻한 돌봄이 만나는 곳. 
                                마이병원은 대한민국 안과 의료의 새로운 기준을 제시합니다.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. Core Values Section */}
            <section className="py-32 px-6 bg-[#F9FAFB]">
                <div className="max-w-7xl mx-auto">
                    <div className="mb-20">
                        <span className="text-[#00B8FF] font-bold tracking-widest uppercase text-sm mb-4 block">Core Values</span>
                        <h2 className="text-4xl md:text-5xl font-bold text-[#191F28]">우리가 지키는 원칙</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                title: "Patient First",
                                desc: "모든 결정의 중심은 환자입니다. 우리는 환자의 입장에서 생각하고 공감합니다.",
                                color: "bg-white"
                            },
                            {
                                title: "Excellence",
                                desc: "0.1mm의 오차도 허용하지 않는 정밀함으로 최상의 수술 결과를 보장합니다.",
                                color: "bg-white"
                            },
                            {
                                title: "Integrity",
                                desc: "과잉 진료 없는 정직한 진료, 투명한 소통으로 환자의 신뢰에 보답합니다.",
                                color: "bg-white"
                            }
                        ].map((value, idx) => (
                            <div key={idx} className={`${value.color} p-12 rounded-3xl shadow-sm border border-gray-100 transition-transform hover:-translate-y-2 duration-300`}>
                                <span className="text-[#00B8FF] text-5xl font-black opacity-10 mb-6 block">{`0${idx + 1}`}</span>
                                <h3 className="text-2xl font-bold text-[#191F28] mb-4">{value.title}</h3>
                                <p className="text-[#4E5968] leading-relaxed">{value.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 4. Vision Section */}
            <section className="py-40 px-6 bg-white overflow-hidden relative">
                <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
                    <div className="relative">
                        <div className="absolute -top-20 -left-20 w-64 h-64 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob" />
                        <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-cyan-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000" />
                        
                        <h2 className="text-5xl md:text-8xl font-bold text-[#191F28] mb-12 tracking-tighter">
                            Vision 2030:<br/>Global Standard
                        </h2>
                    </div>
                    <p className="text-xl md:text-2xl text-[#4E5968] max-w-3xl leading-relaxed font-light">
                        우리는 국내를 넘어 아시아 최고의 안과 전문 병원으로 도약합니다. 
                        데이터 기반의 정밀 의료 시스템을 통해 전 세계 환자들에게 
                        가장 선명한 빛을 선물하는 글로벌 의료 파트너가 되겠습니다.
                    </p>
                    
                    <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-12 w-full max-w-4xl">
                        {[
                            { label: "누적 환자 수", value: "150,000+" },
                            { label: "수술 성공률", value: "99.8%" },
                            { label: "보유 전문의", value: "12" },
                            { label: "설립 연도", value: "2005" }
                        ].map((stat, idx) => (
                            <div key={idx} className="flex flex-col items-center">
                                <span className="text-3xl md:text-4xl font-bold text-[#00B8FF] mb-2">{stat.value}</span>
                                <span className="text-sm text-[#8B95A1] font-medium">{stat.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 5. CTA Section */}
            <section className="py-32 px-6 bg-[#191F28] text-center">
                <h2 className="text-white text-3xl md:text-4xl font-bold mb-10">당신의 건강한 눈, 마이병원이 함께합니다</h2>
                <div className="flex justify-center gap-4">
                    <button className="bg-[#00B8FF] text-white px-10 py-4 rounded-full font-bold hover:bg-[#0096D1] transition-all">
                        온라인 상담하기
                    </button>
                    <button className="border border-white/30 text-white px-10 py-4 rounded-full font-bold hover:bg-white/10 transition-all">
                        오시는 길
                    </button>
                </div>
            </section>
        </div>
    );
}
