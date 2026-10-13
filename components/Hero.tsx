"use client";
import dynamic from "next/dynamic";
import Link from "next/link";

const HeroCanvas = dynamic(() => import("./HeroCanvas"), { ssr: false });

export default function Hero() {
  return (
    <section id="hero" className="relative flex min-h-screen items-center overflow-hidden">
      <div className="absolute inset-0 -z-10 opacity-60">
        <HeroCanvas />
      </div>
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-[#f7f6f2]/30 to-[#f7f6f2]" />
      <div className="mx-auto w-full max-w-5xl px-6">
        <p className="mb-4 font-[family-name:var(--font-display)] text-sm uppercase tracking-[0.3em] text-emerald-700">
          Kim Jaeyoon · Developer
        </p>
        <h1 className="font-[family-name:var(--font-display)] text-5xl font-bold leading-[1.05] sm:text-7xl">
          웹 · AI · 임베디드를<br />직접 만드는 개발자
        </h1>
        <p className="mt-6 max-w-xl text-lg text-slate-600">
          동명대학교 컴퓨터공학과. 아이디어를 실제로 동작하는 제품으로 구현합니다.
        </p>
        <div className="mt-9 flex flex-wrap gap-4">
          <Link href="#projects" className="rounded-full bg-emerald-600 px-7 py-3 font-semibold text-white transition hover:bg-emerald-700">
            프로젝트 보기
          </Link>
          <Link href="#contact" className="rounded-full border border-slate-900/20 px-7 py-3 font-semibold text-slate-900 transition hover:bg-slate-900/5">
            연락하기
          </Link>
        </div>
      </div>
    </section>
  );
}
