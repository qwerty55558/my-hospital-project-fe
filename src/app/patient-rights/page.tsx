import React from 'react';

export default function PatientRightsPage() {
  return (
    <div className="bg-white min-h-screen pt-40 pb-20 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-10 text-[#191F28] border-b pb-6">환자의 권리와 의무</h1>
        
        <div className="space-y-12 text-[#4E5968] leading-relaxed">
          <section>
            <h2 className="text-2xl font-bold text-[#191F28] mb-6 flex items-center">
              <span className="w-8 h-8 bg-blue-50 text-[#00B8FF] rounded-full flex items-center justify-center mr-3 text-sm">1</span>
              환자의 권리
            </h2>
            <div className="space-y-6 pl-11">
              <div>
                <h3 className="font-bold text-[#191F28] mb-2">가. 진료받을 권리</h3>
                <p>환자는 자신의 건강 보호와 증진을 위하여 적절한 보건의료서비스를 받을 권리를 가지며, 성별·나이·종교·신분 및 경제적 사정 등을 이유로 건강에 관한 권리를 침해받지 아니합니다.</p>
              </div>
              <div>
                <h3 className="font-bold text-[#191F28] mb-2">나. 알 권리 및 자기결정권</h3>
                <p>환자는 담당 의사로부터 질병 상태, 치료 방법, 의학적 권고 사항과 예상 결과 등에 관하여 충분한 설명을 듣고 자세히 물어볼 수 있으며, 치료 여부를 결정할 권리를 가집니다.</p>
              </div>
              <div>
                <h3 className="font-bold text-[#191F28] mb-2">다. 비밀을 보호받을 권리</h3>
                <p>환자는 진료와 관련된 신체상·건강상의 비밀과 사생활의 비밀을 침해받지 아니하며, 의료인과 의료기관은 환자의 동의를 받거나 범죄 수사 등 법률에서 정한 경우 외에는 비밀을 누설하거나 발표하지 못합니다.</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#191F28] mb-6 flex items-center">
              <span className="w-8 h-8 bg-blue-50 text-[#00B8FF] rounded-full flex items-center justify-center mr-3 text-sm">2</span>
              환자의 의무
            </h2>
            <div className="space-y-6 pl-11">
              <div>
                <h3 className="font-bold text-[#191F28] mb-2">가. 의료인에 대한 신뢰·존중 의무</h3>
                <p>환자는 자신의 건강 관련 정보를 의료인에게 정확히 알리고, 의료인의 치료계획을 신뢰하고 존중하여야 합니다.</p>
              </div>
              <div>
                <h3 className="font-bold text-[#191F28] mb-2">나. 부정한 방법으로 진료를 받지 않을 의무</h3>
                <p>환자는 진료 전에 본인의 신분을 밝혀야 하며, 타인의 명의로 진료를 받는 등 거짓이나 부정한 방법으로 진료를 받지 아니합니다.</p>
              </div>
              <div>
                <h3 className="font-bold text-[#191F28] mb-2">다. 원내 질서 준수 및 비용 지불 의무</h3>
                <p>환자는 병원 내 규정을 준수하고 타인의 진료권을 존중하며, 자신이 받은 진료에 대한 비용을 지불할 의무를 가집니다.</p>
              </div>
            </div>
          </section>
        </div>
        
        <div className="mt-16 bg-[#F9FAFB] p-8 rounded-2xl border border-[#EEEEEE]">
          <p className="text-sm text-[#8B95A1] text-center italic">
            "마이병원 안과의원은 환자 중심의 진료 문화를 만들기 위해 최선을 다하고 있습니다."
          </p>
        </div>
      </div>
    </div>
  );
}
