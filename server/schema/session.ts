import { object, string } from "yup";

export const createSessionSchema = object({
  body: object({
    password: string()
      .required("password is required")
      .min(6, "password should be 6 characters minimum")
      .matches(/^[a-zA-Z0-9_.-]*$/, "Only Latin letters are aloud"),
    email: string().required("email is required").email("Must be a valid email"),
  }),
});
