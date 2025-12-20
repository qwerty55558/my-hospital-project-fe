import React from 'react';

export default function FeesPage() {
  const feeCategories = [
    {
      category: "시력교정술",
      items: [
        { name: "스마일 라식 (양안)", price: "2,500,000원 ~", note: "검사비 포함" },
        { name: "올레이저 라섹 (양안)", price: "1,500,000원 ~", note: "무통 라섹" },
        { name: "ICL 렌즈삽입술 (단안)", price: "2,500,000원 ~", note: "렌즈 종류에 따라 상이" },
      ]
    },
    {
      category: "백내장/노안",
      items: [
        { name: "단초점 인공수정체 (단안)", price: "포괄수가제 적용", note: "건강보험 적용" },
        { name: "다초점 인공수정체 (단안)", price: "2,000,000원 ~", note: "렌즈 종류에 따라 상이" },
        { name: "레이저 백내장 수술 추가", price: "1,000,000원", note: "" },
      ]
    },
    {
      category: "검사 및 기타",
      items: [
        { name: "안구건조증 레이저 (IPL)", price: "100,000원", note: "1회 기준" },
        { name: "종합 안검진", price: "150,000원", note: "연령별 항목 상이" },
        { name: "영유아 검진", price: "50,000원", note: "" },
      ]
    }
  ];

  return (
    <div className="bg-white min-h-screen pt-40 pb-20 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-10 border-b pb-6">
          <h1 className="text-3xl md:text-4xl font-bold text-[#191F28] mb-4">비급여 진료비 안내</h1>
          <p className="text-[#8B95A1]">본 항목은 건강보험이 적용되지 않는 비급여 항목으로, 의료법 제45조에 의거하여 공지합니다.</p>
        </div>
        
        <div className="space-y-12">
          {feeCategories.map((cat, idx) => (
            <section key={idx}>
              <h2 className="text-xl font-bold text-[#191F28] mb-6 flex items-center">
                <span className="w-1.5 h-6 bg-[#00B8FF] mr-3 rounded-full"></span>
                {cat.category}
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border-t-2 border-[#191F28]">
                  <thead>
                    <tr className="bg-[#F9FAFB] border-b border-[#EEEEEE]">
                      <th className="py-4 px-4 text-left text-sm font-semibold text-[#4E5968]">항목명</th>
                      <th className="py-4 px-4 text-right text-sm font-semibold text-[#4E5968]">가격</th>
                      <th className="py-4 px-4 text-left text-sm font-semibold text-[#4E5968]">비고</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cat.items.map((item, iIdx) => (
                      <tr key={iIdx} className="border-b border-[#EEEEEE] hover:bg-gray-50 transition-colors">
                        <td className="py-4 px-4 text-sm text-[#191F28] font-medium">{item.name}</td>
                        <td className="py-4 px-4 text-right text-sm text-[#191F28] font-bold">{item.price}</td>
                        <td className="py-4 px-4 text-sm text-[#8B95A1]">{item.note}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          ))}
        </div>
        
        <div className="mt-12 bg-[#F9FAFB] p-6 rounded-xl border border-[#EEEEEE]">
          <h3 className="text-sm font-bold text-[#4E5968] mb-3">안내사항</h3>
          <ul className="text-xs text-[#8B95A1] space-y-2 list-disc pl-4">
            <li>상기 금액은 수술 방법, 장비 및 렌즈 종류에 따라 변동될 수 있습니다.</li>
            <li>정확한 비용은 전문의 진료 및 정밀 검사 후 상담을 통해 확정됩니다.</li>
            <li>제증명 수수료 등 기타 항목은 원내 게시판에서 확인 가능합니다.</li>
            <li>시행일자: 2025년 12월 21일</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
