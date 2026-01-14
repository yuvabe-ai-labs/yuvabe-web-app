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
      console.log("✅ Firebase Messaging initialized");
      return getMessaging(app);
    }
    console.warn("⚠️ Firebase Messaging not supported in this environment");
    return null;
  })
  .catch((error) => {
    console.error("❌ Failed to initialize messaging:", error);
    return null;
  });

// We run this async function to check support SAFELY without crashing the app
const initializeMessaging = async () => {
  try {
    const supported = await isSupported();
    if (supported) {
      messaging = getMessaging(app);
      console.log("✅ Firebase Messaging initialized");
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
