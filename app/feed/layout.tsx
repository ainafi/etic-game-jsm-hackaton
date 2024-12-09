"use client"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { useEffect, useState } from "react";
import AppSidebar from "@/components/shared/Sidebar";
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
      <SidebarProvider>
        <ProtectedRoute>
          <main
           className="bg-dark !text-white flex min-h-screen w-full flex-col lg:flex-row"
           >
            <div className="hidden lg:flex">
              <AppSidebar />  

            </div>
            <div 
            className="mt-16 flex-1 overflow-auto py-8 lg:mt-0 lg:max-h-screen lg:py-10"
            >
              <div 
              className="max-w-[1500px] mx-auto px-5 md:px-10 w-full text-dark-400 p-16-regular"
              >
                <div className="hidden lg:flex">

                  <SidebarTrigger />
                </div>
                {children}
              </div>
            </div>
          </main>
        </ProtectedRoute>
      </SidebarProvider>
    </QueryClientProvider>
  );
}
