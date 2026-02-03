import {
  Camera,
  ChevronDown,
  ChevronLeft,
  Loader2,
  User as UserIcon,
} from "lucide-react";
import { FormField, PasswordField } from "./EditProfileFields";
import { useEditProfileForm } from "./useEditProfileForm";

export default function EditProfileScreen() {
  const {
    form: {
      register,
      handleSubmit,
      formState: { errors },
    },
    isLoading,
    fileInputRef,
    previewImage,
    navigate,
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
  } = useEditProfileForm();

  return (
    <div className="flex flex-col min-h-screen bg-white">
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
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept="image/*"
              onChange={handleImageChange}
            />
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <h2 className="text-[20px] font-bold text-[#1A1A1A] font-gilroy">
            Personal Details
          </h2>

          <FormField label="Nick Name" error={errors.nickname?.message}>
            <input
              {...register("nickname")}
              placeholder="Enter nickname"
              className="w-full h-12.5 px-4 rounded-xl border border-[#E5E7EB] bg-[#F9FAFB] outline-none focus:border-[#592AC7] font-gilroy"
            />
          </FormField>

          <FormField label="Full Name" error={errors.name?.message}>
            <input
              {...register("name")}
              readOnly
              className="w-full h-12.5 px-4 rounded-xl border border-[#E5E7EB] bg-[#F3F4F6] text-[#6B7280] cursor-not-allowed font-gilroy"
            />
          </FormField>

          <FormField label="Email address" error={errors.email?.message}>
            <input
              {...register("email")}
              readOnly
              className="w-full h-12.5 px-4 rounded-xl border border-[#E5E7EB] bg-[#F3F4F6] text-[#6B7280] cursor-not-allowed font-gilroy"
            />
          </FormField>

          <FormField label="Team" error={errors.team?.message}>
            <input
              {...register("team")}
              readOnly
              className="w-full h-12.5 px-4 rounded-xl border border-[#E5E7EB] bg-[#F3F4F6] text-[#6B7280] cursor-not-allowed font-gilroy"
            />
          </FormField>

          <FormField label="Date of Birth" error={errors.dob?.message}>
            <input
              type="date"
              {...register("dob")}
              className="w-full h-12.5 px-4 rounded-xl border border-[#E5E7EB] bg-white outline-none focus:border-[#592AC7] uppercase font-gilroy"
            />
          </FormField>

          <div className="border-t border-gray-200 pt-5 mt-5">
            <button
              type="button"
              onClick={() => setShowPasswordSection(!showPasswordSection)}
              className="w-full flex items-center justify-between py-2 group"
            >
              <span className="text-[16px] font-bold text-[#1A1A1A] group-hover:text-[#592AC7] font-gilroy">
                Change Password
              </span>
              <ChevronDown
                size={20}
                className={`transition-transform duration-300 ${showPasswordSection ? "rotate-180" : ""}`}
              />
            </button>

            <div
              className={`overflow-hidden transition-all duration-300 ${showPasswordSection ? "max-h-125 mt-4" : "max-h-0"}`}
            >
              <div className="space-y-4">
                <PasswordField
                  label="Current Password"
                  show={showCurrentPass}
                  setShow={setShowCurrentPass}
                  registration={register("currentPassword")}
                  error={errors.currentPassword?.message}
                />
                <PasswordField
                  label="New Password"
                  show={showNewPass}
                  setShow={setShowNewPass}
                  registration={register("newPassword")}
                  error={errors.newPassword?.message}
                />
                <PasswordField
                  label="Confirm New Password"
                  show={showConfirmPass}
                  setShow={setShowConfirmPass}
                  registration={register("confirmPassword")}
                  error={errors.confirmPassword?.message}
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-4 rounded-xl bg-[#592AC7] text-white font-semibold hover:bg-[#4c249f] disabled:bg-[#8a65e6] mt-8 shadow-sm"
          >
            {isLoading ? (
              <Loader2 className="animate-spin mx-auto" />
            ) : (
              <span className="font-gilroy">Save Changes</span>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
