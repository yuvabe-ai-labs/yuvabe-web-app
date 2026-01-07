// src/store/user.store.ts

import Cookies from "js-cookie";
import { create } from "zustand";
import {
  createJSONStorage,
  persist,
  type StateStorage,
} from "zustand/middleware";

// Define types (same as your RN code)
type User = {
  id: string;
  name?: string;
  email?: string;
  join_date?: string | null;
  is_verified?: boolean;
  team_name?: string;
  role?: string;
  appRole?: string;
  mentor_name?: string;
  dob?: string | null;
  profile_picture?: string | null;
};

type UserStore = {
  userDetails: string | null;
  user: User | null;
  isLoggedIn: boolean;
  isVerified: boolean;
  isLogoutLoading: boolean;
  setUser: (userData: User) => void;
  setIsLoggedIn: (status: boolean) => void;
  setIsVerified: (status: boolean) => void;
  setLogoutLoading: (value: boolean) => void;
  resetUser: () => void;
};

const cookieStorage: StateStorage = {
  getItem: (name: string): string | null => {
    return Cookies.get(name) || null;
  },
  setItem: (name: string, value: string): void => {
    Cookies.set(name, value, { expires: 7, sameSite: "Strict" });
  },
  removeItem: (name: string): void => {
    Cookies.remove(name);
  },
};

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      user: null,
      userDetails: null,
      isLoggedIn: false,
      isVerified: false,
      isLogoutLoading: false,

      setUser: (userData) =>
        set((state) => ({
          user: {
            ...state.user,
            ...userData,
            role: userData.role ?? state.user?.role,
          },
        })),

      setIsLoggedIn: (status) => set({ isLoggedIn: status }),
      setIsVerified: (status) => set({ isVerified: status }),
      setLogoutLoading: (value) => set({ isLogoutLoading: value }),
      resetUser: () =>
        set({ user: null, isLoggedIn: false, isVerified: false }),
    }),
    {
      name: "user-storage", 
      storage: createJSONStorage(() => cookieStorage),
    }
  )
);
