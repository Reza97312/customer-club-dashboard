import { z } from "zod";

export const loginSchema = z.object({
  phone: z.string().min(11, "شماره موبایل باید معتبر باشد"),
  password: z.string().min(6, "رمز عبور باید حداقل ۶ کاراکتر باشد"),
});

export type LoginFormValues = z.infer<typeof loginSchema>;
