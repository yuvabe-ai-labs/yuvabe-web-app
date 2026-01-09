import { YBSymbol } from "@/lib/utils/customIcons";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import MobileLayout from "../../../components/layout/MobileLayout"; // Import Layout
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { useLogin } from "../../../hooks/auth/useAuth";
import {
  signInSchema,
  type SignInSchemaType,
} from "../../../schemas/auth.schemas";

export default function LoginScreen() {
  const [showPassword, setShowPassword] = useState(false);
  const { mutate: login, isPending, error } = useLogin();
  const errorMessage = error instanceof Error ? error.message : null;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInSchemaType>({
    resolver: zodResolver(signInSchema),
  });

  const onSubmit = (data: SignInSchemaType) => {
    login(data);
  };

  return (
    // WRAP EVERYTHING IN MOBILE LAYOUT
    // Added 'flex flex-col justify-center p-6' to className to center the form vertically
    <MobileLayout className="flex flex-col justify-center p-8">
      {/* Logo Section */}
      <div className="w-25 h-25 mx-auto mb-6 flex items-center justify-center ">
        <YBSymbol className="w-full h-full" />
      </div>

      {/* Title & Subtitle */}
      <div className="text-center mb-8">
        <h1 className="text-[22px] font-clash font-bold text-[#4B5563] mb-2">
          Welcome Back
        </h1>
        <p className="text-[14px] font-gilroy text-text-secondary text-center">
          Sign in to continue to Yuvabe
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Email Input */}
        <div className="space-y-1">
          <Input
            {...register("email")}
            type="email"
            placeholder="Email"
            className={`h-12.5 rounded-xl px-4 text-[14px] font-gilroy bg-white border-border text-text-primary placeholder:text-text-secondary focus:ring-primary focus:border-primary ${
              errors.email ? "border-error focus:ring-error" : ""
            }`}
          />
          {errors.email && (
            <p className="text-error text-[14px] ml-1 font-gilroy">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Password Input */}
        <div className="space-y-1">
          <div className="relative">
            <Input
              {...register("password")}
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className={`h-12.5 rounded-xl pl-4 pr-12 text-[14px] font-gilroy bg-white border-border text-text-primary placeholder:text-text-secondary focus:ring-primary focus:border-primary ${
                errors.password ? "border-error focus:ring-error" : ""
              }`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-primary hover:opacity-80 focus:outline-none"
            >
              {showPassword ? (
                <Eye size={22} strokeWidth={2} />
              ) : (
                <EyeOff size={22} strokeWidth={2} />
              )}
            </button>
          </div>
          {errors.password && (
            <p className="text-error text-[14px] ml-1 font-gilroy">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* General Error Message */}
        {errorMessage && (
          <div className="p-3 bg-red-50 border border-red-100 rounded-xl">
            <p className="text-error text-sm text-center font-gilroy">
              {errorMessage}
            </p>
          </div>
        )}

        {/* Sign In Button */}
        <Button
          type="submit"
          className="w-full h-13.5 bg-primary hover:opacity-90 text-white text-[16px] font-clash font-bold rounded-xl mt-6 shadow-none transition-opacity"
          disabled={isPending}
        >
          {isPending ? <Loader2 className="animate-spin mr-2" /> : "Sign In"}
        </Button>
      </form>
    </MobileLayout>
  );
}
