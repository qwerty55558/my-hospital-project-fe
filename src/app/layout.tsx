import type { Metadata } from "next";
import "./globals.css";
import {config} from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import Footer from "@/component/Footer";
import Header from "@/component/Header";
config.autoAddCss = false;

export const metadata: Metadata = {
  title: "My Hospital Project",
  description: "Advanced Eye Clinic Hospital",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="antialiased">
      <Header />
        {children}
      <Footer />
      </body>
    </html>
  );
}
