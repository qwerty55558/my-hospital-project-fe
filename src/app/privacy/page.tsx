import React from 'react';

export default function PrivacyPage() {
  return (
    <div className="bg-white min-h-screen pt-40 pb-20 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-10 text-[#191F28] border-b pb-6">개인정보 처리방침</h1>
        
        <div className="space-y-8 text-[#4E5968] leading-relaxed">
          <p className="font-medium text-[#191F28]">
            마이병원 안과의원은 이용자의 개인정보를 소중하게 생각하며, "개인정보 보호법" 등 관련 법령을 준수하고 있습니다.
          </p>

          <section>
            <h2 className="text-xl font-bold text-[#191F28] mb-4">1. 수집하는 개인정보 항목</h2>
            <p>병원은 상담, 서비스 신청 등을 위해 아래와 같은 개인정보를 수집하고 있습니다.</p>
            <ul className="list-disc pl-5 mt-2 space-y-2">
              <li>수집항목: 이름, 연락처, 이메일, 상담내용, 서비스 이용기록, 접속 로그, 쿠키, 접속 IP 정보 등</li>
              <li>개인정보 수집방법: 홈페이지(상담신청), 게시판, 이벤트 응모</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#191F28] mb-4">2. 개인정보의 수집 및 이용목적</h2>
            <p>병원은 수집한 개인정보를 다음의 목적을 위해 활용합니다.</p>
            <ul className="list-disc pl-5 mt-2 space-y-2">
              <li>서비스 제공에 관한 계약 이행 및 서비스 제공에 따른 요금정산</li>
              <li>고객 상담 및 예약 관리, 본인 확인</li>
              <li>신규 서비스 개발 및 마케팅·광고에의 활용</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#191F28] mb-4">3. 개인정보의 보유 및 이용기간</h2>
            <p>
              원칙적으로, 개인정보 수집 및 이용목적이 달성된 후에는 해당 정보를 지체 없이 파기합니다. 단, 관계법령의 규정에 의하여 보존할 필요가 있는 경우 병원은 아래와 같이 관계법령에서 정한 일정한 기간 동안 회원정보를 보관합니다.
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-2">
              <li>소비자의 불만 또는 분쟁처리에 관한 기록: 3년</li>
              <li>방문에 관한 기록: 3개월</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#191F28] mb-4">4. 개인정보의 파기절차 및 방법</h2>
            <p>병원은 원칙적으로 개인정보 수집 및 이용목적이 달성된 후에는 해당 정보를 지체 없이 파기합니다. 파기절차 및 방법은 다음과 같습니다.</p>
            <ul className="list-disc pl-5 mt-2 space-y-2">
              <li>파기절차: 이용자가 입력하신 정보는 목적이 달성된 후 별도의 DB로 옮겨져 내부 방침 및 기타 관련 법령에 의한 정보보호 사유에 따라 일정 기간 저장된 후 파기됩니다.</li>
              <li>파기방법: 전자적 파일형태로 저장된 개인정보는 기록을 재생할 수 없는 기술적 방법을 사용하여 삭제합니다.</li>
            </ul>
          </section>
        </div>
        
        <div className="mt-12 pt-8 border-t text-sm text-[#8B95A1]">
          <p>시행일자: 2025년 12월 21일</p>
        </div>
      </div>
    </div>
  );
}
