import MobileLayout from "@/components/layout/MobileLayout";
import { SplashScreen } from "@/components/layout/SplashScreen";
import { useGmailConnect, useRequestPayslip } from "@/hooks/usePayslip";
import { useUserProfilePayslip } from "@/hooks/useUserProfile";
import { payslipRequestSchema } from "@/schemas/payslip.schema"; // 👈 IMPORT SCHEMA
import type {
  ModeType,
  PayslipRequestPayload,
  PresetType,
} from "@/types/payslip.types";
import { useNavigate } from "@tanstack/react-router";
import { AxiosError } from "axios";
import { ChevronLeft, Loader2, RefreshCw } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function PayslipScreen() {
  const navigate = useNavigate();
  const { user, isLoading, isError, refetch } = useUserProfilePayslip();

  const [mode, setMode] = useState<ModeType>("preset");
  const [presetMode, setPresetMode] = useState<PresetType>("3_months");
  const [fromMonth, setFromMonth] = useState("");
  const [toMonth, setToMonth] = useState("");
  const [showGmailModal, setShowGmailModal] = useState(false);

  const { mutateAsync: getGmailUrl, isPending: connectingGmail } =
    useGmailConnect();
  const { mutateAsync: submitRequest, isPending: requesting } =
    useRequestPayslip();

  useEffect(() => {
    const timer = setTimeout(() => {
      const params = new URLSearchParams(window.location.search);
      if (params.has("success") || params.has("error")) {
        const isSuccess = params.get("success") === "true";
        const errorType = params.get("error");

        window.history.replaceState(
          {},
          document.title,
          window.location.pathname
        );

        if (isSuccess) {
          toast.success("Gmail connected successfully!");
          setShowGmailModal(false);
        } else {
          if (errorType === "email_mismatch") {
            toast.error("Email mismatch", {
              description: "Google email not linked to account.",
            });
          } else {
            toast.error("Gmail connection failed");
          }
        }
      }
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const handleRequest = async () => {
    const rawPayload =
      mode === "preset"
        ? { mode: presetMode }
        : { mode: "manual", start_month: fromMonth, end_month: toMonth };

    const validation = payslipRequestSchema.safeParse(rawPayload);

    if (!validation.success) {
      const errorMessage = validation.error.issues[0].message;
      toast.error("Validation Error", { description: errorMessage });
      return;
    }

    try {
      const payload = validation.data as PayslipRequestPayload;

      await submitRequest(payload);
      toast.success("Request Sent", { description: "Check your email." });

      navigate({ to: "/" });

      // Reset form
      setFromMonth("");
      setToMonth("");
      setMode("preset");
      setPresetMode("3_months");
    } catch (err) {
      const error = err as AxiosError<{ detail: string }>;
      const detail = error.response?.data?.detail || "";

      if (detail.toLowerCase().includes("connect your gmail")) {
        console.log("⚠️ Gmail required. Opening modal...");
        setShowGmailModal(true);
        toast.error("Gmail Required", { description: detail });
      } else {
        toast.error("Request Failed", {
          description: detail || "Something went wrong",
        });
      }
    }
  };

  const handleConnectGmail = async () => {
    if (!user?.id) return toast.error("User profile failed to load.");
    try {
      const res = await getGmailUrl({ userId: user.id, fromPath: "/payslip" });
      window.location.href = res.auth_url;
    } catch (e) {
      console.log(e);
      toast.error("Connection Failed", {
        description: "Could not get authorization URL.",
      });
    }
  };

  const getPresetDateRange = (type: PresetType) => {
    const today = new Date();
    const end = new Date(today.getFullYear(), today.getMonth() - 1, 1);
    const start = new Date(
      end.getFullYear(),
      end.getMonth() - (type === "3_months" ? 2 : 5),
      1
    );
    const fmt = (d: Date) =>
      d.toLocaleDateString("en-US", { month: "short", year: "numeric" });
    return `${fmt(start)} - ${fmt(end)}`;
  };

  const isButtonDisabled =
    requesting || (mode === "manual" && (!fromMonth || !toMonth));

  if (isLoading) {
    return (
      <MobileLayout className="bg-white flex items-center justify-center h-full">
        <SplashScreen />
      </MobileLayout>
    );
  }

  if (isError || !user?.id) {
    return (
      <MobileLayout className="bg-white flex flex-col items-center justify-center h-full p-6">
        <SplashScreen />
        <button
          onClick={() => {
            refetch();
            window.location.reload();
          }}
          className="flex items-center gap-2 px-6 py-3 bg-[#592AC7] text-white rounded-lg font-bold"
        >
          <RefreshCw size={20} /> Retry
        </button>
      </MobileLayout>
    );
  }

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
          <h1 className="text-[18px] font-bold text-[#475569] font-gilroy">
            Request Payslip
          </h1>
        </div>
      </div>

      {/* BODY */}
      <div className="flex-1 overflow-y-auto px-4 pb-24">
        <h2 className="text-[18px] font-bold text-[#1F2937] mt-2 mb-3 font-gilroy">
          Choose Duration
        </h2>
        <div className="space-y-3">
          {(["3_months", "6_months"] as PresetType[]).map((opt) => (
            <div
              key={opt}
              onClick={() => {
                setMode("preset");
                setPresetMode(opt);
                setFromMonth("");
                setToMonth("");
              }}
              className={`p-4 rounded-xl border-[1.5px] cursor-pointer transition-all ${
                presetMode === opt && mode === "preset"
                  ? "bg-[#F3E8FF] border-[#5B21B6]"
                  : "bg-white border-[#E5E7EB] hover:border-gray-300"
              }`}
            >
              <p
                className={`text-[15px] font-bold font-gilroy ${
                  presetMode === opt && mode === "preset"
                    ? "text-[#5B21B6]"
                    : "text-[#1F2937]"
                }`}
              >
                {opt === "3_months" ? "Last 3 Months" : "Last 6 Months"}
              </p>
              <p className="text-[12px] text-[#6B7280] mt-1 font-gilroy font-medium">
                {getPresetDateRange(opt)}
              </p>
            </div>
          ))}
        </div>

        <div className="flex items-center my-8">
          <div className="flex-1 h-px bg-[#E5E7EB]"></div>
          <span className="mx-3 text-[14px] text-[#6B7280] font-medium font-gilroy">
            or
          </span>
          <div className="flex-1 h-px bg-[#E5E7EB]"></div>
        </div>

        <h2 className="text-[16px] font-bold text-[#1F2937] mb-3 font-gilroy">
          Choose custom date
        </h2>
        <div className="flex gap-3.5">
          <div className="flex-1">
            <label className="block text-[13px] font-semibold text-[#6B7280] mb-1.5 font-gilroy">
              From
            </label>
            <div
              className={`border-[1.5px] rounded-[10px] p-0.5 relative ${
                mode === "manual" ? "border-[#5B21B6]" : "border-[#E5E7EB]"
              }`}
            >
              <input
                type="month"
                value={fromMonth}
                onChange={(e) => {
                  setMode("manual");
                  setFromMonth(e.target.value);
                }}
                className="w-full h-10 px-3 rounded-lg outline-none text-[15px] text-[#1F2937] bg-transparent font-gilroy"
              />
            </div>
          </div>
          <div className="flex-1">
            <label className="block text-[13px] font-semibold text-[#6B7280] mb-1.5 font-gilroy">
              To
            </label>
            <div
              className={`border-[1.5px] rounded-[10px] p-0.5 relative ${
                mode === "manual" ? "border-[#5B21B6]" : "border-[#E5E7EB]"
              }`}
            >
              <input
                type="month"
                value={toMonth}
                onChange={(e) => {
                  setMode("manual");
                  setToMonth(e.target.value);
                }}
                className="w-full h-10 px-3 rounded-lg outline-none text-[15px] text-[#1F2937] bg-transparent font-gilroy"
              />
            </div>
          </div>
        </div>
      </div>

      {/* FOOTER BUTTON */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-white border-t border-[#E5E7EB]">
        <button
          onClick={handleRequest}
          disabled={isButtonDisabled}
          className={`w-full py-4 rounded-xl flex items-center justify-center transition-colors ${
            isButtonDisabled
              ? "bg-[#BDA0FF] cursor-not-allowed"
              : "bg-[#592AC7] hover:bg-[#4c249f]"
          }`}
        >
          {requesting ? (
            <Loader2 className="animate-spin text-white" />
          ) : (
            <span className="text-[16px] font-semibold text-white font-gilroy">
              Request Payslip
            </span>
          )}
        </button>
      </div>

      {/* GMAIL MODAL */}
      {showGmailModal && (
        <div className="fixed inset-0 z-999 flex items-end justify-center bg-black/50 animate-in fade-in duration-200">
          <div className="bg-white w-full rounded-t-[20px] p-6 pb-8 animate-in slide-in-from-bottom duration-300">
            <h3 className="text-[18px] font-bold text-[#1F2937] mb-2 font-gilroy">
              Connect Gmail Account
            </h3>
            <p className="text-[14px] text-[#6B7280] leading-5 mb-6 font-gilroy">
              To request payslips, we need to connect your Gmail account.
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
              onClick={() => setShowGmailModal(false)}
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
