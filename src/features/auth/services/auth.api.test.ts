import { describe, expect, it } from "vitest";
import { loginApi } from "./auth.api";

describe("loginApi", () => {
  it("should return login response result", async () => {
    const result = await loginApi({
      phone: "989123456789",
      password: "123456",
    });

    expect(result).toEqual({
      accessToken: "test-access-token-989123456789",
      refreshToken: "test-refresh-token-123456",
    });
  });
});
