import { create } from "zustand";

interface SearchStore {
  isOpen: boolean;
  onClosed: () => void;
  onOpen: () => void;
  toggle: () => void;
}

export const useSearch = create<SearchStore>((set, get) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClosed: () => set({ isOpen: false }),
  toggle: () => set({ isOpen: !get().isOpen }),
}));
