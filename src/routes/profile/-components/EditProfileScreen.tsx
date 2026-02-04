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
  Camera,
  ChevronDown,
  ChevronLeft,
  Loader2,
  User as UserIcon,
} from "lucide-react";
import { PasswordField } from "./EditProfileFields";
import { useEditProfileForm } from "./useEditProfileForm";
import { cn } from "@/lib/utils";

export default function EditProfileScreen() {
  const {
    form,
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
      <div className="relative h-40 w-full shrink-0 px-5 pb-6 bg-[linear-gradient(180deg,#592AC7_0%,#CCB6FF_100%)]">
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

        <div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <h2 className="text-[20px] font-bold text-[#1A1A1A] font-gilroy">
                Personal Details
              </h2>

              {/* Nickname using Shadcn */}
              <FormField
                control={form.control}
                name="nick_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[14px] font-semibold text-[#666]">
                      Nick Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter nickname"
                        {...field}
                        className="h-12.5 rounded-xl"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Full Name (Read Only) */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[14px] font-semibold text-[#666]">
                      Full Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        readOnly
                        {...field}
                        className="h-12.5 rounded-xl bg-[#F3F4F6] cursor-not-allowed"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[14px] font-semibold text-[#666]">
                      Email address
                    </FormLabel>
                    <FormControl>
                      <Input
                        readOnly
                        {...field}
                        className="h-12.5 rounded-xl bg-[#F3F4F6] cursor-not-allowed"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="team"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[14px] font-semibold text-[#666]">
                      Team
                    </FormLabel>
                    <FormControl>
                      <Input
                        readOnly
                        {...field}
                        className="h-12.5 rounded-xl bg-[#F3F4F6] cursor-not-allowed"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Date of Birth */}
              <FormField
                control={form.control}
                name="dob"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[14px] font-semibold text-[#666]">
                      Date of Birth
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="date"
                        {...field}
                        className="h-12.5 rounded-xl uppercase"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Password Accordion */}
              <div className="border-t border-gray-200 pt-5 mt-5">
                <button
                  type="button"
                  onClick={() => setShowPasswordSection(!showPasswordSection)}
                  className="w-full flex items-center justify-between py-2"
                >
                  <span className="text-[16px] font-bold text-[#1A1A1A] font-gilroy">
                    Change Password
                  </span>
                  <ChevronDown
                    size={20}
                    className={cn(
                      "transition-transform duration-300",
                      showPasswordSection && "rotate-180",
                    )}
                  />
                </button>

                <div
                  className={cn(
                    "overflow-hidden transition-all duration-300",
                    showPasswordSection
                      ? "max-h-125 mt-4 opacity-100"
                      : "max-h-0 opacity-0",
                  )}
                >
                  <div className="space-y-4">
                    <PasswordField
                      control={form.control}
                      name="currentPassword"
                      label="Current Password"
                      show={showCurrentPass}
                      setShow={setShowCurrentPass}
                    />
                    <PasswordField
                      control={form.control}
                      name="newPassword"
                      label="New Password"
                      show={showNewPass}
                      setShow={setShowNewPass}
                    />
                    <PasswordField
                      control={form.control}
                      name="confirmPassword"
                      label="Confirm New Password"
                      show={showConfirmPass}
                      setShow={setShowConfirmPass}
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-4 rounded-xl bg-[#592AC7] text-white font-semibold"
              >
                {isLoading ? (
                  <Loader2 className="animate-spin mx-auto" />
                ) : (
                  "Save Changes"
                )}
              </button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
