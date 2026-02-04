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
          Privacy Notice
        </h1>
        <div className="w-7"></div>
      </div>

      {/* Content */}
      <div className="p-5 overflow-y-auto font-gilroy text-[#374151] leading-relaxed">
        <p className="text-sm text-gray-500 mb-6 font-medium">
          Last updated January 19, 2026
        </p>

        <h2 className="font-bold text-lg mb-2 uppercase">Summary</h2>
        <p className="mb-4">
          This Privacy Notice for <strong>Yuvabe</strong> ("we," "us," or
          "our"), describes how and why we might access, collect, store, use,
          and/or share ("process") your personal information when you use our
          services ("Services").
        </p>

        <hr className="my-6 border-gray-200" />

        <h2 className="font-bold text-lg mb-2">1. Introduction</h2>
        <p className="mb-4">
          Welcome to Yuvabe. We value your privacy and are committed to
          protecting your personal data. This Privacy Notice explains what data
          we collect and how we use it to provide our Services to you.
        </p>

        <h2 className="font-bold text-lg mb-2">2. Data We Collect</h2>
        <p className="mb-2">
          When you use our "Connect Gmail" feature, we access specific
          information required to provide the Service's functionality:
        </p>
        <ul className="list-disc pl-5 mb-4 space-y-1">
          <li>
            <strong>Basic Profile Information:</strong> We collect your email
            address and name.
          </li>
          <li>
            <strong>Email Permissions:</strong> We access the ability to send
            emails on your behalf specifically for work-related tasks, including
            Payslip retrieval and Lunch requests.
          </li>
        </ul>

        <h2 className="font-bold text-lg mb-2">3. How We Use Data</h2>
        <p className="mb-2">
          We use your data solely to facilitate the features you request:
        </p>
        <ul className="list-disc pl-5 mb-4 space-y-1">
          <li>
            <strong>Operational Use:</strong> Your data is used to send
            automated emails to HR or Admin for operational purposes (e.g.,
            leave requests, lunch opt-outs).
          </li>
          <li>
            <strong>No Sale of Data:</strong> We do not sell your data to third
            parties.
          </li>
        </ul>

        <h2 className="font-bold text-lg mb-2">4. Contact Us</h2>
        <p className="mb-4">
          If you have questions or comments about this notice, you may contact
          us at:
        </p>
        <p className="font-bold text-blue-600">support@yuvabe.com</p>

        {/* Bottom padding for scrolling */}
        <div className="h-10"></div>
      </div>
    </>
  );
}
