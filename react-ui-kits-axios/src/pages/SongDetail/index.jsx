import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { deleteOne, getOne } from "../../services/api";
import { endpoints } from "../../services/constants";
import { Button, Grid } from "@mui/material";
import Container from "../../components/Container"
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Swal from "sweetalert2";

const SongDetail = () => {
  const { id } = useParams();
  const [song, setSong] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    getOne(endpoints.songs, id).then((res)=>{
      setSong({...res.data});
    })
  }, [id]);

  return <Container>
       <Grid key={song.id} item xs={12} sm={12} md={6} lg={3} xl={3}>
                <Card>
                  <CardMedia
                    sx={{ height: 370,marginTop:'20px' }}
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
                    <Button onClick={()=>navigate('/songs')}>
                      Go Back
                    </Button>
                    <Button onClick={()=>{
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
                          deleteOne(endpoints.songs, id);
                          //state update - delete
                          navigate('/songs');
                          Swal.fire({
                            title: "Deleted!",
                            text: "Your file has been deleted.",
                            icon: "success",
                          });
                        }
                      });
                    }} color="error" variant="contained" size="small">
                      Delete
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
  </Container>;
};

export default SongDetail;
