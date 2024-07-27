import { useParams } from "react-router-dom";
import { Button, TextField } from "@mui/material";
import styles from "./index.module.scss";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Container from "../../components/Container";
import { useFormik } from "formik";
import { getOne, patchOne, post } from "../../services/api/api";
import { endpoints } from "../../config/constants";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { songValidationSchema } from "../../validations/addsong.validation";
import { useEffect, useState } from "react";

const EditSong = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [updatingSong, setUpdatingSong] = useState({});

  useEffect(() => {
    getOne(endpoints.songs, id).then((res) => {
      setUpdatingSong({ ...res.data });
    });
  }, [id]);

  const formik = useFormik({
    initialValues: {
      title: updatingSong.title,
      artist: updatingSong.artist,
      album: updatingSong.album,
      year: updatingSong.year,
      coverImg: updatingSong.coverImg,
      genre: updatingSong.genre,
    },
    validationSchema: songValidationSchema,
    onSubmit: (values, actions) => {
      patchOne(endpoints.songs, id, values);
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Song Updated",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/songs");
      actions.resetForm();
    },
    enableReinitialize: true,
  });
  return (
    <Container>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          formik.handleSubmit();
        }}
        className={styles["edit-song-form"]}
      >
        <h3 style={{ textAlign: "center" }}>Edit Song Form</h3>
        <TextField
          value={formik.values.title}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          name="title"
          id="outlined-basic"
          required
          type="text"
          variant="outlined"
        />
        {formik.errors.title && formik.touched.title && (
          <span style={{ color: "red" }}>{formik.errors.title}</span>
        )}
        <TextField
          value={formik.values.artist}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          name="artist"
          id="outlined-basic"
          required
          type="text"
          variant="outlined"
        />
        {formik.errors.artist && formik.touched.artist && (
          <span style={{ color: "red" }}>{formik.errors.artist}</span>
        )}
        <TextField
          value={formik.values.album}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          name="album"
          id="outlined-basic"
          required
          type="text"
          variant="outlined"
        />
        {formik.errors.album && formik.touched.album && (
          <span style={{ color: "red" }}>{formik.errors.album}</span>
        )}
        <TextField
          value={formik.values.year}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          name="year"
          id="outlined-basic"
          required
          type="number"
          min={1900}
          variant="outlined"
        />
        {formik.errors.year && formik.touched.year && (
          <span style={{ color: "red" }}>{formik.errors.year}</span>
        )}
        <TextField
          value={formik.values.coverImg}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          name="coverImg"
          id="outlined-basic"
          required
          type="url"
          variant="outlined"
        />
        {formik.errors.coverImg && formik.touched.coverImg && (
          <span style={{ color: "red" }}>{formik.errors.coverImg}</span>
        )}
        {/* genre select option */}
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Genre</InputLabel>
          <Select
            key={formik.values.genre}
            value={formik.values.genre}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name="genre"
            labelId="demo-simple-select-label"
            id="demo-simple-select"
          >
            <MenuItem value={"rock"}>Rock</MenuItem>
            <MenuItem value={"pop"}>Pop</MenuItem>
            <MenuItem value={"metal"}>Metal</MenuItem>
            <MenuItem value={"r&b"}>R&B</MenuItem>
            <MenuItem value={"folk"}>Folk</MenuItem>
            <MenuItem value={"country"}>Country</MenuItem>
          </Select>
        </FormControl>
        {formik.errors.genre && formik.touched.genre && (
          <span style={{ color: "red" }}>{formik.errors.genre}</span>
        )}
        <Button variant="contained" color="success" type={"submit"}>
          Update
        </Button>
      </form>
    </Container>
  );
};

export default EditSong;
