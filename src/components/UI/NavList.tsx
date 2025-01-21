import NavListItem from "./NavListItem";

const NavList: React.FC = () => {
  return (
    <ul className="navbar__list">
      <NavListItem>Home</NavListItem>
      <NavListItem>Actions</NavListItem>
      <NavListItem>Discord</NavListItem>
    </ul>
  );
};

export default NavList;
