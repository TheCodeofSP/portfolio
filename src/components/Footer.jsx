import React from "react";
import { FaGithub, FaLinkedin, FaEnvelope, FaInstagram } from "react-icons/fa";
import { Link } from "react-router-dom";

import "./footer.scss";

import logoAccueillant from "/images/logo/LogoWhite.svg";
import logoMinimaliste from "/images/logo/LogoWhite.svg";
import logoEnergique from "/images/logo/LogoGreen.svg";

const LOGOS = {
  accueillant: logoAccueillant,
  energique: logoEnergique,
  minimaliste: logoMinimaliste,
};

const SOCIAL_LINKS = [
  {
    type: "internal",
    to: "/contact",
    label: "Envoyer un email à Sandrine Pham",
    icon: FaEnvelope,
  },
  {
    type: "external",
    href: "https://github.com/SandrinePham",
    label: "Profil GitHub de Sandrine Pham",
    icon: FaGithub,
  },
  {
    type: "external",
    href: "https://www.linkedin.com/in/sandrinepham69132b145",
    label: "Profil LinkedIn de Sandrine Pham",
    icon: FaLinkedin,
  },
  {
    type: "external",
    href: "https://www.instagram.com/thecodeofsp/",
    label: "Profil Instagram de Sandrine Pham",
    icon: FaInstagram,
  },
];

const LEGAL_LINKS = [
  { to: "/legal", label: "Mentions légales" },
  { to: "/privacy", label: "Confidentialité" },
  { to: "/sitemap", label: "Plan du site" },
];

const Footer = ({ theme = "accueillant" }) => {
  const currentYear = new Date().getFullYear();
  const logoSrc = LOGOS[theme] || LOGOS.accueillant;

  return (
    <footer className="footer">
      <div className="footer__container">
        <section className="footer__intro" aria-labelledby="footer-title">
          <h2 id="footer-title" className="footer__title">
            Sandrine Pham
          </h2>

          <p className="footer__eyebrow">Développeuse web freelance</p>

          <p className="footer__description">
            Je conçois des interfaces web claires, structurées et pensées pour
            donner à chaque projet une présence crédible, lisible et durable.
          </p>
        </section>

        <section
          className="footer__contact"
          aria-labelledby="footer-contact-title"
        >
          <Link
            to="/"
            className="footer__logo-link"
            aria-label="Retour à l’accueil"
          >
            <img
              src={logoSrc}
              alt="Logo Sandrine Pham"
              className="footer__logo"
            />
          </Link>

          <div className="footer__contact-block">
            <h3 id="footer-contact-title" className="footer__subtitle">
              Contact
            </h3>

            <ul className="footer__icons" aria-label="Réseaux sociaux">
              {SOCIAL_LINKS.map((item) => {
                const Icon = item.icon;

                return (
                  <li key={item.label}>
                    {item.type === "internal" ? (
                      <Link
                        to={item.to}
                        className="footer__contact-link"
                        aria-label={item.label}
                      >
                        <Icon aria-hidden="true" />
                      </Link>
                    ) : (
                      <a
                        href={item.href}
                        className="footer__contact-link"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={item.label}
                      >
                        <Icon aria-hidden="true" />
                      </a>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </section>

        <section className="footer__bottom" aria-label="Informations légales">
          <nav className="footer__links" aria-label="Liens légaux">
            {LEGAL_LINKS.map((link) => (
              <Link key={link.to} to={link.to}>
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="footer__copyright">
            <p className="footer__rights">© {currentYear} Sandrine Pham</p>
            <p className="footer__rights">Tous droits réservés</p>
          </div>
        </section>
      </div>
    </footer>
  );
};

export default Footer;
