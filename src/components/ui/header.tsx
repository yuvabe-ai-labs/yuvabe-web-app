import { Link } from "@tanstack/react-router";

export default function Header() {
  return (
    <>
      {/* Simple Navigation for Testing */}
      <div className="p-4 bg-gray-100 flex gap-4 border-b">
        <Link to="/" className="[&.active]:font-bold [&.active]:text-blue-600">
          Home
        </Link>
        <Link
          to="/login"
          className="[&.active]:font-bold [&.active]:text-blue-600"
        >
          Auth
        </Link>
      </div>
    </>
  );
}
