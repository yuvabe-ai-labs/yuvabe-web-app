import { initializeApp } from "firebase/app";
import { getMessaging, isSupported, type Messaging } from "firebase/messaging";
import { ENV } from "./env";

const firebaseConfig = {
  apiKey: ENV.VITE_FIREBASE_API_KEY,
  authDomain: ENV.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: ENV.VITE_FIREBASE_PROJECT_ID,
  storageBucket: ENV.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: ENV.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: ENV.VITE_FIREBASE_APP_ID,
};

// Initialize App (Always safe)
const app = initializeApp(firebaseConfig);

// Initialize Messaging (Start as null)
let messaging: Messaging | null = null;

export const messagingPromise: Promise<Messaging | null> = isSupported()
  .then((supported) => {
    if (supported) {
      return getMessaging(app);
    }
    console.warn("⚠️ Firebase Messaging not supported in this environment");
    return null;
  })
  .catch((error) => {
    console.error("❌ Failed to initialize messaging:", error);
    return null;
  });

export const registerFirebaseServiceWorker = async () => {
  if (!("serviceWorker" in navigator)) {
    console.warn("Service workers are not supported in this browser.");
    return null;
  }

  // // 1. Create the query parameters using your existing ENV variables
  // const params = new URLSearchParams({
  //   apiKey: ENV.VITE_FIREBASE_API_KEY,
  //   projectId: ENV.VITE_FIREBASE_PROJECT_ID,
  //   messagingSenderId: ENV.VITE_FIREBASE_MESSAGING_SENDER_ID,
  //   appId: ENV.VITE_FIREBASE_APP_ID,
  //   authDomain: ENV.VITE_FIREBASE_AUTH_DOMAIN,
  //   storageBucket: ENV.VITE_FIREBASE_STORAGE_BUCKET,
  // }).toString();

  // // 2. Append params to the SW file path
  // const swUrl = `/firebase-messaging-sw.js?${params}`;

  try {
    // 3. Register the SW with the custom URL
    const registration = await navigator.serviceWorker.register(
      "/firebase-messaging-sw.js",
    );
    console.log("Service Worker registered with params");
    return registration;
  } catch (error) {
    console.error("Service Worker registration failed:", error);
    return null;
  }
};

// We run this async function to check support SAFELY without crashing the app
const initializeMessaging = async () => {
  try {
    const supported = await isSupported();
    if (supported) {
      messaging = getMessaging(app);
    } else {
      console.warn("⚠️ Firebase Messaging not supported in this environment");
    }
  } catch (error) {
    console.error("❌ Failed to initialize messaging:", error);
  }
};

// Trigger the check immediately
initializeMessaging();

// Export the variable (it will update from null -> object automatically)
export { messaging };
