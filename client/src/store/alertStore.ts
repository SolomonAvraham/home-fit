import { create } from "zustand";

interface AlertStore {
  alert: null | string;
  isError: boolean;
  setAlert: (alert: null | string, isError?: boolean) => void;
}

const useAlertStore = create<AlertStore>((set) => ({
  alert: null,
  isError: false,
  setAlert: (alert, isError = false) => {
    set({ alert, isError });
  },
}));

export default useAlertStore;
