'use client';

import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faHospital, 
    faMicroscope, 
    faChair, 
    faShieldVirus,
    faHandSparkles,
    faCheck
} from '@fortawesome/free-solid-svg-icons';

const facilities = [
    {
        title: '정밀 검사실',
        icon: faMicroscope,
        description: '0.1mm의 오차도 허용하지 않는 대학병원급 최첨단 정밀 검사 장비를 통해 정확한 눈 상태를 진단합니다.',
        features: ['최신형 OCT (안구 광학 단층 촬영기)', '각막 지형도 검사기', '안압 및 굴절 검사기'],
        image: 'https://images.unsplash.com/photo-1581056771107-24ca5f033842?q=80&w=2070&auto=format&fit=crop'
    },
    {
        title: '청결 수술실',
        icon: faShieldVirus,
        description: '헤파필터 공조 시스템을 통한 무균 상태를 유지하며, 엄격한 감염 관리 원칙을 준수합니다.',
        features: ['3중 멸균 시스템', '실시간 모니터링 장비', '독립형 수술 전용 층'],
        image: 'https://images.unsplash.com/photo-1551076805-e1869033e561?q=80&w=2070&auto=format&fit=crop'
    },
    {
        title: '프라이빗 라운지',
        icon: faChair,
        description: '환자와 보호자가 긴장하지 않고 편안하게 머무르실 수 있도록 호텔급 휴게 공간을 제공합니다.',
        features: ['개별 회복실', '프리미엄 카페테리아', '무선 인터넷 및 충전 서비스'],
        image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=2070&auto=format&fit=crop'
    },
    {
        title: '원내 조제실',
        icon: faHandSparkles,
        description: '전문의의 처방에 따라 신속하고 정확하게 안과 전문 의약품을 조제 및 안내해 드립니다.',
        features: ['체계적인 약품 관리', '복약 지도 서비스', '청결 조제 시스템'],
        image: 'https://images.unsplash.com/photo-1586015555751-63bb77f4322a?q=80&w=2070&auto=format&fit=crop'
    }
];

export default function Page() {
    return (
        <div className="pt-48 pb-24 px-6 max-w-7xl mx-auto min-h-screen">
            {/* Header */}
            <div className="mb-20 text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-blue-600 font-bold text-sm mb-6"
                >
                    <FontAwesomeIcon icon={faHospital} />
                    <span>HOSPITAL FACILITIES</span>
                </motion.div>
                <motion.h1 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-4xl md:text-6xl font-bold mb-8 text-[#191F28] tracking-tight"
                >
                    최상의 진료를 위한<br />
                    <span className="text-blue-600">프리미엄 시설</span>
                </motion.h1>
                <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-lg text-gray-500 max-w-2xl mx-auto"
                >
                    단순한 공간을 넘어 환자의 안전과 편안함을 최우선으로 설계되었습니다. <br />
                    신뢰할 수 있는 환경에서 최상의 의료 서비스를 경험하세요.
                </motion.p>
            </div>

            {/* Facilities Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-20">
                {facilities.map((item, index) => (
                    <motion.div 
                        key={index}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: (index % 2) * 0.1 }}
                        className="flex flex-col group"
                    >
                        <div className="relative aspect-[16/9] rounded-[2.5rem] overflow-hidden mb-8 shadow-xl shadow-gray-200/50">
                            <img 
                                src={item.image} 
                                alt={item.title} 
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                            <div className="absolute bottom-6 left-8">
                                <div className="w-12 h-12 bg-white/90 backdrop-blur rounded-2xl flex items-center justify-center text-blue-600 shadow-lg">
                                    <FontAwesomeIcon icon={item.icon} className="text-xl" />
                                </div>
                            </div>
                        </div>
                        
                        <h3 className="text-2xl font-bold text-[#191F28] mb-4 flex items-center gap-3">
                            {item.title}
                            <div className="h-px flex-1 bg-gray-100 mt-1" />
                        </h3>
                        
                        <p className="text-gray-500 leading-relaxed mb-8">
                            {item.description}
                        </p>
                        
                        <ul className="grid grid-cols-1 gap-3">
                            {item.features.map((feature, i) => (
                                <li key={i} className="flex items-center gap-3 text-sm font-semibold text-[#4E5968]">
                                    <div className="w-5 h-5 rounded-full bg-blue-50 flex items-center justify-center text-[10px] text-blue-500">
                                        <FontAwesomeIcon icon={faCheck} />
                                    </div>
                                    {feature}
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                ))}
            </div>

            {/* Clean Environment Section */}
            <motion.div 
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mt-32 bg-[#F9FAFB] rounded-[3rem] p-12 md:p-20 text-center border border-gray-100"
            >
                <h2 className="text-3xl md:text-4xl font-bold text-[#191F28] mb-8">
                    365일 철저한 위생 관리 시스템
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
                    {[
                        { label: '매일 상시 방역', icon: '✨' },
                        { label: '무균 공조 시스템', icon: '🌬️' },
                        { label: '1인 1기구 원칙', icon: '🏥' },
                        { label: '멸균 포장 관리', icon: '📦' }
                    ].map((item, idx) => (
                        <div key={idx} className="flex flex-col items-center gap-3">
                            <span className="text-4xl mb-2">{item.icon}</span>
                            <span className="text-sm font-bold text-[#4E5968]">{item.label}</span>
                        </div>
                    ))}
                </div>
            </motion.div>
        </div>
    );
}
