"use client";

import { motion } from "framer-motion";

const KAKAO_MAP_HTML = `<!DOCTYPE html>
<html><head><meta charset="UTF-8"><meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests"><meta name="viewport" content="width=device-width,initial-scale=1">
<style>html,body{margin:0;padding:0;width:100%;height:100%}.root_daum_roughmap{width:100%!important;height:100%!important}</style>
</head><body>
<div id="daumRoughmapContainer1770338912086" class="root_daum_roughmap root_daum_roughmap_landing"></div>
<script charset="UTF-8" src="https://ssl.daumcdn.net/dmaps/map_js_init/roughmapLoader.js"></script>
<script charset="UTF-8">
new daum.roughmap.Lander({"timestamp":"1770338912086","key":"26g2wrbpcza9","mapWidth":"640","mapHeight":"360"}).render();
</script>
</body></html>`;

interface LocationSectionProps {
    showTitle?: boolean;
    className?: string;
}

export default function LocationSection({ showTitle = true, className = "" }: LocationSectionProps) {

    return (
        <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className={className}
        >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <div>
                    {showTitle && (
                        <h2 className="text-4xl font-bold text-[#191F28] mb-8">오시는 길</h2>
                    )}
                    <div className="space-y-6">
                        <div className="flex items-start">
                            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mr-4 shrink-0">📍</div>
                            <div>
                                <h4 className="font-bold text-[#191F28] mb-1">위치</h4>
                                <p className="text-[#4E5968]">서울특별시 강남구 테헤란로 123, 4층 (강남역 12번 출구)</p>
                            </div>
                        </div>
                        <div className="flex items-start">
                            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mr-4 shrink-0">📞</div>
                            <div>
                                <h4 className="font-bold text-[#191F28] mb-1">전화</h4>
                                <p className="text-[#4E5968]">1588-1234</p>
                            </div>
                        </div>
                        <div className="flex items-start">
                            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mr-4 shrink-0">⏰</div>
                            <div>
                                <h4 className="font-bold text-[#191F28] mb-1">진료시간</h4>
                                <p className="text-[#4E5968]">평일 09:00 ~ 18:00 (점심시간 13:00 ~ 14:00)</p>
                                <p className="text-[#4E5968]">토요일 09:00 ~ 13:00 (일요일/공휴일 휴진)</p>
                            </div>
                        </div>
                    </div>
                    <div className="mt-12 flex gap-4">
                        <a
                            href="https://map.naver.com/p/search/%EC%84%9C%EC%9A%B8%ED%8A%B9%EB%B3%84%EC%8B%9C%20%EA%B0%95%EB%82%A8%EA%B5%AC%20%ED%85%8C%ED%97%A4%EB%9E%80%EB%A1%9C%20123/address/14135654.4738988,4509377.6498498,%EC%84%9C%EC%9A%B8%ED%8A%B9%EB%B3%84%EC%8B%9C%20%EA%B0%95%EB%82%A8%EA%B5%AC%20%ED%85%8C%ED%97%A4%EB%9E%80%EB%A1%9C%20123,new?c=15.00,0,0,0,dh&isCorrectAnswer=true"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-8 py-4 bg-[#03C75A] text-white rounded-xl font-bold hover:bg-[#02b350] transition-colors cursor-pointer"
                        >
                            네이버지도
                        </a>
                        <a
                            href="https://map.kakao.com/link/map/마이병원,37.4979,127.0276"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-8 py-4 bg-[#FEE500] text-[#191F28] rounded-xl font-bold hover:opacity-90 transition-opacity cursor-pointer"
                        >
                            카카오맵
                        </a>
                    </div>
                </div>
                <div className="h-[400px] bg-gray-200 rounded-3xl overflow-hidden relative shadow-inner">
                    <iframe
                        srcDoc={KAKAO_MAP_HTML}
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        title="마이병원 위치"
                        className="absolute inset-0"
                        loading="lazy"
                    />
                </div>
            </div>
        </motion.div>
    );
}
