import { useUpdateProfile } from "@/hooks/useUserProfile";
import { editProfileSchema, type EditProfileForm } from "@/schemas/user.schema";
import { useUserStore } from "@/store/user.store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "@tanstack/react-router";
import { format } from "date-fns";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";

export function useEditProfileForm() {
  const navigate = useNavigate();
  const { user } = useUserStore();
  const { mutateAsync: updateProfile, isPending: isLoading } =
    useUpdateProfile();

  const [showPasswordSection, setShowPasswordSection] = useState(false);
  const [showCurrentPass, setShowCurrentPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  const [previewImage, setPreviewImage] = useState<string | null>(
    user?.profile_picture || null,
  );
  const [, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const form = useForm<EditProfileForm>({
    resolver: zodResolver(editProfileSchema),
    defaultValues: {
      nick_name: user?.nick_name || "",
      name: user?.name || "",
      email: user?.email || "",
      team: user?.team_name || "",
      dob: user?.dob ? user.dob.split("T")[0] : "",
    },
  });

  useEffect(() => {
    return () => {
      if (previewImage?.startsWith("blob:")) URL.revokeObjectURL(previewImage);
    };
  }, [previewImage]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  // Inside useEditProfileForm.ts
  const onSubmit = async (data: EditProfileForm) => {
    try {
      let finalDob = null;
      if (data.dob) {
        const dateObj = new Date(data.dob);

        if (!isNaN(dateObj.getTime())) {
          finalDob = format(dateObj, "yyyy-MM-dd");
        }
      }
      const payload = {
        name: data.name,
        email: data.email,
        team: data.team,
        dob: finalDob,
        nick_name: data.nick_name,
        current_password: data.currentPassword || null,
        new_password: data.newPassword || null,
      };

      await updateProfile(payload);

      navigate({ to: ".." });
    } catch (e) {
      console.error("Update failed:", e);
    }
  };

  return {
    form,
    isLoading,
    fileInputRef,
    previewImage,
    showPasswordSection,
    setShowPasswordSection,
    showCurrentPass,
    setShowCurrentPass,
    showNewPass,
    setShowNewPass,
    showConfirmPass,
    setShowConfirmPass,
    handleImageChange,
    onSubmit,
    navigate,
  };
}
