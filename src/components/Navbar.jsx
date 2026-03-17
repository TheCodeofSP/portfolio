import { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import "./navbar.scss";

const NAV_LINKS = [
  { to: "/", label: "Accueil" },
  { to: "/about", label: "À propos" },
  { to: "/projects", label: "Projets" },
  { to: "/skills", label: "Compétences" },
  { to: "/contact", label: "Contact" },
];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <nav
      className={`navbar ${isMenuOpen ? "navbar--open" : ""}`}
      aria-label="Navigation principale"
    >
      <button
        type="button"
        className={`navbar__burger ${isMenuOpen ? "is-open" : ""}`}
        onClick={toggleMenu}
        aria-label={isMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
        aria-expanded={isMenuOpen}
        aria-controls="main-navigation"
      >
        <FaBars
          className="navbar__icon navbar__icon--burger"
          aria-hidden="true"
        />
        <FaTimes
          className="navbar__icon navbar__icon--close"
          aria-hidden="true"
        />
      </button>

      <div
        className={`navbar__overlay ${isMenuOpen ? "is-visible" : ""}`}
        onClick={closeMenu}
        aria-hidden="true"
      />

      <ul id="main-navigation" className="navbar__list">
        {NAV_LINKS.map((link) => (
          <li className="navbar__item" key={link.to}>
            <NavLink
              to={link.to}
              className={({ isActive }) =>
                `navbar__link ${isActive ? "active" : ""}`
              }
              onClick={closeMenu}
            >
              {link.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;