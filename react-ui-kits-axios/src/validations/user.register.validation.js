import * as Yup from "yup";

export const registerValidation = Yup.object().shape({
  username: Yup.string().min(3).required(),
  email: Yup.string().email().required(),
  password: Yup.string()
    .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{5,}$/, "password regex failed")
    .required(),
  confirmPassword: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "passwords must match"
  ),
});
