import { ReactNode } from "react";

interface HeaderProps {
  children: ReactNode;
}

const NavListItem: React.FC<HeaderProps> = ({ children }) => {
  return <li className="list__item">{children}</li>;
};

export default NavListItem;
