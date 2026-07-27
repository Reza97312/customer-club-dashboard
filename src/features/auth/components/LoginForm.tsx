"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Phone, Lock, Loader2, Eye, EyeOff } from "lucide-react";
import { loginSchema, LoginFormValues } from "../schemas/login.schema";
import { useLogin } from "../hooks/useLogin";
import { Button } from "@/src/shared/components/ui/button";
import { Input } from "@/src/shared/components/ui/input";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();
  const { mutate, isPending } = useLogin();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { phone: "", password: "" },
  });

  const onSubmit = (data: LoginFormValues) => {
    mutate(data, {
      onSuccess: () => {
        router.push("/");
      },
    });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-[#e3ebfc] to-[#e7e4f7] p-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl"
      >
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold text-gray-800">
            ورود به حساب کاربری
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            برای دسترسی به پاراف‌کلاب وارد شوید
          </p>
        </div>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="relative">
              <Phone className="absolute right-3 top-3 h-5 w-5 text-[#7C49F2]" />
              <Input
                type="text"
                placeholder="شماره موبایل"
                className="pr-10 py-5 focus-visible:ring-1 focus-visible:ring-purple-600 transition-all"
                {...form.register("phone")}
              />
            </div>
            {form.formState.errors.phone && (
              <p className="mt-2 text-xs text-red-500">
                {form.formState.errors.phone.message}
              </p>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="relative">
              <Lock className="absolute right-3 top-3 h-5 w-5 text-[#7C49F2]" />

              <Input
                type={showPassword ? "text" : "password"}
                placeholder="رمز عبور"
                className="pr-10 py-5 focus-visible:ring-1 focus-visible:ring-purple-600 transition-all"
                {...form.register("password")}
              />

              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute left-3 top-3 text-[#7C49F2]"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5 cursor-pointer" />
                ) : (
                  <Eye className="h-5 w-5 cursor-pointer" />
                )}
              </button>
            </div>

            {form.formState.errors.password && (
              <p className="mt-2 text-xs text-red-500">
                {form.formState.errors.password.message}
              </p>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Button
              type="submit"
              disabled={isPending}
              className=" cursor-pointer w-full rounded-xl bg-[#7C49F2] hover:bg-[#7C49F2]  py-6 text-md shadow-md transition-all"
            >
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  در حال بررسی...
                </>
              ) : (
                "ورود"
              )}
            </Button>
          </motion.div>
        </form>
      </motion.div>
    </div>
  );
}
