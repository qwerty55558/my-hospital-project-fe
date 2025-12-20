"use client";

import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faInstagram,
    faFacebook,
    faYoutube,
} from "@fortawesome/free-brands-svg-icons";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    const footerLinks = [
        { name: "이용약관", path: "/terms" },
        { name: "개인정보 처리방침", path: "/privacy" },
        { name: "위치정보 이용약관", path: "/location-terms" },
        { name: "환자의 권리와 의무", path: "/patient-rights" },
        { name: "비급여 진료비 안내", path: "/fees" },
    ];

    const socialIcons = [
        { icon: faInstagram, link: "https://instagram.com" },
        { icon: faFacebook, link: "https://facebook.com" },
        { icon: faYoutube, link: "https://youtube.com" },
    ];

    return (
        <footer className="bg-[#F9FAFB] border-t border-[#EEEEEE] py-16 px-6">
            <div className="max-w-7xl mx-auto">
                {/* Upper Section: Socials & App Links */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-8">
                    <div className="flex space-x-6">
                        {socialIcons.map((item, idx) => (
                            <a
                                key={idx}
                                href={item.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[#8B95A1] hover:text-[#4E5968] transition-colors text-2xl"
                            >
                                <FontAwesomeIcon icon={item.icon} />
                            </a>
                        ))}
                    </div>
                    <div className="flex space-x-3">
                        <div className="bg-black text-white px-4 py-2 rounded-lg flex flex-col items-start justify-center cursor-pointer hover:bg-gray-800 transition-all min-w-[140px]">
                            <span className="text-[10px] leading-none opacity-70 mb-1">Download on the</span>
                            <span className="text-sm font-bold leading-none">App Store</span>
                        </div>
                        <div className="bg-black text-white px-4 py-2 rounded-lg flex flex-col items-start justify-center cursor-pointer hover:bg-gray-800 transition-all min-w-[140px]">
                            <span className="text-[10px] leading-none opacity-70 mb-1">Get it on</span>
                            <span className="text-sm font-bold leading-none">Google Play</span>
                        </div>
                    </div>
                </div>

                {/* Middle Section: Policy Links */}
                <div className="flex flex-wrap gap-x-6 gap-y-2 mb-10">
                    {footerLinks.map((link, idx) => (
                        <Link
                            key={idx}
                            href={link.path}
                            className={`text-sm ${link.bold ? "text-[#191F28] font-bold" : "text-[#4E5968]"} hover:underline`}
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>

                {/* Bottom Section: Hospital Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 border-t border-[#EEEEEE] pt-10">
                    <div className="space-y-4">
                        <h2 className="text-lg font-bold text-[#191F28]">마이병원 안과의원</h2>
                        <div className="text-sm text-[#8B95A1] leading-relaxed space-y-1">
                            <p>주소: 서울특별시 강남구 테헤란로 123, 4층 (강남역 12번 출구)</p>
                            <p>대표자: 김명안 | 사업자등록번호: 123-45-67890</p>
                            <p>의료기관 개설신고번호: 제 2025-12345호</p>
                            <p>이메일: help@myhospital.com | 팩스: 02-123-4567</p>
                        </div>
                    </div>

                    <div className="flex flex-col md:items-end justify-between">
                        <div className="text-left md:text-right">
                            <p className="text-sm text-[#4E5968] mb-1 font-medium">고객센터 (예약 및 상담)</p>
                            <p className="text-3xl font-bold text-[#00B8FF]">1588-1234</p>
                            <p className="text-sm text-[#8B95A1] mt-2 font-medium">평일 09:00 ~ 18:00 (점심시간 13:00 ~ 14:00)</p>
                        </div>
                        <p className="text-xs text-[#B0B8C1] mt-8">
                            © {currentYear} My Hospital Project. All rights reserved.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
