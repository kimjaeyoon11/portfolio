export interface ProjectLink {
  label: string;
  href: string;
  kind: "live" | "github";
}

export interface Project {
  slug: string;
  title: string;
  tagline: string;
  featured: boolean;
  period: string;
  role: string;
  icon: string;
  accent: string; // tailwind gradient classes
  highlights?: string[]; // 카드에 크게 보여줄 핵심 성과
  overview: string;
  tech: string[];
  features: string[];
  contributions: string[];
  links: ProjectLink[];
}

export const PROJECTS: Project[] = [
  {
    slug: "berry",
    title: "Berry — 엣지 AI 반려 로봇",
    tagline: "사람을 알아보고 대화하는 탁상용 AI 로봇",
    featured: true,
    period: "2026 졸업작품 · 4인 팀",
    role: "Vision AI 리드",
    icon: "🤖",
    accent: "from-emerald-500 to-teal-500",
    highlights: ["처리 속도 10~15 → 40~60fps", "통신 손상률 99.69% → 0%"],
    overview:
      "라즈베리파이 5와 Hailo-8 NPU 위에서 주인 얼굴, 손동작, 소지품을 인식하고 음성으로 대화하는 로봇. 비전 파트 전체를 맡았다.",
    tech: [
      "Python", "Raspberry Pi 5", "Hailo-8 NPU", "YOLOv8", "MediaPipe",
      "OpenCV", "ArcFace", "SQLite",
    ],
    features: [
      "손동작 가위바위보",
      "주인 얼굴·소지품 인식",
      "가까이 오면 깨어나는 근접 감지",
      "음성 대화와 장기기억",
    ],
    contributions: [
      "추론 병렬화로 10~15fps → 40~60fps",
      "원자적 파일 교체로 프로세스 간 통신 손상률 99.69% → 0%",
      "카메라 프레임 색상 순서(BGR) 오류 발견·해결",
      "시선 대신 사람 박스 크기로 근접 감지 교체",
    ],
    links: [],
  },
  {
    slug: "triplog",
    title: "TripLog — AI 여행 동선 플래너",
    tagline: "실제 지도·요금 데이터로 일정을 짜고 AI와 대화하며 고치는 여행 플래너",
    featured: true,
    period: "2026",
    role: "개인 프로젝트",
    icon: "✈️",
    accent: "from-emerald-500 to-teal-500",
    overview:
      "3D 지구본으로 여행지를 고르면 구글 지도 기반 동선과 항공·호텔 요금 예산이 자동으로 잡히고, Claude와 대화하며 일정을 바꿀 수 있다.",
    tech: [
      "Next.js 16", "TypeScript", "Tailwind CSS v4", "Three.js",
      "Google Maps Platform", "Anthropic Claude", "Supabase",
    ],
    features: [
      "3D 지구본으로 여행지 선택",
      "구간별 실제 경로·이동시간 계산",
      "항공·호텔 시세로 예산 자동 계산",
      "Claude와 대화하며 동선 수정",
    ],
    contributions: [
      "추가·삭제·드래그·AI 변경을 하나의 동선 재정렬 로직으로 통합",
      "Claude 구조화 출력으로 AI가 지도 동선을 직접 변경",
      "API 키를 서버 라우트에만 두고 응답 30분 캐싱",
    ],
    links: [
      { label: "라이브 데모", href: "https://triplog-liart.vercel.app", kind: "live" },
      { label: "GitHub", href: "https://github.com/kimjaeyoon11/triplog-ai-planner", kind: "github" },
    ],
  },
  {
    slug: "ohtani",
    title: "오타니 쇼헤이 데이터 시각화",
    tagline: "투타 겸업 기록을 스크롤로 읽는 시각화 웹",
    featured: false,
    period: "웹프로그래밍 과제",
    role: "기획 · 구현",
    icon: "⚾",
    accent: "from-teal-500 to-emerald-600",
    overview: "오타니의 투수·타자 기록을 스크롤에 따라 챕터별로 비교해 보여주는 웹.",
    tech: ["HTML", "CSS", "JavaScript", "GSAP"],
    features: [
      "챕터별 스크롤 스토리텔링",
      "투수·타자 기록 비교",
      "가로 스크롤·페이드 애니메이션",
    ],
    contributions: [
      "GSAP 타임라인으로 챕터 전환 연출",
    ],
    links: [
      { label: "라이브", href: "https://ohtani-viz.vercel.app", kind: "live" },
      { label: "GitHub", href: "https://github.com/kimjaeyoon11/ohtani-viz", kind: "github" },
    ],
  },
];

export function getProject(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}
