export default function Page() {
    return (
        <div className="pt-32 pb-20 px-6 max-w-4xl mx-auto min-h-screen">
            <h1 className="text-4xl md:text-5xl font-bold mb-12 text-[#191F28]">병원 소개</h1>
            <div className="space-y-8 text-lg text-gray-600 leading-relaxed">
                <p>저희 병원은 최상의 의료 서비스를 제공하기 위해 노력하고 있습니다.</p>
                <p>환자 중심의 진료 철학을 바탕으로, 각 분야의 전문의들이 협진하여 최적의 치료 솔루션을 제공합니다.</p>
                <div className="bg-[#F5F7F9] p-8 rounded-2xl">
                    <h2 className="text-2xl font-bold text-[#191F28] mb-4">우리의 미션</h2>
                    <p>건강한 삶을 향한 당신의 여정에 든든한 동반자가 되겠습니다.</p>
                </div>
            </div>
        </div>
    );
}