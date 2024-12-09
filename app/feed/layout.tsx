"use client"

import { useEffect, useState } from "react";
import Sidebar from "@/components/shared/Sidebar";
import ProtectedRoute from "@/middleware/ProtectedRoute";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function FeedLayout({ children }: { children: React.ReactNode }) {
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
      <ProtectedRoute>
        <main className="bg-dark flex min-h-screen w-full flex-col lg:flex-row">
          <Sidebar />
          <div className="mt-16 flex-1 overflow-auto py-8 lg:mt-0 lg:max-h-screen lg:py-10">
            <div className="max-w-5xl mx-auto px-5 md:px-10 w-full text-dark-400 p-16-regular">
              {children}
            </div>
          </div>
        </main>
      </ProtectedRoute>
    </QueryClientProvider>
  );
}
