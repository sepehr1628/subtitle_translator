import AuthButton from "../buttons/AuthButton";
import NavList from "../UI/NavList";

const Navbar: React.FC = () => {
  return (
    <nav className="navbar">
      <NavList />
      <AuthButton type="signup" />
    </nav>
  );
};

export default Navbar;
