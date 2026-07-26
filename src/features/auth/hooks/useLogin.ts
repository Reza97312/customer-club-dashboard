import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { loginApi } from "../services/auth.api";
import { LoginRequest, LoginResponse } from "../types/auth.types";
import { useAuthStore } from "../store/auth.store";
import { BackendErrorResponse } from "@/src/shared/types/common.types";

export const useLogin = () => {
  const setTokens = useAuthStore((state) => state.setTokens);

  return useMutation<
    LoginResponse,
    AxiosError<BackendErrorResponse>,
    LoginRequest
  >({
    mutationFn: (data) => loginApi(data),

    onSuccess: (data) => {
      setTokens(data.accessToken, data.refreshToken);
      toast.success("ورود با موفقیت انجام شد، به پاراف کلاب خوش آمدید!");
    },

    onError: (error) => {
      const backendMessage =
        error.response?.data?.snackbar?.message ||
        error.response?.data?.error?.message;

      if (backendMessage) {
        toast.error(backendMessage);
      } else {
        toast.error("خطایی در ارتباط با سرور رخ داد");
      }
    },
  });
};
