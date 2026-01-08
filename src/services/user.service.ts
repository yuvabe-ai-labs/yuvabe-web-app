import api from "../lib/axios-client";

export const userService = {
  // Fetch logged in user details
  fetchProfileDetails: async () => {
    const response = await api.get("/profile/details");
    return response.data;
  },

  
};
