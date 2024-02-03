import * as Yup from "yup";

export const signUpSchema = Yup.object({
  name: Yup.string().required("name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(8, "Minimum 8 characters required")
    .required("Please select the place."),
});

export const signInSchema = Yup.object({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(8, "minimum 8 character required")
    .required("Please select the place."),
});
