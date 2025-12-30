import useSWR, { SWRConfiguration } from 'swr';

// ============================================
// 기본 Fetcher
// ============================================
export const fetchClient = async (path: string, options?: RequestInit) => {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL?.replace(/\/api$/, '') || '';
  const url = `${baseUrl}${path}`;

  try {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      return await response.json();
    }
    
    return await response.text();
  } catch (error) {
    console.error('API Request Failed:', error);
    throw error;
  }
};

// SWR용 fetcher (경로만 받아서 fetchClient 호출)
const swrFetcher = (path: string) => fetchClient(path);

// ============================================
// 타입 정의
// ============================================

// Doctor 타입 정의
export interface DoctorApiResponse {
  id: number;
  name: string;
  specialty: string;
  description: string | null;
  isRepresentative?: boolean;
}

// Doctor 상세 정보 (단건 조회)
export interface DoctorDetail extends DoctorApiResponse {
  profileImage?: string;
  education?: string[];
  career?: string[];
  certifications?: string[];
}

// 프론트엔드에서 사용할 확장된 Doctor 타입
export interface Doctor extends DoctorApiResponse {
  role: string;
  catchphrase: string;
  imageSrc: string;
  bgClass: string;
  layoutType: string;
}

// ============================================
// 스타일 설정
// ============================================

// Doctor별 추가 정보 (스타일, 레이아웃 등) - id 기반 매핑
const DOCTOR_STYLE_CONFIG: Record<number, Omit<Doctor, keyof DoctorApiResponse>> = {
  1: {
    role: "대표원장",
    catchphrase: "20년의 노하우,\n빛을 선물합니다.",
    imageSrc: "/img/profile_doctor-1.jpg",
    bgClass: "primary-bg-1",
    layoutType: "center-focus",
  },
  2: {
    role: "원장",
    catchphrase: "0.1mm의 오차도\n허용하지 않는 정밀함",
    imageSrc: "/img/profile_doctor-3.jpg",
    bgClass: "primary-bg-2",
    layoutType: "asymmetric-left",
  },
  3: {
    role: "원장",
    catchphrase: "우리 아이의 눈,\n평생 건강의 시작입니다",
    imageSrc: "/img/profile_doctor-4.jpg",
    bgClass: "primary-bg-3",
    layoutType: "soft-rounded",
  },
  4: {
    role: "원장",
    catchphrase: "흐릿해진 시야를\n다시 맑고 투명하게",
    imageSrc: "/img/profile_doctor-2.jpg",
    bgClass: "primary-bg-4",
    layoutType: "magazine-overlap",
  },
};

// 기본 스타일 (새로운 의사 추가 시 사용)
const DEFAULT_STYLE: Omit<Doctor, keyof DoctorApiResponse> = {
  role: "원장",
  catchphrase: "최선의 진료를\n약속드립니다.",
  imageSrc: "/img/profile_doctor-1.jpg",
  bgClass: "primary-bg-1",
  layoutType: "center-focus",
};

// API 응답을 프론트엔드용 Doctor로 변환
export function mapDoctorResponse(apiDoctor: DoctorApiResponse): Doctor {
  const styleConfig = DOCTOR_STYLE_CONFIG[apiDoctor.id] || DEFAULT_STYLE;
  return {
    ...apiDoctor,
    ...styleConfig,
  };
}

// ============================================
// SWR 캐싱 설정
// ============================================

/**
 * SWR 글로벌 캐싱 옵션
 * 
 * - revalidateOnFocus: 탭 포커스 시 재검증 (기본 true)
 * - revalidateOnReconnect: 네트워크 재연결 시 재검증
 * - dedupingInterval: 중복 요청 방지 간격 (ms)
 * - refreshInterval: 자동 갱신 주기 (0 = 비활성화)
 * - errorRetryCount: 에러 시 재시도 횟수
 */
export const SWR_CONFIG: SWRConfiguration = {
  revalidateOnFocus: false,      // 탭 전환 시 재요청 안함
  revalidateOnReconnect: true,   // 네트워크 복구 시 재요청
  dedupingInterval: 60000,       // 1분간 중복 요청 방지
  errorRetryCount: 3,            // 에러 시 3회 재시도
  // refreshInterval: 0,         // 자동 폴링 비활성화 (필요 시 활성화)
};

// 캐시 시간 프리셋 (staleTime 용도)
export const CACHE_TIME = {
  SHORT: 30 * 1000,              // 30초 - 자주 변경되는 데이터
  MEDIUM: 5 * 60 * 1000,         // 5분 - 일반 데이터
  LONG: 30 * 60 * 1000,          // 30분 - 거의 변경 안되는 데이터
  STATIC: 60 * 60 * 1000,        // 1시간 - 정적 데이터
};

// ============================================
// 직접 API 호출 함수 (레거시 호환 + SSR용)
// ============================================

// Doctors API 호출 (전체)
export async function fetchDoctors(): Promise<Doctor[]> {
  const response: DoctorApiResponse[] = await fetchClient('/doctors');
  return response.map(mapDoctorResponse);
}

// 대표 의사 목록 조회
export async function fetchRepresentativeDoctors(): Promise<Doctor[]> {
  const response: DoctorApiResponse[] = await fetchClient('/doctors/representatives');
  return response.map(mapDoctorResponse);
}

// 의사 상세 정보 조회 (단건)
export async function fetchDoctorDetail(id: number): Promise<DoctorDetail> {
  const response: DoctorDetail = await fetchClient(`/doctors/${id}`);
  return response;
}

// ============================================
// SWR Hooks (캐싱 적용)
// ============================================

/**
 * 대표 의료진 목록 조회 (캐싱)
 * 
 * @example
 * const { doctors, isLoading, error, mutate } = useRepresentativeDoctors();
 * 
 * // 수동 갱신
 * mutate(); // 재요청
 */
export function useRepresentativeDoctors(options?: SWRConfiguration) {
  const { data, error, isLoading, mutate } = useSWR<DoctorApiResponse[]>(
    '/doctors/representatives',
    swrFetcher,
    {
      ...SWR_CONFIG,
      dedupingInterval: CACHE_TIME.LONG,  // 30분간 캐싱
      ...options,
    }
  );

  return {
    doctors: data ? data.map(mapDoctorResponse) : [],
    isLoading,
    error,
    mutate,  // 수동 갱신용
  };
}

/**
 * 전체 의료진 목록 조회 (캐싱)
 */
export function useDoctors(options?: SWRConfiguration) {
  const { data, error, isLoading, mutate } = useSWR<DoctorApiResponse[]>(
    '/doctors',
    swrFetcher,
    {
      ...SWR_CONFIG,
      dedupingInterval: CACHE_TIME.LONG,
      ...options,
    }
  );

  return {
    doctors: data ? data.map(mapDoctorResponse) : [],
    isLoading,
    error,
    mutate,
  };
}

/**
 * 의사 상세 정보 조회 (캐싱)
 * 
 * @param id - 의사 ID (null이면 요청 안함)
 * 
 * @example
 * const { detail, isLoading } = useDoctorDetail(selectedDoctorId);
 */
export function useDoctorDetail(id: number | null, options?: SWRConfiguration) {
  const { data, error, isLoading, mutate } = useSWR<DoctorDetail>(
    id ? `/doctors/${id}` : null,  // id가 없으면 요청 안함
    swrFetcher,
    {
      ...SWR_CONFIG,
      dedupingInterval: CACHE_TIME.MEDIUM,  // 5분간 캐싱
      ...options,
    }
  );

  return {
    detail: data || null,
    isLoading,
    error,
    mutate,
  };
}

// ============================================
// 캐시 유틸리티
// ============================================

/**
 * 특정 키의 캐시 무효화 (수동 갱신 트리거)
 * 
 * @example
 * import { mutate } from 'swr';
 * import { invalidateCache } from '@/lib/api';
 * 
 * // 의료진 데이터 갱신
 * invalidateCache('/doctors/representatives');
 */
export { mutate as invalidateCache } from 'swr';
