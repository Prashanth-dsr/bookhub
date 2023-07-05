import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import { PrimaryButton } from "@fluentui/react";
import { loginActions } from "../store/loginSlice";
import "../css/Header.css";

const Header = () => {
  const dispath = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const isHome = !location.pathname.includes("bookshelves");

  const onLogout = () => {
    dispath(loginActions.logout());
    Cookies.remove("jwt_token");
    navigate("/login");
  };

  return (
    <nav className="header">
      <div>
        <Link to="/">
          <img src="https://res.cloudinary.com/dfnwpgiwt/image/upload/v1688462046/bookhub/Group_7731_or3m7x.png" />
        </Link>
      </div>
      <div>
        <Link className={`header-link ${isHome ? "" : "link-dull"}`} to="/">
          Home
        </Link>
        <Link
          className={`header-link ${isHome ? "link-dull" : ""}`}
          to="/bookshelves"
        >
          Bookshelves
        </Link>
        <PrimaryButton type="button" text="Logout" onClick={onLogout} />
      </div>
    </nav>
  );
};

export default Header;
