import type { ReactNode } from "react";

interface MobileLayoutProps {
  children: ReactNode;
  className?: string;
}

export default function MobileLayout({
  children,
  className = "",
}: MobileLayoutProps) {
  return (
    // 1. OUTER CONTAINER
    // bg-gray-100: Background for desktop
    // flex items-center justify-center: Centers the phone
    <div className="fixed inset-0 w-full h-full bg-white sm:bg-gray-100 flex items-center justify-center overflow-hidden">
      {/* 2. THE PHONE FRAME
          - Mobile (<640px): w-full h-full (Full screen, no borders)
          - Desktop (sm): 
              * w-full max-w-[400px]: Fixed width but shrinks if window is tiny
              * h-[90vh]: Height is 90% of the browser window (Responsive!)
              * max-h-[800px]: Never grow taller than 800px (caps it on big monitors)
      */}
      <div
        className="
        w-full h-full 
        sm:w-full sm:max-w-87.5 
        sm:h-[90vh] sm:max-h-200 
        bg-white 
        sm:rounded-4xl sm:shadow-2xl sm:border-8 border-gray-900/10 
        flex flex-col relative overflow-hidden transition-all duration-300
      "
      >
        {/* 3. SCROLLABLE CONTENT
            - This ensures the scrollbar is inside the phone, not the window
        */}
        <div className={`flex-1 overflow-y-auto no-scrollbar ${className}`}>
          {children}
        </div>
      </div>
    </div>
  );
}
