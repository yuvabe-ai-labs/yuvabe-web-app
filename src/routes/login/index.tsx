// import { createFileRoute, redirect } from "@tanstack/react-router";
// import { useUserStore } from "../../store/user.store";
// import LoginScreen from "./-components/LoginScreen";

// export const Route = createFileRoute("/login/")({
//   component: LoginScreen,
//   beforeLoad: async () => {
//     // Optional: Redirect if already logged in
//     const isLoggedIn = useUserStore.getState().isLoggedIn;
//     if (isLoggedIn) {
//       throw redirect({ to: "/" });
//     }
//   },
// });
