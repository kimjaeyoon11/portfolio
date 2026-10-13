"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

const LINKS = [
  { label: "소개", id: "about" },
  { label: "기술", id: "skills" },
  { label: "프로젝트", id: "projects" },
  { label: "수상·자격", id: "certs" },
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
    <nav className={`fixed inset-x-0 top-0 z-50 transition-all ${scrolled ? "bg-[#f7f6f2]/85 backdrop-blur border-b border-slate-900/10" : "bg-transparent"}`}>
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="#hero" className="font-[family-name:var(--font-display)] text-lg font-bold text-emerald-700">
          KJY<span className="text-emerald-500">.</span>
        </Link>
        <div className="hidden gap-7 md:flex">
          {LINKS.map((l) => (
            <Link key={l.id} href={`#${l.id}`} className="text-sm text-slate-600 transition hover:text-emerald-700">
              {l.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
