import { useLunchOptOut } from "@/hooks/useLunch";
import { useGmailConnect } from "@/hooks/usePayslip";
import { useUserStore } from "@/store/user.store";
import type { ModeType } from "@/types/lunch.types";
import { useNavigate } from "@tanstack/react-router";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export const useLunchPreferenceLogic = () => {
  const navigate = useNavigate();
  const { user } = useUserStore();

  // State
  const [selectedMode, setSelectedMode] = useState<ModeType>(null);
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [showGmailSheet, setShowGmailSheet] = useState(false);
  const [pendingSubmit, setPendingSubmit] = useState(false);

  // Hooks
  const { mutateAsync: sendLunchRequest, isPending: submitting } =
    useLunchOptOut();
  const { mutateAsync: getGmailUrl, isPending: connectingGmail } =
    useGmailConnect();

  // Handle URL Callbacks (Gmail Success/Error)
  useEffect(() => {
    const checkCallback = async () => {
      const params = new URLSearchParams(window.location.search);
      if (params.has("success") && pendingSubmit) {
        // Clean URL
        window.history.replaceState(
          {},
          document.title,
          window.location.pathname,
        );

        // Retry submission automatically
        await handleSubmit();
        setPendingSubmit(false);
        setShowGmailSheet(false);
      } else if (params.has("error")) {
        window.history.replaceState(
          {},
          document.title,
          window.location.pathname,
        );
        toast.error("Gmail connection failed");
        setPendingSubmit(false);
      }
    };

    setTimeout(checkCallback, 100);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Only run once on mount

  // Helper: Validate Date Range
  const isRangeValid =
    selectedMode &&
    startDate &&
    endDate &&
    new Date(endDate) >= new Date(startDate);

  // Helper: Generate Confirm Text
  const getConfirmText = () => {
    if (!startDate || !endDate) return "";
    const startStr = new Date(startDate).toDateString();
    const endStr = new Date(endDate).toDateString();

    return startDate === endDate
      ? `You want to opt out of lunch on ${startStr}.`
      : `You want to opt out of lunch from ${startStr} to ${endStr}.`;
  };

  // Actions
  const handleTomorrowSelect = () => {
    const t = new Date();
    t.setDate(t.getDate() + 1);
    const dateStr = t.toISOString().split("T")[0];

    setStartDate(dateStr);
    setEndDate(dateStr);
    setSelectedMode("tomorrow");
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
        setShowGmailSheet(true);
        toast.info("Authorization Required", {
          description: "Please connect Gmail to proceed.",
        });
      } else {
        toast.error("Request Failed", { description: "Something went wrong" });
      }
    }
  };

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

  return {
    state: {
      user,
      selectedMode,
      startDate,
      endDate,
      showConfirmDialog,
      showGmailSheet,
      submitting,
      connectingGmail,
      isRangeValid,
    },
    actions: {
      navigate,
      setSelectedMode,
      setStartDate,
      setEndDate,
      setShowConfirmDialog,
      setShowGmailSheet,
      handleTomorrowSelect,
      handleSubmit,
      handleConnectGmail,
      getConfirmText,
    },
  };
};
