import Cookies from "js-cookie";

export const setItem = (
  key: string,
  value: string,
  options?: Cookies.CookieAttributes
) => {
  try {
    const defaultOptions: Cookies.CookieAttributes = {
      expires: 7,
      secure: window.location.protocol === "https:",
      sameSite: "Strict",
      ...options,
    };
    Cookies.set(key, value, defaultOptions);
  } catch (error) {
    console.error("Error setting cookie:", error);
  }
};

export const getItem = (key: string): string | null => {
  try {
    return Cookies.get(key) || null;
  } catch (error) {
    console.error("Error getting cookie:", error);
    return null;
  }
};

export const removeItem = (key: string) => {
  try {
    Cookies.remove(key);
  } catch (error) {
    console.error("Error removing cookie:", error);
  }
};

export const setTokens = (accessToken: string, refreshToken: string) => {
  setItem("access_token", accessToken, { expires: 1 });

  setItem("refresh_token", refreshToken, { expires: 7 });
};

export const getAccessToken = () => getItem("access_token");
export const getRefreshToken = () => getItem("refresh_token");

export const clearTokens = () => {
  removeItem("access_token");
  removeItem("refresh_token");
};
