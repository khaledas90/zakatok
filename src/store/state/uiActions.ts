import { create } from "zustand";

interface UIState {
  isNavigating: boolean;
  setIsNavigating: (state: boolean) => void;

  searchOpen: boolean;
  setSearchOpen: (state: boolean) => void;

  isFocused: boolean;
  setIsFocused: (state: boolean) => void;
}

export const useUIStore = create<UIState>((set) => ({
  isNavigating: false,
  setIsNavigating: (state) => set({ isNavigating: state }),

  searchOpen: false,
  setSearchOpen: (state) => set({ searchOpen: state }),

  isFocused: false,
  setIsFocused: (state) => set({ isFocused: state }),
}));

export default useUIStore;
