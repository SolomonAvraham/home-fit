import { create } from "zustand";

interface ErrorStore {
  error: null | string;
  setErrorAlert: (error: null | string) => void;
}

const useErrorsStore = create<ErrorStore>((set) => ({
  error: null,
  setErrorAlert: (error) => {
    set({ error });
    alert(error);
  },
}));

export default useErrorsStore;
