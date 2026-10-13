// 왼쪽에 섹션 제목, 오른쪽에 내용을 두는 2단 구조. 모바일에서는 위아래로 쌓인다.
export default function Section({
  id, title, children,
}: { id?: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="scroll-mt-8 border-t border-rule">
      <div className="mx-auto grid max-w-[68rem] gap-x-12 gap-y-6 px-5 py-14 sm:px-8 sm:py-20 md:grid-cols-[10rem_1fr]">
        <h2 className="font-serif text-xl font-semibold text-ink md:pt-1">{title}</h2>
        <div className="min-w-0">{children}</div>
      </div>
    </section>
  );
}
