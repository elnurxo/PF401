import { createContext, useContext, useState } from "react";
import useLocalStorage from "../../hooks/useLocalStorage";
import PropTypes from "prop-types";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  //check local storage
  const [localAuth, setLocalAuth] = useLocalStorage(
    "user",
    JSON.stringify(localStorage.getItem("user")) && JSON.stringify(null)
  );

  const [auth, setAuth] = useState(localAuth);

  const login = (payload) => {
    setAuth(payload);
    setLocalAuth({ userId: payload.id });
  };

  const logout = () => {
    setAuth(null);
    setLocalAuth(null);
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export const useAuth = () => {
  return useContext(AuthContext);
};
