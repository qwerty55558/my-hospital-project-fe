import useSWR, { SWRConfiguration } from 'swr';
import { createValidatedFetcher } from '@/lib/api';
import { DoctorsArraySchema, DoctorDetailSchema, DoctorApiResponse } from '@/lib/schemas';

// Zod 검증 적용된 fetcher
const doctorsFetcher = createValidatedFetcher(DoctorsArraySchema);
const doctorDetailFetcher = createValidatedFetcher(DoctorDetailSchema);

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
  STATIC: 60 * 60 * 1000,
};

// Doctor 스타일 설정
interface DoctorStyle {
  role: string;
  catchphrase: string;
  imageSrc: string;
  bgClass: string;
  layoutType: string;
}

const DOCTOR_STYLE_CONFIG: Record<number, DoctorStyle> = {
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

const DEFAULT_STYLE: DoctorStyle = {
  role: "원장",
  catchphrase: "최선의 진료를\n약속드립니다.",
  imageSrc: "/img/profile_doctor-1.jpg",
  bgClass: "primary-bg-1",
  layoutType: "center-focus",
};

// 확장된 Doctor 타입
export interface Doctor extends DoctorApiResponse, DoctorStyle {}

// API 응답 → Doctor 변환
function mapDoctorResponse(apiDoctor: DoctorApiResponse): Doctor {
  const styleConfig = DOCTOR_STYLE_CONFIG[apiDoctor.id] || DEFAULT_STYLE;
  return {
    ...apiDoctor,
    ...styleConfig,
  };
}

/**
 * 대표 의료진 목록 조회
 */
export function useRepresentativeDoctors(options?: SWRConfiguration) {
  const { data, error, isLoading, mutate } = useSWR(
    '/doctors/representatives',
    doctorsFetcher,
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
 * 전체 의료진 목록 조회
 */
export function useDoctors(options?: SWRConfiguration) {
  const { data, error, isLoading, mutate } = useSWR(
    '/doctors',
    doctorsFetcher,
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
 * 의사 상세 정보 조회 (조건부 fetch)
 */
export function useDoctorDetail(id: number | null, options?: SWRConfiguration) {
  const { data, error, isLoading, mutate } = useSWR(
    id ? `/doctors/${id}` : null,
    doctorDetailFetcher,
    {
      ...SWR_CONFIG,
      dedupingInterval: CACHE_TIME.MEDIUM,
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
