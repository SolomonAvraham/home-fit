import { create } from "zustand";

interface ConfirmStore<T = any> {
  confirm: boolean | null;
  message: string;
  data: T | null;
  onConfirm: (() => void) | null;
  triggerConfirm: (
    message: string,
    data?: T,
    onConfirm?: (() => void) | null
  ) => void;
  setConfirm: (confirm: boolean | null) => void;
}

const useConfirmStore = create<ConfirmStore>((set) => ({
  confirm: null,
  message: "",
  data: null,
  onConfirm: null,

  setConfirm: (confirm) =>
    set((state) => ({
      confirm,
      message: "",
      data: confirm === true ? state.data : null,
      onConfirm: null,
    })),

  triggerConfirm: (message, data = null, onConfirm = null) => {
    set({ message, data, onConfirm });
    const confirm = window.confirm(message);
    set({ confirm });

    if (confirm && onConfirm) {
      onConfirm();
    }

    // Reset confirm and message
    set({ confirm: null, message: "", data: null, onConfirm: null });
  },
}));

export default useConfirmStore;
