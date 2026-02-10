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
import { Link } from "@tanstack/react-router";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useState } from "react";
import { useForm, type FieldValues } from "react-hook-form";

export default function LoginScreen() {
  const [showPassword, setShowPassword] = useState(false);
  const { mutate: login, isPending, error } = useLogin();

  const form = useForm<SignInSchemaType>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onTouched",
    reValidateMode: "onChange",
  });

  const onSubmit = (data: SignInSchemaType) => {
    console.log("Form is valid! Data:", data);
    login(data);
  };

  const onInvalid = (errors: FieldValues) => {
    console.log("Form Validation Failed:", errors);
  };

  console.log("Current Form Errors:", form.formState.errors);

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
        <form
          onSubmit={form.handleSubmit(onSubmit, onInvalid)}
          className="space-y-4"
          noValidate
        >
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
                <FormMessage>
                  {form.formState.errors.email?.message}
                </FormMessage>
              </FormItem>
            )}
          />

          {/* Password */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <div className="relative">
                  <FormControl>
                    <Input
                      {...field}
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      className="h-12.5 rounded-xl pl-4 pr-12 text-[14px] font-gilroy"
                    />
                  </FormControl>

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-primary"
                  >
                    {showPassword ? <Eye /> : <EyeOff />}
                  </button>
                </div>

                <FormMessage>
                  {form.formState.errors.password?.message}
                </FormMessage>
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

          {/* <Button type="submit" disabled={isPending}>
            Sign In ({Object.keys(form.formState.errors).length} errors)
          </Button> */}
          <div className="pt-4 text-center text-[12px] font-gilroy text-gray-500 leading-relaxed">
            By continuing, you agree to our{" "}
            <Link
              to="/legal/terms"
              target="_blank"
              className="underline hover:text-gray-800 transition-colors"
            >
              Terms of Service
            </Link>{" "}
            and acknowledge our{" "}
            <Link
              to="/legal/privacy"
              target="_blank"
              className="underline hover:text-gray-800 transition-colors"
            >
              Privacy Policy
            </Link>
            .
          </div>
        </form>
      </Form>
    </div>
  );
}
