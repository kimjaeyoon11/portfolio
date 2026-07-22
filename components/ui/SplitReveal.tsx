"use client";
import { useRef } from "react";
import { registerGsap, gsap, SplitText, useGSAP, prefersReducedMotion } from "@/lib/gsap";

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
