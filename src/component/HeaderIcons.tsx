interface IconProps {
    className?: string;
    onClick?: () => void;
}

interface HamburgerProps extends IconProps {
    isOpen: boolean;
}

export function SearchIcon({ className, onClick }: IconProps) {
    return (
        <button className={className} onClick={onClick} aria-label="Search">
            <svg
                width="100%"
                height="100%"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full stroke-current hover:text-[#00B8FF] transition-colors duration-300"
            >
                <path
                    d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M21 21L16.65 16.65"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
        </button>
    );
}

export function HamburgerIcon({ className, onClick }: IconProps) {
    return (
        <button 
            className={`${className} relative focus:outline-none`} 
            onClick={onClick} 
            aria-label="Open Menu"
        >
            <svg
                width="100%"
                height="100%"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full stroke-current hover:text-[#00B8FF] transition-colors duration-300"
            >
                <path d="M4 6H20" strokeWidth="2.5" strokeLinecap="round" />
                <path d="M4 12H20" strokeWidth="2.5" strokeLinecap="round" />
                <path d="M4 18H20" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
        </button>
    );
}
