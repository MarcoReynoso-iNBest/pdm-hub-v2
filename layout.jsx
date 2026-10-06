import './globals.css'
import { Geist, Geist_Mono } from "next/font/google";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geist_mono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "PDM Activity Tracker",
  description: "iNBest PDM Team Activity Dashboard",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className={`${geist.variable} ${geist_mono.variable}`}>
        {children}
      </body>
    </html>
  );
}
