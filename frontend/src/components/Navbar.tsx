import { navbarStyles } from "../assets/dummyStyles.ts";
import img1 from "../assets/logo.png";
import { useNavigate } from "react-router-dom";
import type { LayoutProps } from "../types";
import { useRef, useState } from "react";

const Navbar = ({ user:propuser, onLogout }: LayoutProps) => {
  const navigate = useNavigate();
  const menuRef = useRef<HTMLDivElement | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const user = propuser || {
    name: "",
    email: "",
  };

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  return (
    <header className={navbarStyles.header}>
      <div className={navbarStyles.container}>
        <div className={navbarStyles.logoImage}
        >
          <img src={img1} alt="Logo" />
        </div>
        <span className={navbarStyles.logoText}>Expense Tracker</span>
        {user && (
          <div className={navbarStyles.userContainer} ref={menuRef}>
            <button className={navbarStyles.userButton} onClick={toggleMenu}>
              <div className="relative">
                <div className={navbarStyles.userAvatar}>
                  {user?.name?.[0]?.toUpperCase() || "U"}
                </div>
                <div className={navbarStyles.statusIndicator}></div>
              </div>
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
