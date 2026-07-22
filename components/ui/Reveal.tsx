"use client";
import { createElement, useRef, type ElementType, type ReactNode } from "react";
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
  // JSX 대신 createElement 사용: @react-three/fiber가 전역 JSX.IntrinsicElements를 확장하면서
  // 제네릭 ElementType을 JSX 태그로 직접 사용할 때 타입체크가 깨지는 문제를 회피한다.
  return createElement(Tag, { ref, className }, children);
}
