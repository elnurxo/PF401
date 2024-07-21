import * as Yup from "yup";

export const songValidationSchema = Yup.object().shape({
  title: Yup.string().min(3).required(),
  artist: Yup.string().min(2).max(30).required(),
  year: Yup.number().min(1800).required(),
  genre: Yup.string()
    .oneOf(["pop", "rock", "metal", "country", "folk", "r&b"])
    .required(),
  coverImg: Yup.string().url().required(),
  album: Yup.string()
    .matches(/^[a-zA-Z ]+$/, "album name should be only letters")
    .required(),
});
