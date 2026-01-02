"use client";

import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
    faMagnifyingGlass, 
    faChevronRight, 
    faUserDoctor, 
    faStethoscope, 
    faNewspaper,
    faBuilding,
    faInfoCircle,
    faComments,
    IconDefinition
} from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useRepresentativeDoctors } from "@/hooks/useDoctors";
import { usePosts } from "@/hooks/usePosts";
import { CATEGORY_CONFIG } from "@/types/post";

interface SearchModalProps {
    isOpen: boolean;
    onClose: () => void;
}

interface SearchItem {
    category: string;
    title: string;
    path: string;
    icon: IconDefinition;
    description?: string;
}

// 고정 메뉴 데이터
const STATIC_MENU: SearchItem[] = [
    { category: "메뉴", title: "병원 소개", path: "/introduce", icon: faBuilding },
    { category: "메뉴", title: "시설 안내", path: "/introduce/facility", icon: faBuilding },
    { category: "메뉴", title: "의료진 소개", path: "/introduce/doctors", icon: faUserDoctor },
    { category: "메뉴", title: "진료 안내", path: "/services", icon: faStethoscope },
    { category: "메뉴", title: "이용 안내", path: "/information", icon: faInfoCircle },
    { category: "메뉴", title: "병원 소식", path: "/news", icon: faNewspaper },
    { category: "메뉴", title: "온라인 상담", path: "/consultation", icon: faComments },
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

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
    const [searchText, setSearchText] = useState("");
    const [selectedIndex, setSelectedIndex] = useState(0);
    const router = useRouter();
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const lastKeyTimestamp = useRef<number>(0);
    const inputRef = useRef<HTMLInputElement>(null);

    // API 데이터 가져오기
    const { doctors } = useRepresentativeDoctors();
    const { posts } = usePosts();

    // 동적 검색 데이터 생성
    const searchData = useMemo<SearchItem[]>(() => {
        const items: SearchItem[] = [...STATIC_MENU];

        // 의료진 데이터 추가
        doctors.forEach((doctor) => {
            items.push({
                category: "의료진",
                title: `${doctor.name} ${doctor.role}`,
                path: `/introduce/doctors#doctor-${doctor.id}`,
                icon: faUserDoctor,
                description: doctor.specialty,
            });
        });

        // 게시글 데이터 추가
        posts
            .filter((post) => post.isPublished)
            .forEach((post) => {
                const categoryInfo = CATEGORY_CONFIG[post.category];
                items.push({
                    category: categoryInfo?.label || post.category,
                    title: post.title,
                    path: `/news/${post.id}`,
                    icon: categoryInfo?.icon || faNewspaper,
                    description: post.summary || undefined,
                });
            });

        return items;
    }, [doctors, posts]);

    // 검색 필터링
    const filteredResults = useMemo(() => {
        if (searchText.trim() === "") {
            // 검색어 없으면 메뉴 + 최근 게시글 일부만
            return [
                ...STATIC_MENU,
                ...searchData
                    .filter((item) => item.category !== "메뉴")
                    .slice(0, 5),
            ];
        }

        const lowerText = searchText.toLowerCase();
        return searchData.filter(
            (item) =>
                item.title.toLowerCase().includes(lowerText) ||
                item.category.toLowerCase().includes(lowerText) ||
                item.description?.toLowerCase().includes(lowerText)
        );
    }, [searchText, searchData]);

    // 검색어 변경 시 인덱스 초기화
    useEffect(() => {
        setSelectedIndex(0);
    }, [searchText]);

    // 모달 열릴 때 포커스
    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
        }
        if (!isOpen) {
            setSearchText("");
        }
    }, [isOpen]);

    // 선택된 아이템 스크롤
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
                scrollToHash(hash);
            } else {
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

            if (isArrowKey && now - lastKeyTimestamp.current < 100) {
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

    // easeInOut 트랜지션
    const easeTransition = {
        type: "tween" as const,
        ease: "easeInOut" as const,
        duration: 0.2,
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[300] flex items-start justify-center pt-24 px-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={easeTransition}
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
                                ref={inputRef}
                                type="text"
                                placeholder="의료진, 게시글, 메뉴 검색..."
                                className="w-full text-xl p-3 pl-4 outline-none text-[#191F28] placeholder-gray-300 font-medium bg-transparent"
                                value={searchText}
                                onChange={(e) => setSearchText(e.target.value)}
                            />
                            <button
                                onClick={onClose}
                                className="p-2 text-gray-400 hover:text-[#00B8FF] transition-colors duration-200 bg-gray-50 rounded-md text-sm font-semibold px-3"
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
                                        {searchText ? `"${searchText}" 검색 결과 (${filteredResults.length})` : "바로가기"}
                                    </div>
                                    <div className="flex flex-col space-y-1 relative">
                                        {filteredResults.map((item, index) => (
                                            <motion.div
                                                key={`${item.path}-${index}`}
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
                                                        transition={{ type: "spring", bounce: 0.15, duration: 0.3 }}
                                                    />
                                                )}

                                                <div className="flex items-center gap-4 min-w-0 flex-1">
                                                    <motion.div
                                                        animate={{
                                                            backgroundColor: selectedIndex === index ? "#FFFFFF" : "#F3F4F6",
                                                            color: selectedIndex === index ? "#00B8FF" : "#9CA3AF"
                                                        }}
                                                        transition={easeTransition}
                                                        className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 shadow-sm"
                                                    >
                                                        <FontAwesomeIcon icon={item.icon} className="text-sm" />
                                                    </motion.div>
                                                    <div className="min-w-0 flex-1">
                                                        <motion.div
                                                            animate={{ color: selectedIndex === index ? "#00B8FF" : "#191F28" }}
                                                            transition={easeTransition}
                                                            className="font-semibold truncate"
                                                        >
                                                            {item.title}
                                                        </motion.div>
                                                        <div className="flex items-center gap-2 text-xs text-[#8B95A1]">
                                                            <span>{item.category}</span>
                                                            {item.description && (
                                                                <>
                                                                    <span>·</span>
                                                                    <span className="truncate">{item.description}</span>
                                                                </>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                                <motion.div
                                                    animate={{
                                                        color: selectedIndex === index ? "#00B8FF" : "#D1D5DB",
                                                        x: selectedIndex === index ? 4 : 0
                                                    }}
                                                    transition={easeTransition}
                                                    className="shrink-0 ml-2"
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
