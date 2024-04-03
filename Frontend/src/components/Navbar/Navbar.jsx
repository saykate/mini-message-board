import styles from "./Navbar.module.css"
import { Link } from "react-router-dom"
import { useLocation, useNavigate } from "react-router-dom";
import useAuthContext from "../../hooks/useAuthContext";

const Navbar = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { isAuthenticated, setToken, userId } = useAuthContext()
  const logout = () => {
    try {
      setToken(null);
      navigate("/")
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <nav className={styles.nav}>
      <ul>
        <li>
          { location.pathname !== "/" &&
            <Link className={styles.link} to="/">Home</Link>
          }
          { location.pathname === "/" && isAuthenticated &&
            <div>
            <Link className={styles.link} onClick={logout}>LOGOUT</Link>
            <Link className={styles.link} to={`profile/${userId}`}>PROFILE</Link>
          </div>
          }
          { location.pathname === "/" && !isAuthenticated &&
            <div>
              <Link className={styles.link} to="login">
                LOGIN
              </Link>
              <Link className={styles.link} to="register">
                REGISTER
              </Link>
          </div>
          }
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;