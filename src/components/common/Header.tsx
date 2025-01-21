import Navbar from "./Navbar";

const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="header__title">
        <img
          className="logo"
          src="../../../public/images/logo.png"
          alt="subtube logo"
        />
        <h1 className="header__description">
          SubTube, The first and best subtitle translator supported all langs
        </h1>
      </div>
      <Navbar />
    </header>
  );
};

export default Header;
