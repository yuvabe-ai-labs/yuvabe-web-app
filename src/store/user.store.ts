// src/store/user.store.ts

import type { User } from "@/types/user.types";
import { create } from "zustand";

export type UserStore = {
  userDetails: string | null;
  user: User | null;
  isLoggedIn: boolean;
  isVerified: boolean;
  isLogoutLoading: boolean;
  authChecked: boolean;
  setUser: (userData: User) => void;
  setIsLoggedIn: (status: boolean) => void;
  setAuthChecked: (value: boolean) => void;
  setIsVerified: (status: boolean) => void;
  setLogoutLoading: (value: boolean) => void;
  resetUser: () => void;
};

export const useUserStore = create<UserStore>()((set) => ({
  user: null,
  userDetails: null,
  isLoggedIn: false,
  isVerified: false,
  isLogoutLoading: false,
  authChecked: false,

  setUser: (userData) =>
    set((state) => ({
      user: {
        ...state.user,
        ...userData,
        role: userData.role ?? state.user?.role,
      },
      isLoggedIn: true,
      isVerified: Boolean(userData.is_verified),
    })),

  setIsLoggedIn: (status) => set({ isLoggedIn: status }),
  setIsVerified: (status) => set({ isVerified: status }),
  setAuthChecked: (value) => set({ authChecked: value }),
  setLogoutLoading: (value) => set({ isLogoutLoading: value }),
  resetUser: () =>
    set({
      user: null,
      isLoggedIn: false,
      isVerified: false,
    }),
}));
