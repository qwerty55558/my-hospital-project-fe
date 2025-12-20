import Link from "next/link";

export default function Logo({ className }: { className?: string }) {



    return (
        <Link href="/">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 200 200"
                className={className}
                aria-label="My Hospital Project Logo"
            >
                <defs>
                    <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#38C6F4" />
                        <stop offset="100%" stopColor="#007AFF" />
                    </linearGradient>
                </defs>

                {/* 눈의 외곽선 (Upper Eyelid) */}
                <path
                    d="M20,100 Q100,20 180,100"
                    fill="none"
                    stroke="url(#logoGradient)"
                    strokeWidth="16"
                    strokeLinecap="round"
                />

                {/* 눈의 외곽선 (Lower Eyelid) - 약간 열린 느낌으로 역동성 부여 */}
                <path
                    d="M20,100 Q100,180 180,100"
                    fill="none"
                    stroke="url(#logoGradient)"
                    strokeWidth="16"
                    strokeLinecap="round"
                    opacity="0.6"
                />

                {/* 중심부 동공 (Pupil) */}
                <circle cx="100" cy="100" r="35" fill="url(#logoGradient)" />

                {/* 의료 십자가 (Medical Cross) - Negative Space 활용 */}
                <path
                    d="M100 80 V120 M80 100 H120"
                    stroke="white"
                    strokeWidth="10"
                    strokeLinecap="round"
                />

                {/* 반짝임 포인트 (Reflection) */}
                <circle cx="145" cy="65" r="8" fill="#38C6F4" />
            </svg>
        </Link>
    );
}
