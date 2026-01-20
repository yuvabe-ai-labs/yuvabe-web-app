import MobileLayout from "@/components/layout/MobileLayout";
import { useUpdateProfile } from "@/hooks/useUserProfile";
import { editProfileSchema, type EditProfileForm } from "@/schemas/user.schema";
import { useUserStore } from "@/store/user.store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "@tanstack/react-router";
import {
  Camera,
  ChevronDown,
  ChevronLeft,
  Eye,
  EyeOff,
  Loader2,
  User as UserIcon,
} from "lucide-react";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";

export default function EditProfileScreen() {
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

  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm<EditProfileForm>({
    resolver: zodResolver(editProfileSchema),
    defaultValues: {
      nickname: user?.nickname || "",
      name: user?.name || "",
      email: user?.email || "",
      team: user?.team_name || "",
      dob: user?.dob ? user.dob.split("T")[0] : "", // Convert ISO to YYYY-MM-DD
    },
  });

  // Handle Image Selection
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewImage(url);
    }
  };

  const onSubmit = async (data: EditProfileForm) => {
    try {
      // Prepare payload
      const payload = {
        name: data.name,
        email: data.email,
        team: data.team,
        dob: data.dob,
        current_password: data.currentPassword || null,
        new_password: data.newPassword || null,
        // nickname: data.nickname // Pass if backend accepts it
      };

      await updateProfile(payload);

      navigate({ to: ".." });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <MobileLayout className="bg-white flex flex-col h-full overflow-y-auto">
      <div
        className="relative h-40 w-full shrink-0 px-5 pb-6"
        style={{
          background: "linear-gradient(180deg, #592AC7 0%, #CCB6FF 100%)",
        }}
      >
        <button
          onClick={() => navigate({ to: ".." })}
          className="absolute top-4 left-4 p-1 z-10 hover:bg-white/20 rounded-full transition-colors"
        >
          <ChevronLeft size={32} color="#fff" strokeWidth={2.5} />
        </button>
      </div>

      <div className="flex-1 px-5 pb-10">
        <div className="-mt-12.5 flex flex-col items-center mb-6 relative z-10">
          <div className="relative">
            <div className="w-27.5 h-27.5 rounded-full bg-white p-1 shadow-md">
              <div className="w-full h-full rounded-full bg-gray-100 overflow-hidden flex items-center justify-center border border-gray-200">
                {previewImage ? (
                  <img
                    src={previewImage}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <UserIcon size={40} className="text-[#592AC7]" />
                )}
              </div>
            </div>

            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="absolute bottom-1 right-1 bg-[#592AC7] p-2 rounded-full text-white shadow-sm hover:bg-[#451d9e] transition-colors"
            >
              <Camera size={18} />
            </button>

            {/* Hidden Input */}
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept="image/*"
              onChange={handleImageChange}
            />
          </div>
          <button
            onClick={() => fileInputRef.current?.click()}
            className="mt-3 text-[#592AC7] font-semibold text-[15px] font-gilroy"
          >
            Change image
          </button>
        </div>

        {/* 📝 FORM */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <h2 className="text-[20px] font-bold text-[#1A1A1A] font-gilroy">
            Personal Details
          </h2>

          {/* Nickname */}
          <div>
            <label className="block text-[14px] font-semibold text-[#666] mb-1.5 font-gilroy">
              Nick Name
            </label>
            <input
              {...register("nickname")}
              placeholder="Enter your nickname"
              className="w-full h-12.5 px-4 rounded-xl border border-[#E5E7EB] bg-[#F9FAFB] text-[#1A1A1A] outline-none focus:border-[#592AC7] transition-colors font-gilroy"
            />
          </div>

          {/* Full Name (Read Only in your code) */}
          <div>
            <label className="block text-[14px] font-semibold text-[#666] mb-1.5 font-gilroy">
              Full Name
            </label>
            <input
              {...register("name")}
              readOnly
              className="w-full h-12.5 px-4 rounded-xl border border-[#E5E7EB] bg-[#F3F4F6] text-[#6B7280] font-gilroy cursor-not-allowed"
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* Email (Read Only) */}
          <div>
            <label className="block text-[14px] font-semibold text-[#666] mb-1.5 font-gilroy">
              Email
            </label>
            <input
              {...register("email")}
              readOnly
              className="w-full h-12.5 px-4 rounded-xl border border-[#E5E7EB] bg-[#F3F4F6] text-[#6B7280] font-gilroy cursor-not-allowed"
            />
          </div>

          {/* Team (Read Only) */}
          <div>
            <label className="block text-[14px] font-semibold text-[#666] mb-1.5 font-gilroy">
              Team
            </label>
            <input
              {...register("team")}
              readOnly
              className="w-full h-12.5 px-4 rounded-xl border border-[#E5E7EB] bg-[#F3F4F6] text-[#6B7280] font-gilroy cursor-not-allowed"
            />
          </div>

          {/* Date of Birth */}
          <div>
            <label className="block text-[14px] font-semibold text-[#666] mb-1.5 font-gilroy">
              Date of Birth
            </label>
            <input
              type="date"
              {...register("dob")}
              className="w-full h-12.5 px-4 rounded-xl border border-[#E5E7EB] bg-white text-[#1A1A1A] outline-none focus:border-[#592AC7] transition-colors font-gilroy uppercase"
            />
            {errors.dob && (
              <p className="text-red-500 text-xs mt-1">{errors.dob.message}</p>
            )}
          </div>

          {/* 🔐 PASSWORD ACCORDION */}
          <div className="border-t border-gray-200 pt-5 mt-5">
            <button
              type="button"
              onClick={() => setShowPasswordSection(!showPasswordSection)}
              className="w-full flex items-center justify-between py-2 text-left group"
            >
              <span className="text-[16px] font-bold text-[#1A1A1A] font-gilroy group-hover:text-[#592AC7] transition-colors">
                Change Password
              </span>
              <ChevronDown
                size={20}
                className={`text-[#666] transition-transform duration-300 ${showPasswordSection ? "rotate-180" : ""}`}
              />
            </button>

            {/* Smooth Height Transition */}
            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                showPasswordSection
                  ? "max-h-100 opacity-100 mt-4"
                  : "max-h-0 opacity-0"
              }`}
            >
              <div className="space-y-4 pb-2">
                {/* Current Password */}
                <div>
                  <label className="block text-[14px] font-semibold text-[#666] mb-1.5 font-gilroy">
                    Current Password
                  </label>
                  <div className="relative">
                    <input
                      type={showCurrentPass ? "text" : "password"}
                      {...register("currentPassword")}
                      placeholder="Current password"
                      className="w-full h-12.5 px-4 rounded-xl border border-[#E5E7EB] bg-[#F9FAFB] text-[#1A1A1A] outline-none focus:border-[#592AC7] font-gilroy pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowCurrentPass(!showCurrentPass)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 p-1"
                    >
                      {showCurrentPass ? (
                        <Eye size={18} />
                      ) : (
                        <EyeOff size={18} />
                      )}
                    </button>
                  </div>
                  {errors.currentPassword && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.currentPassword.message}
                    </p>
                  )}
                </div>

                {/* New Password */}
                <div>
                  <label className="block text-[14px] font-semibold text-[#666] mb-1.5 font-gilroy">
                    New Password
                  </label>
                  <div className="relative">
                    <input
                      type={showNewPass ? "text" : "password"}
                      {...register("newPassword")}
                      placeholder="New password"
                      className="w-full h-12.5 px-4 rounded-xl border border-[#E5E7EB] bg-[#F9FAFB] text-[#1A1A1A] outline-none focus:border-[#592AC7] font-gilroy pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPass(!showNewPass)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 p-1"
                    >
                      {showNewPass ? <Eye size={18} /> : <EyeOff size={18} />}
                    </button>
                  </div>
                  {errors.newPassword && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.newPassword.message}
                    </p>
                  )}
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="block text-[14px] font-semibold text-[#666] mb-1.5 font-gilroy">
                    Confirm New Password
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPass ? "text" : "password"}
                      {...register("confirmPassword")}
                      placeholder="Confirm new password"
                      className="w-full h-12.5 px-4 rounded-xl border border-[#E5E7EB] bg-[#F9FAFB] text-[#1A1A1A] outline-none focus:border-[#592AC7] font-gilroy pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPass(!showConfirmPass)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 p-1"
                    >
                      {showConfirmPass ? (
                        <Eye size={18} />
                      ) : (
                        <EyeOff size={18} />
                      )}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.confirmPassword.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* SUBMIT BUTTON */}
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-4 rounded-xl flex items-center justify-center transition-colors mt-8 shadow-sm ${
              isLoading
                ? "bg-[#8a65e6] cursor-not-allowed"
                : "bg-[#592AC7] hover:bg-[#4c249f]"
            }`}
          >
            {isLoading ? (
              <Loader2 className="animate-spin text-white" />
            ) : (
              <span className="text-[16px] font-semibold text-white font-gilroy">
                Save Changes
              </span>
            )}
          </button>
        </form>
      </div>
    </MobileLayout>
  );
}
