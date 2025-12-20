"use client";

import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

interface NavMenuProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function NavMenu({ isOpen, onClose }: NavMenuProps) {
    const menuItems = [
        { name: "홈", path: "/" },
        { name: "병원 소개", path: "/introduce" },
        { name: "의료진 소개", path: "/introduce/doctors" },
        { name: "진료 안내", path: "/services" },
        { name: "이용 안내", path: "/information" },
        { name: "병원 소식", path: "/news" },
        { name: "온라인 상담", path: "/consultation" },
    ];

    return (
        <div
            className={`fixed inset-0 z-[200] flex justify-end transition-opacity duration-300 ${
                isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
            }`}
        >
            {/* Backdrop (Darkened background) */}
            <div 
                className={`absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${
                    isOpen ? "opacity-100" : "opacity-0"
                }`} 
                onClick={onClose}
            />

            {/* Menu Container (Slide from right) */}
            <div
                className={`relative w-full md:w-[400px] h-full bg-white/95 shadow-2xl flex flex-col items-center justify-center transform transition-transform duration-500 ease-out ${
                    isOpen ? "translate-x-0" : "translate-x-full"
                }`}
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 text-[#191F28]/70 hover:text-[#00B8FF] transition-all duration-300 hover:rotate-90"
                    aria-label="Close menu"
                >
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="stroke-current">
                        <path d="M18 6L6 18M6 6L18 18" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </button>

                {/* Navigation Links */}
                <nav className="flex flex-col space-y-8 text-center">
                    {menuItems.map((item, index) => (
                        <Link
                            key={index}
                            href={item.path}
                            onClick={onClose}
                            className="group relative text-2xl md:text-4xl font-bold text-[#191F28] transition-all duration-300 hover:text-[#00B8FF]"
                        >
                            <span className="relative z-10">{item.name}</span>
                            {/* Hover Underline Effect */}
                            <span className="absolute left-1/2 bottom-[-8px] w-full h-1 bg-[#00B8FF] transition-transform duration-300 origin-center scale-x-0 -translate-x-1/2 group-hover:scale-x-100"></span>
                        </Link>
                    ))}
                </nav>

                {/* Optional Decorative Element */}
                <div className="absolute bottom-10 text-[#8B95A1] text-sm">
                    My Hospital Project
                </div>
            </div>
        </div>
    );
}
