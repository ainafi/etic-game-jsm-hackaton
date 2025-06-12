"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState, useEffect } from "react";

const queryClient = new QueryClient();
export default function RootLayout({children,}:{children: React.ReactNode;}) {
  const [clientReady, setClientReady] = useState(false);

  useEffect(() => {
    // This will run only on the client-side
    setClientReady(true);
  }, []);

  if (!clientReady) {
    return null; // Optionally, you can return a loading spinner or skeleton screen
  }
    return (
      <QueryClientProvider client={queryClient}>
        <main className="overflow-x-hidden ">
          {children}
        </main>
      </QueryClientProvider>
    );
  }