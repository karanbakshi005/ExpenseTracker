import { navbarStyles } from "../assets/dummyStyles";
import img1 from "../assets/images/logo.png";
import {useNavigate} from "react-router-dom";

interface NavbarProps {
  onLogout: () => void;
  user: unknown;
}
 const navigate = useNavigate();

const Navbar = ({ user: propUser, onLogout }: NavbarProps) => {
 
  return (
    <header className={navbarStyles.header}>
      <div className={navbarStyles.container}> 
        <div onClick={() => navigate('/')} className={navbarStyles.logo}>
          <img src={img1} alt="Logo" />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
