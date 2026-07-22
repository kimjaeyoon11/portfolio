# 포트폴리오 사이트 개선 & 배포 — 설계 문서

- 작성일: 2026-07-22
- 대상: 김재윤 개인 포트폴리오 웹사이트 (`AI02/portfolio`, Next.js)
- 목표: 채용용으로 완성도 높은 포트폴리오. 대표 프로젝트를 "설명서" 수준으로 상세히 소개하고, 실제로 눌러볼 수 있는 라이브·GitHub 링크 제공. 스크롤 기반 인터랙션 등 프론트엔드 역량을 사이트 자체로 증명. Vercel 배포.

---

## 1. 배경 & 현재 상태

- 기존 사이트: `AI02/portfolio` — Next.js 16.2.9 / React 19.2.4 / Tailwind v4, 단일 페이지(`app/page.tsx`, 650줄).
- 현재 섹션: Nav · Hero · About · Skills · Projects(3) · Timeline. 초록/틸 테마, `KJY.` 브랜딩.
- 문제점:
  - 가장 강한 프로젝트(TripLog)가 없음.
  - 프로젝트에 라이브/GitHub 링크 없음 — 채용담당자가 확인 불가.
  - "Azure AI-900 학습 플랫폼"이 **프로젝트로** 잘못 분류됨 → 실제로는 **자격증**.
  - 프로젝트 설명이 얕음(카드 한 단락). 언어·기술·역할이 드러나지 않음.
  - 정적인 화면 — 프론트엔드 역량을 시각적으로 보여주지 못함.
- git 원격 주의: 현재 `origin`이 `github.com/kimjaeyoon11/speclog.git`로 잡혀 있음(폴더명과 불일치). 배포 저장소 정리 필요(→ §7, 오픈 이슈).

## 2. 목표 / 비목표

**목표**
- 대표 프로젝트(TripLog, 오타니 시각화, Pico 오디오)를 상세 페이지로 소개("설명서" 형식).
- 각 프로젝트 라이브·GitHub 링크 확보(§6 배포).
- 프론트엔드 역량 증명: GSAP 스크롤 연출, 스무스 스크롤, 텍스트 리빌, 3D 히어로 등 — 사용 기술을 사이트에 **명시**.
- 인물 정보 정확화: 동명대 컴퓨터공학과, 군필(2024-06-04 육군 병장 만기전역), 자격증(Azure AI-900, 운전면허 1종).
- 반응형 + 접근성(모션 축소 선호 존중) + Vercel 배포.

**비목표(YAGNI)**
- 백엔드/DB/로그인 없음 — 순수 정적/클라이언트 사이트.
- CMS·블로그·다국어(i18n) — 이번 범위 아님.
- 이력서 PDF 자동생성 — 링크만(있으면).

## 3. 인물 정보(콘텐츠 원본)

- 이름: 김재윤 (Kim Jaeyoon)
- 학력: 동명대학교 컴퓨터공학과 (학번 20210013)
- 병역: 2024-06-04 육군 병장 만기전역(군필)
- 자격증: Microsoft Azure AI-900 (AI Fundamentals), 운전면허 1종
- 연락처: ✉️ kimjeayoon1@naver.com · 🐙 github.com/kimjaeyoon11
- LinkedIn / 이력서 PDF: 현재 없음 → 연락처는 이메일·GitHub만 노출.

## 4. 사이트 구조 (정보 아키텍처)

단일 랜딩 + 프로젝트별 상세 페이지(라우트 분리).

```
app/
  layout.tsx            # 폰트, 메타데이터, 스무스 스크롤 래퍼
  page.tsx              # 랜딩 (아래 섹션들)
  projects/
    [slug]/page.tsx     # 프로젝트 상세 (설명서)
  components/…          # 섹션·UI 컴포넌트 (파일 분리 — page.tsx 비대화 방지)
  lib/projects.ts       # 프로젝트 데이터(단일 출처)
```

**랜딩 섹션 순서**
1. **Hero** — 이름 + 한 줄 소개 + 3D/모션 배경, 스크롤 유도.
2. **About** — 소개 문단 + 이력 라인(동명대 컴퓨터공학과 · 군필 2024-06-04 만기전역).
3. **Skills** — 카테고리별 기술 뱃지(Languages / Frontend / AI·Cloud / Hardware). GSAP 스태거 리빌.
4. **Projects** — 카드 그리드/가로 스크롤. 카드 → `/projects/<slug>` 상세로.
5. **Certifications(자격증)** — Azure AI-900 · 운전면허 1종.
6. **Contact** — 이메일 · GitHub(+선택 링크). 큰 CTA.
7. **Footer** — "이 사이트에 사용한 기술" 명시(메타 섹션, §5.2 라이브러리 목록).

기존 page.tsx의 Timeline은 About의 "이력 라인"으로 흡수(중복 축소, YAGNI).

## 5. 프론트엔드 기술 & 인터랙션

### 5.1 애니메이션/인터랙션 설계
- **GSAP 3.13 + ScrollTrigger** — 스크롤 기반 리빌, 섹션 핀 고정, 패럴랙스, 프로젝트 가로 스크롤 쇼케이스.
- **GSAP SplitText**(3.13부터 무료) — 히어로/헤드라인 글자·단어 단위 리빌.
- **Lenis** (오픈소스 스무스 스크롤) — 관성 스크롤. ScrollTrigger와 연동(`lenis.on('scroll', ScrollTrigger.update)`).
- **Three.js + @react-three/fiber (+ drei)** — 히어로의 절제된 3D 요소(파티클/지오메트리). TripLog 지구본과 결이 맞는 시그니처.
- **micro-interaction** — 마그네틱 버튼, 커스텀 커서(데스크톱), 호버 틸트.
- **접근성** — `prefers-reduced-motion` 존중: 모션 축소 시 애니메이션 비활성/즉시 표시.
- 애니메이션 엔진은 **GSAP 단일화**(Framer Motion과 혼용하지 않음 — 충돌·중복 방지).

### 5.2 라이브러리 목록(사이트에 "사용 기술"로 명시할 항목)
| 라이브러리 | 용도(사이트에 표기할 "기능") |
|---|---|
| Next.js 16 (App Router) | 라우팅, 정적 생성, 프로젝트 상세 동적 라우트 |
| TypeScript | 타입 안전 |
| Tailwind CSS v4 | 유틸리티 스타일링·반응형 |
| GSAP + ScrollTrigger | 스크롤 연출(리빌·핀·패럴랙스·가로 스크롤) |
| GSAP SplitText | 텍스트 글자/단어 리빌 |
| Lenis | 관성 스무스 스크롤 |
| Three.js / @react-three/fiber / drei | 히어로 3D 인터랙션 |
| next/font | 디스플레이·본문 웹폰트 최적화 |
| lucide-react | 아이콘 |

> 이 표는 Footer의 "이 포트폴리오는 이렇게 만들었습니다" 섹션 및 이 사이트 자체의 상세(선택)로도 노출 → 사용자의 "무슨 기능을 썼는지 명시" 요구 충족.

### 5.3 디자인 방향
- 기존 초록/틸 정체성 유지하되 **한 단계 상향**: 강한 디스플레이 타이포, 넉넉한 여백, 다크 섹션 대비, 그레인/그라디언트 악센트.
- 모바일 우선 반응형. 라이트하우스 성능·접근성 점검.

## 6. 프로젝트 상세("설명서") 콘텐츠

각 상세 페이지 공통 구조:
> **개요**(무엇을·왜) → **사용 기술**(언어·프레임워크·API·라이브러리 뱃지) → **주요 기능** → **직접 해결한 문제/기여** → **역할·기간** → **링크(🔗 라이브 · 🐙 GitHub)**

### 6.1 TripLog — AI 여행 동선 플래너 (대표/Featured)
- 개요: 지구본으로 여행지를 고르면 실제 구글 지도 기반 동선을 자동으로 그리고, 실제 항공·호텔 요금으로 예산을 잡고, Claude와 대화하며 일정을 다듬는 여행 플래너.
- 사용 기술: Next.js 16(App Router), TypeScript, Tailwind v4, Three.js, Google Maps Platform(Maps JS / Routes / Places New / Weather), Anthropic Claude Opus 4.8(구조화 출력), RapidAPI booking-com15, Supabase(PostgreSQL).
- 주요 기능: 3D 지구본 탐색, 실시간 동선 자동 계산, 이동수단 비교(신칸센 등), 실제 항공·호텔 요금 예산, 점심·저녁 자동 배치, N박 M일 Day 동선, AI 일정 도우미, 드래그 편집.
- 해결한 문제/기여: 명령형 폴리라인 관리(고아 선 방지), reorderPlaces 단일 파이프라인 + 최근접 이웃 최적화, "하루=한 도시" 동선 모델, 구조화 LLM 출력({reply,changed,places}), 서버 전용 키 격리, 30분 캐싱.
- 역할: 기획·설계·구현 전부(개인 프로젝트).
- 링크: GitHub `kimjaeyoon11/triplog-ai-planner`(Public 전환) · Vercel 라이브(§7).

### 6.2 오타니 쇼헤이 데이터 시각화
- 개요: 야구 선수 오타니 쇼헤이의 투타 겸업(이도류) 기록을 스크롤 스토리텔링으로 비교·시각화한 웹.
- 사용 기술: HTML, CSS, Vanilla JavaScript, GSAP(ScrollTrigger, 가로 스크롤).
- 주요 기능: 스크롤 스토리텔링(챕터 내비게이션), 투수/타자 데이터 비교 섹션, 가로 스크롤·틸트·페이드/미디어 팬 애니메이션, 스무스 스크롤.
- 해결한 문제/기여: 복잡한 통계를 스토리 흐름으로 재구성, GSAP 타임라인·스크롤 연동 구현.
- 역할: 기획·구현(동명대 웹프로그래밍 프로젝트).
- 링크: 새 GitHub 저장소 + 정적 배포(§7). (원본: 바탕화면 `20210013 김재윤/`)

### 6.3 Berry — Raspberry Pi Pico 오디오 시스템
- 개요: 임베디드 환경에서 오디오 앰프·마이크 모듈을 Raspberry Pi Pico와 연동한 오디오 입출력 시스템("Berry" 프로젝트).
- 사용 기술: Raspberry Pi Pico, I2S 오디오 인터페이스, 하드웨어 인터페이싱.
- 주요 기능/기여: I2S 핀 공유 최적화로 하드웨어 제약 해결.
- 링크: 하드웨어 프로젝트라 라이브 없음 — 설명·회고 중심. 사진/자료 아직 없음(확보 시 상세 보강).

## 7. 배포 & 링크 계획

| 대상 | 저장소/조치 | 배포 |
|---|---|---|
| 포트폴리오 사이트 | 배포용 저장소 정리(오픈 이슈) | Vercel |
| TripLog | `triplog-ai-planner` **Public 전환** | Vercel(키는 Vercel 환경변수; 없으면 지구본·선택화면까지 동작) |
| 오타니 시각화 | 바탕화면 폴더 → 새 GitHub 저장소 | 정적 배포(Vercel/GitHub Pages, 키 불필요) |

**산출물**: 포트폴리오 라이브 URL + TripLog 라이브 URL + 오타니 라이브 URL + GitHub 링크들.

## 8. 검증

- `npm run build` / `npm run lint` 통과.
- 데스크톱·모바일 반응형 육안 확인, 가로 스크롤 없음.
- `prefers-reduced-motion` 시 모션 비활성 동작.
- 모든 외부 링크 유효(라이브·GitHub) 확인.
- (선택) Lighthouse 성능/접근성 점검.

## 9. 오픈 이슈(스펙 리뷰에서 확정)

1. **배포 저장소**: 현재 `AI02/portfolio` 원격이 `speclog`. → (a) 새 `portfolio` 저장소, (b) `kimjaeyoon11.github.io`(개인 페이지 URL이 깔끔), (c) 현 remote 유지 중 택1. **추천: 새 `portfolio` 저장소 + Vercel.**
2. **3D 히어로 강도**: TripLog 지구본을 오마주한 3D를 넣을지(무거우면 절제된 파티클/셰이더로). 기본은 절제된 버전.
3. ~~LinkedIn/이력서 PDF~~ → 없음(이메일·GitHub만). **확정.**
4. ~~Berry(Pico) 사진/자료~~ → 아직 없음, 설명 중심. **확정.**
