"use client";
import { createElement, useRef, type ElementType, type ReactNode } from "react";
import { registerGsap, gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";

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
  // props 객체를 먼저 만들고 ref를 나중에 대입하는 것은, react-hooks/refs 규칙이
  // "createElement(Tag, { ref, ... })" 형태(리터럴 객체에 ref 프로퍼티가 즉시 포함된 형태)를
  // "함수 컴포넌트가 렌더 중 ref.current를 읽을 수 있다"는 오탐으로 잡는 것을 피하기 위함이다.
  // ref는 실제로는 렌더 중 읽히지 않고 DOM에 부착될 뿐이며, 동작은 기존과 동일하다.
  const elementProps: Record<string, unknown> = { className };
  elementProps.ref = ref;
  return createElement(Tag, elementProps, children);
}
