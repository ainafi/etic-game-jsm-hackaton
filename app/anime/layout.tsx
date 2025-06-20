"use client"
import { SidebarProvider } from "@/components/ui/sidebar"
import { useEffect, useState } from "react";
import {  SidebarTrigger } from "@/components/ui/sidebar"
// import ProtectedRoute from "@/middleware/ProtectedRoute";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AnimeNav from "@/components/shared/anime/Animenav";
import OrderCard from "@/components/shared/OrderCard";
import AnimeSidebar from "@/components/shared/anime/AnimeSidebar";


const queryClient = new QueryClient();

export default function AnimeFeedLayout({ children }: { children: React.ReactNode }) {
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
   
          <main className="bg-background !text-white flex min-h-screen w-full flex-col lg:flex-row" >
            <div className="hidden lg:flex">
              <AnimeSidebar />  
            </div>
            <div className="mt flex-1 overflow-auto py-8 lg:mt-0 lg:max-h-screen lg:py-3">
              <div className="max-w-[1500px] mx-auto px-5 md:px-10 w-full text-dark-400 p-16-regular">
                <nav className="flex items-center justify-between pb-4" >
                  <div className="hidden lg:flex">
                    <SidebarTrigger />
                  </div>
                    <AnimeNav/>
                  <div>
                    <OrderCard/>
                  </div>
                </nav>
                {/* <div className="lg:hidden">
                  <MobileNav/>
                </div> */}
                  {children}
                </div>
            </div>
          </main>

     
        
      </SidebarProvider>
    </QueryClientProvider>
  );
}
