# 마이병원 (My Hospital) - 안과 전문 병원 웹사이트

안과 전문 병원 홍보용 반응형 웹사이트 프론트엔드 프로젝트입니다.

## 프로젝트 개요

- **목적**: 병원의 핵심 정보(의료진, 진료 분야, 오시는 길, 진료시간, 병원 소식)를 명확하고 신뢰감 있게 제공
- **지원 디바이스**: PC · 모바일 반응형
- **디자인 컨셉**: 신뢰, 안정, 선명함, 편안함

## 기술 스택

| 분류 | 기술 |
|------|------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS 4 |
| Animation | Framer Motion |
| Data Fetching | SWR |
| Form | React Hook Form + Zod |
| Icons | Font Awesome |

## 요구사항 구현 현황

### 정보 구조(IA) · 사이트맵

| 페이지 | 경로 | 상태 | 비고 |
|--------|------|------|------|
| 홈 | `/` | ✅ 완료 | 히어로, 의료진 슬라이더, 진료과목, 소식, 오시는 길 |
| 병원 소개 | `/introduce` | ✅ 완료 | 인사말, 미션·비전, 핵심가치, 통계 |
| 시설 안내 | `/introduce/facility` | ✅ 완료 | 시설/장비 갤러리 |
| 의료진 소개 | `/introduce/doctors` | ✅ 완료 | 의료진 리스트, 아코디언 상세 |
| 진료 안내 | `/services` | ✅ 완료 | 진료 카테고리 카드 |
| 이용 안내 | `/information` | ✅ 완료 | 오시는 길, 진료시간, 예약/주차 안내 |
| 병원 소식 | `/news` | ✅ 완료 | 공지/보도/이벤트 목록 |
| 소식 상세 | `/news/[id]` | ✅ 완료 | 상세 본문 |
| 온라인 상담 | `/consultation` | ✅ 완료 | 문의 등록 폼, 목록 |
| 이용약관 | `/terms` | ✅ 완료 | - |
| 개인정보처리방침 | `/privacy` | ✅ 완료 | - |
| 위치정보 이용약관 | `/location-terms` | ✅ 완료 | - |
| 환자의 권리와 의무 | `/patient-rights` | ✅ 완료 | - |
| 비급여 진료비 안내 | `/fees` | ✅ 완료 | - |

### 주요 기능

| 기능 | 상태 | 설명 |
|------|------|------|
| 반응형 레이아웃 | ✅ | PC/모바일 대응 |
| 의료진 슬라이더 | ✅ | 자동 재생, 수동 제어 |
| 의료진 상세 | ✅ | 아코디언 UI (프로필, 경력, 학력) |
| 진료 안내 카드 | ✅ | 카테고리별 정보 제공 |
| 오시는 길 | ✅ | Google Maps 임베드, 네이버/카카오맵 링크 |
| 병원 소식 | ✅ | 카테고리 필터, 핀 고정 기능 |
| 온라인 상담 폼 | ✅ | React Hook Form + Zod 유효성 검증 |
| 검색 모달 | ✅ | 전역 검색 UI |
| 스크롤 애니메이션 | ✅ | Framer Motion 기반 |
| API 연동 | ✅ | SWR 캐싱, 백엔드 API 연동 |

### 디자인 가이드 준수

| 항목 | 상태 | 설명 |
|------|------|------|
| 컬러 | ✅ | 네이비/블루 메인, 화이트 공간 확보 |
| 타이포그래피 | ✅ | Pretendard Variable, 본문 16px 이상 |
| 카드형 레이아웃 | ✅ | 리스트, 소식, 진료 안내 등 |
| 아이콘 기반 안내 | ✅ | Font Awesome 활용 |
| 접근성 | ✅ | 시맨틱 마크업, aria-label 적용 |

### 미구현 / 추후 개발 예정

| 항목 | 상태 | 비고 |
|------|------|------|
| 진료 상세 페이지 | ⏳ | 증상/진단/치료/FAQ 섹션 |
| 의료진 진료 스케줄 | ⏳ | 요일별 스케줄 표시 |
| 장비(equipments) 컬렉션 | ⏳ | CMS 연동 필요 |
| SEO 구조화 데이터 | ⏳ | MedicalClinic, Physician 스키마 |
| sitemap.xml / robots.txt | ⏳ | 검색 최적화 |
| 다국어 지원 | ⏳ | 초기 한국어 단일 |

## 프로젝트 구조

```
src/
├── app/
│   ├── (main)/              # 메인 레이아웃 그룹
│   │   ├── page.tsx         # 홈
│   │   ├── introduce/       # 병원/시설/의료진 소개
│   │   ├── services/        # 진료 안내
│   │   ├── information/     # 이용 안내
│   │   ├── news/            # 병원 소식
│   │   ├── consultation/    # 온라인 상담
│   │   └── ...              # 약관 페이지들
│   ├── (api-test)/          # API 테스트 페이지
│   ├── api/                  # API Routes
│   └── actions/              # Server Actions
├── component/                # 공통 컴포넌트
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── NavMenu.tsx
│   ├── LocationSection.tsx
│   └── ...
├── hooks/                    # Custom Hooks (SWR)
├── lib/                      # API 클라이언트, 스키마
├── types/                    # TypeScript 타입 정의
└── data/                     # 정적 데이터
```

## 시작하기

### 요구사항

- Node.js 18.17 이상
- npm 또는 yarn

### 설치

```bash
npm install
```

### 개발 서버 실행

```bash
npm run dev
```

http://localhost:3000 에서 확인

### 빌드

```bash
npm run build
npm start
```

## 환경 변수

```env
NEXT_PUBLIC_API_URL=<백엔드 API URL>
```

## 벤치마킹 참고

- [김포우리안과](https://gimpoeye.com/)
- [이미지안과의원](https://goodimageclinic.com/)
- [함소아한의원](https://www.hamsoa.com/)

## 라이선스

Private - All rights reserved
