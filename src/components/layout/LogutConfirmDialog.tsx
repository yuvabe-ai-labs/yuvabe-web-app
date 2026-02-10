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

interface LogoutConfirmDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
}

export function LogoutConfirmDialog({
  isOpen,
  onOpenChange,
  onConfirm,
}: LogoutConfirmDialogProps) {
  return (
    <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
      <AlertDialogContent className="w-[90%] rounded-2xl font-gilroy border-none">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-center text-xl font-bold">
            Logout
          </AlertDialogTitle>
          <AlertDialogDescription className="text-center text-[15px] text-gray-600">
            Are you sure you want to log out? You will need to login again to
            access your account.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex flex-row gap-3 mt-4">
          <AlertDialogCancel className="flex-1 mt-0 rounded-xl border-gray-200 text-gray-700 font-semibold">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={(e) => {
              e.preventDefault();
              onConfirm();
              onOpenChange(false);
            }}
            className="flex-1 bg-[#FF383C] hover:bg-red-600 text-white rounded-xl font-semibold border-none"
          >
            Logout
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
