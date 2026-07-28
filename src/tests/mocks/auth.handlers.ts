import { http, HttpResponse } from "msw";

type LoginRequestBody = {
  phone: string;
  password: string;
};

export const authHandlers = [
  http.post("*/users/login", async ({ request }) => {
    const body = (await request.json()) as LoginRequestBody;

    return HttpResponse.json({
      success: true,
      result: {
        accessToken: `test-access-token-${body.phone}`,
        refreshToken: `test-refresh-token-${body.password}`,
      },
    });
  }),
];
