import styles from "./index.module.scss";
import Container from "../Container";
import { Link } from "react-router-dom";
import { HiMiniBars3 } from "react-icons/hi2";
import { IoCloseSharp } from "react-icons/io5";
import { useState } from "react";
import SideBar from "../SideBar";
import { useFavorites } from "../../services/context/favoriteContext.jsx";
import { useAuth } from "../../services/context/authContext.jsx";
import { Button } from "@mui/material";
import Swal from "sweetalert2";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { auth, logout } = useAuth();
  const { favorites } = useFavorites();
  return (
    <header className={styles.header}>
      <Container>
        <nav>
          {/* logo */}
          <a href="http://spotify.com">
            <img
              width={120}
              height={40}
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/Spotify_logo_with_text.svg/2560px-Spotify_logo_with_text.svg.png"
              alt="spotify"
            />
          </a>
          {/* desktop links */}
          <ul>
            {auth ? (
              <>
                <li>
                  <Link className={styles.link} to={"/"}>
                    Home
                  </Link>
                </li>
                <li>
                  <Link className={styles.link} to={"/songs"}>
                    Songs
                  </Link>
                </li>
                <li>
                  <Link className={styles.link} to={"/add-song"}>
                    Add Song
                  </Link>
                </li>
                <li>
                  <Link className={styles.link} to={"/todo"}>
                    Todo
                  </Link>
                </li>
                <li>
                  <Link className={styles.link} to={"/favorites"}>
                    Favorites <sup>{favorites.length}</sup>
                  </Link>
                </li>
                <li>
                  <Button
                    onClick={() => {
                      Swal.fire({
                        title: "Are you sure to logout?",
                        text: "You won't be able to revert this!",
                        icon: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#3085d6",
                        cancelButtonColor: "#d33",
                        confirmButtonText: "Yes, delete it!",
                      }).then((result) => {
                        if (result.isConfirmed) {
                          logout();
                          Swal.fire({
                            title: "Logged Out!",
                            text: "Your file has been deleted.",
                            icon: "success",
                          });
                        }
                      });
                    }}
                    variant="contained"
                  >
                    logout
                  </Button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link className={styles.link} to={"/todo"}>
                    Todo
                  </Link>
                </li>
                <li>
                  <Link className={styles.link} to={"/login"}>
                    Login
                  </Link>
                </li>
                <li>
                  <Link className={styles.link} to={"/register"}>
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>
          {/* mobile menu */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={styles.bars}
          >
            {isMobileMenuOpen ? <IoCloseSharp /> : <HiMiniBars3 />}
          </button>
          {/* sidebar */}
          <SideBar active={isMobileMenuOpen} />
        </nav>
      </Container>
    </header>
  );
};

export default Header;
