import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon, ChevronLeft, Loader2 } from "lucide-react";
import { useLunchPreferenceLogic } from "./useLunchPreferenceLogic";

export default function LunchPreferenceScreen() {
  const { state, actions, form } = useLunchPreferenceLogic();

  return (
    <>
      <Form {...form}>
        <div className="flex flex-col h-full bg-white relative">
          {/* HEADER */}
          <div className="flex items-center px-4 py-4 sticky top-0 z-10 bg-white">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => actions.navigate({ to: "/" })}
            >
              <ChevronLeft size={28} />
            </Button>
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
                "cursor-pointer mb-6 transition-all border",
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

            <Label className="text-[14px] text-[#6B7280] mb-2 block font-gilroy">
              I don’t want lunch from
            </Label>
            <div className="flex gap-3">
              {/* START DATE */}
              <FormField
                control={form.control}
                name="startDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col flex-1">
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "h-12 pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground",
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value ?? undefined}
                          onSelect={(date) => {
                            field.onChange(date);
                            form.setValue("selectedMode", "range");
                          }}
                          disabled={(date) =>
                            date < new Date(new Date().setHours(0, 0, 0, 0))
                          }
                          autoFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* END DATE (Repeat similar structure for endDate) */}
              <FormField
                control={form.control}
                name="endDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col flex-1">
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "h-12 pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground",
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value ?? undefined}
                          onSelect={(date) => {
                            field.onChange(date);
                            form.setValue("selectedMode", "range");
                          }}
                          disabled={(date) =>
                            date < (form.getValues("startDate") || new Date())
                          }
                          autoFocus
                        />
                      </PopoverContent>
                    </Popover>
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
                !state.isRangeValid
                  ? "bg-[#D1D5DB]"
                  : "bg-[#592AC7] text-white",
              )}
            >
              {state.submitting ? <Loader2 className="animate-spin" /> : "Send"}
            </Button>
          </div>
        </div>
      </Form>

      {/* CONFIRMATION DIALOG */}
      <AlertDialog
        open={state.showConfirmDialog}
        onOpenChange={actions.setShowConfirmDialog}
      >
        <AlertDialogContent className="w-[90%] rounded-xl font-gilroy">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-center">
              Confirm Lunch Opt-Out
            </AlertDialogTitle>
            <AlertDialogDescription className="text-center text-[15px]">
              {actions.getConfirmText()}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex flex-row gap-3">
            <AlertDialogCancel className="flex-1 mt-0">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={(e) => {
                e.preventDefault();
                actions.setShowConfirmDialog(false);
                actions.handleSubmit();
              }}
              className="flex-1 bg-[#592AC7]"
            >
              Confirm
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* GMAIL SHEET (Added back from old code) */}
      <Sheet
        open={state.showGmailSheet}
        onOpenChange={actions.setShowGmailSheet}
      >
        <SheetContent
          side="bottom"
          className="rounded-t-[20px] pb-8 font-gilroy"
        >
          <SheetHeader className="text-left mb-6">
            <SheetTitle>Connect Gmail Account</SheetTitle>
            <SheetDescription>
              To notify the lunch manager, we need to connect your Gmail
              account.
            </SheetDescription>
          </SheetHeader>
          <div className="space-y-3">
            <Button
              onClick={actions.handleConnectGmail}
              disabled={state.connectingGmail}
              className="w-full py-6 bg-[#5B21B6] text-white rounded-xl"
            >
              {state.connectingGmail ? (
                <Loader2 className="animate-spin mr-2" />
              ) : (
                "Connect Gmail"
              )}
            </Button>
            <Button
              variant="secondary"
              onClick={() => actions.setShowGmailSheet(false)}
              className="w-full py-6 rounded-xl"
            >
              Cancel
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
