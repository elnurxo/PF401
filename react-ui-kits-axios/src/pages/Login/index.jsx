import { Button, TextField } from "@mui/material";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAll } from "../../services/api/api";
import { endpoints } from "../../config/constants";
import Swal from "sweetalert2";
import { useAuth } from "../../services/context/authContext";

const Login = () => {
  const [users, setUsers] = useState([]);
  const { login } = useAuth();

  useEffect(() => {
    getAll(endpoints.users).then((res) => {
      setUsers([...res.data]);
    });
  }, []);
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values, actions) => {
      //check if username and password is correct
      const check = users.find(
        (x) => x.email == values.email && x.password == values.password
      );
      if (check) {
        login(check);
        actions.resetForm();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `welcome back, ${check.username}`,
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          navigate("/");
        });
      } else {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "email or password is incorrect",
          showConfirmButton: false,
          timer: 1500,
        });
      }
      console.log("values: ", values);
    },
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
        <h3 style={{ textAlign: "center" }}>Sign In Form</h3>
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
        <Button variant="contained" type="submit">
          Sign In
        </Button>
        <Link to={"/register"}>do not have an account?</Link>
      </form>
    </>
  );
};

export default Login;
