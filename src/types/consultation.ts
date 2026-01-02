export type ConsultationStatus = 'pending' | 'answered' | 'closed';

export interface Consultation {
  id: number;
  name: string;
  phone: string;
  doctorId: number | null;
  doctorName: string | null;
  category: string;
  content: string;
  privacyAgreed: boolean;
  status: ConsultationStatus;
  answer: string | null;
  answeredAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CreateConsultationPayload {
  name: string;
  phone: string;
  doctorId?: number;
  doctorName?: string;
  category: string;
  content: string;
  privacyAgreed: boolean;
}

// 상태 라벨 매핑
export const CONSULTATION_STATUS_LABELS: Record<ConsultationStatus, string> = {
  pending: '대기중',
  answered: '답변완료',
  closed: '종료',
};

// 상태 색상 매핑
export const CONSULTATION_STATUS_COLORS: Record<ConsultationStatus, string> = {
  pending: 'bg-yellow-100 text-yellow-800',
  answered: 'bg-green-100 text-green-800',
  closed: 'bg-gray-100 text-gray-600',
};
