'use server';

import { PaginatedPostsSchema, PostsArraySchema, type Post } from '@/lib/schemas';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL?.replace(/\/api$/, '') || 'http://127.0.0.1:3030';

/**
 * 고정 게시글만 조회 (Server Action)
 * - 첫 페이지 로드 시 한 번만 호출
 * - 캐시하여 페이지 이동 시에도 유지
 */
export async function getPinnedPosts(category?: string): Promise<Post[]> {
  try {
    // limit을 크게 잡아서 전체 pinned 게시글을 가져옴 (보통 5개 이하)
    const categoryParam = category && category !== 'all' ? `&category=${encodeURIComponent(category)}` : '';
    const url = `${API_BASE_URL}/posts?page=1&limit=100${categoryParam}`;
    
    const response = await fetch(url, {
      headers: { 'Content-Type': 'application/json' },
      next: { revalidate: 60 }, // 60초 캐시
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    const json = await response.json();
    const parsed = PaginatedPostsSchema.safeParse(json);
    
    if (!parsed.success) {
      console.error('Validation error:', parsed.error);
      return [];
    }

    // isPinned가 true인 것만 필터링
    return parsed.data.data.filter(post => post.isPinned && post.isPublished);
  } catch (error) {
    console.error('Failed to fetch pinned posts:', error);
    return [];
  }
}

/**
 * 페이지네이션된 게시글 조회 (고정글 제외)
 * - 일반 게시글만 조회
 */
export async function getRegularPosts(
  page: number = 1,
  limit: number = 10,
  category?: string
): Promise<{ posts: Post[]; meta: { total: number; page: number; limit: number; totalPages: number; hasNext: boolean; hasPrev: boolean } | null }> {
  try {
    const categoryParam = category && category !== 'all' ? `&category=${encodeURIComponent(category)}` : '';
    const url = `${API_BASE_URL}/posts?page=${page}&limit=${limit}${categoryParam}`;
    
    const response = await fetch(url, {
      headers: { 'Content-Type': 'application/json' },
      cache: 'no-store', // 항상 최신 데이터
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    const json = await response.json();
    const parsed = PaginatedPostsSchema.safeParse(json);
    
    if (!parsed.success) {
      console.error('Validation error:', parsed.error);
      return { posts: [], meta: null };
    }

    // 고정글 제외한 일반 게시글만 반환
    const regularPosts = parsed.data.data.filter(post => !post.isPinned);
    
    // meta 정보는 전체 기준이므로 조정 필요 없음 (API가 이미 정렬된 데이터 반환)
    return {
      posts: regularPosts,
      meta: parsed.data.meta,
    };
  } catch (error) {
    console.error('Failed to fetch regular posts:', error);
    return { posts: [], meta: null };
  }
}
