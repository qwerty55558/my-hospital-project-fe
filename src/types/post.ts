import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faBullhorn, faNewspaper, faCalendarCheck, faHeartPulse, faBriefcase } from '@fortawesome/free-solid-svg-icons';

// DB 카테고리 enum
export type PostCategoryType = '공지' | '뉴스' | '이벤트' | '건강정보' | '채용';

// 필터용 카테고리 (all 포함)
export type PostFilterCategory = 'all' | PostCategoryType;

// Post API 응답 타입
export interface Post {
  id: number;
  title: string;
  content: string;
  authorId: number;
  createdAt: string;
  category: PostCategoryType;
  summary: string | null;
  thumbnailUrl: string | null;
  isPinned: boolean;
  isPublished: boolean;
  viewCount: number;
  updatedAt: string;
  publishedAt: string | null;
}

// 카테고리 정보 타입
export interface CategoryInfo {
  label: string;
  bg: string;
  text: string;
  icon: IconDefinition;
}

// 카테고리별 설정
export const CATEGORY_CONFIG: Record<PostCategoryType, CategoryInfo> = {
  '공지': { 
    label: '공지사항', 
    bg: 'bg-blue-100', 
    text: 'text-blue-600',
    icon: faBullhorn 
  },
  '뉴스': { 
    label: '언론보도', 
    bg: 'bg-gray-100', 
    text: 'text-gray-600',
    icon: faNewspaper 
  },
  '이벤트': { 
    label: '이벤트', 
    bg: 'bg-pink-100', 
    text: 'text-pink-600',
    icon: faCalendarCheck 
  },
  '건강정보': { 
    label: '건강정보', 
    bg: 'bg-green-100', 
    text: 'text-green-600',
    icon: faHeartPulse 
  },
  '채용': { 
    label: '채용공고', 
    bg: 'bg-purple-100', 
    text: 'text-purple-600',
    icon: faBriefcase 
  },
};

// 필터 탭 목록
export const FILTER_TABS: { key: PostFilterCategory; label: string }[] = [
  { key: 'all', label: '전체' },
  { key: '공지', label: '공지사항' },
  { key: '뉴스', label: '언론보도' },
  { key: '이벤트', label: '이벤트' },
  { key: '건강정보', label: '건강정보' },
  { key: '채용', label: '채용공고' },
];

// 카테고리 라벨 매핑 (하위 호환)
export const CATEGORY_LABELS: Record<string, string> = Object.fromEntries(
  Object.entries(CATEGORY_CONFIG).map(([key, val]) => [key, val.label])
);

// 카테고리별 스타일 (하위 호환)
export const CATEGORY_STYLES: Record<string, { bg: string; text: string }> = Object.fromEntries(
  Object.entries(CATEGORY_CONFIG).map(([key, val]) => [key, { bg: val.bg, text: val.text }])
);
