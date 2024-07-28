import Container from "../../components/Container";
import { useAuth } from "../../services/context/authContext";
import { getAll, patchOne, post } from "../../services/api/api";
import { endpoints } from "../../config/constants";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea } from "@mui/material";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";

const User = () => {
  const { user, setUser } = useAuth();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    getAll(endpoints.orders).then((res) => {
      setOrders([...res.data.filter((x) => x.userId == user.id)]);
    });
  }, [user]);

  let totalPrice;
  if (user) {
    totalPrice = user.basket.reduce(
      (accumulator, currentVal) =>
        accumulator + currentVal.price * currentVal.count,
      0
    );
  }
  return (
    <Container>
      {user && (
        <Card sx={{ marginTop: "50px", maxWidth: "350px" }}>
          <CardActionArea>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {user.username}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <b>email: </b> {user.email}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <b>balance: </b> {user.balance}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <b>role: </b> {user.role}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      )}
      <hr style={{ margin: "30px auto" }} />
      <h3 style={{ textAlign: "center" }}>Order Items</h3>
      <ul>
        {orders &&
          orders.map((order) => {
            return (
              <li key={order.id}>
                <b>order status: </b> {order.status}
                <br />
                <b>order id: </b> {order.id}
                <hr />
              </li>
            );
          })}
      </ul>
      <hr style={{ margin: "30px auto" }} />
      <h3 style={{ textAlign: "center" }}>Basket Items</h3>
      {user && <h3>SUB TOTAL PRICE: {totalPrice.toFixed(3)}$</h3>}
      {user && (
        <Button
          onClick={() => {
            if (user.balance > totalPrice) {
              console.log("test");
              const orderItems = [...user.basket];
              post(endpoints.orders, {
                userId: user.id,
                orderItems: orderItems,
                status: "pending",
                createdAt: Date.now(),
                totalPrice: totalPrice,
              });
              patchOne(endpoints.users, user.id, {
                basket: [],
                balance: user.balance - totalPrice,
              }).then((res) => {
                setUser({ ...res });
              });
              totalPrice = 0;
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: "ordered",
                showConfirmButton: false,
                timer: 1500,
              });
            } else {
              Swal.fire({
                position: "top-end",
                icon: "error",
                title: "balance is low",
                showConfirmButton: false,
                timer: 1500,
              });
            }
          }}
          variant="contained"
          sx={{ marginTop: "20px" }}
        >
          Order Now
        </Button>
      )}
      <TableContainer sx={{ marginTop: "40px" }} component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Album Title</TableCell>
              <TableCell align="right">Album Cover</TableCell>
              <TableCell align="right">Album Price</TableCell>
              <TableCell align="right">Stock Count</TableCell>
              <TableCell align="right">Basket Count</TableCell>
              <TableCell align="right">Total Price</TableCell>
              <TableCell align="right">Increase</TableCell>
              <TableCell align="right">Decrease</TableCell>
              <TableCell align="right">Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {user &&
              user.basket.map((basketItem) => (
                <TableRow
                  key={basketItem.title}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {basketItem.title}
                  </TableCell>
                  <TableCell align="right">
                    <img
                      src={basketItem.cover}
                      alt={basketItem.title}
                      width={50}
                      height={50}
                    />
                  </TableCell>
                  <TableCell align="right">{basketItem.price}</TableCell>
                  <TableCell align="right">{basketItem.stockCount}</TableCell>
                  <TableCell align="right">{basketItem.count}</TableCell>
                  <TableCell align="right">
                    {(basketItem.count * basketItem.price).toFixed(2)}
                  </TableCell>
                  <TableCell align="right">
                    <Button
                      variant="contained"
                      onClick={() => {
                        if (basketItem.stockCount <= basketItem.count) {
                          Swal.fire({
                            position: "top-end",
                            icon: "error",
                            title: "stock count exceeded",
                            showConfirmButton: false,
                            timer: 1500,
                          });
                        } else if (
                          user.balance <=
                          totalPrice + basketItem.price
                        ) {
                          Swal.fire({
                            position: "top-end",
                            icon: "error",
                            title: "balance is low",
                            showConfirmButton: false,
                            timer: 1500,
                          });
                        } else {
                          basketItem.count += 1;
                          patchOne(endpoints.users, user.id, {
                            basket: [...user.basket],
                          }).then((res) => {
                            setUser({ ...res });
                          });
                        }
                      }}
                    >
                      increase
                    </Button>
                  </TableCell>
                  <TableCell align="right">
                    <Button
                      onClick={() => {
                        if (basketItem.count > 1) {
                          basketItem.count -= 1;
                          patchOne(endpoints.users, user.id, {
                            basket: [...user.basket],
                          }).then((res) => {
                            setUser({ ...res });
                          });
                        } else {
                          patchOne(endpoints.users, user.id, {
                            basket: [
                              ...user.basket.filter(
                                (x) => x.id !== basketItem.id
                              ),
                            ],
                          }).then((res) => {
                            setUser({ ...res });
                          });
                        }
                      }}
                      variant="contained"
                    >
                      decrease
                    </Button>
                  </TableCell>
                  <TableCell align="right">
                    <Button
                      onClick={() => {
                        patchOne(endpoints.users, user.id, {
                          basket: [
                            ...user.basket.filter(
                              (x) => x.id !== basketItem.id
                            ),
                          ],
                        }).then((res) => {
                          setUser({ ...res });
                        });
                      }}
                      variant="contained"
                      color="error"
                    >
                      delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default User;
