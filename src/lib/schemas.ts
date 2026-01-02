import { z } from 'zod';

// ============================================
// Doctor 스키마
// ============================================

export const DoctorApiResponseSchema = z.object({
  id: z.number(),
  name: z.string(),
  specialty: z.string(),
  description: z.string().nullable(),
  isRepresentative: z.boolean().optional(),
});

export const DoctorDetailSchema = DoctorApiResponseSchema.extend({
  profileImage: z.string().optional(),
  education: z.array(z.string()).optional(),
  career: z.array(z.string()).optional(),
  certifications: z.array(z.string()).optional(),
});

export const DoctorsArraySchema = z.array(DoctorApiResponseSchema);

// ============================================
// Post 스키마
// ============================================

export const PostCategorySchema = z.enum(['공지', '뉴스', '이벤트', '건강정보', '채용']);

export const PostSchema = z.object({
  id: z.number(),
  title: z.string(),
  content: z.string(),
  authorId: z.number(),
  createdAt: z.string(),
  category: PostCategorySchema,
  summary: z.string().nullable(),
  thumbnailUrl: z.string().nullable(),
  isPinned: z.boolean(),
  isPublished: z.boolean(),
  viewCount: z.number(),
  updatedAt: z.string(),
  publishedAt: z.string().nullable(),
});

export const PostsArraySchema = z.array(PostSchema);

// 페이지네이션 메타 정보
export const PaginationMetaSchema = z.object({
  total: z.number(),
  page: z.number(),
  limit: z.number(),
  totalPages: z.number(),
  hasNext: z.boolean(),
  hasPrev: z.boolean(),
});

// 페이지네이션된 게시글 응답
export const PaginatedPostsSchema = z.object({
  data: PostsArraySchema,
  meta: PaginationMetaSchema,
});

// ============================================
// Consultation 스키마
// ============================================

export const ConsultationStatusSchema = z.enum(['pending', 'answered', 'closed']);

export const ConsultationFormSchema = z.object({
  name: z
    .string()
    .min(1, '성함을 입력해주세요.')
    .min(2, '성함은 2자 이상 입력해주세요.')
    .max(20, '성함은 20자 이하로 입력해주세요.'),
  phone: z
    .string()
    .min(1, '연락처를 입력해주세요.')
    .regex(
      /^01[016789]-?\d{3,4}-?\d{4}$/,
      '올바른 휴대폰 번호 형식이 아닙니다. (예: 010-1234-5678)'
    ),
  doctorId: z.number().optional(),
  doctorName: z.string().optional(),
  category: z
    .string()
    .min(1, '상담 분야를 선택해주세요.'),
  content: z
    .string()
    .min(1, '상담 내용을 입력해주세요.')
    .min(10, '상담 내용은 10자 이상 입력해주세요.')
    .max(2000, '상담 내용은 2000자 이하로 입력해주세요.'),
  privacyAgreed: z
    .boolean()
    .refine((val) => val === true, '개인정보 수집 및 이용에 동의해주세요.'),
});

export const ConsultationSchema = z.object({
  id: z.number(),
  name: z.string(),
  phone: z.string(),
  doctorId: z.number().nullable(),
  doctorName: z.string().nullable(),
  category: z.string(),
  content: z.string(),
  privacyAgreed: z.boolean(),
  status: ConsultationStatusSchema,
  answer: z.string().nullable(),
  answeredAt: z.string().nullable(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const ConsultationsArraySchema = z.array(ConsultationSchema);

// ============================================
// 타입 추론
// ============================================

export type DoctorApiResponse = z.infer<typeof DoctorApiResponseSchema>;
export type DoctorDetail = z.infer<typeof DoctorDetailSchema>;
export type Post = z.infer<typeof PostSchema>;
export type PostCategory = z.infer<typeof PostCategorySchema>;
export type PaginationMeta = z.infer<typeof PaginationMetaSchema>;
export type PaginatedPosts = z.infer<typeof PaginatedPostsSchema>;
export type ConsultationForm = z.infer<typeof ConsultationFormSchema>;
export type ConsultationResponse = z.infer<typeof ConsultationSchema>;
export type ConsultationStatusType = z.infer<typeof ConsultationStatusSchema>;
