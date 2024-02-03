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

export const productSchema = Yup.object({
  products: Yup.array()
    .of(
      Yup.object().shape({
        item: Yup.string().required("item name can't be empty"),
        rate: Yup.number()
          .required("rate can't be empty")
          .min(1, "rate must be greater than 0"),
        quantity: Yup.number()
          .required("quantity can't be empty")
          .min(1, "quantity must be greater than 0"),
      })
    )
    .min(1, "Minimum 1 product is required"),
});
