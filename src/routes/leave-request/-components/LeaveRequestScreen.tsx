import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useLeaveBalance, useRequestLeave } from "@/hooks/useLeave";
import { cn, LEAVE_LABEL_MAP } from "@/lib/utils";
import type { LeaveRequestFormValues } from "@/schemas/leave.schema";
import { leaveRequestSchema } from "@/schemas/leave.schema";
import { LeaveType } from "@/types/leave.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "@tanstack/react-router";
import { Calendar, ChevronLeft, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { LeaveRequestSkeleton } from "./LeaveRequestSkeleton";

export default function LeaveRequestScreen() {
  const navigate = useNavigate();

  // Queries & Mutations
  const { data: balance, isLoading: balanceLoading } = useLeaveBalance();
  const { mutate: submitLeave, isPending: submitLoading } = useRequestLeave();

  // React Hook Form Setup
  const form = useForm<LeaveRequestFormValues>({
    resolver: zodResolver(leaveRequestSchema),
    mode: "onChange",
    defaultValues: {
      leave_type: undefined,
      from_date: new Date().toISOString().split("T")[0],
      to_date: new Date().toISOString().split("T")[0],
      reason: "",
    },
  });

  // Watch values for logic/min-date calculation
  const fromDateValue = form.watch("from_date");

  const onSubmit = (data: LeaveRequestFormValues) => {
    // Calculate days
    const start = new Date(data.from_date);
    const end = new Date(data.to_date);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const days = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;

    submitLeave(
      {
        leave_type: data.leave_type,
        from_date: data.from_date,
        to_date: data.to_date,
        days,
        reason: data.reason,
      },
      {
        onSuccess: () => {
          navigate({ to: "/" });
        },
      },
    );
  };

  if (balanceLoading) {
    return <LeaveRequestSkeleton />;
  }

  return (
    <>
      {/* HEADER */}
      <div className="flex items-center px-4 py-6 bg-white sticky top-0 z-10">
        <button
          onClick={() => navigate({ to: "/" })}
          className="p-1 -ml-1 hover:bg-gray-100 rounded-full transition-colors"
          type="button"
        >
          <ChevronLeft size={28} className="text-black" />
        </button>

        <div className="flex-1 text-center pr-7">
          <h1 className="text-[18px] font-bold text-black font-gilroy">
            Request Leave
          </h1>
        </div>
      </div>

      <div className="px-4 pb-10">
        {/* LEAVE BALANCE CARDS */}
        <div className="flex gap-3 mb-8">
          <div className="flex-1 bg-[#FFF8E6] border border-[#F6DFA8] py-5 rounded-[14px] flex flex-col items-center">
            <span className="text-[15px] font-semibold text-[#333] mb-1 font-gilroy">
              Sick Leave
            </span>
            <span className="text-[28px] font-bold text-black mb-0.5 font-gilroy">
              {balanceLoading ? "--" : balance?.sick_remaining}
            </span>
            <span className="text-[12px] text-[#777] font-gilroy">
              Remaining
            </span>
          </div>

          <div className="flex-1 bg-[#F4EDFF] border border-[#C9B8F5] py-5 rounded-[14px] flex flex-col items-center">
            <span className="text-[15px] font-semibold text-[#333] mb-1 font-gilroy">
              Casual Leave
            </span>
            <span className="text-[28px] font-bold text-black mb-0.5 font-gilroy">
              {balanceLoading ? "--" : balance?.casual_remaining}
            </span>
            <span className="text-[12px] text-[#777] font-gilroy">
              Remaining
            </span>
          </div>
        </div>

        {/* FORM START */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            {/* LEAVE TYPE DROPDOWN */}
            <FormField
              control={form.control}
              name="leave_type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[15px] font-semibold text-black font-gilroy">
                    Leave Type
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full h-auto py-3.5 px-3 rounded-xl border-[#E5E5E5] text-[15px] font-gilroy focus:ring-offset-0 focus:ring-0 focus:border-black bg-white">
                        <SelectValue placeholder="Select leave type" />
                      </SelectTrigger>
                    </FormControl>

                    {/* FIX APPLIED HERE: Added bg-white and z-50 */}
                    <SelectContent className="bg-white z-50 shadow-lg border border-[#E5E5E5]">
                      <SelectItem
                        value={LeaveType.SICK}
                        className="font-gilroy py-3 focus:bg-gray-50"
                      >
                        {LEAVE_LABEL_MAP[LeaveType.SICK]}
                      </SelectItem>
                      <SelectItem
                        value={LeaveType.CASUAL}
                        className="font-gilroy py-3 focus:bg-gray-50"
                      >
                        {LEAVE_LABEL_MAP[LeaveType.CASUAL]}
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage className="font-gilroy pl-1" />
                </FormItem>
              )}
            />

            <div className="flex gap-4">
              <div className="flex-1 min-w-0">
                <FormField
                  control={form.control}
                  name="from_date"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[15px] font-semibold text-black font-gilroy">
                        From
                      </FormLabel>

                      <div className="relative">
                        <FormControl>
                          <Input
                            type="date"
                            min={new Date().toISOString().split("T")[0]}
                            className="w-full h-auto py-3 pl-3 pr-10 rounded-xl border-[#E5E5E5] text-[15px] font-gilroy text-black focus-visible:ring-0 focus-visible:border-black block bg-white appearance-none"
                            {...field}
                          />
                        </FormControl>
                        <Calendar
                          size={18}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                        />
                      </div>
                      <FormMessage className="font-gilroy pl-1" />
                    </FormItem>
                  )}
                />
              </div>

              {/* TO DATE */}
              <div className="flex-1 min-w-0">
                <FormField
                  control={form.control}
                  name="to_date"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[15px] font-semibold text-black font-gilroy">
                        To
                      </FormLabel>

                      <div className="relative">
                        <FormControl>
                          <Input
                            type="date"
                            min={fromDateValue}
                            className="w-full h-auto py-3 pl-3 pr-10 rounded-xl border-[#E5E5E5] text-[15px] font-gilroy text-black focus-visible:ring-0 focus-visible:border-black block bg-white appearance-none"
                            {...field}
                          />
                        </FormControl>
                        <Calendar
                          size={18}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                        />
                      </div>
                      <FormMessage className="font-gilroy pl-1" />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            {/* REASON INPUT */}
            <FormField
              control={form.control}
              name="reason"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[15px] font-semibold text-black font-gilroy">
                    Reason
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter your reason..."
                      className="w-full min-h-32 p-4 rounded-xl border-[#E5E5E5] text-[15px] font-gilroy text-black resize-none focus-visible:ring-0 focus-visible:border-black placeholder:text-[#A0A0A0] bg-white"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="font-gilroy pl-1" />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              disabled={submitLoading || !form.formState.isValid}
              className={cn(
                "w-full py-6 mt-4 rounded-xl text-[16px] font-semibold font-gilroy transition-all",
                submitLoading || !form.formState.isValid
                  ? "bg-[#BDA0FF] hover:bg-[#BDA0FF] cursor-not-allowed text-white/80"
                  : "bg-[#592AC7] hover:bg-[#592AC7]/90 text-white",
              )}
            >
              {submitLoading ? (
                <Loader2 className="animate-spin mr-2" />
              ) : (
                "Submit Leave Request"
              )}
            </Button>
          </form>
        </Form>
      </div>
    </>
  );
}
