'use client';

import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faEye, faCalendar, faShareAlt } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import { usePost } from '@/hooks/usePosts';
import { CATEGORY_CONFIG } from '@/types/post';

// 날짜 포맷팅
function formatDate(dateStr: string) {
    const date = new Date(dateStr);
    return date.toLocaleDateString('ko-KR', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        weekday: 'long'
    });
}

// 스켈레톤
function DetailSkeleton() {
    return (
        <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-24 mb-6" />
            <div className="h-10 bg-gray-200 rounded w-3/4 mb-4" />
            <div className="h-10 bg-gray-200 rounded w-1/2 mb-8" />
            <div className="flex gap-4 mb-12">
                <div className="h-5 bg-gray-100 rounded w-32" />
                <div className="h-5 bg-gray-100 rounded w-24" />
            </div>
            <div className="space-y-4">
                <div className="h-4 bg-gray-100 rounded w-full" />
                <div className="h-4 bg-gray-100 rounded w-full" />
                <div className="h-4 bg-gray-100 rounded w-5/6" />
                <div className="h-4 bg-gray-100 rounded w-full" />
                <div className="h-4 bg-gray-100 rounded w-4/5" />
            </div>
        </div>
    );
}

export default function NewsDetailPage() {
    const params = useParams();
    const router = useRouter();
    const postId = params.id ? Number(params.id) : null;
    
    const { post, isLoading, error } = usePost(postId);

    // 에러 상태
    if (error) {
        return (
            <div className="pt-48 pb-24 px-6 max-w-3xl mx-auto min-h-screen">
                <div className="text-center py-20">
                    <h2 className="text-2xl font-bold text-[#191F28] mb-4">오류가 발생했습니다</h2>
                    <p className="text-gray-500 mb-8">게시글을 불러오는 중 문제가 발생했습니다.</p>
                    <Link href="/news" className="text-blue-600 font-bold hover:underline">
                        목록으로 돌아가기
                    </Link>
                </div>
            </div>
        );
    }

    // 로딩 상태
    if (isLoading || !post) {
        return (
            <div className="pt-48 pb-24 px-6 max-w-3xl mx-auto min-h-screen">
                <DetailSkeleton />
            </div>
        );
    }

    const categoryInfo = CATEGORY_CONFIG[post.category];

    return (
        <div className="pt-48 pb-24 px-6 max-w-3xl mx-auto min-h-screen">
            {/* 뒤로가기 */}
            <motion.button
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                onClick={() => router.back()}
                className="flex items-center gap-2 text-gray-400 hover:text-[#191F28] mb-8 transition-colors duration-200"
            >
                <FontAwesomeIcon icon={faArrowLeft} className="text-sm" />
                <span className="font-medium">뒤로가기</span>
            </motion.button>

            {/* 헤더 */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
            >
                {/* 카테고리 + 고정 */}
                <div className="flex items-center gap-2 mb-4">
                    <span className={`px-3 py-1 rounded-lg text-xs font-bold ${categoryInfo.bg} ${categoryInfo.text}`}>
                        {categoryInfo.label}
                    </span>
                    {post.isPinned && (
                        <span className="text-gray-400 text-sm">📌 고정됨</span>
                    )}
                </div>

                {/* 제목 */}
                <h1 className="text-3xl md:text-4xl font-bold text-[#191F28] mb-6 leading-tight">
                    {post.title}
                </h1>

                {/* 메타 정보 */}
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400 pb-8 border-b border-gray-100">
                    <span className="flex items-center gap-2">
                        <FontAwesomeIcon icon={faCalendar} className="text-xs" />
                        {formatDate(post.createdAt)}
                    </span>
                    <span className="flex items-center gap-2">
                        <FontAwesomeIcon icon={faEye} className="text-xs" />
                        조회 {post.viewCount.toLocaleString()}
                    </span>
                    <button className="flex items-center gap-2 hover:text-[#191F28] transition-colors duration-200 ml-auto">
                        <FontAwesomeIcon icon={faShareAlt} className="text-xs" />
                        공유
                    </button>
                </div>
            </motion.div>

            {/* 본문 */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="py-10"
            >
                {/* 요약 */}
                {post.summary && (
                    <div className="bg-gray-50 rounded-2xl p-6 mb-8">
                        <p className="text-[#4E5968] leading-relaxed font-medium">
                            {post.summary}
                        </p>
                    </div>
                )}

                {/* 본문 내용 */}
                <div className="prose prose-lg max-w-none text-[#191F28] leading-relaxed whitespace-pre-line">
                    {post.content.replace(/\\n/g, '\n')}
                </div>
            </motion.div>

            {/* 하단 네비게이션 */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="pt-8 border-t border-gray-100"
            >
                <Link 
                    href="/news"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gray-100 text-[#191F28] rounded-xl font-bold hover:bg-gray-200 transition-colors duration-200"
                >
                    <FontAwesomeIcon icon={faArrowLeft} className="text-sm" />
                    목록으로 돌아가기
                </Link>
            </motion.div>
        </div>
    );
}
