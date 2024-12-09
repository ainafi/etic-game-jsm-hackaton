import type { Metadata } from "next";
import "./globals.css";
import {  QueryClient,QueryClientProvider } from "@tanstack/react-query";
export const metadata: Metadata = {
  title: "etic game",
  description: "Show case a new movie and Commade ",
};
const queryClient = new QueryClient()
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <QueryClientProvider client={queryClient}>
      <html lang="en">
        <body
          className={`antialiased`}
        >
          {children}
        </body>
      </html>

    </QueryClientProvider>
  );
}
