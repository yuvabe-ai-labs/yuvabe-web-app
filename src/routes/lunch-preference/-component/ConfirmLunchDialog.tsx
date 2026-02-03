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

interface ConfirmLunchDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  confirmText: string;
  onConfirm: () => void;
}

export function ConfirmLunchDialog({
  open,
  onOpenChange,
  confirmText,
  onConfirm,
}: ConfirmLunchDialogProps) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="w-[90%] rounded-xl font-gilroy">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-center">
            Confirm Lunch Opt-Out
          </AlertDialogTitle>

          <AlertDialogDescription className="text-center text-[15px]">
            {confirmText}
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter className="flex flex-row gap-3">
          <AlertDialogCancel className="flex-1 mt-0">
            Cancel
          </AlertDialogCancel>

          <AlertDialogAction
            onClick={(e) => {
              e.preventDefault();
              onConfirm();
            }}
            className="flex-1 bg-[#592AC7]"
          >
            Confirm
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
