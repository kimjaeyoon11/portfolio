import Section from "./Section";

export default function Footer() {
  return (
    <>
      <Section id="contact" title="연락">
        <p className="max-w-[34rem] leading-[1.8] text-muted">
          프로젝트나 채용에 관한 이야기라면 메일로 연락 주세요. 코드는 GitHub에 모두 공개되어 있습니다.
        </p>
        <div className="mt-6 flex flex-col gap-2 font-serif text-xl font-semibold sm:text-2xl">
          <a href="mailto:kimjeayoon1@naver.com" className="w-fit underline decoration-berry/40 decoration-2 underline-offset-[6px] transition-colors hover:text-berry">
            kimjeayoon1@naver.com
          </a>
          <a href="https://github.com/kimjaeyoon11" target="_blank" rel="noopener noreferrer" className="w-fit underline decoration-rule decoration-2 underline-offset-[6px] transition-colors hover:text-berry">
            github.com/kimjaeyoon11
          </a>
        </div>
      </Section>
      <footer className="border-t border-rule">
        <p className="mx-auto max-w-[68rem] px-5 py-8 text-sm text-faint sm:px-8">© 2026 김재윤</p>
      </footer>
    </>
  );
}
