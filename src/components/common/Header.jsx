import Navbar from "./Navbar.jsx";
import { Link } from "react-router-dom";
import "./header.scss";

import logoAccueillant from "/images/logo/LogoBrown.svg";
import logominimaliste from "/images/logo/LogoBlack.svg";
import logoEnergique from "/images/logo/LogoGreen.svg";

const logos = {
  energique: logoEnergique,
  minimaliste: logominimaliste,
  accueillant: logoAccueillant,
};

const Header = ({ theme, resetIntro }) => {
  const logoSrc = logos[theme] || logos.accueillant;

  return (
    <header className="header">
      <div className="header__container">
        <Link
          to="/"
          className="header__logo-link"
          aria-label="Retour à l’accueil"
        >
          <img src={logoSrc} alt="Sandrine Pham" className="header__logo" />
        </Link>

        <Navbar resetIntro={resetIntro} />
      </div>
    </header>
  );
};

export default Header;