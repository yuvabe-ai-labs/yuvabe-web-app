import { messagingPromise } from "@/config/firebase";
import { router } from "@/main.tsx";
import { onMessage } from "firebase/messaging";
import { useEffect } from "react";
import { toast } from "sonner";

export const useForegroundNotifications = () => {
  useEffect(() => {
    let unsubscribe: (() => void) | null = null;

    messagingPromise.then((messaging) => {
      if (!messaging) return;

      unsubscribe = onMessage(messaging, (payload) => {
        console.log(" [Foreground] Message RECEIVED!", payload);

        const title = payload.notification?.title || payload.data?.title;
        const body = payload.notification?.body || payload.data?.body;

        const targetUrl = payload.data?.url;

        // 2. CHECK IF DATA EXISTS
        if (title) {
          toast.info(title, {
            description: body,
            duration: 5000,
            action: {
              label: "View",
              onClick: () => {
                console.log("Navigate to:", payload.data?.screen);
                if (targetUrl) {
                  router.navigate({ to: targetUrl });
                }
              },
            },
          });
        } else {
          console.warn(
            "⚠️ Received message but could not find title/body",
            payload,
          );
        }
      });
    });

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);
};
