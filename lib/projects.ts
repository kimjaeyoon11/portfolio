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
    slug: "berry",
    title: "Berry — 엣지 AI 반려 로봇",
    tagline: "라즈베리파이 5 + Hailo-8 NPU 위에서 사람을 알아보고 대화하는 데스크톱 로봇",
    featured: true,
    period: "2026 · 졸업작품 (4인 팀 While(True))",
    role: "Vision AI 리드",
    icon: "🤖",
    accent: "from-emerald-500 to-teal-500",
    overview:
      "BMO에서 영감을 받은 데스크톱 AI 반려 로봇. 카메라로 주인과 손동작, 소지품을 인식하고 음성으로 대화하며 표정으로 반응한다. 비전·대화·UI를 독립 프로세스로 나눠 한 모듈이 죽어도 나머지가 계속 동작하도록 설계했다. 그중 비전 파트 전체를 맡았다.",
    tech: [
      "Python", "Raspberry Pi 5", "Hailo-8 NPU (26 TOPS)", "YOLOv8", "MediaPipe",
      "OpenCV", "ArcFace", "picamera2", "SQLite", "pytest",
    ],
    features: [
      "손동작 가위바위보 게임",
      "등록된 주인 얼굴 인식(ArcFace)",
      "등록한 소지품·착용 모자 인식",
      "사람이 가까이 오면 깨어나는 근접 웨이크업",
      "음성 대화(STT → LLM → TTS)와 이름·취미 장기기억",
      "대화에 따라 바뀌는 표정 UI와 미니 앱 5종",
    ],
    contributions: [
      "MediaPipe와 Hailo 추론을 스레드로 병렬화하고 공유 메모리로 결과를 합쳐 10~15fps → 40~60fps",
      "프로세스 간 JSON 통신을 임시 파일 + 원자적 교체(os.replace)로 바꿔 읽기 손상률 99.69% → 0%",
      "picamera2의 RGB888 프레임이 실제로는 BGR 순서임을 찾아내 인식 오류 해결",
      "손동작 판별을 거리비 방식에서 관절 각도 + 거리비 결합 방식으로 개선",
      "시선 기반 웨이크업을 YOLO 사람 박스 높이 + 히스테리시스 기반 근접 감지로 교체",
      "카메라·NPU·마이크 없이 돌아가는 테스트 구조로 하드웨어 없이 검증 가능하게 구성",
    ],
    links: [],
  },
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
      { label: "라이브 데모", href: "https://triplog-liart.vercel.app", kind: "live" },
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
];

export function getProject(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}
