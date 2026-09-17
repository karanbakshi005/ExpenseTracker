import { navbarStyles } from "../assets/dummyStyles.ts";
import img1 from "../assets/images/logo.png";
import { useNavigate } from "react-router-dom";
import type { LayoutProps } from "../types";

const Navbar = ({ user, onLogout }: LayoutProps) => {
  const navigate = useNavigate();
  const menuRef = useRef();
  const [menuOpen, setMenuOpen] = useState(false);

  const user = propuser || {
    name: "",
    emial: "",
  };

  const toggleMenu =()=>{

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
          <div className={navbarStyles.userContainer} ref={menuRef}>
            <button className={navbarStyles.userButton} onClick={toggleMenu}>
              <div className= "relative">
                <div className={navbarStyles.userAvatar}>
                  {user?.name?.[0]?.toUpperCase() || "U" }
                </div>
              </div>
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
