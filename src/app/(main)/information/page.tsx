export default function Page() {
    return (
        <div className="pt-48 pb-20 px-6 max-w-4xl mx-auto min-h-screen">
            <h1 className="text-4xl md:text-5xl font-bold mb-12 text-[#191F28]">이용 안내</h1>
            <div className="space-y-12">
                <section className="bg-[#F5F7F9] p-8 rounded-2xl">
                    <h2 className="text-2xl font-bold mb-6 text-[#191F28]">진료 시간</h2>
                    <ul className="space-y-4 text-gray-700">
                        <li className="flex justify-between border-b border-gray-200 pb-2">
                            <span>평일</span>
                            <span className="font-semibold">09:00 - 18:00</span>
                        </li>
                        <li className="flex justify-between border-b border-gray-200 pb-2">
                            <span>토요일</span>
                            <span className="font-semibold">09:00 - 13:00</span>
                        </li>
                        <li className="flex justify-between border-b border-gray-200 pb-2">
                            <span>점심시간</span>
                            <span className="font-semibold">13:00 - 14:00</span>
                        </li>
                        <li className="flex justify-between text-red-500 font-semibold">
                            <span>일요일 및 공휴일</span>
                            <span>휴진</span>
                        </li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-2xl font-bold mb-6 text-[#191F28]">예약 안내</h2>
                    <div className="bg-white border border-gray-100 p-6 rounded-xl shadow-sm">
                        <p className="text-gray-600 mb-4 leading-relaxed">
                            본 병원은 환자분들의 원활한 진료를 위해 예약 우선제를 실시하고 있습니다. 
                            전화 또는 홈페이지를 통해 예약이 가능하며, 예약 없이 내원하실 경우 대기 시간이 길어질 수 있습니다.
                        </p>
                        <div className="flex items-center space-x-4">
                            <div className="bg-blue-50 p-4 rounded-lg flex-1">
                                <p className="text-sm text-blue-600 font-bold mb-1">전화 예약</p>
                                <p className="text-xl font-bold text-blue-900">02-1234-5678</p>
                            </div>
                        </div>
                    </div>
                </section>

                <section>
                    <h2 className="text-2xl font-bold mb-6 text-[#191F28]">주차 안내</h2>
                    <div className="bg-white border border-gray-100 p-6 rounded-xl shadow-sm">
                        <ul className="space-y-3 text-gray-600">
                            <li className="flex items-start">
                                <span className="mr-2">•</span>
                                <span>병원 건물 지하 주차장(B1~B3)을 이용하실 수 있습니다.</span>
                            </li>
                            <li className="flex items-start font-semibold text-[#191F28]">
                                <span className="mr-2">•</span>
                                <span>진료 환자분들은 2시간 무료 주차가 가능합니다. (원무과에서 차량번호 등록)</span>
                            </li>
                            <li className="flex items-start">
                                <span className="mr-2">•</span>
                                <span>무료 시간 초과 시 10분당 1,000원의 주차 요금이 부과됩니다.</span>
                            </li>
                        </ul>
                    </div>
                </section>
            </div>
        </div>
    );
}