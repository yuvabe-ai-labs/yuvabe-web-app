import { ENV } from "@/config/env";
import { messaging } from "@/config/firebase";
import api from "@/lib/axios-client";
import { getToken } from "firebase/messaging";

const getWebDeviceToken = async () => {
  try {
    if (!messaging) return null;

    // FIX: Allow "default" so we can ask the user
    if (Notification.permission === "denied") {
      console.warn("Notifications are blocked by the user.");
      return null;
    }

    // 1. Explicitly ask for permission now
    const permission = await Notification.requestPermission();
    if (permission !== "granted") {
      console.warn("User denied notification permission.");
      return null;
    }

    const swRegistration = await navigator.serviceWorker.register(
      "/firebase-messaging-sw.js"
    );

    await navigator.serviceWorker.ready;

    const token = await getToken(messaging, {
      vapidKey: ENV.VITE_FIREBASE_VAPID_KEY,
      serviceWorkerRegistration: swRegistration,
    });

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
