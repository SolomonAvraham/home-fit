import { create } from "zustand";

interface AlertStore {
  alert: null | string;
  setAlert: (alert: null | string) => void;
}

const useAlertStore = create<AlertStore>((set) => ({
  alert: null,
  setAlert: (alert) => {
    set({ alert });
  },
}));

export default useAlertStore;
