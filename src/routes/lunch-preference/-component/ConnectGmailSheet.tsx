import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Loader2 } from "lucide-react";

interface ConnectGmailSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConnect: () => void;
  loading: boolean;
}

export function ConnectGmailSheet({
  open,
  onOpenChange,
  onConnect,
  loading,
}: ConnectGmailSheetProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="rounded-t-[20px] pb-8 font-gilroy">
        <SheetHeader className="text-left mb-6">
          <SheetTitle>Connect Gmail Account</SheetTitle>
          <SheetDescription>
            To notify the lunch manager, we need to connect your Gmail account.
          </SheetDescription>
        </SheetHeader>

        <div className="space-y-3">
          <Button
            onClick={onConnect}
            disabled={loading}
            className="w-full py-6 bg-[#5B21B6] text-white rounded-xl"
          >
            {loading ? (
              <Loader2 className="animate-spin mr-2" />
            ) : (
              "Connect Gmail"
            )}
          </Button>

          <Button
            variant="secondary"
            onClick={() => onOpenChange(false)}
            className="w-full py-6 rounded-xl"
          >
            Cancel
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
