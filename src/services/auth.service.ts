import { AxiosError } from "axios";
import api from "../lib/axios-client";
import { type SignInSchemaType } from "../schemas/auth.schemas";

export const authService = {
  login: async (credentials: SignInSchemaType) => {
    try {
      const response = await api.post("/auth/login", credentials);
      return response.data.data;
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        // Extract the specific message from backend (e.g., "Invalid password")
        const backendMessage =
          error.response.data.detail ||
          error.response.data.message ||
          "Login failed";
        throw new Error(backendMessage);
      }
      throw error; // Re-throw if it's not an API error
    }
  },

  fetchUser: async () => {
    const response = await api.get("/auth/home");
    return response.data.data;
  },
};
