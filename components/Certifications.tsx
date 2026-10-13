import Section from "./Section";

const ITEMS = [
  { year: "2026", name: "부산경제진흥원장상", note: "AI 해커톤, 4인 팀 프로젝트 TripTok" },
  { year: "", name: "Microsoft Azure AI-900", note: "AI Fundamentals" },
  { year: "", name: "운전면허 1종", note: "" },
];

export default function Certifications() {
  return (
    <Section id="certs" title="수상과 자격">
      <ul className="divide-y divide-rule border-y border-rule">
        {ITEMS.map((it) => (
          <li key={it.name} className="grid grid-cols-[3.5rem_1fr] gap-x-4 py-4 sm:grid-cols-[4.5rem_1fr]">
            <span className="tabular-nums text-faint">{it.year}</span>
            <span>
              <span className="font-medium text-ink">{it.name}</span>
              {it.note && <span className="mt-0.5 block text-sm text-muted">{it.note}</span>}
            </span>
          </li>
        ))}
      </ul>
    </Section>
  );
}
