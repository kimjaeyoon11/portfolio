import Section from "./Section";

const GROUPS = [
  { category: "언어", items: ["Python", "TypeScript", "JavaScript", "HTML/CSS"] },
  { category: "프론트엔드", items: ["Next.js", "React", "Tailwind CSS", "GSAP", "Three.js"] },
  { category: "비전 AI", items: ["OpenCV", "MediaPipe", "YOLOv8", "ArcFace"] },
  { category: "LLM과 클라우드", items: ["Anthropic Claude", "Gemini API", "Azure AI Services", "RAG", "MCP"] },
  { category: "엣지 하드웨어", items: ["Raspberry Pi 5", "Hailo-8 NPU", "picamera2"] },
  { category: "DB와 인프라", items: ["PostgreSQL", "SQLite", "Supabase", "Docker", "Linux"] },
];

export default function Skills() {
  return (
    <Section id="skills" title="다루는 기술">
      <dl className="grid gap-x-10 gap-y-6 sm:grid-cols-2">
        {GROUPS.map((g) => (
          <div key={g.category}>
            <dt className="text-sm font-semibold text-ink">{g.category}</dt>
            <dd className="mt-1 leading-[1.75] text-muted">{g.items.join(", ")}</dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}
