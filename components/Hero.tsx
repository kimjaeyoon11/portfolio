import Link from "next/link";

const NAV = [
  { label: "프로젝트", href: "#projects" },
  { label: "기술", href: "#skills" },
  { label: "연락", href: "#contact" },
];

export default function Hero() {
  return (
    <header>
      <div className="mx-auto flex max-w-[68rem] items-center justify-between px-5 py-6 sm:px-8">
        <Link href="/" className="font-serif text-lg font-semibold">김재윤</Link>
        <nav className="flex gap-5 text-sm text-muted sm:gap-7">
          {NAV.map((n) => (
            <a key={n.href} href={n.href} className="transition-colors hover:text-ink">{n.label}</a>
          ))}
        </nav>
      </div>

      <div className="mx-auto max-w-[68rem] px-5 pb-16 pt-14 sm:px-8 sm:pb-24 sm:pt-24">
        <h1 className="max-w-[16ch] font-serif text-[2.5rem] font-semibold leading-[1.18] tracking-[-0.01em] sm:text-[3.75rem]">
          엣지 비전 AI와 웹 서비스를 만듭니다
        </h1>
        <p className="mt-7 max-w-[36rem] text-[1.0625rem] leading-[1.8] text-muted">
          동명대학교 컴퓨터공학과 4학년 김재윤입니다. 라즈베리파이 위에서 실시간으로 도는
          비전 파이프라인을 만들었고, 실제 지도와 요금 데이터를 엮은 여행 플래너를 혼자 만들었습니다.
        </p>
        <p className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-[0.9375rem]">
          <a href="mailto:kimjeayoon1@naver.com" className="underline decoration-rule decoration-2 underline-offset-4 transition-colors hover:decoration-berry">
            kimjeayoon1@naver.com
          </a>
          <a href="https://github.com/kimjaeyoon11" target="_blank" rel="noopener noreferrer" className="underline decoration-rule decoration-2 underline-offset-4 transition-colors hover:decoration-berry">
            github.com/kimjaeyoon11
          </a>
        </p>
      </div>
    </header>
  );
}
