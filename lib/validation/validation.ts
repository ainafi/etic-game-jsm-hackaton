import { z } from "zod";

export const signupFormValidation = z.object({
  name: z.string().min(2, {
    message: "at least 2 characters",
  }),
  email: z.string().email(),
  password: z.string().min(6, {
    message: "at last 6 characters",
  }),
});

export const signinFormValidation = z.object({
  email: z.string().email(),
  password: z.string().min(6, {
    message: "at least 6 characters",
  }),
});