# 포트폴리오 사이트 개선·배포 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 기존 `AI02/portfolio`(Next.js)를 채용용 고품질 포트폴리오로 개선하고 Vercel에 배포한다 — GSAP 스크롤 연출·3D 히어로·프로젝트 상세 "설명서" 포함.

**Architecture:** 단일 랜딩(`app/page.tsx`)이 섹션 컴포넌트를 조합하고, 프로젝트는 동적 라우트(`app/projects/[slug]/page.tsx`)로 상세 페이지를 렌더. 프로젝트 데이터는 `lib/projects.ts` 단일 출처. 애니메이션 엔진은 GSAP 단일화(ScrollTrigger·SplitText + `@gsap/react`의 `useGSAP`), 스무스 스크롤은 Lenis, 히어로 3D는 `@react-three/fiber`. 모든 모션은 `prefers-reduced-motion`을 존중.

**Tech Stack:** Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4, GSAP 3.13 (ScrollTrigger, SplitText) + `@gsap/react`, Lenis, three + `@react-three/fiber` + `@react-three/drei`, `lucide-react`, `next/font`.

## Global Constraints

- Next.js 16.2.9 / React 19.2.4 / Tailwind v4 유지(버전 다운그레이드 금지).
- 애니메이션 엔진은 **GSAP 단일화** — Framer Motion 등 병행 도입 금지.
- 모든 스크롤/모션 애니메이션은 `prefers-reduced-motion: reduce`일 때 비활성 또는 즉시 최종 상태로 표시.
- 순수 정적/클라이언트 사이트 — 백엔드·DB·환경변수·비밀키 없음.
- 인물 정보(정확히 이 값): 이름 "김재윤 / Kim Jaeyoon", 학력 "동명대학교 컴퓨터공학과", 병역 "2024-06-04 육군 병장 만기전역", 자격증 "Microsoft Azure AI-900", "운전면허 1종", 이메일 "kimjeayoon1@naver.com", GitHub "github.com/kimjaeyoon11".
- 프로젝트 데이터는 `lib/projects.ts` 단일 출처에서만 정의(카드·상세 공용).
- 프론트엔드 특성상 각 태스크의 검증은 유닛테스트가 아니라 **`npm run build` + `npm run lint` 통과 + dev 서버 렌더 육안 확인**으로 한다(별도 테스트 러너 미도입 = YAGNI).
- 커밋 컨벤션: 커밋 메시지 끝에 `Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>`. 푸시는 사용자 승인 후에만.

---

### Task 1: 의존성 설치 + GSAP 등록 유틸

**Files:**
- Modify: `package.json` (deps 추가)
- Create: `lib/gsap.ts`

**Interfaces:**
- Produces: `lib/gsap.ts` → `export function registerGsap(): void` (ScrollTrigger·SplitText 1회 등록), `export { gsap, ScrollTrigger }`.

- [ ] **Step 1: 의존성 설치**

```bash
cd /home/jaeyoon/AI02/portfolio
npm install gsap @gsap/react lenis three @react-three/fiber @react-three/drei lucide-react
```

- [ ] **Step 2: GSAP 등록 유틸 작성**

Create `lib/gsap.ts`:

```ts
"use client";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

let registered = false;
export function registerGsap() {
  if (registered || typeof window === "undefined") return;
  gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);
  registered = true;
}

export { gsap, ScrollTrigger, SplitText, useGSAP };

// 모션 축소 선호 여부 (SSR 안전)
export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
```

- [ ] **Step 3: 빌드 확인**

Run: `npm run build`
Expected: 성공(경고 없이 컴파일). 실패 시 import 경로 수정.

- [ ] **Step 4: 커밋**

```bash
git add package.json package-lock.json lib/gsap.ts
git commit -m "chore: GSAP/Lenis/R3F 등 애니메이션 의존성 + gsap 등록 유틸

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

### Task 2: 프로젝트 데이터 모듈 (단일 출처)

**Files:**
- Create: `lib/projects.ts`

**Interfaces:**
- Produces:
  - `export interface ProjectLink { label: string; href: string; kind: "live" | "github" }`
  - `export interface Project { slug: string; title: string; tagline: string; featured: boolean; period: string; role: string; icon: string; accent: string; overview: string; tech: string[]; features: string[]; contributions: string[]; links: ProjectLink[] }`
  - `export const PROJECTS: Project[]`
  - `export function getProject(slug: string): Project | undefined`

- [ ] **Step 1: 데이터 모듈 작성**

Create `lib/projects.ts`:

```ts
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
```

> **주의(실행자용):** TripLog/오타니의 라이브·GitHub URL은 Task 15 배포 완료 후 실제 값으로 갱신한다. 위 URL은 예정 규칙(저장소명 기준)이며, 배포 URL이 다르면 이 배열만 수정.

- [ ] **Step 2: 타입체크**

Run: `npx tsc --noEmit`
Expected: 에러 없음.

- [ ] **Step 3: 커밋**

```bash
git add lib/projects.ts
git commit -m "feat: 프로젝트 데이터 단일 출처(lib/projects.ts)

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

### Task 3: 폰트·메타데이터 + Lenis 스무스 스크롤 프로바이더

**Files:**
- Create: `components/SmoothScroll.tsx`
- Modify: `app/layout.tsx` (전체 교체)

**Interfaces:**
- Consumes: `lib/gsap.ts`(registerGsap, ScrollTrigger, prefersReducedMotion)
- Produces: `<SmoothScroll>{children}</SmoothScroll>` 클라이언트 래퍼.

- [ ] **Step 1: SmoothScroll 작성**

Create `components/SmoothScroll.tsx`:

```tsx
"use client";
import { useEffect } from "react";
import Lenis from "lenis";
import { registerGsap, gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    registerGsap();
    if (prefersReducedMotion()) return; // 모션 축소 시 기본 스크롤 사용
    const lenis = new Lenis({ duration: 1.1, smoothWheel: true });
    lenis.on("scroll", ScrollTrigger.update);
    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, []);
  return <>{children}</>;
}
```

- [ ] **Step 2: layout.tsx 교체**

Replace entire `app/layout.tsx`:

```tsx
import type { Metadata } from "next";
import { Space_Grotesk, Noto_Sans_KR } from "next/font/google";
import SmoothScroll from "@/components/SmoothScroll";
import "./globals.css";

const display = Space_Grotesk({ subsets: ["latin"], variable: "--font-display", display: "swap" });
const body = Noto_Sans_KR({ subsets: ["latin"], weight: ["400", "500", "700"], variable: "--font-body", display: "swap" });

export const metadata: Metadata = {
  title: "김재윤 · Kim Jaeyoon — Portfolio",
  description: "동명대학교 컴퓨터공학과. 웹·AI·임베디드를 아우르는 개발자 포트폴리오. TripLog(AI 여행 플래너), 오타니 데이터 시각화 등.",
  openGraph: {
    title: "김재윤 · Kim Jaeyoon — Portfolio",
    description: "웹·AI·임베디드 개발자 포트폴리오",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" className={`${display.variable} ${body.variable}`}>
      <body className="bg-[#0a0f0d] text-slate-100 antialiased font-[family-name:var(--font-body)]">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
```

- [ ] **Step 3: 빌드 확인**

Run: `npm run build`
Expected: 성공. (폰트 fetch는 Vercel/로컬 빌드에서 정상.)

- [ ] **Step 4: 커밋**

```bash
git add app/layout.tsx components/SmoothScroll.tsx
git commit -m "feat: 폰트·메타데이터 + Lenis 스무스 스크롤 프로바이더

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

### Task 4: GSAP 스크롤 리빌 UI 프리미티브

**Files:**
- Create: `components/ui/Reveal.tsx`
- Create: `components/ui/SplitReveal.tsx`

**Interfaces:**
- Consumes: `lib/gsap.ts`
- Produces:
  - `<Reveal as? y? delay? className?>{children}</Reveal>` — 스크롤 진입 시 페이드+상승.
  - `<SplitReveal text className?>` — 헤드라인 단어 단위 리빌(SplitText).

- [ ] **Step 1: Reveal 작성**

Create `components/ui/Reveal.tsx`:

```tsx
"use client";
import { useRef, type ElementType, type ReactNode } from "react";
import { registerGsap, gsap, ScrollTrigger, useGSAP, prefersReducedMotion } from "@/lib/gsap";

export default function Reveal({
  children, as: Tag = "div", y = 28, delay = 0, className,
}: { children: ReactNode; as?: ElementType; y?: number; delay?: number; className?: string }) {
  const ref = useRef<HTMLElement>(null);
  useGSAP(() => {
    registerGsap();
    if (prefersReducedMotion() || !ref.current) return;
    gsap.from(ref.current, {
      opacity: 0, y, duration: 0.8, delay, ease: "power3.out",
      scrollTrigger: { trigger: ref.current, start: "top 85%", once: true },
    });
  }, { scope: ref });
  return <Tag ref={ref} className={className}>{children}</Tag>;
}
```

- [ ] **Step 2: SplitReveal 작성**

Create `components/ui/SplitReveal.tsx`:

```tsx
"use client";
import { useRef } from "react";
import { registerGsap, gsap, ScrollTrigger, SplitText, useGSAP, prefersReducedMotion } from "@/lib/gsap";

export default function SplitReveal({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLHeadingElement>(null);
  useGSAP(() => {
    registerGsap();
    if (prefersReducedMotion() || !ref.current) return;
    const split = new SplitText(ref.current, { type: "words" });
    gsap.from(split.words, {
      opacity: 0, y: 36, rotateX: -40, duration: 0.9, ease: "power4.out", stagger: 0.06,
      scrollTrigger: { trigger: ref.current, start: "top 85%", once: true },
    });
    return () => split.revert();
  }, { scope: ref });
  return <h2 ref={ref} className={className}>{text}</h2>;
}
```

- [ ] **Step 3: 빌드 확인**

Run: `npm run build`
Expected: 성공.

- [ ] **Step 4: 커밋**

```bash
git add components/ui/Reveal.tsx components/ui/SplitReveal.tsx
git commit -m "feat: GSAP 스크롤 리빌 프리미티브(Reveal, SplitReveal)

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

### Task 5: 히어로 3D 파티클 캔버스 + Hero 섹션

**Files:**
- Create: `components/HeroCanvas.tsx`
- Create: `components/Hero.tsx`

**Interfaces:**
- Consumes: `lib/gsap.ts`, `SplitReveal`
- Produces: `<Hero />` (id="hero"), 내부에서 `HeroCanvas`를 `next/dynamic`(ssr:false)로 로드.

- [ ] **Step 1: HeroCanvas 작성 (절제된 파티클)**

Create `components/HeroCanvas.tsx`:

```tsx
"use client";
import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { prefersReducedMotion } from "@/lib/gsap";

function Particles() {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const n = 1400;
    const arr = new Float32Array(n * 3);
    for (let i = 0; i < n; i++) {
      const r = 2.6 + Math.random() * 1.4;
      const t = Math.random() * Math.PI * 2;
      const p = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = r * Math.sin(p) * Math.cos(t);
      arr[i * 3 + 1] = r * Math.sin(p) * Math.sin(t);
      arr[i * 3 + 2] = r * Math.cos(p);
    }
    return arr;
  }, []);
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.05;
  });
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.02} color="#34d399" transparent opacity={0.75} sizeAttenuation />
    </points>
  );
}

export default function HeroCanvas() {
  const reduced = prefersReducedMotion();
  return (
    <Canvas camera={{ position: [0, 0, 6], fov: 55 }} frameloop={reduced ? "never" : "always"} dpr={[1, 2]}>
      <ambientLight intensity={0.6} />
      <Particles />
    </Canvas>
  );
}
```

- [ ] **Step 2: Hero 작성**

Create `components/Hero.tsx`:

```tsx
"use client";
import dynamic from "next/dynamic";
import Link from "next/link";

const HeroCanvas = dynamic(() => import("./HeroCanvas"), { ssr: false });

export default function Hero() {
  return (
    <section id="hero" className="relative flex min-h-screen items-center overflow-hidden">
      <div className="absolute inset-0 -z-10 opacity-70">
        <HeroCanvas />
      </div>
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-[#0a0f0d]/40 to-[#0a0f0d]" />
      <div className="mx-auto w-full max-w-5xl px-6">
        <p className="mb-4 font-[family-name:var(--font-display)] text-sm uppercase tracking-[0.3em] text-emerald-400">
          Kim Jaeyoon · Developer
        </p>
        <h1 className="font-[family-name:var(--font-display)] text-5xl font-bold leading-[1.05] sm:text-7xl">
          웹 · AI · 임베디드를<br />직접 만드는 개발자
        </h1>
        <p className="mt-6 max-w-xl text-lg text-slate-300">
          동명대학교 컴퓨터공학과. 아이디어를 실제로 동작하는 제품으로 구현합니다.
        </p>
        <div className="mt-9 flex flex-wrap gap-4">
          <Link href="#projects" className="rounded-full bg-emerald-500 px-7 py-3 font-semibold text-[#0a0f0d] transition hover:bg-emerald-400">
            프로젝트 보기
          </Link>
          <Link href="#contact" className="rounded-full border border-white/25 px-7 py-3 font-semibold text-white transition hover:bg-white/10">
            연락하기
          </Link>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: 빌드 확인**

Run: `npm run build`
Expected: 성공. (three/R3F 타입 관련 에러 시 `@types/three`는 three에 포함되어 별도 불필요.)

- [ ] **Step 4: 커밋**

```bash
git add components/HeroCanvas.tsx components/Hero.tsx
git commit -m "feat: 3D 파티클 히어로(절제된 R3F, reduced-motion 존중)

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

### Task 6: Nav 컴포넌트

**Files:**
- Create: `components/Nav.tsx`

**Interfaces:**
- Produces: `<Nav />` — 고정 상단, 스크롤 시 배경 등장, 앵커 링크(#about, #skills, #projects, #contact).

- [ ] **Step 1: Nav 작성**

Create `components/Nav.tsx`:

```tsx
"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

const LINKS = [
  { label: "소개", id: "about" },
  { label: "기술", id: "skills" },
  { label: "프로젝트", id: "projects" },
  { label: "자격증", id: "certs" },
  { label: "연락처", id: "contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <nav className={`fixed inset-x-0 top-0 z-50 transition-all ${scrolled ? "bg-[#0a0f0d]/80 backdrop-blur border-b border-white/10" : "bg-transparent"}`}>
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="#hero" className="font-[family-name:var(--font-display)] text-lg font-bold text-emerald-400">
          KJY<span className="text-emerald-200">.</span>
        </Link>
        <div className="hidden gap-7 md:flex">
          {LINKS.map((l) => (
            <Link key={l.id} href={`#${l.id}`} className="text-sm text-slate-300 transition hover:text-emerald-400">
              {l.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
```

- [ ] **Step 2: 빌드 확인**

Run: `npm run build`
Expected: 성공.

- [ ] **Step 3: 커밋**

```bash
git add components/Nav.tsx
git commit -m "feat: 고정 내비게이션(스크롤 시 배경 등장)

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

### Task 7: About 섹션 (동명대 · 군필 이력 라인)

**Files:**
- Create: `components/About.tsx`

**Interfaces:**
- Consumes: `SplitReveal`, `Reveal`
- Produces: `<About />` (id="about").

- [ ] **Step 1: About 작성**

Create `components/About.tsx`:

```tsx
import Reveal from "./ui/Reveal";
import SplitReveal from "./ui/SplitReveal";

const FACTS = [
  { icon: "🎓", label: "학력", value: "동명대학교 컴퓨터공학과" },
  { icon: "🎖️", label: "병역", value: "2024.06.04 육군 병장 만기전역 (군필)" },
];

export default function About() {
  return (
    <section id="about" className="mx-auto max-w-5xl px-6 py-28">
      <p className="mb-3 font-[family-name:var(--font-display)] text-sm uppercase tracking-[0.3em] text-emerald-400">About</p>
      <SplitReveal text="문제를 정의하고, 끝까지 구현합니다." className="font-[family-name:var(--font-display)] text-3xl font-bold sm:text-5xl" />
      <Reveal as="p" className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-300">
        웹 프론트엔드부터 AI 서비스 통합, 임베디드 하드웨어까지 직접 만들어 왔습니다.
        복잡한 것을 단순한 사용자 경험으로 풀어내는 데 관심이 많습니다.
      </Reveal>
      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        {FACTS.map((f, i) => (
          <Reveal key={f.label} delay={i * 0.08} className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
            <div className="text-2xl">{f.icon}</div>
            <div className="mt-2 text-xs uppercase tracking-widest text-slate-400">{f.label}</div>
            <div className="mt-1 font-medium text-slate-100">{f.value}</div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 2: 빌드 확인**

Run: `npm run build`
Expected: 성공.

- [ ] **Step 3: 커밋**

```bash
git add components/About.tsx
git commit -m "feat: About 섹션(동명대·군필 이력 라인)

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

### Task 8: Skills 섹션

**Files:**
- Create: `components/Skills.tsx`

**Interfaces:**
- Consumes: `Reveal`, `SplitReveal`
- Produces: `<Skills />` (id="skills").

- [ ] **Step 1: Skills 작성**

Create `components/Skills.tsx`:

```tsx
import Reveal from "./ui/Reveal";
import SplitReveal from "./ui/SplitReveal";

const GROUPS = [
  { icon: "💻", category: "Languages", items: ["Python", "JavaScript", "TypeScript", "HTML/CSS"] },
  { icon: "🎨", category: "Frontend", items: ["Next.js", "React", "Tailwind", "GSAP", "Three.js", "데이터 시각화"] },
  { icon: "🤖", category: "AI & Cloud", items: ["Azure AI Services", "Anthropic Claude", "RAG", "MCP"] },
  { icon: "🔧", category: "Hardware", items: ["Raspberry Pi Pico", "I2S 오디오", "하드웨어 인터페이싱"] },
];

export default function Skills() {
  return (
    <section id="skills" className="border-y border-white/10 bg-white/[0.02] py-28">
      <div className="mx-auto max-w-5xl px-6">
        <p className="mb-3 font-[family-name:var(--font-display)] text-sm uppercase tracking-[0.3em] text-emerald-400">Skills</p>
        <SplitReveal text="사용하는 기술" className="font-[family-name:var(--font-display)] text-3xl font-bold sm:text-5xl" />
        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {GROUPS.map((g, i) => (
            <Reveal key={g.category} delay={i * 0.06} className="rounded-2xl border border-white/10 bg-[#0a0f0d] p-6">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{g.icon}</span>
                <h3 className="font-[family-name:var(--font-display)] text-lg font-semibold">{g.category}</h3>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {g.items.map((it) => (
                  <span key={it} className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-sm text-emerald-200">{it}</span>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: 빌드 확인**

Run: `npm run build`
Expected: 성공.

- [ ] **Step 3: 커밋**

```bash
git add components/Skills.tsx
git commit -m "feat: Skills 섹션(카테고리별 기술 뱃지)

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

### Task 9: Projects 섹션 (카드 → 상세 링크)

**Files:**
- Create: `components/Projects.tsx`

**Interfaces:**
- Consumes: `lib/projects.ts`(PROJECTS), `Reveal`, `SplitReveal`
- Produces: `<Projects />` (id="projects"). 각 카드는 `next/link`로 `/projects/<slug>`.

- [ ] **Step 1: Projects 작성**

Create `components/Projects.tsx`:

```tsx
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PROJECTS } from "@/lib/projects";
import Reveal from "./ui/Reveal";
import SplitReveal from "./ui/SplitReveal";

export default function Projects() {
  return (
    <section id="projects" className="mx-auto max-w-6xl px-6 py-28">
      <p className="mb-3 font-[family-name:var(--font-display)] text-sm uppercase tracking-[0.3em] text-emerald-400">Projects</p>
      <SplitReveal text="만든 것들" className="font-[family-name:var(--font-display)] text-3xl font-bold sm:text-5xl" />
      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {PROJECTS.map((p, i) => (
          <Reveal key={p.slug} delay={i * 0.05} className={p.featured ? "md:col-span-2" : ""}>
            <Link
              href={`/projects/${p.slug}`}
              className="group flex h-full flex-col justify-between overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-7 transition hover:border-emerald-500/50 hover:bg-white/[0.06]"
            >
              <div>
                <div className="flex items-start justify-between">
                  <div className={`inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${p.accent} text-3xl`}>
                    {p.icon}
                  </div>
                  {p.featured && <span className="rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-semibold text-emerald-300">대표 프로젝트</span>}
                </div>
                <h3 className="mt-5 font-[family-name:var(--font-display)] text-2xl font-bold">{p.title}</h3>
                <p className="mt-2 text-slate-300">{p.tagline}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {p.tech.slice(0, 5).map((t) => (
                    <span key={t} className="rounded-md bg-white/5 px-2 py-1 text-xs text-slate-300">{t}</span>
                  ))}
                </div>
              </div>
              <span className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-emerald-400">
                자세히 보기 <ArrowUpRight size={16} className="transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 2: 빌드 확인**

Run: `npm run build`
Expected: 성공.

- [ ] **Step 3: 커밋**

```bash
git add components/Projects.tsx
git commit -m "feat: Projects 섹션(카드 → 상세 링크, 대표 프로젝트 강조)

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

### Task 10: Certifications + Contact + Footer 섹션

**Files:**
- Create: `components/Certifications.tsx`
- Create: `components/Contact.tsx`
- Create: `components/Footer.tsx`

**Interfaces:**
- Consumes: `Reveal`, `SplitReveal`, `lucide-react`
- Produces: `<Certifications />`(id="certs"), `<Contact />`(id="contact"), `<Footer />`.

- [ ] **Step 1: Certifications 작성**

Create `components/Certifications.tsx`:

```tsx
import Reveal from "./ui/Reveal";
import SplitReveal from "./ui/SplitReveal";

const CERTS = [
  { icon: "☁️", name: "Microsoft Azure AI-900", note: "AI Fundamentals" },
  { icon: "🚗", name: "운전면허 1종", note: "" },
];

export default function Certifications() {
  return (
    <section id="certs" className="border-y border-white/10 bg-white/[0.02] py-28">
      <div className="mx-auto max-w-5xl px-6">
        <p className="mb-3 font-[family-name:var(--font-display)] text-sm uppercase tracking-[0.3em] text-emerald-400">Certifications</p>
        <SplitReveal text="자격증" className="font-[family-name:var(--font-display)] text-3xl font-bold sm:text-5xl" />
        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {CERTS.map((c, i) => (
            <Reveal key={c.name} delay={i * 0.08} className="flex items-center gap-4 rounded-2xl border border-white/10 bg-[#0a0f0d] p-5">
              <span className="text-3xl">{c.icon}</span>
              <div>
                <div className="font-medium text-slate-100">{c.name}</div>
                {c.note && <div className="text-sm text-slate-400">{c.note}</div>}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Contact 작성**

Create `components/Contact.tsx`:

```tsx
import { Mail, Github } from "lucide-react";
import SplitReveal from "./ui/SplitReveal";
import Reveal from "./ui/Reveal";

export default function Contact() {
  return (
    <section id="contact" className="mx-auto max-w-5xl px-6 py-32 text-center">
      <SplitReveal text="함께 이야기해요" className="font-[family-name:var(--font-display)] text-4xl font-bold sm:text-6xl" />
      <Reveal as="p" className="mx-auto mt-5 max-w-md text-slate-300">
        협업·채용 문의를 환영합니다. 아래로 연락 주세요.
      </Reveal>
      <div className="mt-10 flex flex-wrap justify-center gap-4">
        <a href="mailto:kimjeayoon1@naver.com" className="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-7 py-3 font-semibold text-[#0a0f0d] transition hover:bg-emerald-400">
          <Mail size={18} /> kimjeayoon1@naver.com
        </a>
        <a href="https://github.com/kimjaeyoon11" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/25 px-7 py-3 font-semibold text-white transition hover:bg-white/10">
          <Github size={18} /> github.com/kimjaeyoon11
        </a>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Footer 작성 ("이 사이트에 사용한 기술" 명시)**

Create `components/Footer.tsx`:

```tsx
const BUILT_WITH = [
  "Next.js 16", "TypeScript", "Tailwind CSS v4", "GSAP + ScrollTrigger",
  "GSAP SplitText", "Lenis (스무스 스크롤)", "Three.js / React Three Fiber", "lucide-react",
];

export default function Footer() {
  return (
    <footer className="border-t border-white/10 px-6 py-14">
      <div className="mx-auto max-w-5xl">
        <p className="text-sm uppercase tracking-widest text-slate-500">이 포트폴리오는 이렇게 만들었습니다</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {BUILT_WITH.map((t) => (
            <span key={t} className="rounded-md border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300">{t}</span>
          ))}
        </div>
        <p className="mt-8 text-sm text-slate-500">© 2026 Kim Jaeyoon · 동명대학교 컴퓨터공학과</p>
      </div>
    </footer>
  );
}
```

- [ ] **Step 4: 빌드 확인**

Run: `npm run build`
Expected: 성공.

- [ ] **Step 5: 커밋**

```bash
git add components/Certifications.tsx components/Contact.tsx components/Footer.tsx
git commit -m "feat: 자격증·연락처·푸터(사용 기술 명시) 섹션

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

### Task 11: 랜딩 페이지 조합 (page.tsx)

**Files:**
- Modify: `app/page.tsx` (전체 교체)

**Interfaces:**
- Consumes: Nav, Hero, About, Skills, Projects, Certifications, Contact, Footer

- [ ] **Step 1: page.tsx 교체**

Replace entire `app/page.tsx`:

```tsx
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Certifications from "@/components/Certifications";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Certifications />
      <Contact />
      <Footer />
    </main>
  );
}
```

- [ ] **Step 2: dev 서버 렌더 확인**

Run: `npm run dev` 후 http://localhost:3000 접속.
Expected: 히어로 파티클 + 스크롤 시 각 섹션 리빌, Nav 앵커 이동, 프로젝트 카드 표시. 콘솔 에러 없음. (확인 후 Ctrl+C)

- [ ] **Step 3: 빌드 확인**

Run: `npm run build`
Expected: 성공.

- [ ] **Step 4: 커밋**

```bash
git add app/page.tsx
git commit -m "feat: 랜딩 페이지 섹션 조합

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

### Task 12: 프로젝트 상세 페이지 (동적 라우트)

**Files:**
- Create: `app/projects/[slug]/page.tsx`

**Interfaces:**
- Consumes: `lib/projects.ts`(PROJECTS, getProject), `lucide-react`
- Produces: `/projects/<slug>` 정적 생성(`generateStaticParams`), 없는 slug는 `notFound()`.

- [ ] **Step 1: 상세 라우트 작성**

Create `app/projects/[slug]/page.tsx`:

```tsx
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";
import { PROJECTS, getProject } from "@/lib/projects";

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getProject(slug);
  return { title: p ? `${p.title} — Kim Jaeyoon` : "Project" };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) notFound();

  const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <div className="border-t border-white/10 py-8">
      <h2 className="mb-4 font-[family-name:var(--font-display)] text-sm uppercase tracking-[0.25em] text-emerald-400">{title}</h2>
      {children}
    </div>
  );

  return (
    <main className="mx-auto max-w-3xl px-6 py-24">
      <Link href="/#projects" className="inline-flex items-center gap-1 text-sm text-slate-400 transition hover:text-emerald-400">
        <ArrowLeft size={16} /> 프로젝트로 돌아가기
      </Link>

      <div className="mt-8 flex items-center gap-4">
        <div className={`inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${p.accent} text-4xl`}>{p.icon}</div>
        <div>
          <h1 className="font-[family-name:var(--font-display)] text-3xl font-bold sm:text-4xl">{p.title}</h1>
          <p className="mt-1 text-slate-400">{p.period} · {p.role}</p>
        </div>
      </div>

      {p.links.length > 0 && (
        <div className="mt-6 flex flex-wrap gap-3">
          {p.links.map((l) => (
            <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-2 text-sm font-semibold transition hover:bg-white/10">
              {l.kind === "github" ? <Github size={16} /> : <ExternalLink size={16} />} {l.label}
            </a>
          ))}
        </div>
      )}

      <Section title="개요"><p className="leading-relaxed text-slate-200">{p.overview}</p></Section>

      <Section title="사용 기술">
        <div className="flex flex-wrap gap-2">
          {p.tech.map((t) => (
            <span key={t} className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-sm text-emerald-200">{t}</span>
          ))}
        </div>
      </Section>

      <Section title="주요 기능">
        <ul className="space-y-2">
          {p.features.map((f) => (
            <li key={f} className="flex gap-3 text-slate-200"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400" />{f}</li>
          ))}
        </ul>
      </Section>

      {p.contributions.length > 0 && (
        <Section title="직접 해결한 문제 · 기여">
          <ul className="space-y-2">
            {p.contributions.map((c) => (
              <li key={c} className="flex gap-3 text-slate-200"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-teal-400" />{c}</li>
            ))}
          </ul>
        </Section>
      )}
    </main>
  );
}
```

- [ ] **Step 2: dev 서버 렌더 확인**

Run: `npm run dev` 후 http://localhost:3000/projects/triplog , `/projects/ohtani` , `/projects/berry` 접속.
Expected: 각 상세 렌더. `/projects/none` → 404. (확인 후 Ctrl+C)

- [ ] **Step 3: 빌드 확인**

Run: `npm run build`
Expected: 성공 + 3개 상세 경로 정적 생성 로그.

- [ ] **Step 4: 커밋**

```bash
git add app/projects/[slug]/page.tsx
git commit -m "feat: 프로젝트 상세 페이지(설명서 형식 동적 라우트)

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

### Task 13: 접근성·반응형 마감 (globals.css)

**Files:**
- Modify: `app/globals.css`

**Interfaces:**
- Produces: reduced-motion 전역 폴백, 가로 스크롤 방지, 스무스 앵커.

- [ ] **Step 1: globals.css 보강**

`app/globals.css` 하단에 추가(기존 `@import "tailwindcss";` 유지):

```css
html { scroll-behavior: smooth; }
body { overflow-x: hidden; }

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.001ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.001ms !important;
    scroll-behavior: auto !important;
  }
}
```

- [ ] **Step 2: 반응형 육안 확인**

Run: `npm run dev`, 브라우저 devtools 반응형(모바일 375px, 태블릿 768px, 데스크톱)에서 각 섹션 확인.
Expected: 가로 스크롤 없음, 텍스트·카드 겹침 없음, Nav 모바일에서 로고만 표시. (확인 후 Ctrl+C)

- [ ] **Step 3: 빌드 + 린트**

Run: `npm run build && npm run lint`
Expected: 둘 다 성공.

- [ ] **Step 4: 커밋**

```bash
git add app/globals.css
git commit -m "feat: reduced-motion 폴백·가로 스크롤 방지 등 마감

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

### Task 14: 오타니 프로젝트 저장소화 + 배포

**Files:**
- 신규 로컬 저장소: `/home/jaeyoon/ohtani-viz/` (바탕화면 `20210013 김재윤/` 정적 파일 복사)

**Interfaces:**
- Produces: GitHub `kimjaeyoon11/ohtani-viz` + Vercel 라이브 URL. (URL 확정 후 Task 2의 `lib/projects.ts` ohtani 링크 갱신.)

> **주의:** GitHub 저장소 생성·Vercel 로그인은 사용자 인증이 필요할 수 있다. `gh`는 인증됨(kimjaeyoon11). Vercel은 `vercel login` 필요 시 사용자에게 안내.

- [ ] **Step 1: 정적 파일 복사**

```bash
mkdir -p /home/jaeyoon/ohtani-viz
cp -r "/mnt/c/Users/MSI2310/Desktop/20210013 김재윤/"{index.html,style.css,main.js,ui.js,util.js,animations.js,image} /home/jaeyoon/ohtani-viz/
cd /home/jaeyoon/ohtani-viz && ls
```
Expected: index.html + js/css + image/ 존재.

- [ ] **Step 2: git 초기화 + GitHub 저장소 생성·푸시**

```bash
cd /home/jaeyoon/ohtani-viz
printf "# 오타니 쇼헤이 데이터 시각화\n\nGSAP 스크롤 스토리텔링으로 오타니의 투타 겸업 기록을 시각화한 웹.\n\n기술: HTML · CSS · Vanilla JS · GSAP(ScrollTrigger)\n" > README.md
git init -q && git add -A && git commit -q -m "init: 오타니 데이터 시각화 정적 사이트"
gh repo create ohtani-viz --public --source=. --remote=origin --push
```
Expected: `github.com/kimjaeyoon11/ohtani-viz` 생성·푸시.

- [ ] **Step 3: Vercel 배포(정적)**

```bash
cd /home/jaeyoon/ohtani-viz && npx vercel --prod --yes
```
Expected: 라이브 URL 출력. (로그인 필요 시 사용자 안내.) 정적이라 키 불필요.

- [ ] **Step 4: 링크 반영 + 커밋(portfolio)**

배포 URL로 `AI02/portfolio/lib/projects.ts`의 ohtani `links` href 갱신 후:
```bash
cd /home/jaeyoon/AI02/portfolio
git add lib/projects.ts
git commit -m "chore: 오타니 라이브·GitHub 실제 URL 반영

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

### Task 15: TripLog 공개 전환 + 배포, 포트폴리오 저장소·배포

**Files:**
- Modify: `AI02/portfolio/lib/projects.ts` (TripLog URL 최종 반영)

**Interfaces:**
- Produces: `kimjaeyoon11/portfolio`(신규) + Vercel 라이브, TripLog Public + Vercel 라이브.

> **주의:** 이 태스크는 외부 서비스 인증(GitHub 권한·Vercel 로그인)이 필요. 각 단계에서 인증 프롬프트가 뜨면 사용자에게 안내하고 대기.

- [ ] **Step 1: TripLog 저장소 Public 전환**

```bash
gh repo edit kimjaeyoon11/triplog-ai-planner --visibility public --accept-visibility-change-consequences
```
Expected: 공개 전환 완료.

- [ ] **Step 2: TripLog Vercel 배포**

```bash
cd /home/jaeyoon/triplog && npx vercel --prod --yes
```
Expected: 라이브 URL. (Google/RapidAPI/Anthropic/Supabase 키는 Vercel 프로젝트 환경변수에 사용자가 등록 시 전체 기능 활성; 미등록 시 지구본·선택화면까지 동작 — README 문구와 일치.) URL이 예상과 다르면 `lib/projects.ts` triplog links 갱신.

- [ ] **Step 3: 포트폴리오 새 저장소 생성 (remote 정리)**

```bash
cd /home/jaeyoon/AI02/portfolio
git remote remove origin   # 잘못 잡힌 speclog remote 제거
gh repo create portfolio --public --source=. --remote=origin --push
```
Expected: `github.com/kimjaeyoon11/portfolio` 생성·푸시.

- [ ] **Step 4: 포트폴리오 Vercel 배포**

```bash
cd /home/jaeyoon/AI02/portfolio && npx vercel --prod --yes
```
Expected: 포트폴리오 라이브 URL. 브라우저로 접속해 전체 동작 확인.

- [ ] **Step 5: 최종 링크 정합성 확인 + 커밋**

`lib/projects.ts`의 triplog/ohtani 링크가 실제 배포 URL과 일치하는지 확인 후:
```bash
cd /home/jaeyoon/AI02/portfolio
git add lib/projects.ts
git commit -m "chore: 배포 후 실제 라이브 URL 최종 반영

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
git push
```
Expected: 포트폴리오·TripLog·오타니 라이브 URL 3개 + GitHub 링크가 사이트에서 모두 유효.

---

## Self-Review

**1. Spec coverage**
- 인물 정보(동명대·군필·자격증·연락처): Task 7, 10 ✅
- Azure AI-900을 자격증으로 이동: Task 10 ✅ (프로젝트에서 제외 — Task 2에 미포함) ✅
- 대표 TripLog + 상세 설명서: Task 2, 9, 12 ✅
- 오타니(GSAP 스토리텔링) / Berry 상세: Task 2, 12 ✅
- GSAP·SplitText·Lenis·Three.js 사용 + 사이트에 명시: Task 1,3,4,5 + Footer(Task 10) ✅
- prefers-reduced-motion: Task 3,4,5,13 ✅
- 링크(라이브·GitHub) 확보: Task 14,15 ✅
- 배포 3건(포트폴리오·TripLog·오타니): Task 14,15 ✅
- 반응형·빌드·린트 검증: Task 13 ✅
- speclog remote 정리: Task 15 Step 3 ✅

**2. Placeholder scan:** 코드 블록 모두 완전. Task 2/14/15의 URL은 "배포 후 실제 값 반영"으로 명시된 의도적 후처리(플레이스홀더 아님, 절차로 해소).

**3. Type consistency:** `Project`/`ProjectLink` 필드(slug,title,tagline,featured,period,role,icon,accent,overview,tech[],features[],contributions[],links[])가 Task 2 정의와 Task 9·12 사용에서 일치. `getProject(slug)` 시그니처 일관. `registerGsap()`·`prefersReducedMotion()`·`useGSAP` export가 Task 1 정의와 Task 3,4,5 사용에서 일치.

**참고(실행 시 유의):** GSAP `SplitText`는 GSAP 3.13부터 무료 배포에 포함. 만약 설치된 gsap 버전에서 `gsap/SplitText` import가 실패하면 npm에서 gsap 최신(≥3.13)으로 업데이트 후 재시도.
