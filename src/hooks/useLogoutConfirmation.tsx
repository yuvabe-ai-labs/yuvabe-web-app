import { useLogout } from "@/hooks/useLogout";
import { useState } from "react";

export const useLogoutWithConfirmation = () => {
  const [showConfirm, setShowConfirm] = useState(false);
  const { mutate: logout, isPending } = useLogout();

  const triggerLogout = () => setShowConfirm(true);

  return {
    triggerLogout,
    showConfirm,
    setShowConfirm,
    logout,
    isPending,
  };
};
