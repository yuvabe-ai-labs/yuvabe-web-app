import { useNavigate } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";

export default function PrivacyPolicyScreen() {
  const navigate = useNavigate();

  return (
    <>
      {/* Header */}
      <div className="flex items-center px-4 py-4 sticky top-0 bg-white z-10 border-b border-gray-100">
        <button onClick={() => navigate({ to: ".." })} className="p-1 -ml-1">
          <ChevronLeft size={28} />
        </button>
        <h1 className="flex-1 text-center text-[18px] font-bold font-gilroy">
          Privacy Policy
        </h1>
        <div className="w-7"></div>
      </div>

      {/* Content */}
      <div className="p-5 overflow-y-auto font-gilroy text-[#374151] leading-relaxed">
        <h2 className="font-bold text-lg mb-2">1. Introduction</h2>
        <p className="mb-4">
          Welcome to Yuvabe. We value your privacy and are committed to
          protecting your personal data.
        </p>

        <h2 className="font-bold text-lg mb-2">2. Data We Collect</h2>
        <p className="mb-4">
          When you use our "Connect Gmail" feature, we access your basic profile
          information (email, name) and the ability to send emails on your
          behalf specifically for Payslip and Lunch requests.
        </p>

        <h2 className="font-bold text-lg mb-2">3. How We Use Data</h2>
        <p className="mb-4">
          We use your data solely to facilitate the features you request, such
          as sending automated emails to HR or Admin for operational purposes.
          We do not sell your data.
        </p>

        <h2 className="font-bold text-lg mb-2">4. Contact Us</h2>
        <p>If you have questions, please contact us at support@yuvabe.com.</p>
      </div>
    </>
  );
}
