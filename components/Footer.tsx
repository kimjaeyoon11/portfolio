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
