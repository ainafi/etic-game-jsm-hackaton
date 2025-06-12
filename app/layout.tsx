import type { Metadata } from "next";
import "./globals.css";
import {Montserrat} from 'next/font/google'

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '500', '700'], // Specify the weights you need
  display: 'swap',
});
export const metadata: Metadata = {
  title: "etic game",
  description: "Show case a new movie and Commade ",
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
        <body
          className={`antialiased ${montserrat.className}`}
        >
          {children}
        </body>
      </html>

  );
}
