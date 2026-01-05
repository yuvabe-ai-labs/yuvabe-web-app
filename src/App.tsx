import { Button } from "@/components/ui/button";

export default function App() {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-4">
      <h1 className="text-2xl font-bold">Shadcn Test</h1>

      {/* Standard Shadcn Button */}
      <Button>Default Button</Button>

      {/* Variant: Destructive (Red) */}
      <Button className="text-yellow-200" variant="destructive">
        Delete Account
      </Button>

      {/* Variant: Outline */}
      <Button variant="outline">Click me</Button>
    </div>
  );
}
