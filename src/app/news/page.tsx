export default function Page() {
    return (
        <div className="pt-48 pb-20 px-6 max-w-4xl mx-auto min-h-screen">
            <h1 className="text-4xl md:text-5xl font-bold mb-12 text-[#191F28]">병원 소식</h1>
            <div className="space-y-6">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="p-6 border-b border-gray-100 hover:bg-gray-50 transition-colors">
                        <span className="text-sm text-gray-400 mb-2 block">2025.12.20</span>
                        <h2 className="text-xl font-bold mb-2">병원 소식 게시글 제목 {i}</h2>
                        <p className="text-gray-600">이곳에 병원의 새로운 소식을 전해드립니다.</p>
                    </div>
                ))}
            </div>
        </div>
    );
}