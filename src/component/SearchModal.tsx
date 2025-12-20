"use client";

import { useState, useEffect, useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faTimes, faChevronRight, faUserDoctor, faStethoscope, faBullhorn } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface SearchModalProps {
    isOpen: boolean;
    onClose: () => void;
}

// 더미 데이터 (실제로는 API 연동 필요)
const SEARCH_DATA = [
    { category: "병원소개", title: "병원 소개", path: "/introduce", icon: faBullhorn },
    { category: "의료진", title: "김명안 대표원장", path: "/introduce/doctors#kim-myeongan", icon: faUserDoctor },
    { category: "의료진", title: "이시력 원장 (시력교정 센터)", path: "/introduce/doctors#lee-siryeok", icon: faUserDoctor },
    { category: "의료진", title: "박소아 원장 (소아안과)", path: "/introduce/doctors#park-soa", icon: faUserDoctor },
    { category: "의료진", title: "최망막 원장 (망막/백내장)", path: "/introduce/doctors#choi-mangmak", icon: faUserDoctor },
    { category: "시설안내", title: "병원 시설 소개", path: "/introduce/facility", icon: faStethoscope },
    { category: "진료안내", title: "스마일 라식/라섹", path: "/services", icon: faStethoscope },
    { category: "진료안내", title: "백내장 수술 클리닉", path: "/services", icon: faStethoscope },
    { category: "진료안내", title: "소아 사시/약시 교정", path: "/services", icon: faStethoscope },
    { category: "진료안내", title: "안구건조증 집중 치료", path: "/services", icon: faStethoscope },
    { category: "이용안내", title: "예약 및 주차 안내", path: "/information", icon: faBullhorn },
    { category: "소식", title: "진료 시간 변경 안내", path: "/news", icon: faBullhorn },
    { category: "소식", title: "여름방학 맞이 시력 검진 이벤트", path: "/news", icon: faBullhorn },
    { category: "상담", title: "온라인 상담 신청", path: "/consultation", icon: faStethoscope },
];

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
    const [searchText, setSearchText] = useState("");
    const [filteredResults, setFilteredResults] = useState(SEARCH_DATA);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const router = useRouter();

    // 검색어 필터링 및 인덱스 초기화
    useEffect(() => {
        if (searchText.trim() === "") {
            setFilteredResults(SEARCH_DATA);
        } else {
            const lowerText = searchText.toLowerCase();
            const filtered = SEARCH_DATA.filter(item => 
                item.title.toLowerCase().includes(lowerText) || 
                item.category.toLowerCase().includes(lowerText)
            );
            setFilteredResults(filtered);
        }
        setSelectedIndex(0);
    }, [searchText]);

    const handleNavigate = useCallback((path: string) => {
        onClose();
        setSearchText("");
        
        // Next.js router.push often fails to trigger anchor scrolls on the same page.
        // Using window.location.href ensures the browser handles the hash jump and scroll.
        if (path.includes("#")) {
            window.location.href = path;
        } else {
            router.push(path);
        }
    }, [router, onClose]);

    // 키보드 이벤트 처리
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
            
            if (filteredResults.length > 0) {
                if (e.key === "ArrowDown") {
                    e.preventDefault();
                    setSelectedIndex(prev => (prev + 1) % filteredResults.length);
                } else if (e.key === "ArrowUp") {
                    e.preventDefault();
                    setSelectedIndex(prev => (prev - 1 + filteredResults.length) % filteredResults.length);
                } else if (e.key === "Enter") {
                    e.preventDefault();
                    handleNavigate(filteredResults[selectedIndex].path);
                }
            }
        };

        if (isOpen) {
            window.addEventListener("keydown", handleKeyDown);
            document.body.style.overflow = "hidden";
        }
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            document.body.style.overflow = "unset";
        };
    }, [isOpen, onClose, filteredResults, selectedIndex, handleNavigate]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[300] flex items-start justify-center pt-24 px-4">
            {/* Backdrop */}
            <div 
                className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity" 
                onClick={onClose}
            />

            {/* Modal Content */}
            <div className="relative w-full max-w-2xl bg-white rounded-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                
                {/* Search Input Header */}
                <div className="flex items-center border-b border-gray-100 p-4">
                    <FontAwesomeIcon icon={faMagnifyingGlass} className="text-gray-400 text-xl ml-2" />
                    <input 
                        type="text" 
                        placeholder="무엇을 찾고 계신가요?" 
                        className="w-full text-xl p-3 pl-4 outline-none text-[#191F28] placeholder-gray-300 font-medium bg-transparent"
                        autoFocus
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                    />
                    <button 
                        onClick={onClose}
                        className="p-2 text-gray-400 hover:text-[#00B8FF] transition-colors bg-gray-50 rounded-md text-sm font-semibold px-3"
                    >
                        ESC
                    </button>
                </div>

                {/* Search Results List */}
                <div className="max-h-[60vh] overflow-y-auto p-2 bg-[#F9FAFB]">
                    {filteredResults.length > 0 ? (
                        <>
                            <div className="px-3 py-2 text-xs font-bold text-gray-400 uppercase tracking-wider">
                                {searchText ? "검색 결과" : "추천 검색어"}
                            </div>
                            <div className="flex flex-col space-y-1">
                                {filteredResults.map((item, index) => (
                                    <div 
                                        key={index} 
                                        onClick={() => handleNavigate(item.path)}
                                        onMouseEnter={() => setSelectedIndex(index)}
                                        className={`group flex items-center justify-between p-3 rounded-lg transition-colors duration-200 cursor-pointer ${
                                            selectedIndex === index ? "bg-blue-50" : "hover:bg-gray-50"
                                        }`}
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                                                selectedIndex === index ? "bg-white text-[#00B8FF]" : "bg-gray-100 text-gray-400"
                                            }`}>
                                                <FontAwesomeIcon icon={item.icon} />
                                            </div>
                                            <div>
                                                <div className={`font-semibold transition-colors ${
                                                    selectedIndex === index ? "text-[#00B8FF]" : "text-[#191F28]"
                                                }`}>
                                                    {item.title}
                                                </div>
                                                <div className={`text-xs transition-colors ${
                                                    selectedIndex === index ? "text-blue-400" : "text-gray-400"
                                                }`}>
                                                    {item.category}
                                                </div>
                                            </div>
                                        </div>
                                        <FontAwesomeIcon 
                                            icon={faChevronRight} 
                                            className={`text-sm transition-all ${
                                                selectedIndex === index ? "text-[#00B8FF] translate-x-1" : "text-gray-300"
                                            }`} 
                                        />
                                    </div>
                                ))}
                            </div>
                        </>
                    ) : (
                        <div className="py-12 text-center text-gray-400">
                            <FontAwesomeIcon icon={faMagnifyingGlass} className="text-4xl mb-4 opacity-20" />
                            <p>"{searchText}"에 대한 검색 결과가 없습니다.</p>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="bg-gray-50 border-t border-gray-100 p-3 px-5 flex items-center justify-between text-xs text-gray-400">
                    <div className="flex gap-4">
                        <span><span className="font-bold border border-gray-300 rounded px-1 bg-white">↑</span> <span className="font-bold border border-gray-300 rounded px-1 bg-white">↓</span> 이동</span>
                        <span><span className="font-bold border border-gray-300 rounded px-1 bg-white">Enter</span> 선택</span>
                    </div>
                    <span>My Hospital Project</span>
                </div>
            </div>
        </div>
    );
}

