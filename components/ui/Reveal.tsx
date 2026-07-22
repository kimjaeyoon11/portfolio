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
