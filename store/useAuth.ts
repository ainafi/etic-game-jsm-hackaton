import { create } from 'zustand';
// import { persist } from 'zustand/middleware';

interface AuthState {
  user: null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setUser: (user: any) => void;
  clearUser: () => void;
}

const useAuthStore =create<AuthState>((set) => ({
            user: null,
            setUser: (user) => set({ user }),
            clearUser: () => set({ user: null }),
}))

export default useAuthStore;