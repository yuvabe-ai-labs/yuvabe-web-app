importScripts(
  "https://www.gstatic.com/firebasejs/10.0.0/firebase-app-compat.js",
);
importScripts(
  "https://www.gstatic.com/firebasejs/10.0.0/firebase-messaging-compat.js",
);

importScripts("swEnv.js");

const firebaseConfig = {
  apiKey: swEnv.apiKey,
  authDomain: swEnv.authDomain,
  projectId: swEnv.projectId,
  storageBucket: swEnv.storageBucket,
  messagingSenderId: swEnv.messagingSenderId,
  appId: swEnv.appId,
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload,
  );

  const notificationTitle = payload.notification?.title || payload.data?.title;
  const notificationBody = payload.notification?.body || payload.data?.body;

  // 2. OPTIONS
  const notificationOptions = {
    body: notificationBody,
    icon: "/logo/logo.png",
    data: payload.data,
  };

  if (notificationTitle) {
    return self.registration.showNotification(
      notificationTitle,
      notificationOptions,
    );
  }
});

self.addEventListener("notificationclick", function (event) {
  console.log(
    "[firebase-messaging-sw.js] Notification click Received.",
    event.notification.data,
  );

  event.notification.close(); // Close the notification

  // Get the URL we sent from Python (default to root / if missing)
  const urlToOpen = event.notification.data?.url || "/";

  // This logic opens the URL in the browser
  event.waitUntil(
    clients
      .matchAll({ type: "window", includeUncontrolled: true })
      .then((windowClients) => {
        // 1. If the tab is already open, focus it
        for (let i = 0; i < windowClients.length; i++) {
          const client = windowClients[i];
          if (client.url.includes(urlToOpen) && "focus" in client) {
            return client.focus();
          }
        }
        // 2. Otherwise, open a new window/tab
        if (clients.openWindow) {
          // Construct full URL (e.g., https://your-site.com/mentor-approval/123)
          const fullUrl = new URL(urlToOpen, self.location.origin).href;
          return clients.openWindow(fullUrl);
        }
      }),
  );
});
