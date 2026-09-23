import { navbarStyles } from "../assets/dummyStyles";
import img1 from "../assets/logo.png";
import { useNavigate } from "react-router-dom";
import type { LayoutProps } from "../types";
import { useEffect, useRef, useState } from "react";
import { ChevronDown, HandHelping, UserRound  } from "lucide-react";
import { LogOut } from 'lucide-react';
import axios from "axios";

const BASE_URL= 'http://localhost:4000/api';

const Navbar = ({ user: propuser, onLogout }: LayoutProps) => {
  const navigate = useNavigate();
  const menuRef = useRef<HTMLDivElement | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const user = propuser || {
    name: "",
    email: "",
  };

 //logout from the server
 useEffect(() => {
  const fetchUserData = async ()=>{
    try{
      const token = localStorage.getItem("token");
      if(!token)return;

      const response = await axios.get(`${BASE_URL}/user/me`)
    }
    catch(error){
      
    }
  }
 }
)[]

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  return (
    <header className={navbarStyles.header}>
      <div className={navbarStyles.container}>
        <div
          onClick={() => navigate("/")}
          className={navbarStyles.logoContainer}
        >
          <div className={navbarStyles.logoImage}>
            <img src={img1} alt="Logo" />
          </div>
          <span className={navbarStyles.logoText}>Expense Tracker</span>
        </div>
        {user && (
          <div className={navbarStyles.userContainer} ref={menuRef}>
            <button onClick={toggleMenu} className={navbarStyles.userButton}>
              <div className="relative">
                <div className={navbarStyles.userAvatar}>
                  {user?.name?.[0]?.toUpperCase() || "U"}
                </div>
                <div className={navbarStyles.statusIndicator}></div>
              </div>
              <div className={navbarStyles.userTextContainer}>
                <p className={navbarStyles.userName}>{user?.name || "User"}</p>
                <p className={navbarStyles.userEmail}>
                  {user?.email || "user@expensetracker.com"}
                </p>
              </div>
              <ChevronDown className={navbarStyles.chevronIcon(String(menuOpen))} />
            </button>
            {menuOpen && (
              <div className={navbarStyles.dropdownMenu}>
                <div className={navbarStyles.dropdownHeader}>
                  <div className="flex items-center gap-3">
                    <div className={navbarStyles.dropdownAvatar}>
                      {user?.name?.[0]?.toUpperCase() || "U"}
                    </div>
                    <div>
                      <div className={navbarStyles.dropdownName}>
                        {user?.name || "User"}
                      </div>
                      <div className={navbarStyles.dropdownEmail}>
                        {user?.email || "user@expensetracker.com"}
                      </div>
                    </div>
                  </div>
                </div>
                <div className={navbarStyles.menuItemContainer}>
                  <button
                    onClick={() => {
                      setMenuOpen(false);
                      navigate("/profile");
                    }}
                    className={navbarStyles.menuItem}
                  >
                    <UserRound className="w-4 h-4" />
                    <span>My Profile</span>
                  </button>
                </div>
                    <div className={navbarStyles.menuItemBorder}>
                      <button onClick={handleLogout} className={navbarStyles.logoutButton}>
                        <LogOut className="w-4 h-4"/>
                        <span>Log out</span>
                      </button>
                    </div>

              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
