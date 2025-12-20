import React from 'react';

export default function TermsPage() {
  return (
    <div className="bg-white min-h-screen pt-40 pb-20 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-10 text-[#191F28] border-b pb-6">이용약관</h1>
        
        <div className="space-y-8 text-[#4E5968] leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-[#191F28] mb-4">제1조 (목적)</h2>
            <p>
              이 약관은 마이병원 안과의원(이하 "병원")이 운영하는 웹사이트에서 제공하는 인터넷 관련 서비스(이하 "서비스")를 이용함에 있어 병원과 이용자의 권리, 의무 및 책임사항을 규정함을 목적으로 합니다.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#191F28] mb-4">제2조 (용어의 정의)</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>"이용자"란 병원 웹사이트에 접속하여 이 약관에 따라 병원이 제공하는 서비스를 받는 회원 및 비회원을 말합니다.</li>
              <li>"회원"이라 함은 병원에 개인정보를 제공하여 회원등록을 한 자로서, 병원의 정보를 지속적으로 제공받으며, 병원이 제공하는 서비스를 계속적으로 이용할 수 있는 자를 말합니다.</li>
              <li>"비회원"이라 함은 회원에 가입하지 않고 병원이 제공하는 서비스를 이용하는 자를 말합니다.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#191F28] mb-4">제3조 (약관의 명시와 개정)</h2>
            <p>
              병원은 이 약관의 내용과 상호, 영업소 소재지, 대표자의 성명, 사업자등록번호, 연락처 등을 이용자가 알 수 있도록 사이트의 초기 서비스 화면에 게시합니다. 병원은 약관의 규제에 관한 법률 등 관련법을 위배하지 않는 범위에서 이 약관을 개정할 수 있습니다.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#191F28] mb-4">제4조 (서비스의 제공 및 변경)</h2>
            <p>
              병원은 다음과 같은 업무를 수행합니다:
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-2">
              <li>의료정보 및 병원 소식 제공</li>
              <li>온라인 상담 및 예약 지원 서비스</li>
              <li>기타 병원이 정하는 업무</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#191F28] mb-4">제5조 (서비스의 중단)</h2>
            <p>
              병원은 컴퓨터 등 정보통신설비의 보수점검, 교체 및 고장, 통신의 두절 등의 사유가 발생한 경우에는 서비스의 제공을 일시적으로 중단할 수 있습니다.
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
