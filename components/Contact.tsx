import { Mail, ExternalLink } from "lucide-react";
import SplitReveal from "./ui/SplitReveal";
import Reveal from "./ui/Reveal";

export default function Contact() {
  return (
    <section id="contact" className="mx-auto max-w-5xl px-6 py-32 text-center">
      <SplitReveal text="함께 이야기해요" className="font-[family-name:var(--font-display)] text-4xl font-bold sm:text-6xl" />
      <Reveal as="p" className="mx-auto mt-5 max-w-md text-slate-600">
        협업·채용 문의를 환영합니다. 아래로 연락 주세요.
      </Reveal>
      <div className="mt-10 flex flex-wrap justify-center gap-4">
        <a href="mailto:kimjeayoon1@naver.com" className="inline-flex items-center gap-2 rounded-full bg-emerald-600 px-7 py-3 font-semibold text-white transition hover:bg-emerald-700">
          <Mail size={18} /> kimjeayoon1@naver.com
        </a>
        <a href="https://github.com/kimjaeyoon11" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-slate-900/20 px-7 py-3 font-semibold text-slate-900 transition hover:bg-slate-900/5">
          <ExternalLink size={18} /> github.com/kimjaeyoon11
        </a>
      </div>
    </section>
  );
}
