import { createFileRoute, redirect } from "@tanstack/react-router";
import { useUserStore } from "../store/user.store";

export const Route = createFileRoute("/")({
  component: HomeScreen,
  beforeLoad: () => {
    // Check if user is logged in
    const isLoggedIn = useUserStore.getState().isLoggedIn;
    if (!isLoggedIn) {
      throw redirect({
        to: "/login",
      });
    }
  },
});

function HomeScreen() {
  return (
    <div className="min-h-screen w-full bg-gray-50 flex items-center justify-center p-0 sm:p-4 font-sans">
      <div className="w-full h-full sm:h-auto sm:max-w-[400px] bg-white sm:rounded-3xl sm:shadow-2xl sm:border border-gray-100 flex flex-col overflow-hidden">
        <div className="flex-1 flex flex-col items-center justify-center">
          <h1 className="text-2xl font-bold">Welcome Home!</h1>
        </div>
      </div>
    </div>
  );
}
