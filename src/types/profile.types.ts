export interface UpdateProfilePayload {
  name: string;
  email: string;
  team?: string;
  dob?: string | null;
  current_password?: string | null;
  new_password?: string | null;
  nick_name?: string;
}
