import { useState } from "react";
import AddEmployee from "../../../components/Client/AddEmployee";
import EmployeeData from "../../../components/Client/EmployeeData";

const Employees = () => {
  const [employees, setEmployees] = useState([]);

  return (
    <>
      <h2>Employees Page</h2>
      <AddEmployee setEmployees={setEmployees} />
      <EmployeeData employees={employees} setEmployees={setEmployees} />
    </>
  );
};

export default Employees;
