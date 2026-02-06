import { useGmailConnect, useRequestPayslip } from "@/hooks/usePayslip";
import { useUserProfilePayslip } from "@/hooks/useUserProfile";
import {
  payslipRequestSchema,
  type PayslipRequestSchemaType,
} from "@/schemas/payslip.schema";
import type { PayslipSearch } from "@/types/payslip.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export const usePayslipLogic = () => {
  const navigate = useNavigate();
  const { user, isLoading, isError, refetch } = useUserProfilePayslip();
  const [showGmailSheet, setShowGmailSheet] = useState(false);
  const searchParams = useSearch({ from: "/payslip/" });

  // 1. Initialize RHF
  const form = useForm<PayslipRequestSchemaType>({
    resolver: zodResolver(payslipRequestSchema),
    defaultValues: {
      mode: "3_months", // Matches the first union case
    },
  });

  const { mutateAsync: getGmailUrl, isPending: connectingGmail } =
    useGmailConnect();
  const { mutateAsync: submitRequest, isPending: requesting } =
    useRequestPayslip();

  // Watch values for UI state
  const currentMode = form.watch("mode");

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
          to: "/payslip",
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
  }, [searchParams, navigate]);

  const handleRequest = async (data: PayslipRequestSchemaType) => {
    try {
      // Data is already validated by Zod via RHF
      await submitRequest(data);
      toast.success("Request Sent", { description: "Check your email." });
      navigate({ to: "/" });
      form.reset();
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
      const res = await getGmailUrl({
        userId: user.id,
        fromPath: "/payslip",
      });
      window.location.href = res.auth_url;
    } catch (e) {
      toast.error("Connection Failed", { description: (e as Error)?.message });
    }
  };

  const getPresetDateRange = (type: "3_months" | "6_months") => {
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

  return {
    form,
    state: {
      user,
      isLoading,
      isError,
      showGmailSheet,
      requesting,
      connectingGmail,
      currentMode,
      isValid: form.formState.isValid,
    },
    actions: {
      refetch,
      navigate,
      setShowGmailSheet,
      handleRequest: form.handleSubmit(handleRequest),
      handleConnectGmail,
      getPresetDateRange,
    },
  };
};
