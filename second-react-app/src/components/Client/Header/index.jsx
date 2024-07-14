import { Link } from "react-router-dom";
import styles from "./index.module.css";
import logo from "../../../assets/logo.png"

const Header = () => {
  return (
    <>
      <nav className={styles.nav}>
        <div>
          <img width={40} height={40} src={logo} alt="logo" />
        </div>
        <ul className={styles.list }>
          <li>
            <Link className={styles.link} to="/">Home</Link>
          </li>
          <li>
            <Link className={styles.link} to="/about">About</Link>
          </li>
          <li>
            <Link className={styles.link} to="/services">Services</Link>
          </li>
          <li>
            <Link className={styles.link} to="/employees">Employees</Link>
          </li>
          <li>
            <Link className={styles.link} to="/categories">Categories</Link>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Header;
