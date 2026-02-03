import { useNavigate } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";

export default function TermsScreen() {
  const navigate = useNavigate();

  return (
    <>
      {/* Header */}
      <div className="flex items-center px-4 py-4 sticky top-0 bg-white z-10 border-b border-gray-100">
        <button onClick={() => navigate({ to: ".." })} className="p-1 -ml-1">
          <ChevronLeft size={28} />
        </button>
        <h1 className="flex-1 text-center text-[18px] font-bold font-gilroy">
          Terms of Service
        </h1>
        <div className="w-7"></div>
      </div>

      {/* Content */}
      <div className="p-5 overflow-y-auto font-gilroy text-[#374151] leading-relaxed">
        <h2 className="font-bold text-lg mb-2">1. Acceptance of Terms</h2>
        <p className="mb-4">
          By accessing and using the Yuvabe application, you accept and agree to
          be bound by the terms and provision of this agreement.
        </p>

        <h2 className="font-bold text-lg mb-2">2. User Responsibilities</h2>
        <p className="mb-4">
          You agree to use the Gmail integration responsibly and only for
          intended work-related purposes (Payslips, Lunch Opt-outs, Leave
          requests).
        </p>

        <h2 className="font-bold text-lg mb-2">3. Termination</h2>
        <p className="mb-4">
          We reserve the right to terminate access to the application for any
          user who violates these terms.
        </p>
      </div>
    </>
  );
}
