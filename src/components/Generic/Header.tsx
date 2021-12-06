import { FC } from "react";
import { Link, NavLink } from "react-router-dom";

interface HeaderLinkProps {
  to: string;
  content: string;
}

const Header: FC = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-3">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/dashboard">
          EncDiary
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <HeaderLink to="/dashboard" content="Dashboard" />
            <HeaderLink to="/demo" content="Demo" />
          </div>
        </div>
      </div>
    </nav>
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
