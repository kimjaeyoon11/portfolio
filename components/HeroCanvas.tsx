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
