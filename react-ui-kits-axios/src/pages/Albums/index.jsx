import { useState } from "react";
import Container from "../../components/Container";
import { useEffect } from "react";
import { getAll, patchOne } from "../../services/api/api";
import { endpoints } from "../../config/constants";
import { Grid } from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useAuth } from "../../services/context/authContext";
import Swal from "sweetalert2";

const Albums = () => {
  const [albums, setAlbums] = useState([]);
  const { auth, user, setUser } = useAuth();

  useEffect(() => {
    getAll(endpoints.albums).then((res) => {
      setAlbums([...res.data]);
    });
  }, []);

  return (
    <Container>
      <Grid sx={{ marginTop: "60px" }} container spacing={2}>
        {albums &&
          albums.map((album) => {
            return (
              <Grid key={album.id} item xs={12} sm={12} md={6} lg={3} xl={3}>
                <Card>
                  <CardMedia
                    sx={{ height: 140 }}
                    image={album.cover}
                    title={album.title}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {album.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      genre: {album.genre}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      year: {album.year}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      artist: {album.artist}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      onClick={() => {
                        console.log("user: ", user);
                        let updatedBasket = [...user.basket];
                        if (user.basket.find((x) => x.id == album.id)) {
                          console.log("test count increase");
                          //increase count
                          const currentAlbum = updatedBasket.find(
                            (x) => x.id == album.id
                          );
                          currentAlbum.count += 1;
                          Swal.fire({
                            position: "top-end",
                            icon: "success",
                            title: "count increased",
                            showConfirmButton: false,
                            timer: 1500,
                          });
                        } else {
                          //add new basket item
                          updatedBasket = [
                            ...updatedBasket,
                            {
                              ...album,
                              count: 1,
                            },
                          ];
                          Swal.fire({
                            position: "top-end",
                            icon: "success",
                            title: "new album added to basket",
                            showConfirmButton: false,
                            timer: 1500,
                          });
                        }

                        patchOne(endpoints.users, auth.userId, {
                          basket: [...updatedBasket],
                        }).then((res) => {
                          setUser({ ...res });
                        });
                      }}
                    >
                      basket
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

export default Albums;
