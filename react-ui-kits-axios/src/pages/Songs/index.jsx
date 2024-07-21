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
import { deleteOne, getAll } from "../../services/api";
import { endpoints } from "../../services/constants";
import Swal from "sweetalert2";

const Songs = () => {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getAll(endpoints.songs).then((resp) => {
      setSongs([...resp.data]);
      setLoading(resp.loading);
      setError(resp.error);
    });
  }, []);
  return (
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
                            setSongs((currentSongs)=>{
                              return [...currentSongs.filter((x)=>x.id!==song.id)];
                            })
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
  );
};

export default Songs;
