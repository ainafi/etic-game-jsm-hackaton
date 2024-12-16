"use client"
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import useAuthStore from "@/store/useAuth";
import { getCurrentUser } from "@/lib/auth";

const useCheckSession = () => {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    const checkUserSession = async () => {
      try {
        const currentUser = await getCurrentUser();
        if (currentUser) {
          useAuthStore.getState().setUser(currentUser);
          router.push('/movie/feed');
        }
      } catch (error) {
        console.error("No existing session found", error);
      }
    };

    if (!user) {
      checkUserSession();
    }
  }, [router, user]);
};

export default useCheckSession;
