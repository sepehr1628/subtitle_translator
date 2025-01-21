import Logo from "../UI/Logo";
import Navbar from "./Navbar";

const Header: React.FC = () => {
  return (
    <header className="header">
      <Logo />
      <Navbar />
    </header>
  );
};

export default Header;
