import MobileLayout from "@/components/layout/MobileLayout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
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

  const [isOpen, setIsOpen] = useState(false);
  const [showCurrentPass, setShowCurrentPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  const [previewImage, setPreviewImage] = useState<string | null>(
    user?.profile_picture || null,
  );

  const fileInputRef = useRef<HTMLInputElement>(null);

  const form = useForm<EditProfileForm>({
    resolver: zodResolver(editProfileSchema),
    defaultValues: {
      nickname: user?.nickname || "",
      name: user?.name || "",
      email: user?.email || "",
      team: user?.team_name || "",
      dob: user?.dob ? user.dob.split("T")[0] : "",
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
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
      const payload = {
        name: data.name,
        email: data.email,
        team: data.team,
        dob: data.dob,
        current_password: data.currentPassword || null,
        new_password: data.newPassword || null,
        nickname: data.nickname, // Assuming backend accepts this
      };

      await updateProfile(payload);
      navigate({ to: ".." });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <MobileLayout className="bg-white flex flex-col h-full overflow-y-auto">
      {/* HEADER */}
      <div
        className="relative h-40 w-full shrink-0 px-5 pb-6"
        style={{
          background: "linear-gradient(180deg, #592AC7 0%, #CCB6FF 100%)",
        }}
      >
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate({ to: ".." })}
          className="absolute top-4 left-4 z-10 hover:bg-white/20 text-white rounded-full h-10 w-10"
        >
          <ChevronLeft size={32} strokeWidth={2.5} />
        </Button>
      </div>

      <div className="flex-1 px-5 pb-10">
        {/* PROFILE IMAGE SECTION */}
        <div className="-mt-12.5 flex flex-col items-center mb-6 relative z-10">
          <div className="relative">
            <div className="w-27.5 h-27.5 rounded-full bg-white p-1 shadow-md">
              <Avatar className="w-full h-full border border-gray-200">
                <AvatarImage
                  src={previewImage || undefined}
                  className="object-cover"
                />
                <AvatarFallback className="bg-gray-100">
                  <UserIcon size={40} className="text-[#592AC7]" />
                </AvatarFallback>
              </Avatar>
            </div>

            <Button
              size="icon"
              onClick={() => fileInputRef.current?.click()}
              className="absolute bottom-1 right-1 bg-[#592AC7] hover:bg-[#451d9e] h-9 w-9 rounded-full shadow-sm"
            >
              <Camera size={16} />
            </Button>

            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept="image/*"
              onChange={handleImageChange}
            />
          </div>
          <Button
            variant="link"
            onClick={() => fileInputRef.current?.click()}
            className="mt-1 text-[#592AC7] font-semibold text-[15px] font-gilroy hover:no-underline"
          >
            Change image
          </Button>
        </div>

        {/* 📝 SHADCN FORM */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <h2 className="text-[20px] font-bold text-[#1A1A1A] font-gilroy">
              Personal Details
            </h2>

            {/* Nickname */}
            <FormField
              control={form.control}
              name="nickname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[14px] font-semibold text-[#666] font-gilroy">
                    Nick Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your nickname"
                      className="h-12.5 rounded-xl border-[#E5E7EB] bg-[#F9FAFB] focus-visible:ring-[#592AC7] font-gilroy"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />

            {/* Full Name (Read Only) */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[14px] font-semibold text-[#666] font-gilroy">
                    Full Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      readOnly
                      className="h-12.5 rounded-xl border-[#E5E7EB] bg-[#F3F4F6] text-[#6B7280] font-gilroy cursor-not-allowed focus-visible:ring-0"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />

            {/* Email (Read Only) */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[14px] font-semibold text-[#666] font-gilroy">
                    Email
                  </FormLabel>
                  <FormControl>
                    <Input
                      readOnly
                      className="h-12.5 rounded-xl border-[#E5E7EB] bg-[#F3F4F6] text-[#6B7280] font-gilroy cursor-not-allowed focus-visible:ring-0"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Team (Read Only) */}
            <FormField
              control={form.control}
              name="team"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[14px] font-semibold text-[#666] font-gilroy">
                    Team
                  </FormLabel>
                  <FormControl>
                    <Input
                      readOnly
                      className="h-12.5 rounded-xl border-[#E5E7EB] bg-[#F3F4F6] text-[#6B7280] font-gilroy cursor-not-allowed focus-visible:ring-0"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Date of Birth */}
            <FormField
              control={form.control}
              name="dob"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[14px] font-semibold text-[#666] font-gilroy">
                    Date of Birth
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="date"
                      className="h-12.5 rounded-xl border-[#E5E7EB] bg-white text-[#1A1A1A] focus-visible:ring-[#592AC7] font-gilroy uppercase block"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />

            {/* 🔐 PASSWORD COLLAPSIBLE */}
            <Collapsible
              open={isOpen}
              onOpenChange={setIsOpen}
              className="border-t border-gray-200 pt-5 mt-5"
            >
              <CollapsibleTrigger asChild>
                <Button
                  variant="ghost"
                  className="w-full flex items-center justify-between p-0 hover:bg-transparent group h-auto"
                >
                  <span className="text-[16px] font-bold text-[#1A1A1A] font-gilroy group-hover:text-[#592AC7] transition-colors">
                    Change Password
                  </span>
                  <ChevronDown
                    size={20}
                    className={`text-[#666] transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </Button>
              </CollapsibleTrigger>

              <CollapsibleContent className="space-y-4 pt-4">
                {/* Current Password */}
                <FormField
                  control={form.control}
                  name="currentPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[14px] font-semibold text-[#666] font-gilroy">
                        Current Password
                      </FormLabel>
                      <div className="relative">
                        <FormControl>
                          <Input
                            type={showCurrentPass ? "text" : "password"}
                            placeholder="Current password"
                            className="h-12.5 rounded-xl border-[#E5E7EB] bg-[#F9FAFB] focus-visible:ring-[#592AC7] font-gilroy pr-10"
                            {...field}
                            value={field.value || ""}
                          />
                        </FormControl>
                        <button
                          type="button"
                          onClick={() => setShowCurrentPass(!showCurrentPass)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                        >
                          {showCurrentPass ? (
                            <Eye size={18} />
                          ) : (
                            <EyeOff size={18} />
                          )}
                        </button>
                      </div>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />

                {/* New Password */}
                <FormField
                  control={form.control}
                  name="newPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[14px] font-semibold text-[#666] font-gilroy">
                        New Password
                      </FormLabel>
                      <div className="relative">
                        <FormControl>
                          <Input
                            type={showNewPass ? "text" : "password"}
                            placeholder="New password"
                            className="h-12.5 rounded-xl border-[#E5E7EB] bg-[#F9FAFB] focus-visible:ring-[#592AC7] font-gilroy pr-10"
                            {...field}
                            value={field.value || ""}
                          />
                        </FormControl>
                        <button
                          type="button"
                          onClick={() => setShowNewPass(!showNewPass)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                        >
                          {showNewPass ? (
                            <Eye size={18} />
                          ) : (
                            <EyeOff size={18} />
                          )}
                        </button>
                      </div>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />

                {/* Confirm Password */}
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[14px] font-semibold text-[#666] font-gilroy">
                        Confirm New Password
                      </FormLabel>
                      <div className="relative">
                        <FormControl>
                          <Input
                            type={showConfirmPass ? "text" : "password"}
                            placeholder="Confirm new password"
                            className="h-12.5 rounded-xl border-[#E5E7EB] bg-[#F9FAFB] focus-visible:ring-[#592AC7] font-gilroy pr-10"
                            {...field}
                            value={field.value || ""}
                          />
                        </FormControl>
                        <button
                          type="button"
                          onClick={() => setShowConfirmPass(!showConfirmPass)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                        >
                          {showConfirmPass ? (
                            <Eye size={18} />
                          ) : (
                            <EyeOff size={18} />
                          )}
                        </button>
                      </div>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />
              </CollapsibleContent>
            </Collapsible>

            {/* SUBMIT BUTTON */}
            <Button
              type="submit"
              disabled={isLoading}
              className={`w-full py-6 mt-8 rounded-xl text-[16px] font-semibold font-gilroy transition-all ${
                isLoading
                  ? "bg-[#8a65e6] cursor-not-allowed"
                  : "bg-[#592AC7] hover:bg-[#592AC7]/90"
              }`}
            >
              {isLoading ? (
                <Loader2 className="animate-spin mr-2" />
              ) : (
                "Save Changes"
              )}
            </Button>
          </form>
        </Form>
      </div>
    </MobileLayout>
  );
}
