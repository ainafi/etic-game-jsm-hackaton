import type { Metadata } from "next";
import "./globals.css";

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
        
          {children}

        </body>
      </html>

  );
}
