import type { Metadata } from "next";
import { Fredoka, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const fredoka = Fredoka({
  subsets: ["latin"],
  variable: "--font-fredoka",
  weight: ["300", "400", "500", "600", "700"],
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta-sans",
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Mochiupiuu",
  description: "Hadiah kecil spesial untuk Mochi tersayang",
  robots: {
    index: false,
    follow: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${fredoka.variable} ${plusJakartaSans.variable}`}>
      <body className="bg-[#FFF9F6] text-[#5E4E46] h-full w-full flex justify-center antialiased">
        <div className="w-full max-w-md bg-[#FFF9F6] h-full flex flex-col relative border-x border-[#FFE0D3]/30 shadow-sm overflow-hidden">
          {children}
        </div>
      </body>
    </html>
  );
}
