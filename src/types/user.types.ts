export const UserRole = {
  ADMIN: "admin",
  MENTOR: "mentor",
  SUB_MENTOR: "sub mentor",
  USER: "user",
} as const;
export type UserRole = (typeof UserRole)[keyof typeof UserRole];

export type User = {
  id: string;
  name?: string;
  email?: string;
  join_date?: string | null;
  is_verified?: boolean;
  team_name?: string;
  role?: UserRole;
  appRole?: string;
  mentor_name?: string;
  dob?: string | null;
  profile_picture?: string | null;

  lead_label?: string; 
  lead_name?: string;
  nickname?: string; 
};
