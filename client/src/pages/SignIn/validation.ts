import { string } from "yup";

export const validateEmailSchema = string().email("Must be an email").required("Email is required");

export const validatePasswordSchema = string()
  .required("Password is required")
  .min(6, "Password should contain 6 symbols minimum")
  .matches(/^[a-zA-Z0-9_.-]*$/, "Only Latin letters are aloud");
