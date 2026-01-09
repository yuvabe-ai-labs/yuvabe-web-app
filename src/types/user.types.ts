// Define types (same as your RN code)
export type User = {
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
