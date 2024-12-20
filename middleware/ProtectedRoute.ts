"use client";
import { useEffect } from "react";
import { useRouter,usePathname} from "next/navigation";
import useAuthStore from "@/store/useAuth";
import { getCurrentUser, logout } from "@/lib/auth";
import { toast } from "@/hooks/use-toast";
import useNetworkStatus from "@/hooks/useNetworkStatus";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const pathname = usePathname();
  const user = useAuthStore((state) => state.user);
  const isOnline = useNetworkStatus();

  useEffect(() => {
    const checkUser = async () => {
      try {
        const currentUser = await getCurrentUser();
        if (currentUser) {
          useAuthStore.getState().setUser(currentUser);
          if (pathname === '/') {
            router.push('/discover');
          }
        } else {
          router.push('/sign-in');
          toast({ title: "Please connect to your account", variant: "destructive" });
        }
      } catch (error) {
        console.log(error);
        router.push('/sign-in');
        toast({ title: "Please connect to your account", variant: "destructive" });
      }
    };

    if (!user) {
      checkUser();
    }
  }, [pathname, router, user]);

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
