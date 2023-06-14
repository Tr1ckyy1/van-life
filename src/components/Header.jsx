import { NavLink, Link, redirect } from "react-router-dom";
import img from "../images/avatar-icon.png";

export default function Header() {
  function fakeLogOut() {
    localStorage.removeItem("loggedin");
  }

  return (
    <header>
      <Link className="site-logo" to="/">
        #VANLIFE
      </Link>
      <nav className="navigation-page">
        {/* setting underline with className */}

        <NavLink
          className={({ isActive }) => (isActive ? "active-link" : null)}
          to="/host"
        >
          Host
        </NavLink>
        <NavLink
          className={({ isActive }) => (isActive ? "active-link" : null)}
          to="/about"
        >
          About
        </NavLink>
        <NavLink
          className={({ isActive }) => (isActive ? "active-link" : null)}
          to="/vans"
        >
          Vans
        </NavLink>
        <Link to="login" className="login-link">
          <img src={img} className="login-icon" />
        </Link>
        <button className="log-out" onClick={fakeLogOut}>
          Log Out
        </button>
        {/* setting underline with styles

                 const styles = {
                    fontWeight:"bold",
                    textDecoration:"underline",
                    color:"#161616"
                  }
              */}

        {/* <NavLink style={({isActive}) => isActive ? styles : null} to="/vans">Vans</NavLink>
            <NavLink style={({isActive}) => isActive ? styles : null} to="/host">Host</NavLink>
            <NavLink style={({isActive}) => isActive ? styles : null} to="/about">About</NavLink> */}
      </nav>
    </header>
  );
}
