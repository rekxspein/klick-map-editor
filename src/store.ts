import { create } from "zustand";

export const useLinkStore = create((set) => ({
  link: "",
  setLink: (link: any) => set({ link }),
}));
