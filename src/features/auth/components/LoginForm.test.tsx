import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { HTMLAttributes, PropsWithChildren } from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { LoginForm } from "./LoginForm";

const { mutateMock, pushMock, loginHookState } = vi.hoisted(() => ({
  mutateMock: vi.fn((data, options) => {
    options?.onSuccess?.();
  }),
  pushMock: vi.fn(),
  loginHookState: {
    isPending: false,
  },
}));

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: pushMock,
  }),
}));

vi.mock("../hooks/useLogin", () => ({
  useLogin: () => ({
    mutate: mutateMock,
    isPending: loginHookState.isPending,
  }),
}));

vi.mock("framer-motion", () => ({
  motion: {
    div: ({
      children,
      ...props
    }: PropsWithChildren<Record<string, unknown>>) => (
      <div {...(props as HTMLAttributes<HTMLDivElement>)}>{children}</div>
    ),
  },
}));

describe("LoginForm", () => {
  beforeEach(() => {
    mutateMock.mockClear();
    pushMock.mockClear();
    loginHookState.isPending = false;
  });

  it("should render form and show validation errors", async () => {
    const user = userEvent.setup();

    render(<LoginForm />);

    await user.click(screen.getByRole("button", { name: "ورود" }));

    expect(
      await screen.findByText("شماره موبایل باید معتبر باشد"),
    ).toBeInTheDocument();
    expect(
      await screen.findByText("رمز عبور باید حداقل ۶ کاراکتر باشد"),
    ).toBeInTheDocument();
  });

  it("should toggle password visibility", async () => {
    const user = userEvent.setup();

    render(<LoginForm />);

    const passwordInput = screen.getByPlaceholderText("رمز عبور");
    expect(passwordInput).toHaveAttribute("type", "password");

    const buttons = screen.getAllByRole("button");
    await user.click(buttons[0]);

    expect(passwordInput).toHaveAttribute("type", "text");

    await user.click(buttons[0]);

    expect(passwordInput).toHaveAttribute("type", "password");
  });

  it("should submit data and redirect to home on success", async () => {
    const user = userEvent.setup();

    render(<LoginForm />);

    await user.type(
      screen.getByPlaceholderText("شماره موبایل"),
      "989123456789",
    );
    await user.type(screen.getByPlaceholderText("رمز عبور"), "123456");
    await user.click(screen.getByRole("button", { name: "ورود" }));

    expect(mutateMock).toHaveBeenCalledWith(
      {
        phone: "989123456789",
        password: "123456",
      },
      expect.any(Object),
    );

    expect(pushMock).toHaveBeenCalledWith("/");
  });

  it("should show loading state when request is pending", () => {
    loginHookState.isPending = true;

    render(<LoginForm />);

    const submitButton = screen.getByRole("button", { name: /در حال بررسی/i });

    expect(submitButton).toBeDisabled();
    expect(submitButton).toHaveTextContent("در حال بررسی...");
  });
});
