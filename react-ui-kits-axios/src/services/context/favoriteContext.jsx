import { createContext, useContext, useState } from "react";
import useLocalStorage from "../../hooks/useLocalStorage";
import PropTypes from "prop-types";

const FavoritesContext = createContext(null);

export const FavoritesProvider = ({ children }) => {
  //check local storage
  const [localFavorites, setLocalFavorites] = useLocalStorage(
    "favorites",
    JSON.stringify(localStorage.getItem("favorites")) && JSON.stringify([])
  );

  const [favorites, setFavorites] = useState(localFavorites);

  const checkFavorite = (id) => {
    return favorites.find((x) => x.id == id);
  };

  const addToFavorite = (payload) => {
    //global state add
    setFavorites([...favorites, payload]);
    //add local storage
    setLocalFavorites([...localFavorites, {id: payload.id}])
  };

  const removeFromFavorite = (id) => {
    //remove global state
    setFavorites((currentFavorites) => {
      return [...currentFavorites.filter((x) => x.id !== id)];
    });
    //remove local storage
    setLocalFavorites([...localFavorites.filter((x) => x.id !== id)])
  };

  return (
    <FavoritesContext.Provider
      value={{ favorites, addToFavorite, removeFromFavorite, checkFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

FavoritesProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export const useFavorites = () => {
  return useContext(FavoritesContext);
};
