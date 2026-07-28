import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook, waitFor } from "@testing-library/react";
import {
  AxiosError,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from "axios";
import type { PropsWithChildren } from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { useLogin } from "./useLogin";
import { useAuthStore } from "../store/auth.store";
import type { BackendErrorResponse } from "@/src/shared/types/common.types";

const { loginApiMock, toastSuccessMock, toastErrorMock } = vi.hoisted(() => ({
  loginApiMock: vi.fn(),
  toastSuccessMock: vi.fn(),
  toastErrorMock: vi.fn(),
}));

vi.mock("../services/auth.api", () => ({
  loginApi: loginApiMock,
}));

vi.mock("sonner", () => ({
  toast: {
    success: toastSuccessMock,
    error: toastErrorMock,
  },
}));

function createWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
      mutations: {
        retry: false,
      },
    },
  });

  return function Wrapper({ children }: PropsWithChildren) {
    return (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
  };
}

describe("useLogin", () => {
  beforeEach(() => {
    loginApiMock.mockReset();
    toastSuccessMock.mockReset();
    toastErrorMock.mockReset();

    useAuthStore.setState({
      accessToken: null,
      refreshToken: null,
      hasHydrated: false,
    });
  });

  it("should save tokens and show success toast on success", async () => {
    loginApiMock.mockResolvedValue({
      accessToken: "access-token-1",
      refreshToken: "refresh-token-1",
    });

    const { result } = renderHook(() => useLogin(), {
      wrapper: createWrapper(),
    });

    await result.current.mutateAsync({
      phone: "989123456789",
      password: "123456",
    });

    expect(useAuthStore.getState().accessToken).toBe("access-token-1");
    expect(useAuthStore.getState().refreshToken).toBe("refresh-token-1");

    expect(toastSuccessMock).toHaveBeenCalledWith(
      "ورود با موفقیت انجام شد، به پاراف کلاب خوش آمدید!",
    );
  });

  it("should show backend error message on failure", async () => {
    const response: AxiosResponse<BackendErrorResponse> = {
      data: {
        success: false,
        error: {
          code: 401,
          httpCode: 401,
          message: "Unauthorized",
        },
        snackbar: {
          type: "error",
          message: "شماره موبایل یا رمز عبور اشتباه است",
        },
      },
      status: 401,
      statusText: "Unauthorized",
      headers: {},
      config: {
        headers: {},
      } as InternalAxiosRequestConfig,
    };

    loginApiMock.mockRejectedValue(
      new AxiosError<BackendErrorResponse>(
        "Request failed",
        "401",
        undefined,
        undefined,
        response,
      ),
    );

    const { result } = renderHook(() => useLogin(), {
      wrapper: createWrapper(),
    });

    await expect(
      result.current.mutateAsync({
        phone: "989123456789",
        password: "wrong-password",
      }),
    ).rejects.toBeTruthy();

    await waitFor(() => {
      expect(toastErrorMock).toHaveBeenCalledWith(
        "شماره موبایل یا رمز عبور اشتباه است",
      );
    });
  });

  it("should show generic error message when backend message is missing", async () => {
    loginApiMock.mockRejectedValue(
      new AxiosError("Network Error", "ERR_NETWORK"),
    );

    const { result } = renderHook(() => useLogin(), {
      wrapper: createWrapper(),
    });

    await expect(
      result.current.mutateAsync({
        phone: "989123456789",
        password: "123456",
      }),
    ).rejects.toBeTruthy();

    await waitFor(() => {
      expect(toastErrorMock).toHaveBeenCalledWith(
        "خطایی در ارتباط با سرور رخ داد",
      );
    });
  });
});
