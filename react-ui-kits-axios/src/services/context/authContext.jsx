import { createContext, useContext, useEffect, useState } from "react";
import useLocalStorage from "../../hooks/useLocalStorage";
import PropTypes from "prop-types";
import { getOne } from "../api/api";
import { endpoints } from "../../config/constants";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  //check local storage
  const [localAuth, setLocalAuth] = useLocalStorage(
    "user",
    JSON.stringify(localStorage.getItem("user")) && JSON.stringify(null)
  );

  const [auth, setAuth] = useState(localAuth);
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (localAuth) {
      getOne(endpoints.users, localAuth.userId).then((res) => {
        setUser({ ...res.data });
      });
    }
  }, [localAuth]);

  const login = (payload) => {
    const response = { ...payload };
    response.userId = payload.id;
    response.role = payload.role;
    setAuth(response);
    setUser(() => {
      getOne(endpoints.users, payload.id).then((res) => {
        setUser({ ...res.data });
      });
    });
    setLocalAuth({ userId: payload.id, role: payload.role });
  };

  const logout = () => {
    setAuth(null);
    setLocalAuth(null);
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout, user, setUser }}>
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
