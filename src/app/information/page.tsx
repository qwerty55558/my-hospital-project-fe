export default function Page() {
    return (
        <div className="pt-48 pb-20 px-6 max-w-4xl mx-auto min-h-screen">
            <h1 className="text-4xl md:text-5xl font-bold mb-12 text-[#191F28]">이용 안내</h1>
            <div className="space-y-12">
                <section>
                    <h2 className="text-2xl font-bold mb-6">예약 안내</h2>
                    <p className="text-gray-600">전화 또는 홈페이지를 통해 예약이 가능합니다. 예약 없이 내원하실 경우 대기 시간이 길어질 수 있습니다.</p>
                </section>
                <section>
                    <h2 className="text-2xl font-bold mb-6">주차 안내</h2>
                    <p className="text-gray-600">병원 건물 지하 주차장을 이용하실 수 있습니다. (진료 시 2시간 무료)</p>
                </section>
            </div>
        </div>
    );
}