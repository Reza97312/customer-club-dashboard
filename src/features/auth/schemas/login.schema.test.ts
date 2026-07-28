import { describe, expect, it } from "vitest";
import { loginSchema } from "./login.schema";

describe("loginSchema", () => {
  it("should pass with valid data", () => {
    const result = loginSchema.safeParse({
      phone: "98912345678",
      password: "123456",
    });

    expect(result.success).toBe(true);
  });

  it("should fail when phone is too short", () => {
    const result = loginSchema.safeParse({
      phone: "123",
      password: "123456",
    });

    expect(result.success).toBe(false);

    if (!result.success) {
      expect(result.error.issues[0].message).toBe(
        "شماره موبایل باید معتبر باشد",
      );
    }
  });

  it("should fail when password is too short", () => {
    const result = loginSchema.safeParse({
      phone: "98912345678",
      password: "123",
    });

    expect(result.success).toBe(false);

    if (!result.success) {
      expect(result.error.issues[0].message).toBe(
        "رمز عبور باید حداقل ۶ کاراکتر باشد",
      );
    }
  });

  it("should fail when both fields are invalid", () => {
    const result = loginSchema.safeParse({
      phone: "",
      password: "",
    });

    expect(result.success).toBe(false);

    if (!result.success) {
      const messages = result.error.issues.map((issue) => issue.message);

      expect(messages).toContain("شماره موبایل باید معتبر باشد");
      expect(messages).toContain("رمز عبور باید حداقل ۶ کاراکتر باشد");
    }
  });
});
