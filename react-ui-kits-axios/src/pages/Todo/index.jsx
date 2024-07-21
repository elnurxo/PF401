import Container from "../../components/Container";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import { Button, TextField } from "@mui/material";
import { MdDelete } from "react-icons/md";
import { FaCheck } from "react-icons/fa";
import { useState } from "react";
import { nanoid } from "nanoid";
import moment from "moment/moment";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";

const Todo = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState({ title: "" });

  const showToastMessage = () => {
    toast.success("Todo Created!", {
      position: "top-right",
      theme: "light",
      pauseOnHover: true,
      autoClose: 2000,
    });
  };

  return (
    <Container>
      <List
        sx={{
          width: "40%",
          margin: "50px auto",
          bgcolor: "background.paper",
          border: "2px solid #BDBDBD",
          borderRadius: "7px",
        }}
      >
        <h3 style={{ textAlign: "center", margin: "10px auto" }}>
          Todo App w/React
        </h3>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setNewTodo({ title: "" });
            showToastMessage();
            setTodos([
              ...todos,
              {
                id: nanoid(),
                createdAt: Date.now(),
                title: newTodo.title,
                isDone: false,
              },
            ]);
          }}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "12px",
            width: "75%",
            margin: "10px auto",
          }}
        >
          <TextField
            onChange={(e) => setNewTodo({ title: e.target.value })}
            value={newTodo.title}
            id="outlined-basic"
            label="Todo title"
            variant="outlined"
          />
          <Button type={"submit"} variant="contained" color="primary">
            add
          </Button>
        </form>
        {todos &&
          todos.map((todo) => {
            return (
              <ListItem key={todo.id}>
                <ListItemAvatar>
                  <Avatar></Avatar>
                </ListItemAvatar>
                <ListItemText
                  sx={{textDecoration: todo.isDone ? "line-through" : "none"}}
                  primary={todo.title}
                  secondary={moment(todo.createdAt).format(
                    "MMM Do YYYY, hh:mm"
                  )}
                />
                <Button
                  variant="outlined"
                  color="warning"
                  sx={{ marginRight: "5px" }}
                  onClick={()=>{
                    setTodos((currentTodos)=>{
                      const updatedTodos = [...currentTodos];
                      const updatingTodo = updatedTodos.find((x)=>x.id==todo.id);
                      updatingTodo.isDone = todo.isDone ? false : true;
                      return [...updatedTodos];
                    })
                  }}
                >
                  <FaCheck />
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
                        setTodos((currentTodos) => {
                          return [
                            ...currentTodos.filter((x) => x.id != todo.id),
                          ];
                        });
                        Swal.fire({
                          title: "Deleted!",
                          text: "Your file has been deleted.",
                          icon: "success",
                        });
                      }
                    });
                  }}
                  variant="outlined"
                  color="error"
                >
                  <MdDelete />
                </Button>
              </ListItem>
            );
          })}
      </List>
      <ToastContainer />
    </Container>
  );
};

export default Todo;
