import { useEffect, useState } from "react";
import { useFavorites } from "../../services/context/favoriteContext";
import { getAll } from "../../services/api/api";
import { endpoints } from "../../config/constants";

const Favorites = () => {
  const { favorites } = useFavorites(); 
  const [songs, setSongs] = useState([]);
  useEffect(() => {
    getAll(endpoints.songs).then((res) => {
      const response = [];
      favorites.map((fav)=>{
        const check = res.data.find((x)=>x.id==fav.id);
        if(check){
            response.push(check);
        }
      })
      setSongs([...response]);
    });
  }, [favorites]);

  return (
    <ul>
      {songs &&
            songs.map((fav) => {
            return <li key={fav.id}>{fav.title}</li>
            })}
        </ul>
    );
};

export default Favorites;
