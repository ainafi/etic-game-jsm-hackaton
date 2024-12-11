"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import useAuthStore from "@/store/useAuth";
import { getCurrentUser, logout } from "@/lib/auth";
import { toast } from '@/hooks/use-toast';
import useNetworkStatus from '@/hooks/useNetworkStatus';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const isOnline = useNetworkStatus();

  useEffect(() => {
    const checkUser = async () => {
      try {
        await getCurrentUser();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error:any) {
        console.log(error)
        router.push('/sign-in');
        return toast({ title: "Please connect to your account", variant: "destructive" });
      }
    };

    checkUser();
  }, [router]);

  useEffect(() => {
    if (!isOnline) {
      logout();
      router.push('/sign-in');
      toast({ title: "You have been logged out due to network disconnection", variant: "destructive" });
    }
  }, [isOnline, router]);

  if (!user) {
    return null;
  }

  return children;
};

export default ProtectedRoute;
