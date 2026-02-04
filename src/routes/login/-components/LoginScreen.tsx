import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLogin } from "@/hooks/useAuth";
import { YBSymbol } from "@/lib/utils/custom-icons";
import { signInSchema, type SignInSchemaType } from "@/schemas/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function LoginScreen() {
  const [showPassword, setShowPassword] = useState(false);
  const { mutate: login, isPending, error } = useLogin();

  const form = useForm<SignInSchemaType>({
    resolver: zodResolver(signInSchema),
  });

  const onSubmit = (data: SignInSchemaType) => {
    login(data);
  };

  return (
    <div className="flex h-full flex-col justify-center p-8">
      <div className="w-25 h-25 mx-auto mb-6 flex items-center justify-center">
        <YBSymbol className="w-full h-full" />
      </div>

      <div className="text-center mb-8">
        <h1 className="text-[22px] font-clash font-bold font-family-clash text-[#4B5563] mb-2">
          Welcome Back
        </h1>
        <p className="text-[14px] font-gilroy text-text-secondary">
          Sign in to continue to Yuvabe
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {/* Email */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Email"
                    className="h-12.5 rounded-xl pl-4 pr-12 text-[14px] font-gilroy"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Password */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="relative">
                    <Input
                      {...field}
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      className="h-12.5 rounded-xl pl-4 pr-12 text-[14px] font-gilroy"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-primary hover:opacity-80 focus:outline-none"
                    >
                      {showPassword ? <Eye /> : <EyeOff />}
                    </button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {error instanceof Error && (
            <p className="text-error text-sm text-center text-red-500">
              {error.message}
            </p>
          )}

          <Button
            type="submit"
            disabled={isPending}
            className="w-full h-13.5 bg-primary hover:opacity-90 text-white text-[16px] font-clash font-bold rounded-xl shadow-none transition-opacity"
          >
            {isPending ? <Loader2 className="animate-spin mr-2" /> : "Sign In"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
