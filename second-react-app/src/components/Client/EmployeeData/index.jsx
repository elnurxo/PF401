import { EmployeeList } from "../EmployeeList";
import EmployeeListItem from "../EmployeeListItem";
import styles from "./index.module.css";
import PropTypes from "prop-types";

const EmployeeData = ({ setEmployees, employees }) => {
  return (
    <EmployeeList className={styles["employees-list"]}>
      {employees &&
        employees.map((employee) => {
          return <EmployeeListItem key={employee.id} employee={employee} setEmployees={setEmployees}/>;
        })}
    </EmployeeList>
  );
};

EmployeeData.propTypes = {
  employees: PropTypes.array,
  setEmployees: PropTypes.func,
};

export default EmployeeData;
