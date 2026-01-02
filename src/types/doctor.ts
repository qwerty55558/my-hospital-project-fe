// Doctor API 응답 타입
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
