import { Button, TextField } from "@mui/material";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { registerValidation } from "../../validations/user.register.validation";
import { getAll, post } from "../../services/api/api";
import { endpoints } from "../../config/constants";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";

const Register = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  useEffect(() => {
    getAll(endpoints.users).then((res) => {
      setUsers([...res.data]);
    });
  }, []);

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    onSubmit: (values, actions) => {
      console.log("values: ", values);
      const duplicateEmail = users.find((x) => x.email == values.email);
      const duplicateUsername = users.find(
        (x) => x.username == values.username
      );

      if (duplicateEmail) {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "email already taken",
          showConfirmButton: false,
          timer: 1500,
        });
        return;
      }
      if (duplicateUsername) {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "username already taken",
          showConfirmButton: false,
          timer: 1500,
        });
        return;
      }
      if (!duplicateEmail && !duplicateUsername) {
        post(endpoints.users, {
          email: values.email,
          username: values.username,
          password: values.password,
          role: "client",
          basket: [],
        });
        actions.resetForm();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "user has been signed in",
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          navigate("/login");
        });
      }
    },
    validationSchema: registerValidation,
  });
  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          formik.handleSubmit();
        }}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "14px",
          border: "1px solid black",
          width: "30%",
          margin: "50px auto",
          padding: "18px 24px",
          borderRadius: "7px",
        }}
      >
        <h3 style={{ textAlign: "center" }}>Sign Up Form</h3>
        <TextField
          id="outlined-basic"
          label="email"
          type="email"
          required
          variant="outlined"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          name="email"
        />
        {formik.errors.email && formik.touched.email && (
          <span style={{ color: "red" }}>{formik.errors.email}</span>
        )}
        <TextField
          id="outlined-basic"
          label="username"
          type="text"
          required
          variant="outlined"
          value={formik.values.username}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          name="username"
        />
        {formik.errors.username && formik.touched.username && (
          <span style={{ color: "red" }}>{formik.errors.username}</span>
        )}
        <TextField
          id="outlined-basic"
          label="password"
          type="password"
          required
          variant="outlined"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          name="password"
        />
        {formik.errors.password && formik.touched.password && (
          <span style={{ color: "red" }}>{formik.errors.password}</span>
        )}
        <TextField
          id="outlined-basic"
          label="confirm password"
          type="password"
          required
          variant="outlined"
          value={formik.values.confirmPassword}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          name="confirmPassword"
        />
        {formik.errors.confirmPassword && formik.touched.confirmPassword && (
          <span style={{ color: "red" }}>{formik.errors.confirmPassword}</span>
        )}
        <Button variant="contained" type="submit">
          Sign In
        </Button>
        <Link to={"/login"}>already have an account?</Link>
      </form>
    </>
  );
};

export default Register;
