import type { Metadata } from "next";
import { Hahmlet, IBM_Plex_Sans_KR } from "next/font/google";
import "./globals.css";

const serif = Hahmlet({ subsets: ["latin"], variable: "--font-hahmlet", display: "swap" });
const sans = IBM_Plex_Sans_KR({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-plex", display: "swap" });

export const metadata: Metadata = {
  title: "김재윤 포트폴리오",
  description: "동명대학교 컴퓨터공학과 김재윤. Berry(엣지 AI 반려 로봇), TripLog(AI 여행 동선 플래너), 오타니 쇼헤이 데이터 시각화.",
  openGraph: {
    title: "김재윤 포트폴리오",
    description: "엣지 비전 AI와 웹 서비스를 만드는 김재윤의 프로젝트 모음",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" className={`${serif.variable} ${sans.variable}`}>
      <body className="bg-paper font-sans text-ink antialiased">{children}</body>
    </html>
  );
}
