import { useState } from "react";
import { nanoid } from "nanoid";
import styles from "./index.module.css";
import PropTypes from "prop-types";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddEmployee = ({ setEmployees }) => {
  const [newEmployee, setNewEmployee] = useState({
    fullName: "",
    age: "",
    salary: "",
    position: "",
  });
  return (
    <>
      <form
        className={styles["add-form"]}
        onSubmit={(e) => {
          e.preventDefault();
          setEmployees((currentEmployees) => {
            const data = { ...newEmployee };
            data.id = nanoid();
            data.createdAt = Date.now();
            return [...currentEmployees, data];
          });
          setNewEmployee({ fullName: "", age: "", salary: "", position: "" });
          toast.error("employee added", {
            position: "top-right",
            autoClose: 1000,
          });
        }}
      >
        <input
          onChange={(e) => {
            setNewEmployee({ ...newEmployee, fullName: e.target.value });
          }}
          value={newEmployee.fullName}
          type="text"
          placeholder="full name"
        />
        <input
          onChange={(e) => {
            setNewEmployee({ ...newEmployee, age: e.target.value });
          }}
          value={newEmployee.age}
          type="number"
          min={0}
          placeholder="age"
        />
        <input
          onChange={(e) => {
            setNewEmployee({ ...newEmployee, salary: e.target.value });
          }}
          value={newEmployee.salary}
          type="number"
          min={0}
          placeholder="salary"
        />
        <select
          onChange={(e) => {
            setNewEmployee({ ...newEmployee, position: e.target.value });
          }}
          name="position"
          id="position"
        >
          <option value="" selected disabled>
            Select Employee Position
          </option>
          <option value="designer">Designer</option>
          <option value="hr">HR</option>
          <option value="marketing">Marketing</option>
          <option value="developer">Developer</option>
          <option value="manager">Manager</option>
        </select>
        <button className={styles.btn} type="submit">
          add
        </button>
      </form>
      <ToastContainer/>
    </>
  );
};

AddEmployee.propTypes = {
  setEmployees: PropTypes.func,
};

// employees: PropTypes.array,
//   age: PropTypes.number,
//   name: PropTypes.name,
//   isMarried: PropTypes.bool,
//   employee: PropTypes.shape({
//       name: PropTypes.string,
//       age: PropTypes.number,
//       isMarried: PropTypes.bool
//   })

export default AddEmployee;
