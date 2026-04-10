import { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import "./navbar.scss";

const NAV_LINKS = [
  { to: "/", label: "Accueil" },
  { to: "/websiteCreations", label: "Création de site" },
  { to: "/developpement-freelance", label: "Développement freelance" },
  { to: "/projects", label: "Projets" },
  { to: "/contact", label: "Contact" },
];

const Navbar = ({ resetIntro }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const closeMenu = () => setIsMenuOpen(false);

  const handleThemeReset = () => {
    closeMenu();
    resetIntro();
  };

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
        <FaBars className="navbar__icon navbar__icon--burger" />
        <FaTimes className="navbar__icon navbar__icon--close" />
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

        {/* 👉 Nouveau bouton */}
        <li className="navbar__item">
          <button
            type="button"
            className="navbar__link navbar__link--theme"
            onClick={handleThemeReset}
          >
            Changer d’univers
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;