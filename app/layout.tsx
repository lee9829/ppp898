import type { Metadata, Viewport } from "next";
import "./globals.css";
import SiteEnhancements from "./site-enhancements";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.gangnamnight.com"),
  title: {
    default: "강남 밤문화 가이드 | 업종 비교·가격 용어·예약 체크",
    template: "%s | 강남의 밤",
  },
  description:
    "강남 하이퍼블릭, 셔츠룸, 쩜오, 가라오케, 텐카페, 텐프로, 일프로의 차이와 비용 용어, 예약 전 확인사항을 정리했습니다.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: "/",
    siteName: "강남의 밤",
    title: "강남 밤문화 가이드 | 업종 비교·가격 용어·예약 체크",
    description:
      "강남 밤문화 업종의 차이, 주대·TC·RT 뜻, 룸과 인원 선택, 예약·결제 전에 확인할 내용을 한눈에 살펴보세요.",
    images: [
      {
        url: "/assets/idol-hero-bright.webp",
        width: 1600,
        height: 1000,
        alt: "밝은 럭셔리 라운지의 20대 성인 아이돌풍 한국 여성 모델 세 명",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export const viewport: Viewport = {
  colorScheme: "light",
  themeColor: "#f7f9ff",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <link rel="preconnect" href="https://cdn.jsdelivr.net" />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/variable/pretendardvariable-dynamic-subset.css"
        />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/@phosphor-icons/web@2.1.1/src/regular/style.css"
        />
      </head>
      <body>
        {children}
        <SiteEnhancements />
      </body>
    </html>
  );
}
