import { create } from "zustand";

export interface User {
  id: string;
  email?: string;
  name: string;
  role?: string;
}

interface UserStore {
  user: User | null;
  setUser: (user: User | null) => void;
  logout: () => void;
}

const useUserStore = create<UserStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  logout: () => {
    set({ user: null });
  },
}));

export default useUserStore;
