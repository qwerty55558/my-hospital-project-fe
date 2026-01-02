import useSWR, { mutate } from 'swr';
import { createValidatedFetcher, fetchClient } from '@/lib/api';
import { ConsultationsArraySchema, ConsultationSchema, type ConsultationForm } from '@/lib/schemas';
import type { ConsultationStatus } from '@/types/consultation';

// SWR fetcher with Zod validation
const consultationsFetcher = createValidatedFetcher(ConsultationsArraySchema);
const consultationFetcher = createValidatedFetcher(ConsultationSchema);

/**
 * 상담 목록 조회 훅
 */
export function useConsultations(status?: ConsultationStatus) {
  const path = status ? `/consultations?status=${status}` : '/consultations';
  
  const { data, error, isLoading, isValidating } = useSWR(
    path,
    consultationsFetcher,
    {
      revalidateOnFocus: false,
      dedupingInterval: 5000,
    }
  );

  return {
    consultations: data ?? [],
    isLoading,
    isValidating,
    error,
  };
}

/**
 * 상담 단건 조회 훅
 */
export function useConsultation(id: number | null) {
  const { data, error, isLoading } = useSWR(
    id ? `/consultations/${id}` : null,
    consultationFetcher,
    {
      revalidateOnFocus: false,
    }
  );

  return {
    consultation: data ?? null,
    isLoading,
    error,
  };
}

/**
 * 상담 생성 함수
 */
export async function createConsultation(payload: ConsultationForm) {
  const response = await fetchClient('/consultations', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
  
  // 목록 캐시 무효화
  mutate((key) => typeof key === 'string' && key.startsWith('/consultations'));
  
  return response;
}

/**
 * 상담 삭제 함수
 */
export async function deleteConsultation(id: number) {
  const response = await fetchClient(`/consultations/${id}`, {
    method: 'DELETE',
  });
  
  // 목록 캐시 무효화
  mutate((key) => typeof key === 'string' && key.startsWith('/consultations'));
  
  return response;
}
