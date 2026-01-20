import type { UpdateProfilePayload } from "@/types/profile.types";
import type { User } from "@/types/user.types";
import api from "../lib/axios-client";

export const userService = {
  // Fetch logged in user details
  fetchProfileDetails: async () => {
    const response = await api.get("/profile/details");
    return response.data;
  },

  fetchUser: async () => {
    const response = await api.get("/auth/home");
    console.log(response.data.dob);
    return response.data.data;
  },

  updateProfile: async (payload: UpdateProfilePayload): Promise<User> => {
    const response = await api.put("/profile/update-profile", payload);
    return response.data.data.user;
  },

  uploadProfileImage: async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    const response = await api.post("/profile/upload-image", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data.url;
  },
};
