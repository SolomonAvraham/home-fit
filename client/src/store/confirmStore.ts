import { create } from "zustand";

interface ConfirmStore<T = any> {
  message: string;
  data: T | null;
  resolveConfirm: ((result: boolean) => void) | null;
  triggerConfirm: (message: string, data?: T) => Promise<boolean>;
}

const useConfirmStore = create<ConfirmStore>((set) => ({
  message: "",
  data: null,
  resolveConfirm: null,

  triggerConfirm: (message, data = null) => {
    return new Promise<boolean>((resolve) => {
      set({
        message,
        data,
        resolveConfirm: resolve,  
      });
    });
  },
}));

export default useConfirmStore;
