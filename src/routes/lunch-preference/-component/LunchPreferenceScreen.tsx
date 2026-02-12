import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Calendar as CalendarIcon, ChevronLeft, Loader2 } from "lucide-react";
import { ConfirmLunchDialog } from "./ConfirmLunchDialog";
import { ConnectGmailSheet } from "./ConnectGmailSheet";
import { useLunchPreferenceLogic } from "./useLunchPreferenceLogic";

export default function LunchPreferenceScreen() {
  const { state, actions, form } = useLunchPreferenceLogic();

  return (
    <Form {...form}>
      <div className="flex flex-col h-full bg-white relative">
        {/* HEADER */}
        <div className="flex items-center px-4 py-4 sticky top-0 z-10 bg-white">
          <button
            onClick={() => actions.navigate({ to: "/" })}
            className="p-1 -ml-1 hover:bg-gray-100 rounded-full transition-colors"
            type="button"
          >
            <ChevronLeft size={28} className="text-black" />
          </button>
          <h1 className="flex-1 text-center pr-7 text-[18px] font-bold font-gilroy text-[#374151]">
            Lunch Preference
          </h1>
        </div>

        <div className="flex-1 overflow-y-auto px-4 pb-24">
          <p className="text-[16px] text-[#374151] mb-6 font-gilroy mt-2">
            Planning a leave or working remotely?
            <br />
            Make sure to opt out of lunch — let’s reduce food waste 🌱
          </p>

          <Card
            onClick={actions.handleTomorrowSelect}
            className={cn(
              "cursor-pointer mb-8 transition-all border",
              state.selectedMode === "tomorrow"
                ? "bg-[#F3E8FF] border-[#5B21B6]"
                : "bg-white border-[#E5E7EB]",
            )}
          >
            <CardContent className="p-4">
              <span
                className={cn(
                  "font-semibold font-gilroy",
                  state.selectedMode === "tomorrow"
                    ? "text-[#5B21B6]"
                    : "text-[#374151]",
                )}
              >
                I don’t want lunch tomorrow
              </span>
            </CardContent>
          </Card>

          {/* DATE SELECTION ROW */}
          <div className="flex gap-4 w-full">
            {/* FROM COLUMN */}
            <FormField
              control={form.control}
              name="startDate"
              render={({ field }) => (
                <FormItem className="flex-1 flex flex-col">
                  <FormLabel className="text-[14px] text-[#6B7280] font-gilroy font-medium">
                    From
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      {/* Actual Input (Invisible but clickable) */}
                      <Input
                        type="date"
                        className="h-12 w-full text-transparent bg-transparent border-[#E5E7EB] focus:ring-[#5B21B6] z-10 relative cursor-pointer appearance-none"
                        value={
                          field.value ? format(field.value, "yyyy-MM-dd") : ""
                        }
                        min={format(new Date(), "yyyy-MM-dd")}
                        onChange={(e) => {
                          const date = e.target.value
                            ? new Date(e.target.value)
                            : null;
                          field.onChange(date);
                          form.setValue("selectedMode", "range");
                        }}
                      />

                      {/* Visual Overlay (Text + Icon) */}
                      <div className="absolute inset-0 px-3 flex items-center justify-between pointer-events-none border border-[#E5E7EB] rounded-md bg-white ">
                        <span
                          className={cn(
                            "text-[15px]",
                            field.value ? "text-[#374151]" : "text-gray-400",
                          )}
                        >
                          {field.value
                            ? format(field.value, "dd/MM/yyyy")
                            : "dd/mm/yyyy"}
                        </span>
                        <CalendarIcon size={18} className="text-gray-500" />
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* TO COLUMN */}
            <FormField
              control={form.control}
              name="endDate"
              render={({ field }) => (
                <FormItem className="flex-1 flex flex-col">
                  <FormLabel className="text-[14px] text-[#6B7280] font-gilroy font-medium">
                    To
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      {/* Actual Input (Invisible but clickable) */}
                      <Input
                        type="date"
                        className="h-12 w-full text-transparent bg-transparent border-[#E5E7EB] focus:ring-[#5B21B6] z-10 relative cursor-pointer appearance-none"
                        value={
                          field.value ? format(field.value, "yyyy-MM-dd") : ""
                        }
                        min={
                          form.getValues("startDate")
                            ? format(
                                form.getValues("startDate") as Date,
                                "yyyy-MM-dd",
                              )
                            : format(new Date(), "yyyy-MM-dd")
                        }
                        onChange={(e) => {
                          const date = e.target.value
                            ? new Date(e.target.value)
                            : null;
                          field.onChange(date);
                          form.setValue("selectedMode", "range");
                        }}
                      />

                      {/* Visual Overlay (Text + Icon) */}
                      <div className="absolute inset-0 px-3 flex items-center justify-between pointer-events-none border border-[#E5E7EB] rounded-md bg-white">
                        <span
                          className={cn(
                            "text-[15px]",
                            field.value ? "text-[#374151]" : "text-gray-400",
                          )}
                        >
                          {field.value
                            ? format(field.value, "dd/MM/yyyy")
                            : "dd/mm/yyyy"}
                        </span>
                        <CalendarIcon size={18} className="text-gray-500" />
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Footer Button */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t bg-white">
          <Button
            type="button"
            onClick={() => actions.setShowConfirmDialog(true)}
            disabled={!state.isRangeValid || state.submitting}
            className={cn(
              "w-full py-6 rounded-xl font-semibold font-gilroy",
              !state.isRangeValid ? "bg-[#D1D5DB]" : "bg-[#592AC7] text-white",
            )}
          >
            {state.submitting ? <Loader2 className="animate-spin" /> : "Send"}
          </Button>
        </div>
      </div>

      <ConfirmLunchDialog
        open={state.showConfirmDialog}
        onOpenChange={actions.setShowConfirmDialog}
        confirmText={actions.getConfirmText()}
        onConfirm={() => {
          actions.setShowConfirmDialog(false);
          actions.handleSubmit();
        }}
      />

      <ConnectGmailSheet
        open={state.showGmailSheet}
        onOpenChange={actions.setShowGmailSheet}
        onConnect={actions.handleConnectGmail}
        loading={state.connectingGmail}
      />
    </Form>
  );
}
