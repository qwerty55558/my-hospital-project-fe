"use client";

import { useState, useEffect, useCallback, useRef } from "react";
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
    { category: "의료진", title: "김명안 대표원장", path: "/introduce/doctors#doctor-1", icon: faUserDoctor },
    { category: "의료진", title: "이시력 원장 (시력교정 센터)", path: "/introduce/doctors#doctor-2", icon: faUserDoctor },
    { category: "의료진", title: "박소아 원장 (소아안과)", path: "/introduce/doctors#doctor-3", icon: faUserDoctor },
    { category: "의료진", title: "최망막 원장 (망막/백내장)", path: "/introduce/doctors#doctor-4", icon: faUserDoctor },
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

// 해시 스크롤 유틸 함수
const scrollToHash = (hash: string, offset: number = 128) => {
    setTimeout(() => {
        const element = document.getElementById(hash);
        if (element) {
            const top = element.getBoundingClientRect().top + window.scrollY - offset;
            window.scrollTo({ top, behavior: 'smooth' });
        }
    }, 300);
};

import { motion, AnimatePresence } from "framer-motion";

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
    const [searchText, setSearchText] = useState("");
    const [filteredResults, setFilteredResults] = useState(SEARCH_DATA);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const router = useRouter();
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const lastKeyTimestamp = useRef<number>(0);

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

    // Ensure selected item is visible in scroll container
    useEffect(() => {
        if (scrollContainerRef.current) {
            const container = scrollContainerRef.current;
            const selectedElement = container.querySelector(`[data-index="${selectedIndex}"]`);
            if (selectedElement) {
                selectedElement.scrollIntoView({
                    block: "nearest",
                    behavior: "smooth"
                });
            }
        }
    }, [selectedIndex]);

    const handleNavigate = useCallback((path: string) => {
        onClose();
        setSearchText("");

        if (path.includes("#")) {
            const [basePath, hash] = path.split("#");
            const currentPath = window.location.pathname;
            
            if (currentPath === basePath) {
                // 같은 페이지면 바로 스크롤
                scrollToHash(hash);
            } else {
                // 다른 페이지면 이동 후 스크롤
                router.push(path);
                scrollToHash(hash);
            }
        } else {
            router.push(path);
        }
    }, [router, onClose]);

    // 키보드 이벤트 처리
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();

            const now = Date.now();
            const isArrowKey = e.key === "ArrowDown" || e.key === "ArrowUp";

            // Throttle arrow keys (0.2s)
            if (isArrowKey && now - lastKeyTimestamp.current < 200) {
                e.preventDefault();
                return;
            }

            if (filteredResults.length > 0) {
                if (e.key === "ArrowDown") {
                    e.preventDefault();
                    lastKeyTimestamp.current = now;
                    setSelectedIndex(prev => (prev + 1) % filteredResults.length);
                } else if (e.key === "ArrowUp") {
                    e.preventDefault();
                    lastKeyTimestamp.current = now;
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

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[300] flex items-start justify-center pt-24 px-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                        onClick={onClose}
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: -20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -20 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        className="relative w-full max-w-2xl bg-white rounded-xl shadow-2xl overflow-hidden"
                    >

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
                        <div
                            ref={scrollContainerRef}
                            className="max-h-[60vh] overflow-y-auto p-2 bg-[#F9FAFB] scroll-smooth"
                        >
                            {filteredResults.length > 0 ? (
                                <>
                                    <div className="px-3 py-2 text-xs font-bold text-gray-400 uppercase tracking-wider">
                                        {searchText ? "검색 결과" : "추천 검색어"}
                                    </div>
                                    <div className="flex flex-col space-y-1 relative">
                                        {filteredResults.map((item, index) => (
                                            <motion.div
                                                key={index}
                                                layout
                                                data-index={index}
                                                onClick={() => handleNavigate(item.path)}
                                                onMouseEnter={() => setSelectedIndex(index)}
                                                className="group flex items-center justify-between p-3 rounded-lg relative cursor-pointer z-10"
                                            >
                                                {/* Animated Background Highlight */}
                                                {selectedIndex === index && (
                                                    <motion.div
                                                        layoutId="search-highlight"
                                                        className="absolute inset-0 bg-blue-50 rounded-lg -z-10"
                                                        transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
                                                    />
                                                )}

                                                <div className="flex items-center gap-4">
                                                    <motion.div
                                                        animate={{
                                                            backgroundColor: selectedIndex === index ? "#FFFFFF" : "#F3F4F6",
                                                            color: selectedIndex === index ? "#00B8FF" : "#9CA3AF"
                                                        }}
                                                        className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors shadow-sm"
                                                    >
                                                        <FontAwesomeIcon icon={item.icon} />
                                                    </motion.div>
                                                    <div>
                                                        <motion.div
                                                            animate={{ color: selectedIndex === index ? "#00B8FF" : "#191F28" }}
                                                            className="font-semibold"
                                                        >
                                                            {item.title}
                                                        </motion.div>
                                                        <motion.div
                                                            animate={{ color: selectedIndex === index ? "#3b82f6" : "#8B95A1" }}
                                                            className="text-xs"
                                                        >
                                                            {item.category}
                                                        </motion.div>
                                                    </div>
                                                </div>
                                                <motion.div
                                                    animate={{
                                                        color: selectedIndex === index ? "#00B8FF" : "#D1D5DB",
                                                        x: selectedIndex === index ? 4 : 0
                                                    }}
                                                >
                                                    <FontAwesomeIcon icon={faChevronRight} className="text-sm" />
                                                </motion.div>
                                            </motion.div>
                                        ))}
                                    </div>
                                </>
                            ) : (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="py-12 text-center text-gray-400"
                                >
                                    <FontAwesomeIcon icon={faMagnifyingGlass} className="text-4xl mb-4 opacity-20" />
                                    <p>"{searchText}"에 대한 검색 결과가 없습니다.</p>
                                </motion.div>
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
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}

