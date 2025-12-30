"use client";

import { motion } from "framer-motion";

// 기본 스켈레톤 박스
export function SkeletonBox({ className }: { className?: string }) {
    return (
        <div className={`bg-gray-200 animate-pulse rounded-lg ${className || ''}`} />
    );
}

// 메인 페이지 슬라이더 스켈레톤
export function DoctorSliderSkeleton() {
    return (
        <section className="relative overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[600px] lg:min-h-[700px]">
                    {/* 좌측: 텍스트 스켈레톤 */}
                    <div className="flex flex-col justify-center px-8 md:px-16 lg:px-20 py-16 lg:py-24 order-2 lg:order-1">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.3 }}
                        >
                            <SkeletonBox className="w-24 h-4 mb-6" />
                            <SkeletonBox className="w-full max-w-md h-12 mb-3" />
                            <SkeletonBox className="w-3/4 max-w-sm h-12 mb-8" />
                            <SkeletonBox className="w-full max-w-md h-5 mb-2" />
                            <SkeletonBox className="w-5/6 max-w-sm h-5 mb-10" />
                            
                            <div className="flex items-center gap-4 mb-10">
                                <SkeletonBox className="w-14 h-14 rounded-full" />
                                <div>
                                    <SkeletonBox className="w-24 h-6 mb-2" />
                                    <SkeletonBox className="w-16 h-4" />
                                </div>
                            </div>
                            
                            <SkeletonBox className="w-36 h-14 rounded-full" />
                        </motion.div>
                    </div>

                    {/* 우측: 이미지 스켈레톤 */}
                    <div className="relative order-1 lg:order-2 min-h-[400px] lg:min-h-full">
                        <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 animate-pulse" />
                    </div>
                </div>
            </div>

            {/* 하단 네비게이션 스켈레톤 */}
            <div className="absolute bottom-8 left-8 md:left-16 lg:left-20 flex items-center gap-6 z-10">
                <div className="flex items-center gap-2">
                    <SkeletonBox className="w-12 h-12 rounded-full" />
                    <SkeletonBox className="w-12 h-12 rounded-full" />
                </div>
                <div className="flex items-center gap-2">
                    <SkeletonBox className="w-8 h-1.5 rounded-full" />
                    <SkeletonBox className="w-4 h-1.5 rounded-full" />
                    <SkeletonBox className="w-4 h-1.5 rounded-full" />
                    <SkeletonBox className="w-4 h-1.5 rounded-full" />
                </div>
            </div>
        </section>
    );
}

// 메인 페이지 카드 그리드 스켈레톤
export function DoctorCardGridSkeleton() {
    return (
        <section className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-6 md:px-12">
                <div className="text-center mb-16">
                    <SkeletonBox className="w-32 h-4 mx-auto mb-4" />
                    <SkeletonBox className="w-64 h-10 mx-auto mb-4" />
                    <SkeletonBox className="w-80 h-5 mx-auto" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[1, 2, 3, 4].map((i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1, duration: 0.3 }}
                        >
                            <SkeletonBox className="aspect-[3/4] rounded-2xl mb-5" />
                            <div className="px-1">
                                <SkeletonBox className="w-16 h-3 mb-3" />
                                <SkeletonBox className="w-32 h-6 mb-2" />
                                <SkeletonBox className="w-full h-4" />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

// 의료진 소개 페이지 스켈레톤
export function DoctorListSkeleton() {
    return (
        <div className="grid grid-cols-1 gap-24">
            {[1, 2, 3, 4].map((i) => (
                <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1, duration: 0.3 }}
                    className={`flex flex-col ${i % 2 === 0 ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-12 md:gap-20`}
                >
                    {/* 이미지 스켈레톤 */}
                    <div className="w-full md:w-2/5 aspect-[4/5] relative rounded-3xl overflow-hidden">
                        <SkeletonBox className="absolute inset-0 rounded-3xl" />
                    </div>

                    {/* 텍스트 스켈레톤 */}
                    <div className="w-full md:w-3/5 flex flex-col justify-center">
                        <SkeletonBox className="w-20 h-6 rounded-full mb-6" />
                        <SkeletonBox className="w-48 h-12 mb-4" />
                        <SkeletonBox className="w-full max-w-md h-8 mb-8" />
                        
                        <div className="mb-10">
                            <SkeletonBox className="w-full h-5 mb-2" />
                            <SkeletonBox className="w-5/6 h-5 mb-2" />
                            <SkeletonBox className="w-4/6 h-5" />
                        </div>

                        <div className="grid grid-cols-1 gap-4">
                            <SkeletonBox className="h-14 rounded-xl" />
                            <SkeletonBox className="h-14 rounded-xl" />
                        </div>
                    </div>
                </motion.div>
            ))}
        </div>
    );
}

// 범용 로딩 스피너
export function LoadingSpinner({ className }: { className?: string }) {
    return (
        <div className={`flex justify-center items-center ${className || 'py-32'}`}>
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#00B8FF]"></div>
        </div>
    );
}

// 시설안내 이미지 카드 스켈레톤
export function FacilityCardSkeleton() {
    return (
        <div className="flex flex-col">
            {/* 이미지 스켈레톤 */}
            <div className="relative aspect-[16/9] rounded-[2.5rem] overflow-hidden mb-8">
                <SkeletonBox className="absolute inset-0 rounded-[2.5rem]" />
                <div className="absolute bottom-6 left-8">
                    <SkeletonBox className="w-12 h-12 rounded-2xl" />
                </div>
            </div>
            
            {/* 타이틀 스켈레톤 */}
            <div className="flex items-center gap-3 mb-4">
                <SkeletonBox className="w-32 h-8" />
                <div className="h-px flex-1 bg-gray-100" />
            </div>
            
            {/* 설명 스켈레톤 */}
            <SkeletonBox className="w-full h-5 mb-2" />
            <SkeletonBox className="w-5/6 h-5 mb-8" />
            
            {/* 피처 리스트 스켈레톤 */}
            <div className="grid grid-cols-1 gap-3">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center gap-3">
                        <SkeletonBox className="w-5 h-5 rounded-full" />
                        <SkeletonBox className="w-40 h-4" />
                    </div>
                ))}
            </div>
        </div>
    );
}

// 시설안내 그리드 스켈레톤
export function FacilityGridSkeleton() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-20">
            {[1, 2, 3, 4].map((i) => (
                <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1, duration: 0.3 }}
                >
                    <FacilityCardSkeleton />
                </motion.div>
            ))}
        </div>
    );
}
