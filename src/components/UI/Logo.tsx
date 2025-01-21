const Logo: React.FC = () => {
  return (
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
  );
};

export default Logo;
