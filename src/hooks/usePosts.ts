import useSWR, { SWRConfiguration } from 'swr';
import { createValidatedFetcher } from '@/lib/api';
import { 
  PostSchema, 
  PaginatedPostsSchema,
  type Post,
  type PaginatedPosts,
  type PaginationMeta,
  type PostCategory,
} from '@/lib/schemas';

// Zod 검증 적용된 fetcher
const postFetcher = createValidatedFetcher(PostSchema);
const paginatedPostsFetcher = createValidatedFetcher(PaginatedPostsSchema);

// SWR 기본 설정
const SWR_CONFIG: SWRConfiguration = {
  revalidateOnFocus: false,
  revalidateOnReconnect: true,
  dedupingInterval: 60000,
  errorRetryCount: 3,
};

// 캐시 시간
const CACHE_TIME = {
  SHORT: 30 * 1000,
  MEDIUM: 5 * 60 * 1000,
  LONG: 30 * 60 * 1000,
};

/**
 * 전체 게시글 목록 조회
 * - API가 페이지네이션 응답을 반환하므로 paginatedPostsFetcher 사용
 */
export function usePosts(options?: SWRConfiguration) {
  const { data, error, isLoading, mutate } = useSWR<PaginatedPosts>(
    '/posts?page=1&limit=100',
    paginatedPostsFetcher,
    {
      ...SWR_CONFIG,
      dedupingInterval: CACHE_TIME.MEDIUM,
      ...options,
    }
  );

  return {
    posts: data?.data || [],
    isLoading,
    error,
    mutate,
  };
}

/**
 * Pinned 게시글만 조회
 * - 페이지네이션 API에서 전체 데이터 가져와서 isPinned 필터링
 */
export function usePinnedPosts(limit: number = 100, options?: SWRConfiguration) {
  const { data, error, isLoading, mutate } = useSWR<PaginatedPosts>(
    '/posts?page=1&limit=100', // 충분히 큰 limit으로 전체 조회
    paginatedPostsFetcher,
    {
      ...SWR_CONFIG,
      dedupingInterval: CACHE_TIME.LONG,
      ...options,
    }
  );

  // isPinned가 true인 것만 필터링하고 최신순 정렬
  const pinnedPosts = data?.data
    ? data.data
        .filter((post) => post.isPinned && post.isPublished)
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .slice(0, limit)
    : [];

  return {
    posts: pinnedPosts,
    isLoading,
    error,
    mutate,
  };
}

/**
 * 카테고리별 게시글 조회
 * - API가 페이지네이션 응답을 반환하므로 paginatedPostsFetcher 사용
 */
export function usePostsByCategory(category: string, options?: SWRConfiguration) {
  const { data, error, isLoading, mutate } = useSWR<PaginatedPosts>(
    '/posts?page=1&limit=100',
    paginatedPostsFetcher,
    {
      ...SWR_CONFIG,
      dedupingInterval: CACHE_TIME.MEDIUM,
      ...options,
    }
  );

  const filteredPosts = data?.data
    ? data.data
        .filter((post: Post) => post.isPublished && (category === 'all' || post.category === category))
        .sort((a: Post, b: Post) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    : [];

  return {
    posts: filteredPosts,
    isLoading,
    error,
    mutate,
  };
}

/**
 * 게시글 단건 조회
 */
export function usePost(id: number | null, options?: SWRConfiguration) {
  const { data, error, isLoading, mutate } = useSWR(
    id ? `/posts/${id}` : null,
    postFetcher,
    {
      ...SWR_CONFIG,
      dedupingInterval: CACHE_TIME.SHORT,
      ...options,
    }
  );

  return {
    post: data || null,
    isLoading,
    error,
    mutate,
  };
}

/**
 * 페이지네이션된 게시글 목록 조회
 * @param page - 페이지 번호 (1부터 시작)
 * @param limit - 페이지당 항목 수
 * @param category - 카테고리 필터 (optional)
 * @param useSuspense - Suspense 사용 여부
 */
export function usePaginatedPosts(
  page: number = 1,
  limit: number = 10,
  category?: PostCategory | 'all',
  useSuspense: boolean = false,
  options?: SWRConfiguration
) {
  // category가 'all'이면 쿼리에서 제외
  const categoryParam = category && category !== 'all' ? `&category=${encodeURIComponent(category)}` : '';
  const key = `/posts?page=${page}&limit=${limit}${categoryParam}`;

  const { data, error, isLoading, mutate } = useSWR<PaginatedPosts>(
    key,
    paginatedPostsFetcher,
    {
      ...SWR_CONFIG,
      dedupingInterval: CACHE_TIME.SHORT,
      keepPreviousData: true, // 페이지 전환 시 이전 데이터 유지
      suspense: useSuspense,
      ...options,
    }
  );

  return {
    posts: data?.data || [],
    meta: data?.meta || null,
    isLoading,
    error,
    mutate,
  };
}

// Post 타입 re-export
export type { Post, PaginatedPosts, PaginationMeta };
