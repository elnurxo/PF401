import styles from "./index.module.scss";
import Container from "../Container";
import { Link } from "react-router-dom";
import { HiMiniBars3 } from "react-icons/hi2";
import { IoCloseSharp } from "react-icons/io5";
import { useState } from "react";
import SideBar from "../SideBar";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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
          </ul>
          {/* mobile menu */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={styles.bars}
          >
            {isMobileMenuOpen ? <IoCloseSharp /> : <HiMiniBars3 />}
          </button>
          {/* sidebar */}
          <SideBar active={isMobileMenuOpen}/>
        </nav>
      </Container>
    </header>
  );
};

export default Header;
