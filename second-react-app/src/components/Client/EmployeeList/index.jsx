import PropTypes from "prop-types";

export const EmployeeList = ({ children }) => {
  return <ul>{children}</ul>;
};

EmployeeList.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};
