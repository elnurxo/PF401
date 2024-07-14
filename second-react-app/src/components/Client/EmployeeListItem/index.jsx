import PropTypes from "prop-types";
import moment from 'moment';

const EmployeeListItem = ({ employee, setEmployees }) => {
  return (
    <li>
      <span>{employee.fullName}</span>
      <br />
      salary: <b>{employee.salary}$</b>
      <br />
      position: <b>{employee.position}</b>
      <br />
      createdAt: <b>{moment(employee.createdAt).format('MM Do YY, h:mm a')}</b>
      <br />
      <button
        onClick={() => {
          if (window.confirm("are you sure to delete?")) {
            setEmployees((currentEmployees) => {
              const updatedEmployees = currentEmployees.filter(
                (x) => x.id != employee.id
              );
              return updatedEmployees;
            });
          }
        }}
      >
        delete
      </button>
      <hr />
    </li>
  );
};

EmployeeListItem.propTypes = {
  employee: PropTypes.shape({
    id: PropTypes.string,
    createdAt: PropTypes.string,
    fullName: PropTypes.string,
    age: PropTypes.number,
    salary: PropTypes.number,
    position:
      PropTypes.oneOf[("hr", "designer", "manager", "marketing", "developer")],
  }),
  setEmployees: PropTypes.func,
};

export default EmployeeListItem;
