import { useLunchOptOut } from "@/hooks/useLunch";
import { useGmailConnect } from "@/hooks/usePayslip";
import { formatDate } from "@/lib/utils";
import { lunchSchema } from "@/schemas/lunch.schemas";
import { useUserStore } from "@/store/user.store";
import type { LunchFormValues } from "@/types/lunch.types";
import type { PayslipSearch } from "@/types/payslip.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { AxiosError } from "axios";
import { addDays, format, isSameDay } from "date-fns";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export const useLunchPreferenceLogic = () => {
  const navigate = useNavigate();
  const { user } = useUserStore();

  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [showGmailSheet, setShowGmailSheet] = useState(false);
  const [pendingSubmit, setPendingSubmit] = useState(false);
  const searchParams = useSearch({ from: "/lunch-preference/" });

  const form = useForm<LunchFormValues>({
    resolver: zodResolver(lunchSchema),
    mode: "onChange",
    defaultValues: {
      startDate: undefined,
      endDate: undefined,
      selectedMode: null,
    },
  });

  const { mutateAsync: sendLunchRequest, isPending: submitting } =
    useLunchOptOut();
  const { mutateAsync: getGmailUrl, isPending: connectingGmail } =
    useGmailConnect();

  // Watch values for the UI
  const { startDate, endDate, selectedMode } = form.watch();
  const isRangeValid = form.formState.isValid;

  // Handle URL Callbacks (Gmail Success/Error)
  useEffect(() => {
    const { success, error } = searchParams;
    const isSuccess = success === true || success === "true";

    if (isSuccess || error) {
      if (isSuccess) {

        // Use a static ID to prevent the toast from being dismissed
        // during the navigation re-render
        toast.success("Gmail connected successfully!", {
          id: "gmail-success",
          duration: 4000,
        });

        setShowGmailSheet(false);
      } else if (error) {
        toast.error(
          error === "email_mismatch"
            ? "Email mismatch"
            : "Gmail connection failed",
          { id: "gmail-error" },
        );
      }

      // Increase delay slightly to 300ms to let the toast "settle"
      // before the URL state is wiped
      const timer = setTimeout(() => {
        navigate({
          to: "/lunch-preference",
          search: (prev: PayslipSearch) => {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { success: _, error: __, ...rest } = prev;
            return rest;
          },
          replace: true,
        });
      }, 300);

      return () => clearTimeout(timer);
    }
  }, [searchParams, navigate, pendingSubmit]);

  const handleTomorrowSelect = () => {
    const tomorrow = addDays(new Date(), 1);
    // Set as Date objects
    form.setValue("startDate", tomorrow, { shouldValidate: true });
    form.setValue("endDate", tomorrow, { shouldValidate: true });
    form.setValue("selectedMode", "tomorrow");
  };

  const onSubmit = async (values: LunchFormValues) => {
    if (!values.startDate || !values.endDate) {
      toast.error("Please select both start and end dates.");
      return;
    }
    try {
      await sendLunchRequest({
        start_date: format(values.startDate, "yyyy-MM-dd"),
        end_date: format(values.endDate, "yyyy-MM-dd"),
      });
      toast.success("Success", { description: "Lunch opt-out request sent!" });
      navigate({ to: "/" });
    } catch (err) {
      const error = err as AxiosError;
      if (error.response?.status === 428) {
        setPendingSubmit(true);
        setShowGmailSheet(true); // This opens the sheet
        toast.info("Authorization Required", {
          description: "Please connect Gmail to proceed.",
        });
      } else {
        toast.error("Request Failed");
      }
    }
  };

  const getConfirmText = () => {
    const { startDate, endDate } = form.getValues();
    if (!startDate || !endDate) return "";

    // formatDate handles Date objects too!
    const startStr = formatDate(startDate.toISOString());
    const endStr = formatDate(endDate.toISOString());

    return isSameDay(startDate, endDate)
      ? `You want to opt out of lunch on ${startStr}.`
      : `You want to opt out of lunch from ${startStr} to ${endStr}.`;
  };

  const handleConnectGmail = async () => {
    if (!user?.id) return;
    try {
      const res = await getGmailUrl({
        userId: user.id,
        fromPath: "/lunch-preference",
      });
      window.location.href = res.auth_url;
    } catch (error) {
      toast.error("Connection Failed", {
        description: (error as Error)?.message,
      });
    }
  };

  return {
    form,
    state: {
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
      handleTomorrowSelect,
      handleSubmit: form.handleSubmit(onSubmit), // This is the RHF trigger
      setShowConfirmDialog,
      setShowGmailSheet,
      handleConnectGmail,
      getConfirmText,
      navigate,
    },
  };
};
