import { createFileRoute } from "@tanstack/react-router";

// 1. Define the Route
export const Route = createFileRoute("/")({
  component: HomeScreen, // 2. Point to the component below
});

// 3. Write the Component right here!
function HomeScreen() {
  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold">Welcome Home!</h1>
      <p>This is much simpler, right?</p>
    </div>
  );
}
