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
  overview: string;
  tech: string[];
  features: string[];
  contributions: string[];
  links: ProjectLink[];
}

export const PROJECTS: Project[] = [
  {
    slug: "triplog",
    title: "TripLog — AI 여행 동선 플래너",
    tagline: "지구본을 돌려 고르면 실제 지도·요금·AI로 완성되는 여행 플래너",
    featured: true,
    period: "2026",
    role: "기획 · 설계 · 구현 전부 (개인 프로젝트)",
    icon: "✈️",
    accent: "from-emerald-500 to-teal-500",
    overview:
      "3D 지구본으로 여행지를 고르면 실제 구글 지도 기반 동선을 자동으로 그리고, 실제 항공·호텔 요금으로 예산을 잡으며, Claude와 대화하며 일정을 다듬는 여행 플래너. 여러 실데이터(지도·경로·요금·LLM)를 하나의 UX로 통합했다.",
    tech: [
      "Next.js 16 (App Router)", "TypeScript", "Tailwind CSS v4", "Three.js",
      "Google Maps Platform (Maps JS / Routes / Places New / Weather)",
      "Anthropic Claude Opus 4.8 (구조화 출력)", "RapidAPI booking-com15", "Supabase (PostgreSQL)",
    ],
    features: [
      "3D 지구본 탐색(대륙 외곽선 클릭 → 워프 진입)",
      "명소 선택 시 Routes API로 구간별 실제 경로·거리·시간 계산",
      "이동수단 비교·전환(대중교통·신칸센/자동차/도보/항공)",
      "인천↔목적지 왕복 항공 최저가 + 호텔 시세로 예산 자동 계산",
      "Places 검색으로 점심·저녁 자동 배치",
      "N박 M일 Day 동선(공항→호텔→명소→호텔→공항)",
      "Claude와 대화하며 동선 실시간 재구성",
      "타임라인 드래그·↑↓·삭제 자유 편집",
    ],
    contributions: [
      "명령형 폴리라인 관리로 언마운트 시 고아 경로선 제거(선언형 Polyline 한계 해결)",
      "명소 추가·삭제·드래그·AI 변경을 reorderPlaces 단일 파이프라인으로 수렴 + 최근접 이웃 최적화",
      "'하루=한 도시' 모델로 다중 도시 여행의 비현실적 호텔 왕복 동선 방지",
      "Claude 구조화 출력({reply, changed, places})으로 AI가 실제 지도 동선을 변경",
      "서버 전용 라우트로 API 키 격리(클라이언트 번들 미포함), 30분 인메모리 캐싱",
    ],
    links: [
      { label: "라이브 데모", href: "https://triplog-ai-planner.vercel.app", kind: "live" },
      { label: "GitHub", href: "https://github.com/kimjaeyoon11/triplog-ai-planner", kind: "github" },
    ],
  },
  {
    slug: "ohtani",
    title: "오타니 쇼헤이 데이터 시각화",
    tagline: "스크롤 스토리텔링으로 풀어낸 투타 겸업(이도류) 기록",
    featured: false,
    period: "동명대 웹프로그래밍",
    role: "기획 · 구현",
    icon: "⚾",
    accent: "from-teal-500 to-emerald-600",
    overview:
      "야구 선수 오타니 쇼헤이의 투타 겸업 기록을 스크롤 스토리텔링으로 비교·시각화한 웹. 복잡한 통계를 스토리 흐름으로 재구성해 몰입감 있게 전달한다.",
    tech: ["HTML", "CSS", "Vanilla JavaScript", "GSAP (ScrollTrigger)"],
    features: [
      "스크롤 스토리텔링(챕터 내비게이션)",
      "투수/타자 데이터 비교 섹션(이도류)",
      "가로 스크롤·틸트·페이드·미디어 팬 애니메이션",
      "관성 스무스 스크롤",
    ],
    contributions: [
      "GSAP 타임라인·스크롤 연동으로 챕터 전환 연출 구현",
      "통계 데이터를 스토리 흐름에 맞춰 재구성",
    ],
    links: [
      { label: "라이브", href: "https://ohtani-viz.vercel.app", kind: "live" },
      { label: "GitHub", href: "https://github.com/kimjaeyoon11/ohtani-viz", kind: "github" },
    ],
  },
  {
    slug: "berry",
    title: "Berry — Raspberry Pi Pico 오디오 시스템",
    tagline: "임베디드 오디오 입출력 · I2S 핀 공유 최적화",
    featured: false,
    period: "임베디드 프로젝트",
    role: "구현",
    icon: "🎵",
    accent: "from-green-500 to-teal-600",
    overview:
      "임베디드 환경에서 오디오 앰프·마이크 모듈을 Raspberry Pi Pico와 연동해 오디오 입출력 시스템을 구축한 'Berry' 프로젝트. 하드웨어 제약 속에서 창의적 해결책을 도출했다.",
    tech: ["Raspberry Pi Pico", "I2S 오디오 인터페이스", "하드웨어 인터페이싱"],
    features: ["오디오 앰프·마이크 모듈 연동", "I2S 기반 입출력"],
    contributions: ["I2S 핀 공유 최적화로 하드웨어 제약 해결"],
    links: [],
  },
];

export function getProject(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}
