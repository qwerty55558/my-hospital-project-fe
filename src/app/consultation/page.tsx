export default function Page() {
    return (
        <div className="pt-48 pb-20 px-6 max-w-4xl mx-auto min-h-screen">
            <h1 className="text-4xl md:text-5xl font-bold mb-12 text-[#191F28]">온라인 상담</h1>
            <div className="bg-white border border-gray-200 p-8 rounded-2xl shadow-sm">
                <form className="space-y-6">
                    <div>
                        <label className="block text-sm font-semibold mb-2">이름</label>
                        <input type="text" className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="성함을 입력하세요" />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold mb-2">연락처</label>
                        <input type="text" className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="연락처를 입력하세요" />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold mb-2">상담 내용</label>
                        <textarea className="w-full p-3 border border-gray-300 rounded-lg h-32 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="문의하실 내용을 입력하세요"></textarea>
                    </div>
                    <button className="w-full bg-[#00B8FF] text-white py-4 rounded-lg font-bold hover:bg-[#0096D1] transition-colors">상담 신청하기</button>
                </form>
            </div>
        </div>
    );
}