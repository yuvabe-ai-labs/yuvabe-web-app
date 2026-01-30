import { useGmailConnect, useRequestPayslip } from "@/hooks/usePayslip";
import { useUserProfilePayslip } from "@/hooks/useUserProfile";
import { payslipRequestSchema } from "@/schemas/payslip.schema";
import type {
  ModeType,
  PayslipRequestPayload,
  PresetType,
} from "@/types/payslip.types";
import { useNavigate } from "@tanstack/react-router";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export const usePayslipLogic = () => {
  const navigate = useNavigate();
  const { user, isLoading, isError, refetch } = useUserProfilePayslip();

  // Local State
  const [mode, setMode] = useState<ModeType>("preset");
  const [presetMode, setPresetMode] = useState<PresetType>("3_months");
  const [fromMonth, setFromMonth] = useState("");
  const [toMonth, setToMonth] = useState("");
  const [showGmailSheet, setShowGmailSheet] = useState(false);

  // Mutations
  const { mutateAsync: getGmailUrl, isPending: connectingGmail } =
    useGmailConnect();
  const { mutateAsync: submitRequest, isPending: requesting } =
    useRequestPayslip();

  // Handle URL Params for Gmail OAuth
  useEffect(() => {
    const timer = setTimeout(() => {
      const params = new URLSearchParams(window.location.search);
      if (params.has("success") || params.has("error")) {
        const isSuccess = params.get("success") === "true";
        const errorType = params.get("error");

        window.history.replaceState(
          {},
          document.title,
          window.location.pathname,
        );

        if (isSuccess) {
          toast.success("Gmail connected successfully!");
          setShowGmailSheet(false);
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

  // Handlers
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

      // Reset
      setFromMonth("");
      setToMonth("");
      setMode("preset");
      setPresetMode("3_months");
    } catch (err) {
      const error = err as AxiosError<{ detail: string }>;
      const detail = error.response?.data?.detail || "";

      if (detail.toLowerCase().includes("connect your gmail")) {
        setShowGmailSheet(true);
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
      const res = await getGmailUrl(user.id);
      window.location.href = res.auth_url;
    } catch (e) {
      console.error(e);
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
      1,
    );
    const fmt = (d: Date) =>
      d.toLocaleDateString("en-US", { month: "short", year: "numeric" });
    return `${fmt(start)} - ${fmt(end)}`;
  };

  const isButtonDisabled =
    requesting || (mode === "manual" && (!fromMonth || !toMonth));

  return {
    state: {
      user,
      isLoading,
      isError,
      mode,
      presetMode,
      fromMonth,
      toMonth,
      showGmailSheet,
      requesting,
      connectingGmail,
      isButtonDisabled,
    },
    actions: {
      refetch,
      navigate,
      setMode,
      setPresetMode,
      setFromMonth,
      setToMonth,
      setShowGmailSheet,
      handleRequest,
      handleConnectGmail,
      getPresetDateRange,
    },
  };
};
