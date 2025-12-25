'use client';

import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faComments, faLock, faCheckCircle } from '@fortawesome/free-solid-svg-icons';

export default function Page() {
    return (
        <div className="pt-48 pb-24 px-6 max-w-5xl mx-auto min-h-screen">
            {/* Header */}
            <div className="mb-16">
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

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
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

                        <div>
                            <label className="block text-sm font-bold text-[#191F28] mb-3">상담 분야</label>
                            <select className="w-full p-4 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all appearance-none">
                                <option>상담 분야를 선택하세요</option>
                                <option>시력교정 (라식/라섹)</option>
                                <option>노안/백내장</option>
                                <option>망막/녹내장</option>
                                <option>드림렌즈/기타</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-[#191F28] mb-3">상담 내용</label>
                            <textarea 
                                className="w-full p-4 bg-gray-50 border border-gray-100 rounded-xl h-48 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none" 
                                placeholder="문의하실 내용을 상세히 입력해주세요."
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
        </div>
    );
}
