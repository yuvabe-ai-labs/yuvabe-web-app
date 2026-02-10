import { useNavigate } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";

export default function TermsScreen() {
  const navigate = useNavigate();

  return (
    <>
      {/* Header */}
      <div className="flex items-center px-4 py-4 sticky top-0 bg-white z-10 border-b border-gray-100">
        <button
          onClick={() => navigate({ to: "/login" })}
          className="p-1 -ml-1"
        >
          <ChevronLeft size={28} />
        </button>
        <h1 className="flex-1 text-center text-[18px] font-bold font-gilroy">
          Terms and Conditions
        </h1>
        <div className="w-7"></div>
      </div>

      {/* Content */}
      <div className="p-5 overflow-y-auto font-gilroy text-[#374151] leading-relaxed">
        <p className="text-sm text-gray-500 mb-6 font-medium">
          Last updated January 19, 2026
        </p>

        <h2 className="font-bold text-lg mb-2 uppercase">
          Agreement to Our Legal Terms
        </h2>
        <p className="mb-4">
          We are <strong>Yuvabe</strong> ('Company', 'we', 'us', or 'our'). We
          operate the application Yuvabe (the 'App'), as well as any other
          related products and services that refer or link to these legal terms
          (the 'Legal Terms') (collectively, the 'Services').
        </p>
        <p className="mb-4">
          These Legal Terms constitute a legally binding agreement made between
          you, whether personally or on behalf of an entity ('you'), and Yuvabe.
          You agree that by accessing the Services, you have read, understood,
          and agreed to be bound by all of these Legal Terms.
        </p>

        <hr className="my-6 border-gray-200" />

        <h2 className="font-bold text-lg mb-2">1. Acceptance of Terms</h2>
        <p className="mb-4">
          By accessing and using the Yuvabe application, you accept and agree to
          be bound by the terms and provision of this agreement.
        </p>

        <h2 className="font-bold text-lg mb-2">2. User Responsibilities</h2>
        <p className="mb-2">
          You agree to use the specific integrations provided within the
          Services (specifically the Gmail integration) responsibly and only for
          intended work-related purposes. Allowed uses include:
        </p>
        <ul className="list-disc pl-5 mb-4 space-y-1">
          <li>Processing Payslips</li>
          <li>Managing Lunch Opt-outs</li>
          <li>Submitting Leave requests</li>
        </ul>
        <p className="mb-4">
          You agree not to misuse these integrations for any purpose other than
          the operational work requirements listed above.
        </p>

        <h2 className="font-bold text-lg mb-2">3. Termination</h2>
        <p className="mb-4">
          We reserve the right to terminate access to the application for any
          user who violates these terms or engages in unauthorized use of the
          Services.
        </p>

        <h2 className="font-bold text-lg mb-2">4. Contact Us</h2>
        <p className="mb-4">
          In order to resolve a complaint regarding the Services or to receive
          further information regarding use of the Services, please contact us
          at:
        </p>
        <p className="font-bold text-blue-600">support@yuvabe.com</p>

        {/* Bottom padding for scrolling */}
        <div className="h-10"></div>
      </div>
    </>
  );
}
