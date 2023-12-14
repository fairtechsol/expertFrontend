import * as Yup from "yup";

export const loginValidationSchema = Yup.object({
  userName: Yup.string().required("Username is required"),
  password: Yup.string().required("Password is required"),
});

export const changePasswordSchema = Yup.object({
    oldPassword: Yup.string().required("Old Password is required"),
    newPassword: Yup.string()
      .required("New Password is required")
      .min(8, "Password must be at least 8 characters long")
      .matches(
        /^(?=.*[A-Z])(?=.*[0-9])(?=.*[@$!%*?&]).*$/,
        "Password must contain at least one uppercase letter, one number, and one special character (@ $ ! % * ? &)"
      ),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("newPassword"), ""], "Passwords must match")
      .required("Confirm Password is required"),
  });
