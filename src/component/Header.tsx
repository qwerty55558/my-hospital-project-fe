"use client";

import { useState, useEffect } from "react";
import NavMenu from "@/component/NavMenu";
import Logo from "@/component/Logo";
import SearchModal from "@/component/SearchModal";
import { HamburgerIcon, SearchIcon } from "@/component/HeaderIcons";
import { motion } from "framer-motion";

// easeInOut 트랜지션 설정
const easeTransition = {
    type: "tween" as const,
    ease: "easeInOut" as const,
    duration: 0.25,
};

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [shortcutSymbol, setShortcutSymbol] = useState("Ctrl");

    useEffect(() => {
        // Detect OS for shortcut hint
        if (typeof window !== "undefined") {
            const isMac = /Mac|iPod|iPhone|iPad/.test(navigator.platform);
            setShortcutSymbol(isMac ? "⌘" : "Ctrl");
        }

        const handleGlobalKeyDown = (e: KeyboardEvent) => {
            if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'f') {
                e.preventDefault();
                setIsSearchOpen(true);
            }
        };

        window.addEventListener("keydown", handleGlobalKeyDown);
        return () => window.removeEventListener("keydown", handleGlobalKeyDown);
    }, []);

    return (
        <>
            <motion.div 
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ ...easeTransition, duration: 0.4 }}
                className="flex justify-between items-center px-6 md:px-12 py-4 bg-white/70 backdrop-blur-md border-b border-white/20 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07)] fixed top-0 left-0 right-0 select-none z-[100]"
            >
                <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={easeTransition}
                >
                    <Logo className="w-[50px] h-[50px] cursor-pointer drop-shadow-md" />
                </motion.div>
                <div>
                </div>
                <div className="flex items-center">
                    {/* Search Group: 단축키 뱃지 + 돋보기 (가깝게) */}
                    <div className="flex items-center gap-2">
                        <motion.div 
                            whileHover={{ scale: 1.1, backgroundColor: "#00B8FF" }}
                            whileTap={{ scale: 0.95 }}
                            transition={easeTransition}
                            className="hidden md:flex px-2 py-1 rounded-md text-[10px] font-bold text-white bg-[#191F28] cursor-pointer"
                            onClick={() => setIsSearchOpen(true)}
                        >
                            <span className="opacity-80 mr-1">{shortcutSymbol}</span>
                            <span className="opacity-80 mr-1">+</span>
                            <span className="opacity-80">F</span>
                        </motion.div>
                        <motion.div
                            whileHover={{ scale: 1.1, color: "#00B8FF" }}
                            whileTap={{ scale: 0.95 }}
                            transition={easeTransition}
                            onClick={() => setIsSearchOpen(true)}
                            className="text-[#191F28] "
                        >
                            <SearchIcon className="w-7 h-7 md:w-8 md:h-8  cursor-pointer" />
                        </motion.div>
                    </div>

                    {/* 구분선 */}
                    <div className="w-px h-6 bg-gray-200 mx-5" />

                    {/* Hamburger Icon (떨어져서) */}
                    <motion.div
                        whileHover={{ scale: 1.1, color: "#00B8FF" }}
                        whileTap={{ scale: 0.95 }}
                        transition={easeTransition}
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="text-[#191F28] z-[300] relative"
                    >
                        <HamburgerIcon className="w-7 h-7 md:w-8 md:h-8  cursor-pointer" />
                    </motion.div>
                </div>
            </motion.div>
            <NavMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
            <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
        </>
    );
}
