import React, { useEffect, useRef, useState } from "react";
import FloatingSwitcherAccueillant from "../assets/images/images/FloatingSwitcherAcceuillant.webp";
import FloatingSwitcherEnergique from "../assets/images/images/FloatingSwitcherEnergique.webp";
import FloatingSwitcherMinimalism from "../assets/images/images/FloatingSwitcherMinimalism.webp";
import "./floatingThemeSwitcher.scss";

const THEME_DATA = {
  accueillant: {
    label: "Accueillant",
    shortDescription: "Chaleureux et humain",
    image: FloatingSwitcherAccueillant,
  },
  energique: {
    label: "Énergique",
    shortDescription: "Audacieux et affirmé",
    image: FloatingSwitcherEnergique,
  },
  minimalism: {
    label: "Minimaliste",
    shortDescription: "Clair et structuré",
    image: FloatingSwitcherMinimalism,
  },
};

export default function FloatingThemeSwitcher({ theme, setTheme }) {
  const [open, setOpen] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const wrapperRef = useRef(null);
  const rafRef = useRef(null);

  const currentTheme = THEME_DATA[theme] || THEME_DATA.accueillant;
  const themes = Object.entries(THEME_DATA);

  useEffect(() => {
    const handleMouseMove = (event) => {
      if (window.innerWidth <= 768 || rafRef.current) return;

      rafRef.current = requestAnimationFrame(() => {
        const x = (event.clientX / window.innerWidth - 0.5) * 10;
        const y = (event.clientY / window.innerHeight - 0.5) * 10;
        setOffset({ x, y });
        rafRef.current = null;
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);

      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!wrapperRef.current?.contains(event.target)) {
        setOpen(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const handleThemeChange = (nextTheme) => {
    setTheme(nextTheme);
    setOpen(false);
  };

  return (
    <aside
      ref={wrapperRef}
      className={`floating-switcher ${open ? "open" : ""}`}
      style={{ transform: `translate(${offset.x}px, ${offset.y}px)` }}
      aria-label="Sélecteur d’univers visuel"
    >
      <button
        type="button"
        className="floating-switcher__toggle"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        aria-controls="floating-theme-panel"
        aria-label={`Changer d’univers visuel. Thème actuel : ${currentTheme.label}`}
      >
        <img
          src={currentTheme.image}
          alt=""
          aria-hidden="true"
          className="floating-switcher__image"
        />
      </button>

      <section
        id="floating-theme-panel"
        className="floating-switcher__panel"
        aria-label="Choisir un autre univers visuel"
      >
        <p className="floating-switcher__panel-title">
          Choisir un autre univers
        </p>

        <div
          className="floating-switcher__options"
          role="radiogroup"
          aria-label="Liste des univers visuels"
        >
          {themes.map(([themeKey, item]) => {
            const isActive = theme === themeKey;

            return (
              <button
                key={themeKey}
                type="button"
                className={`floating-switcher__option ${isActive ? "active" : ""}`}
                onClick={() => handleThemeChange(themeKey)}
                role="radio"
                aria-checked={isActive}
                aria-label={`${item.label} — ${item.shortDescription}`}
              >
                <span className="floating-switcher__option-title">
                  {item.label}
                </span>
                <span className="floating-switcher__option-description">
                  {item.shortDescription}
                </span>
              </button>
            );
          })}
        </div>
      </section>
    </aside>
  );
}