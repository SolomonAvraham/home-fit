import { create } from "zustand";

export interface User {
  id: string;
  email?: string;
  name: string;
  role?: string;
}

interface UserStore {
  user: User | null;
  token: string | null;
  setUser: (user: User | null) => void;
  setToken: (token: string | null) => void;
  logout: () => void;
}

const useUserStore = create<UserStore>((set) => ({
  user: null,
  token: null,
  setUser: (user) => set({ user }),
  setToken: (token) => set({ token }),
  logout: () => {
    set({ user: null, token: null });
    localStorage.removeItem("token");
  },
}));

export default useUserStore;
