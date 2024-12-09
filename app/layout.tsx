import type { Metadata } from "next";
import "./globals.css";
import { Suspense } from "react";
import Loading from "./loading";

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
          className={`antialiased`}
        >
        <Suspense fallback={<Loading/>}>
          {children}
        </Suspense>
        </body>
      </html>

  );
}
