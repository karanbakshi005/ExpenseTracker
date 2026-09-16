import { navbarStyles } from "../assets/dummyStyles.ts";
import img1 from "../assets/images/logo.png";
import { useNavigate } from "react-router-dom";
import type { LayoutProps } from "../types";

const Navbar = ({ user, onLogout }: LayoutProps) => {
  const navigate = useNavigate();
  const user = propuser || {
    name:"",
    emial:""
  }

  return (
    <header className={navbarStyles.header}>
      <div className={navbarStyles.container}>
        <div
          onClick={() => navigate("/")}
          className={navbarStyles.logoContainer}
        >
          <img src={img1} alt="Logo" />
        </div>
        <span className={navbarStyles.logoText}>Expense Tracker</span>
        {user && (
          <button type="button" onClick={onLogout}>
            {user.name}
          </button>
        )}
      </div>
    </header>
  );
};

export default Navbar;
