'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faHandHoldingHeart,
    faLaptopMedical
} from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion';
import { SERVICES } from '@/data/services';

export default function Page() {
    return (
        <div className="pt-48 pb-24 px-6 max-w-6xl mx-auto min-h-screen">
            {/* Header Section */}
            <div className="mb-16 text-center">
                <motion.span 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="inline-block px-4 py-1.5 mb-4 text-sm font-bold tracking-wider text-blue-600 bg-blue-50 rounded-full"
                >
                    MEDICAL SERVICES
                </motion.span>
                <motion.h1 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-4xl md:text-5xl font-bold mb-6 text-[#191F28] tracking-tight"
                >
                    진료 안내
                </motion.h1>
                <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed"
                >
                    환자 한 분 한 분의 눈 건강을 위해 최첨단 장비와 <br className="hidden md:block" />
                    숙련된 전문의가 정성을 다해 진료합니다.
                </motion.p>
            </div>

            {/* Service Categories Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
                {SERVICES.map((service, index) => (
                    <motion.div
                        key={service.id}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0, boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)" }}
                        whileHover={{ y: -8, boxShadow: "0 25px 50px -12px rgb(0 0 0 / 0.15)" }}
                        transition={{ 
                            delay: index * 0.1 + 0.3, 
                            duration: 0.4,
                            y: { type: "spring", stiffness: 200, damping: 25 },
                            boxShadow: { duration: 0.3 }
                        }}
                        className="bg-white border border-gray-100 p-8 rounded-3xl"
                    >
                        <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mb-6">
                            <FontAwesomeIcon icon={service.icon} className="text-2xl text-blue-600" />
                        </div>
                        <h3 className="text-2xl font-bold mb-4 text-[#191F28]">{service.title}</h3>
                        <p className="text-gray-600 mb-8 leading-relaxed text-sm">
                            {service.description}
                        </p>
                        <ul className="space-y-3">
                            {service.items.map((item, i) => (
                                <li key={i} className="flex items-center text-gray-700 font-medium group">
                                    <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-3" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                ))}
            </div>

            {/* Philosophy Section */}
            <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6 }}
                className="bg-[#191F28] rounded-[40px] p-10 md:p-16 text-white relative overflow-hidden"
            >
                <div className="relative z-10 flex flex-col md:flex-row items-center gap-12">
                    <div className="flex-1">
                        <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">
                            더 선명하고 건강한 세상을 위해 <br />
                            <span className="text-blue-400">당신의 눈에만 집중합니다.</span>
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-10">
                            <div className="flex gap-4">
                                <div className="text-blue-400 text-xl"><FontAwesomeIcon icon={faHandHoldingHeart} /></div>
                                <div>
                                    <h4 className="font-bold mb-1">환자 중심 진료</h4>
                                    <p className="text-sm text-gray-400">과잉 진료 없이 꼭 필요한 처방만을 제안합니다.</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="text-blue-400 text-xl"><FontAwesomeIcon icon={faLaptopMedical} /></div>
                                <div>
                                    <h4 className="font-bold mb-1">최첨단 의료 장비</h4>
                                    <p className="text-sm text-gray-400">정확한 진단을 위한 최신형 안과 전문 장비를 보유하고 있습니다.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full md:w-1/3 aspect-square bg-blue-900/30 rounded-full blur-3xl absolute -right-20 -bottom-20" />
                </div>
            </motion.div>

        </div>
    );
}
