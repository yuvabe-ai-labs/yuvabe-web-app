import type { ReactNode } from "react";

interface AppDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  drawerContent: ReactNode; // The Menu
  children: ReactNode; // The Home Screen
}

export default function AppDrawer({
  isOpen,
  onClose,
  drawerContent,
  children,
}: AppDrawerProps) {
  return (
    <div className="relative w-full h-full overflow-hidden bg-white">
      <div className="absolute inset-y-0 left-0 w-[75%] z-0 bg-white border-r border-gray-100">
        {drawerContent}
      </div>
      <div
        className={`
          absolute inset-0 z-10 bg-white transition-transform duration-300 ease-out shadow-2xl
          flex flex-col
          ${isOpen ? "translate-x-[75%]" : "translate-x-0"}
        `}
      >
        {children}

        {isOpen && (
          <div
            className={`
            absolute inset-0 z-20 bg-black/40 cursor-pointer transition-opacity duration-300
            ${
              isOpen
                ? "opacity-100 visible"
                : "opacity-0 invisible pointer-events-none"
            }
          `}
            onClick={onClose}
          />
        )}
      </div>
    </div>
  );
}
