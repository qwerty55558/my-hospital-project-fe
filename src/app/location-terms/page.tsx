import React from 'react';

export default function LocationTermsPage() {
  return (
    <div className="bg-white min-h-screen pt-40 pb-20 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-10 text-[#191F28] border-b pb-6">위치정보 이용약관</h1>
        
        <div className="space-y-8 text-[#4E5968] leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-[#191F28] mb-4">제1조 (목적)</h2>
            <p>
              본 약관은 마이병원 안과의원(이하 "병원")이 제공하는 위치기반서비스(이하 "서비스")를 이용함에 있어 병원과 개인위치정보주체와의 권리, 의무 및 책임사항을 규정함을 목적으로 합니다.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#191F28] mb-4">제2조 (약관 외 준칙)</h2>
            <p>
              본 약관에 명시되지 않은 사항은 위치정보의 보호 및 이용 등에 관한 법률, 개인정보보호법, 정보통신망 이용촉진 및 정보보호 등에 관한 법률 등 관계 법령 및 병원이 정한 서비스의 세부 이용 지침 등의 규정에 따릅니다.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#191F28] mb-4">제3조 (서비스 내용 및 요금)</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>병원은 직접 수집하거나 위치정보사업자로부터 제공받은 위치정보를 이용하여 내 주변 병원 찾기, 길 안내 등 정보를 제공합니다.</li>
              <li>병원이 제공하는 위치기반서비스는 무료입니다. 단, 무선 서비스 이용 시 발생하는 데이터 통신료는 가입하신 각 이동통신사의 정책에 따릅니다.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#191F28] mb-4">제4조 (개인위치정보주체의 권리)</h2>
            <p>
              개인위치정보주체는 개인위치정보의 이용·제공 목적, 제공받는 자의 범위 및 위치기반서비스의 일부에 대하여 동의를 유보하거나 언제든지 동의의 전부 또는 일부를 철회할 수 있습니다.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#191F28] mb-4">제5조 (위치정보관리책임자의 지정)</h2>
            <p>
              병원은 위치정보를 적절히 관리·보호하고 개인위치정보주체의 불만을 원활히 처리할 수 있도록 실질적인 책임을 질 수 있는 지위에 있는 자를 위치정보관리책임자로 지정해 운영합니다.
            </p>
          </section>
        </div>
        
        <div className="mt-12 pt-8 border-t text-sm text-[#8B95A1]">
          <p>공고일자: 2025년 12월 21일</p>
          <p>시행일자: 2025년 12월 21일</p>
        </div>
      </div>
    </div>
  );
}
