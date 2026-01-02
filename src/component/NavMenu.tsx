"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

interface NavMenuProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function NavMenu({ isOpen, onClose }: NavMenuProps) {
    const menuItems = [
        { name: "홈", path: "/" },
        { name: "병원 소개", path: "/introduce" },
        { name: "시설 안내", path: "/introduce/facility" },
        { name: "의료진 소개", path: "/introduce/doctors" },
        { name: "진료 안내", path: "/services" },
        { name: "이용 안내", path: "/information" },
        { name: "병원 소식", path: "/news" },
        { name: "온라인 상담", path: "/consultation" },
    ];

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[200] flex justify-end">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                        onClick={onClose}
                    />

                    {/* Menu Container */}
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="relative w-full md:w-[400px] h-full bg-white/95 shadow-2xl flex flex-col items-center justify-center p-12"
                    >
                        {/* Close Button */}
                        <motion.button
                            whileHover={{ rotate: 90 }}
                            onClick={onClose}
                            className="absolute top-6 right-6 text-[#191F28]/70 hover:text-[#00B8FF] transition-colors"
                            aria-label="Close menu"
                        >
                            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="stroke-current">
                                <path d="M18 6L6 18M6 6L18 18" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </motion.button>

                        {/* Navigation Links */}
                        <nav className="flex flex-col space-y-6 text-center w-full">
                            {menuItems.map((item, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.1 + index * 0.05 }}
                                >
                                    <Link
                                        href={item.path}
                                        onClick={onClose}
                                        className="group relative inline-block text-2xl md:text-3xl font-bold text-[#191F28] transition-colors duration-200 hover:text-[#00B8FF]"
                                    >
                                        <span className="relative z-10">{item.name}</span>
                                        <span className="absolute left-1/2 bottom-[-4px] w-full h-1 bg-[#00B8FF] transition-transform duration-300 origin-center scale-x-0 -translate-x-1/2 group-hover:scale-x-100"></span>
                                    </Link>
                                </motion.div>
                            ))}
                        </nav>

                        {/* Optional Decorative Element */}
                        <div className="absolute bottom-10 text-[#8B95A1] text-xs font-medium tracking-widest uppercase">
                            Premium Medical Care
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
