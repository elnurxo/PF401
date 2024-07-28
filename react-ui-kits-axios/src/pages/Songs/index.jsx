import { CircularProgress, Grid } from "@mui/material";
import Container from "../../components/Container";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { deleteOne, getAll } from "../../services/api/api";
import { endpoints } from "../../config/constants";
import Swal from "sweetalert2";
import { MdFavoriteBorder } from "react-icons/md";
import { MdFavorite } from "react-icons/md";
import { useFavorites } from "../../services/context/favoriteContext.jsx";
import { Helmet } from "react-helmet";
import { useSelector, useDispatch } from "react-redux";
import { addToFav, removeFromFav } from "../../services/redux/favoriteSlice.js";

const Songs = () => {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { favorites, addToFavorite, removeFromFavorite, checkFavorite } =
    useFavorites();
  useEffect(() => {
    getAll(endpoints.songs).then((resp) => {
      setSongs([...resp.data]);
      setLoading(resp.loading);
      setError(resp.error);
    });
  }, []);

  //REDUX JS TOOLKIT
  const dispatch = useDispatch();
  const favoritesRedux = useSelector((state) => state.favorites.favorites);

  return (
    <>
      <Helmet>
        <title>Songs Page</title>
      </Helmet>
      <Container>
        {loading && <CircularProgress />}
        {error && <h1>failed to fetch</h1>}
        <Grid sx={{ marginTop: "60px" }} container spacing={2}>
          {songs &&
            songs.map((song) => {
              return (
                <Grid key={song.id} item xs={12} sm={12} md={6} lg={3} xl={3}>
                  <Card>
                    <CardMedia
                      sx={{ height: 140 }}
                      image={song.coverImg}
                      title={song.title}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {song.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        genre: {song.genre}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        year: {song.year}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        artist: {song.artist}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button>
                        <Link
                          style={{ color: "black", textDecoration: "none" }}
                          to={`/songs/${song.id}`}
                        >
                          Detail
                        </Link>
                      </Button>
                      <Button
                        onClick={() => {
                          //check if contains in favorites
                          const check = checkFavorite(song.id);
                          if (check) {
                            removeFromFavorite(song.id);
                            dispatch(removeFromFav(song.id));
                          } else {
                            addToFavorite(song);
                            //redux js toolkit
                            dispatch(addToFav(song));
                          }
                        }}
                        sx={{ color: "black", fontSize: "18px" }}
                      >
                        {favorites.find((x) => x.id == song.id) ? (
                          <MdFavorite style={{ color: "red" }} />
                        ) : (
                          <MdFavoriteBorder />
                        )}
                      </Button>
                      <Button variant="contained">
                        <Link
                          style={{ color: "white", textDecoration: "none" }}
                          to={`/edit/${song.id}`}
                        >
                          Edit
                        </Link>
                      </Button>
                      <Button
                        onClick={() => {
                          Swal.fire({
                            title: "Are you sure?",
                            text: "You won't be able to revert this!",
                            icon: "warning",
                            showCancelButton: true,
                            confirmButtonColor: "#3085d6",
                            cancelButtonColor: "#d33",
                            confirmButtonText: "Yes, delete it!",
                          }).then((result) => {
                            if (result.isConfirmed) {
                              //delete from API
                              deleteOne(endpoints.songs, song.id);
                              //state update - delete
                              setSongs((currentSongs) => {
                                return [
                                  ...currentSongs.filter(
                                    (x) => x.id !== song.id
                                  ),
                                ];
                              });
                              //local storage remove
                              removeFromFavorite(song.id);
                              Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success",
                              });
                            }
                          });
                        }}
                        color="error"
                        variant="contained"
                        size="small"
                      >
                        Delete
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              );
            })}
        </Grid>
      </Container>
    </>
  );
};

export default Songs;
