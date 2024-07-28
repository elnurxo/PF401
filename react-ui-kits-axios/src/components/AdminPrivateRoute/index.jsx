import { useAuth } from "../../services/context/authContext";
import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";

const AdminPrivateRoute = ({ children }) => {
  const { auth } = useAuth();

  if (auth && auth.role=='admin') {
    return children;
  } else {
    return <Navigate to={"/login"} />;
  }
};

AdminPrivateRoute.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export default AdminPrivateRoute;
