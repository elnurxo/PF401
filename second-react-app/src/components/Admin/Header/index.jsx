import { Link } from "react-router-dom";
import styles from "./index.module.css"
import logo from "../../../assets/logo.png"


const Header = () => {
  return (
    <nav className={styles.nav}>
    <div>
      <img width={40} height={40} src={logo} alt="logo" />
    </div>
    <ul className={styles.list }>
      <li>
        <Link className={styles.link} to="/admin">Dashboard</Link>
      </li>
      <li>
        <Link className={styles.link} to="/admin/users">Users</Link>
      </li>
    </ul>
  </nav>
  );
};

export default Header;
