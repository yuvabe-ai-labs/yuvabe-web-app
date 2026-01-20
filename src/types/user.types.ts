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

  lead_label?: string; 
  lead_name?: string;
  nickname?: string; 
};
