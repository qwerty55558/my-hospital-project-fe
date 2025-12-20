"use client";

import style from "@/css/Header.module.css";
import { useState } from "react";
import NavMenu from "@/component/NavMenu";
import Logo from "@/component/Logo";
import SearchModal from "@/component/SearchModal";
import { HamburgerIcon, SearchIcon } from "@/component/HeaderIcons";

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    return (
        <>
            <div className={style.navContainer}>
                <Logo className="w-[50px] h-[50px] cursor-pointer drop-shadow-md" />
                <div>
                </div>
                <div className="flex items-center">
                    <SearchIcon
                        className="w-8 h-8 md:w-9 md:h-9 cursor-pointer text-[#191F28]"
                        onClick={() => setIsSearchOpen(true)}
                    />
                    <HamburgerIcon
                        className="w-8 h-8 md:w-9 md:h-9 ml-4 cursor-pointer text-[#191F28] z-[300] relative"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    />
                </div>
            </div>
            <NavMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
            <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
        </>
    );
}