import type { Metadata } from "next";
import { Space_Grotesk, Noto_Sans_KR } from "next/font/google";
import SmoothScroll from "@/components/SmoothScroll";
import "./globals.css";

const display = Space_Grotesk({ subsets: ["latin"], variable: "--font-display", display: "swap" });
const body = Noto_Sans_KR({ subsets: ["latin"], weight: ["400", "500", "700"], variable: "--font-body", display: "swap" });

export const metadata: Metadata = {
  title: "김재윤 · Kim Jaeyoon — Portfolio",
  description: "동명대학교 컴퓨터공학과. 웹·AI·임베디드를 아우르는 개발자 포트폴리오. TripLog(AI 여행 플래너), 오타니 데이터 시각화 등.",
  openGraph: {
    title: "김재윤 · Kim Jaeyoon — Portfolio",
    description: "웹·AI·임베디드 개발자 포트폴리오",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" className={`${display.variable} ${body.variable}`}>
      <body className="bg-[#0a0f0d] text-slate-100 antialiased font-[family-name:var(--font-body)]">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
