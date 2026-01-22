// src/lib/axios-client.ts
import { ENV } from "@/config/env";
import axios from "axios";
import {
  clearTokens,
  getAccessToken,
  getRefreshToken,
  setTokens,
} from "./storage";

const API_BASE_URL = ENV.VITE_API_BASE_URL;

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

// Automatically attach access token
api.interceptors.request.use(async (config) => {
  const token = getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle token expiration
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // LOG 1: Check if an error was caught
    console.group("Axios Interceptor Error Caught");
    console.log("Error Status:", error.response?.status);
    console.log("URL:", originalRequest.url);
    console.log("Already Retried?", originalRequest._retry);

    // If token expired & we haven’t retried yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      console.log("Condition Met: 401 error and not retried yet.");

      originalRequest._retry = true;

      const refreshToken = getRefreshToken();
      console.log(
        "Checking Refresh Token in storage:",
        refreshToken ? "Found" : "Missing"
      );

      if (!refreshToken) {
        console.warn("No refresh token found. Redirecting to login.");
        clearTokens();
        window.location.href = "/login";
        console.groupEnd(); // End the group
        return Promise.reject(error);
      }

      try {
        console.log("Attempting to refresh token via API...");
        const res = await axios.post(`${API_BASE_URL}/auth/refresh`, {
          refresh_token: refreshToken,
        });

        console.log("Refresh API Success:", res.data);

        const newAccessToken = res.data.data.access_token;
        const currentRefreshToken = getRefreshToken();

        // Use the existing refresh token if the API doesn't return a new one
        setTokens(
          newAccessToken,
          res.data.data.refresh_token || currentRefreshToken!
        );
        console.log("New tokens saved to storage.");

        // Retry failed request with new token
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        console.log("Retrying original request with new access token...");
        console.groupEnd(); // End the group

        return api(originalRequest);
      } catch (refreshError) {
        console.error("Refresh token API failed:", refreshError);
        clearTokens();
        window.location.href = "/login";
        console.groupEnd(); // End the group
        return Promise.reject(refreshError);
      }
    }

    console.log("⏭Passing error through (not a 401 or already retried).");
    console.groupEnd(); // End the group
    return Promise.reject(error);
  }
);

export default api;
