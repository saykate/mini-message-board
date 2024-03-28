import styles from "./Navbar.module.css"
import { Link } from "react-router-dom"

const Navbar = () => {
  return (
    <nav className={styles.nav}>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;