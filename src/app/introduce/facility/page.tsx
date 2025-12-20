export default function Page() {
    return (
        <div className="pt-48 pb-20 px-6 max-w-4xl mx-auto min-h-screen">
            <h1 className="text-4xl md:text-5xl font-bold mb-12 text-[#191F28]">시설 소개</h1>
            <div className="space-y-12">
                <section>
                    <h2 className="text-2xl font-bold mb-6 text-[#191F28]">첨단 의료 장비</h2>
                    <p className="text-gray-600 mb-4">대학병원급 최신 정밀 검사 장비를 도입하여 정확한 진단을 수행합니다.</p>
                </section>
                <section>
                    <h2 className="text-2xl font-bold mb-6 text-[#191F28]">쾌적한 대기 공간</h2>
                    <p className="text-gray-600 mb-4">환자분들이 편안하게 대기하실 수 있도록 호텔급 라운지를 운영하고 있습니다.</p>
                </section>
            </div>
        </div>
    );
}