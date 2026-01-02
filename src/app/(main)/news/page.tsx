'use client';

import { Suspense, useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInbox, faChevronRight, faEye, faChevronLeft, faAnglesLeft, faAnglesRight, faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import { usePaginatedPosts, usePinnedPosts, type Post, type PaginationMeta } from '@/hooks/usePosts';
import { 
    PostFilterCategory, 
    CATEGORY_CONFIG, 
    FILTER_TABS 
} from '@/types/post';
import type { PostCategory } from '@/lib/schemas';

const POSTS_PER_PAGE = 10;
const PINNED_POSTS_LIMIT = 3;

// 고정글 정렬: 최신순
function sortPinnedPosts(posts: Post[]): Post[] {
    return [...posts].sort((a, b) => 
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
}

// 날짜 포맷팅 함수
function formatDate(dateStr: string) {
    const date = new Date(dateStr);
    return date.toLocaleDateString('ko-KR', { 
        year: 'numeric', 
        month: '2-digit', 
        day: '2-digit' 
    }).replace(/\. /g, '.').replace(/\.$/, '');
}

// 스켈레톤 컴포넌트
function PostsSkeleton() {
    return (
        <div className="space-y-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="bg-white border border-gray-100 rounded-2xl p-6 animate-pulse">
                    <div className="flex items-center gap-4">
                        <div className="w-16 h-6 bg-gray-200 rounded-md" />
                        <div className="flex-1">
                            <div className="h-5 bg-gray-200 rounded w-3/4 mb-2" />
                            <div className="h-4 bg-gray-100 rounded w-1/2" />
                        </div>
                        <div className="w-20 h-4 bg-gray-100 rounded" />
                    </div>
                </div>
            ))}
        </div>
    );
}

// 빈 상태 컴포넌트
function EmptyState({ filter, onReset }: { filter: PostFilterCategory; onReset: () => void }) {
    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-32 text-center"
        >
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6">
                <FontAwesomeIcon icon={faInbox} className="text-3xl text-gray-200" />
            </div>
            <h3 className="text-xl font-bold text-[#191F28] mb-2">등록된 소식이 없습니다.</h3>
            <p className="text-gray-400">새로운 소식이 준비되는 대로 알려드리겠습니다.</p>
            {filter !== 'all' && (
                <button 
                    onClick={onReset}
                    className="mt-6 text-blue-600 font-bold hover:underline"
                >
                    전체 보기로 돌아가기
                </button>
            )}
        </motion.div>
    );
}

// 게시글 행 컴포넌트
function PostRow({ post, index, isPinnedSection = false, hidePinIcon = false }: { post: Post; index: number; isPinnedSection?: boolean; hidePinIcon?: boolean }) {
    const categoryInfo = CATEGORY_CONFIG[post.category];
    
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.03, duration: 0.2 }}
        >
            <Link 
                href={`/news/${post.id}`}
                className={`group block border rounded-2xl p-5 md:p-6 hover:shadow-lg transition-[border-color,box-shadow] duration-200 ${
                    isPinnedSection 
                        ? 'bg-gradient-to-r from-amber-50/50 to-orange-50/30 border-amber-100 hover:border-amber-200' 
                        : 'bg-white border-gray-100 hover:border-gray-200'
                }`}
            >
                <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-4">
                    {/* 카테고리 (+ 고정 아이콘) */}
                    <div className="flex items-center gap-2 shrink-0">
                        {!hidePinIcon && (
                            <span className="w-4 text-center text-amber-500 text-xs">
                                {post.isPinned && '📌'}
                            </span>
                        )}
                        <span className={`px-3 py-1 rounded-lg text-xs font-bold ${categoryInfo.bg} ${categoryInfo.text}`}>
                            {categoryInfo.label}
                        </span>
                    </div>
                    
                    {/* 제목 + 요약 */}
                    <div className="flex-1 min-w-0">
                        <h3 className="text-base md:text-lg font-bold text-[#191F28] truncate group-hover:text-blue-600 transition-colors duration-200">
                            {post.title}
                        </h3>
                        {post.summary && (
                            <p className="text-sm text-gray-400 truncate mt-1 hidden md:block">
                                {post.summary}
                            </p>
                        )}
                    </div>
                    
                    {/* 메타 정보 */}
                    <div className="flex items-center gap-4 text-sm text-gray-400 shrink-0">
                        <span className="flex items-center gap-1">
                            <FontAwesomeIcon icon={faEye} className="text-xs" />
                            {post.viewCount.toLocaleString()}
                        </span>
                        <span className="hidden md:inline">{formatDate(post.createdAt)}</span>
                        <FontAwesomeIcon 
                            icon={faChevronRight} 
                            className="text-xs text-gray-300 group-hover:text-blue-500 group-hover:translate-x-1 transition-[color,transform] duration-200" 
                        />
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}

// 고정글 스켈레톤
function PinnedSkeleton() {
    return (
        <div className="mb-6 space-y-3">
            <div className="flex items-center gap-2 mb-3">
                <div className="w-4 h-4 bg-amber-100 rounded animate-pulse" />
                <div className="w-20 h-4 bg-gray-200 rounded animate-pulse" />
            </div>
            {[1, 2, 3].map((i) => (
                <div key={i} className="bg-amber-50/50 border border-amber-100 rounded-2xl p-5 animate-pulse">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-5 bg-amber-100 rounded" />
                        <div className="flex-1 h-5 bg-amber-100 rounded w-2/3" />
                    </div>
                </div>
            ))}
        </div>
    );
}

// 고정글 데이터 컴포넌트 (SWR 사용)
function PinnedPostsData({ filter, isCollapsed, onToggle }: { filter: string; isCollapsed: boolean; onToggle: () => void }) {
    const { posts: pinnedPosts, isLoading } = usePinnedPosts(10, { 
        revalidateOnFocus: false 
    });
    
    // 카테고리 필터 적용
    const filteredPinned = useMemo(() => {
        if (filter === 'all') return pinnedPosts;
        return pinnedPosts.filter(p => p.category === filter);
    }, [pinnedPosts, filter]);
    
    if (isLoading) return <PinnedSkeleton />;
    if (filteredPinned.length === 0) return null;
    
    return <PinnedPostsSection posts={filteredPinned} isCollapsed={isCollapsed} onToggle={onToggle} />;
}

// 고정글 섹션 컴포넌트 (접기/펼치기 + 더보기)
function PinnedPostsSection({ posts, isCollapsed, onToggle }: { posts: Post[]; isCollapsed: boolean; onToggle: () => void }) {
    const [isExpanded, setIsExpanded] = useState(false);
    const sortedPosts = useMemo(() => sortPinnedPosts(posts), [posts]);
    
    const hasMore = sortedPosts.length > PINNED_POSTS_LIMIT;
    const visiblePosts = isExpanded ? sortedPosts : sortedPosts.slice(0, PINNED_POSTS_LIMIT);
    const hiddenCount = sortedPosts.length - PINNED_POSTS_LIMIT;
    
    if (sortedPosts.length === 0) return null;
    
    return (
        <>
            {/* 헤더 (클릭으로 전체 섹션 토글) */}
            <button
                onClick={onToggle}
                className="w-full flex items-center justify-between py-2 cursor-pointer hover:bg-gray-50 -mx-2 px-2 rounded-lg transition-colors"
            >
                <div className="flex items-center gap-2">
                    <span className="text-amber-500">📌</span>
                    <span className="text-sm font-bold text-gray-500">고정 게시글</span>
                    <span className="text-xs text-gray-300">({sortedPosts.length})</span>
                </div>
                <FontAwesomeIcon 
                    icon={isCollapsed ? faChevronDown : faChevronUp} 
                    className="text-xs text-gray-400"
                />
            </button>
            
            {/* 고정글 목록 */}
            {!isCollapsed && (
                <>
                    <div className="space-y-3 mt-3">
                        {visiblePosts.map((post, idx) => (
                            <PostRow key={post.id} post={post} index={idx} isPinnedSection />
                        ))}
                    </div>
                    
                    {/* 더보기/접기 버튼 */}
                    {hasMore && (
                        <button
                            onClick={() => setIsExpanded(!isExpanded)}
                            className="w-full mt-3 py-2 text-sm text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg transition-colors flex items-center justify-center gap-1"
                        >
                            <span>{isExpanded ? '접기' : `${hiddenCount}개 더보기`}</span>
                            <FontAwesomeIcon 
                                icon={isExpanded ? faChevronUp : faChevronDown} 
                                className="text-[10px]"
                            />
                        </button>
                    )}
                </>
            )}
        </>
    );
}

// 페이지네이션 컴포넌트
function Pagination({ 
    meta, 
    currentPage, 
    onPageChange 
}: { 
    meta: PaginationMeta; 
    currentPage: number; 
    onPageChange: (page: number) => void;
}) {
    const { totalPages, hasNext, hasPrev } = meta;
    
    // 표시할 페이지 번호 계산 (현재 페이지 기준 앞뒤 2개씩)
    const getPageNumbers = () => {
        const pages: number[] = [];
        const start = Math.max(1, currentPage - 2);
        const end = Math.min(totalPages, currentPage + 2);
        
        for (let i = start; i <= end; i++) {
            pages.push(i);
        }
        return pages;
    };

    if (totalPages <= 1) return null;

    return (
        <div className="flex items-center justify-center gap-1 mt-12">
            {/* 첫 페이지 */}
            <button
                onClick={() => onPageChange(1)}
                disabled={!hasPrev}
                className="p-2 rounded-lg text-gray-400 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                title="첫 페이지"
            >
                <FontAwesomeIcon icon={faAnglesLeft} />
            </button>
            
            {/* 이전 페이지 */}
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={!hasPrev}
                className="p-2 rounded-lg text-gray-400 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                title="이전 페이지"
            >
                <FontAwesomeIcon icon={faChevronLeft} />
            </button>

            {/* 페이지 번호 */}
            <div className="flex items-center gap-1 mx-2">
                {getPageNumbers()[0] > 1 && (
                    <>
                        <button
                            onClick={() => onPageChange(1)}
                            className="w-10 h-10 rounded-lg text-sm font-medium text-gray-500 hover:bg-gray-100 transition-colors"
                        >
                            1
                        </button>
                        {getPageNumbers()[0] > 2 && (
                            <span className="px-1 text-gray-300">...</span>
                        )}
                    </>
                )}
                
                {getPageNumbers().map((page) => (
                    <button
                        key={page}
                        onClick={() => onPageChange(page)}
                        className={`w-10 h-10 rounded-lg text-sm font-medium transition-colors ${
                            page === currentPage
                                ? 'bg-[#191F28] text-white'
                                : 'text-gray-500 hover:bg-gray-100'
                        }`}
                    >
                        {page}
                    </button>
                ))}
                
                {getPageNumbers()[getPageNumbers().length - 1] < totalPages && (
                    <>
                        {getPageNumbers()[getPageNumbers().length - 1] < totalPages - 1 && (
                            <span className="px-1 text-gray-300">...</span>
                        )}
                        <button
                            onClick={() => onPageChange(totalPages)}
                            className="w-10 h-10 rounded-lg text-sm font-medium text-gray-500 hover:bg-gray-100 transition-colors"
                        >
                            {totalPages}
                        </button>
                    </>
                )}
            </div>

            {/* 다음 페이지 */}
            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={!hasNext}
                className="p-2 rounded-lg text-gray-400 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                title="다음 페이지"
            >
                <FontAwesomeIcon icon={faChevronRight} />
            </button>
            
            {/* 마지막 페이지 */}
            <button
                onClick={() => onPageChange(totalPages)}
                disabled={!hasNext}
                className="p-2 rounded-lg text-gray-400 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                title="마지막 페이지"
            >
                <FontAwesomeIcon icon={faAnglesRight} />
            </button>
        </div>
    );
}

// 일반 게시글 데이터 컴포넌트
function RegularPostsData({ 
    filter, 
    page,
    onPageChange,
    onResetFilter 
}: { 
    filter: PostFilterCategory; 
    page: number;
    onPageChange: (page: number) => void;
    onResetFilter: () => void;
}) {
    const { posts, meta, isLoading, error } = usePaginatedPosts(
        page,
        POSTS_PER_PAGE,
        filter === 'all' ? undefined : filter as PostCategory
    );
    
    if (isLoading && posts.length === 0) {
        return <PostsSkeleton />;
    }

    if (error) {
        return (
            <div className="text-center py-16 text-red-500">
                데이터를 불러오는 중 오류가 발생했습니다.
            </div>
        );
    }

    if (posts.length === 0) {
        return <EmptyState filter={filter} onReset={onResetFilter} />;
    }

    return (
        <>
            {/* 게시글 목록 (최신순 10개씩) */}
            <div className="space-y-3">
                {posts.map((post, idx) => (
                    <PostRow key={post.id} post={post} index={idx} hidePinIcon />
                ))}
            </div>

            {/* 로딩 오버레이 */}
            {isLoading && (
                <div className="fixed inset-0 bg-white/50 flex items-center justify-center z-10 pointer-events-none">
                    <div className="animate-spin w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full" />
                </div>
            )}

            {/* 페이지네이션 */}
            {meta && meta.totalPages > 1 && (
                <Pagination 
                    meta={meta} 
                    currentPage={page} 
                    onPageChange={onPageChange} 
                />
            )}

            {/* 페이지 정보 */}
            {meta && (
                <div className="text-center mt-4 text-sm text-gray-400">
                    전체 {meta.total}건 중 {((page - 1) * POSTS_PER_PAGE) + 1} - {Math.min(page * POSTS_PER_PAGE, meta.total)}건
                </div>
            )}
        </>
    );
}

// 게시글 목록 통합 컴포넌트
function PostsList({ 
    filter, 
    page,
    onPageChange,
    onResetFilter 
}: { 
    filter: PostFilterCategory; 
    page: number;
    onPageChange: (page: number) => void;
    onResetFilter: () => void;
}) {
    const [isPinnedCollapsed, setIsPinnedCollapsed] = useState(false);

    return (
        <>
            {/* 고정글 섹션 */}
            <Suspense fallback={<PinnedSkeleton />}>
                <PinnedPostsData 
                    filter={filter} 
                    isCollapsed={isPinnedCollapsed}
                    onToggle={() => setIsPinnedCollapsed(!isPinnedCollapsed)}
                />
            </Suspense>

            {/* 구분선 */}
            <div className="border-t border-gray-100 my-6" />

            {/* 일반 게시글 */}
            <Suspense fallback={<PostsSkeleton />}>
                <RegularPostsData 
                    filter={filter}
                    page={page}
                    onPageChange={onPageChange}
                    onResetFilter={onResetFilter}
                />
            </Suspense>
        </>
    );
}

// 메인 페이지 컴포넌트
export default function NewsPage() {
    const [filter, setFilter] = useState<PostFilterCategory>('all');
    const [page, setPage] = useState(1);

    // 필터 변경 시 페이지 초기화
    const handleFilterChange = (newFilter: PostFilterCategory) => {
        setFilter(newFilter);
        setPage(1);
    };

    // 페이지 변경 시 스크롤 상단으로
    const handlePageChange = (newPage: number) => {
        setPage(newPage);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="pt-48 pb-24 px-6 max-w-4xl mx-auto min-h-screen">
            {/* Header */}
            <div className="mb-12">
                <motion.h1 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-4xl md:text-5xl font-bold mb-6 text-[#191F28]"
                >
                    병원 소식
                </motion.h1>
                <motion.p 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-lg text-gray-500"
                >
                    마이병원의 새로운 소식과 유익한 건강 정보를 전달해 드립니다.
                </motion.p>
            </div>

            {/* Filter Tabs */}
            <div className="flex gap-2 mb-8 overflow-x-auto pb-2 scrollbar-hide">
                {FILTER_TABS.map((tab) => (
                    <motion.button
                        key={tab.key}
                        onClick={() => handleFilterChange(tab.key)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`px-5 py-2 rounded-full text-sm font-bold whitespace-nowrap ${
                            filter === tab.key 
                            ? 'bg-[#191F28] text-white shadow-md' 
                            : 'bg-gray-50 text-gray-400 hover:bg-gray-100'
                        }`}
                    >
                        {tab.label}
                    </motion.button>
                ))}
            </div>

            {/* Content Area */}
            <div className="min-h-[400px] relative">
                <Suspense fallback={<PostsSkeleton />}>
                    <PostsList 
                        filter={filter} 
                        page={page}
                        onPageChange={handlePageChange}
                        onResetFilter={() => handleFilterChange('all')} 
                    />
                </Suspense>
            </div>
        </div>
    );
}
