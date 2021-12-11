import { FC, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Button, Collapse, Nav, Navbar, NavbarToggler } from "reactstrap";
import store from "../../store";

interface HeaderLinkProps {
  to: string;
  content: string;
}

const Header: FC = () => {
  const navigate = useNavigate();

  const logoutHandler = () => {
    store.user.unsetToken();
    store.demo.clearNotes();
    navigate("/login");
  };

  const [isOpen, setIsOpen] = useState(false);

  return (
    <Navbar color="dark" dark expand="md" fixed="" light className="mb-3">
      <Link className="navbar-brand" to="/dashboard">
        EncDiary
      </Link>
      <NavbarToggler onClick={() => setIsOpen(!isOpen)} />
      <Collapse navbar className="justify-content-between" isOpen={isOpen}>
        <Nav navbar>
          <HeaderLink to="/dashboard" content="Dashboard" />
          <HeaderLink to="/demo" content="Demo" />
        </Nav>
        <Button color="light" outline onClick={logoutHandler}>
          Logout
        </Button>
      </Collapse>
    </Navbar>
  );
};

const HeaderLink: FC<HeaderLinkProps> = ({ to, content }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
    >
      {content}
    </NavLink>
  );
};

export default Header;
