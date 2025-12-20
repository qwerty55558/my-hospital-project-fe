export default function Page() {
    return (
        <div className="pt-48 pb-20 px-6 max-w-4xl mx-auto min-h-screen">
            <h1 className="text-4xl md:text-5xl font-bold mb-12 text-[#191F28]">진료 안내</h1>
            <div className="bg-[#F5F7F9] p-8 rounded-2xl mb-12">
                <h2 className="text-2xl font-bold mb-6 text-[#191F28]">진료 시간</h2>
                <ul className="space-y-4 text-gray-700">
                    <li className="flex justify-between">
                        <span>평일</span>
                        <span className="font-semibold">09:00 - 18:00</span>
                    </li>
                    <li className="flex justify-between">
                        <span>토요일</span>
                        <span className="font-semibold">09:00 - 13:00</span>
                    </li>
                    <li className="flex justify-between text-red-500">
                        <span>일요일 및 공휴일</span>
                        <span>휴진</span>
                    </li>
                </ul>
            </div>
        </div>
    );
}