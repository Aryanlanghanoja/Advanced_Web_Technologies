import { Link } from "react-router-dom";
import "./Menu.css"; // Import the CSS file

const Menu = () => {
  return (
    <nav className="menu">
      <Link to="/home" className="menu-link">Home</Link>
      <Link to="/aboutus" className="menu-link">About Us</Link>
      <Link to="/proddetails" className="menu-link">Product</Link>
    </nav>
  );
};

export default Menu;
