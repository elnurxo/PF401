import styles from "./index.module.scss";
import PropTypes from "prop-types";

const SideBar = ({ active }) => {
  return (
    <div className={`${styles["sidebar-wrapper"]} ${active && styles.active}`}></div>
  );
};

SideBar.propTypes = {
  active: PropTypes.bool,
};

export default SideBar;
