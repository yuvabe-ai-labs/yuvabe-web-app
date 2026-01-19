import MobileLayout from "@/components/layout/MobileLayout";
import { useLunchOptOut } from "@/hooks/useLunch";
import { useGmailConnect } from "@/hooks/usePayslip";
import { useUserStore } from "@/store/user.store";
import { useNavigate } from "@tanstack/react-router";
import { AxiosError } from "axios";
import { ChevronLeft, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

type ModeType = "tomorrow" | "range" | null;

export default function LunchPreferenceScreen() {
  const navigate = useNavigate();
  const { user } = useUserStore();

  // State
  const [selectedMode, setSelectedMode] = useState<ModeType>(null);
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [showConfirm, setShowConfirm] = useState(false);
  const [showGmailModal, setShowGmailModal] = useState(false);
  const [pendingSubmit, setPendingSubmit] = useState(false);

  // Hooks
  const { mutateAsync: sendLunchRequest, isPending: submitting } =
    useLunchOptOut();
  const { mutateAsync: getGmailUrl, isPending: connectingGmail } =
    useGmailConnect();

  useEffect(() => {
    const checkCallback = async () => {
      const params = new URLSearchParams(window.location.search);
      if (params.has("success") && pendingSubmit) {
        // Clean URL
        window.history.replaceState(
          {},
          document.title,
          window.location.pathname
        );

        // Retry submission automatically
        // eslint-disable-next-line react-hooks/immutability
        await handleSubmit();
        setPendingSubmit(false);
        setShowGmailModal(false);
      } else if (params.has("error")) {
        window.history.replaceState(
          {},
          document.title,
          window.location.pathname
        );
        toast.error("Gmail connection failed");
        setPendingSubmit(false);
      }
    };

    setTimeout(checkCallback, 100);
  }, []);

  const isRangeValid =
    selectedMode &&
    startDate &&
    endDate &&
    new Date(endDate) >= new Date(startDate);

  const getConfirmText = () => {
    if (!startDate || !endDate) return "";
    const startStr = new Date(startDate).toDateString();
    const endStr = new Date(endDate).toDateString();

    return startDate === endDate
      ? `You want to opt out of lunch on ${startStr}.`
      : `You want to opt out of lunch from ${startStr} to ${endStr}.`;
  };

  // ---------------------------------------------------------
  // 3. ACTIONS
  // ---------------------------------------------------------
  const handleConnectGmail = async () => {
    if (!user?.id) {
      toast.error("User ID missing. Please refresh.");
      return;
    }

    try {
      const res = await getGmailUrl({
        userId: user.id,
        fromPath: "/lunch-preference",
      });
      window.location.href = res.auth_url;
    } catch (error) {
      console.log(error);
      toast.error("Connection Failed", {
        description: "Could not get authorization URL.",
      });
    }
  };

  const handleSubmit = async () => {
    if (!startDate || !endDate) return;

    try {
      await sendLunchRequest({
        start_date: startDate,
        end_date: endDate,
      });
      toast.success("Success", { description: "Lunch opt-out request sent!" });
      navigate({ to: "/" });
    } catch (err) {
      const error = err as AxiosError;

      // Check for 428 Precondition Required (Standard for "Needs Gmail")
      if (error.response?.status === 428) {
        setPendingSubmit(true); // Mark that we are waiting for Gmail
        setShowGmailModal(true);
      } else {
        toast.error("Request Failed", { description: "Something went wrong" });
      }
    }
  };

  const handleTomorrowSelect = () => {
    const t = new Date();
    t.setDate(t.getDate() + 1);
    const dateStr = t.toISOString().split("T")[0];

    setStartDate(dateStr);
    setEndDate(dateStr);
    setSelectedMode("tomorrow");
  };

  return (
    <MobileLayout className="bg-white flex flex-col h-full relative">
      {/* HEADER */}
      <div className="flex items-center px-4 py-4 bg-white sticky top-0 z-10 shrink-0">
        <button
          onClick={() => navigate({ to: "/" })}
          className="p-1 -ml-1 hover:bg-gray-100 rounded-full transition-colors"
        >
          <ChevronLeft size={28} className="text-black" />
        </button>
        <div className="flex-1 text-center pr-7">
          <h1 className="text-[18px] font-bold text-[#374151] font-gilroy">
            Lunch Preference
          </h1>
        </div>
      </div>

      {/* CONTENT */}
      <div className="flex-1 overflow-y-auto px-4 pb-24">
        <p className="text-[16px] text-[#374151] mb-6 leading-6 font-gilroy">
          Planning a leave or working remotely?
          <br />
          Make sure to opt out of lunch — let’s reduce food waste 🌱
        </p>

        {/* Tomorrow Option */}
        <button
          onClick={handleTomorrowSelect}
          className={`w-full p-4 rounded-xl border mb-6 text-left transition-all ${
            selectedMode === "tomorrow"
              ? "bg-[#F3E8FF] border-[#5B21B6] opacity-100"
              : "bg-white border-[#E5E7EB] opacity-60 hover:opacity-100"
          }`}
        >
          <span className="text-[#5B21B6] font-semibold text-[16px] font-gilroy">
            I don’t want lunch tomorrow
          </span>
        </button>

        {/* Range Options */}
        <p className="text-[14px] text-[#6B7280] mb-2 font-gilroy">
          I don’t want lunch from
        </p>

        <div className="flex gap-3">
          <div className="flex-1">
            <div className="border border-[#E5E7EB] rounded-lg p-1 relative h-13 flex items-center">
              <input
                type="date"
                value={startDate}
                onChange={(e) => {
                  setSelectedMode("range");
                  setStartDate(e.target.value);
                }}
                className="w-full h-full px-3 outline-none text-[15px] bg-transparent font-gilroy text-[#111827] uppercase"
                placeholder="Start Date"
              />
            </div>
          </div>

          <div className="flex-1">
            <div className="border border-[#E5E7EB] rounded-lg p-1 relative h-13 flex items-center">
              <input
                type="date"
                value={endDate}
                min={startDate}
                onChange={(e) => {
                  setSelectedMode("range");
                  setEndDate(e.target.value);
                }}
                className="w-full h-full px-3 outline-none text-[15px] bg-transparent font-gilroy text-[#111827] uppercase"
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <button
          disabled={!isRangeValid || submitting}
          onClick={() => setShowConfirm(true)}
          className={`w-full mt-8 py-4 rounded-xl flex items-center justify-center transition-colors ${
            !isRangeValid || submitting
              ? "bg-[#D1D5DB] cursor-not-allowed"
              : "bg-[#592AC7] hover:bg-[#4c249f]"
          }`}
        >
          {submitting ? (
            <Loader2 className="animate-spin text-white" />
          ) : (
            <span className="text-[16px] font-semibold text-white font-gilroy">
              Send
            </span>
          )}
        </button>
      </div>

      {/* CONFIRMATION MODAL */}
      {showConfirm && (
        <div className="fixed inset-0 z-999 flex items-center justify-center bg-black/50 animate-in fade-in duration-200 px-4">
          <div className="bg-white w-full max-w-85 rounded-xl p-6 shadow-xl animate-in zoom-in-95 duration-200">
            <h3 className="text-[18px] font-bold text-[#1F2937] text-center mb-4 font-gilroy">
              Confirm Lunch Opt-Out
            </h3>
            <p className="text-[15px] text-[#374151] text-center mb-6 font-gilroy leading-relaxed">
              {getConfirmText()}
            </p>

            <div className="flex gap-3">
              <button
                onClick={() => setShowConfirm(false)}
                className="flex-1 py-3 rounded-lg bg-[#F3F4F6] text-[#4B5563] font-semibold font-gilroy hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={async () => {
                  setShowConfirm(false);
                  await handleSubmit();
                }}
                disabled={submitting}
                className="flex-1 py-3 rounded-lg bg-[#592AC7] text-white font-semibold font-gilroy hover:bg-[#4c1b99] transition-colors"
              >
                {submitting ? "Sending..." : "Confirm"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* GMAIL CONNECT MODAL */}
      {showGmailModal && (
        <div className="fixed inset-0 z-999 flex items-end justify-center bg-black/50 animate-in fade-in duration-200">
          <div className="bg-white w-full rounded-t-[20px] p-6 pb-8 animate-in slide-in-from-bottom duration-300">
            <h3 className="text-[18px] font-bold text-[#1F2937] mb-2 font-gilroy">
              Connect Gmail Account
            </h3>
            <p className="text-[14px] text-[#6B7280] leading-5 mb-6 font-gilroy">
              To notify the lunch manager, we need to connect your Gmail
              account.
            </p>

            <button
              onClick={handleConnectGmail}
              disabled={connectingGmail}
              className="w-full py-3.5 rounded-[10px] bg-[#5B21B6] mb-2.5 flex items-center justify-center font-gilroy font-semibold text-white text-[15px] hover:bg-[#4c1b99] transition-colors"
            >
              {connectingGmail ? (
                <Loader2 className="animate-spin" size={20} />
              ) : (
                "Connect Gmail"
              )}
            </button>

            <button
              onClick={() => {
                setShowGmailModal(false);
                setPendingSubmit(false);
              }}
              className="w-full py-3.5 rounded-[10px] bg-[#F3F4F6] text-[#4B5563] font-gilroy font-semibold text-[15px] hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </MobileLayout>
  );
}
