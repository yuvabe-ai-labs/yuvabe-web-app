import { ENV } from "@/config/env";
import { messaging } from "@/config/firebase";
import api from "@/lib/axios-client";
import { getToken } from "firebase/messaging";

const getWebDeviceToken = async () => {
  try {
    if (!messaging) {
      await new Promise((resolve) => setTimeout(resolve, 500));

      if (!messaging) {
        console.warn("Messaging not ready or not supported. Skipping.");
        return null;
      }
    }

    console.log("Requesting notification permission...");
    const permission = await Notification.requestPermission();
    if (permission !== "granted") {
      console.warn("Notification permission denied");
      return null;
    }

    const swRegistration = await navigator.serviceWorker.register(
      "/firebase-messaging-sw.js"
    );

    const token = await getToken(messaging, {
      vapidKey: ENV.VITE_FIREBASE_VAPID_KEY,
      serviceWorkerRegistration: swRegistration,
    });

    console.log("Web device token:", token);
    return token || null;
  } catch (error) {
    console.error("Error fetching web token:", error);
    return null;
  }
};

export const notificationService = {
  registerDevice: async () => {
    if (typeof window !== "undefined" && !window.isSecureContext) {
      console.warn(
        "Skipping registration: Not a secure context (HTTPS/Localhost required)"
      );
      return;
    }

    const device_token = await getWebDeviceToken();
    if (!device_token) return;

    console.log("Sending token to backend...");
    const res = await api.post("/notifications/register-device", {
      device_token,
    });
    return res.data;
  },

  logoutDevice: async () => {
    const device_token = await getWebDeviceToken();
    if (!device_token) return;

    await api.post("/notifications/logout", {
      device_token,
    });
  },
};
