import { useEffect, useRef, useState } from "react";
import "./intro.scss";
import { FaSearch } from "react-icons/fa";

import LogoEnergique from "/images/logo/SPEnergique.svg";
import LogoAccueillant from "/images/logo/SPAccueillant.svg";
import LogoMinimalism from "/images/logo/SPMinimalism.svg";

const RESULTS = [
  {
    theme: "accueillant",
    logo: LogoAccueillant,
    domain: "http://thecodeofsp.fr",
    title: "Version accueillante",
    meta: "Pour des projets humains, chaleureux et accessibles",
    description:
      "Une approche douce, rassurante et élégante, idéale pour des univers où la relation, la proximité et la clarté occupent une place essentielle.",
  },
  {
    theme: "energique",
    logo: LogoEnergique,
    domain: "http://thecodeofsp.fr",
    title: "Version énergique",
    meta: "Pour des projets audacieux, créatifs et dynamiques",
    description:
      "Une direction visuelle plus vive et plus affirmée, pensée pour des projets qui cherchent à marquer, innover et transmettre une forte personnalité.",
  },
  {
    theme: "minimalism",
    logo: LogoMinimalism,
    domain: "http://thecodeofsp.fr",
    title: "Version minimaliste",
    meta: "Pour des projets clairs, structurés et contemporains",
    description:
      "Une présentation plus épurée, idéale lorsque la lisibilité, la structure et la sobriété doivent renforcer la crédibilité du message.",
  },
];

const FULL_TEXT = "Sandrine, développeuse web freelance";

export default function Intro({ onSelectTheme }) {
  const [typingText, setTypingText] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [visibleCount, setVisibleCount] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isSkipped, setIsSkipped] = useState(false);

  const timersRef = useRef([]);

  const clearAllTimers = () => {
    timersRef.current.forEach((timer) => clearTimeout(timer));
    timersRef.current = [];
  };

  const revealResultsSequentially = () => {
    setShowResults(true);

    RESULTS.forEach((_, index) => {
      const timer = setTimeout(() => {
        setVisibleCount(index + 1);
      }, 180 * (index + 1));

      timersRef.current.push(timer);
    });
  };

  const skipAnimation = () => {
    clearAllTimers();
    setIsSkipped(true);
    setTypingText(FULL_TEXT);
    setShowResults(true);
    setVisibleCount(RESULTS.length);
  };

  useEffect(() => {
    let index = 0;

    const typeNext = () => {
      if (index < FULL_TEXT.length) {
        setTypingText(FULL_TEXT.slice(0, index + 1));
        index += 1;

        const timer = setTimeout(typeNext, 28);
        timersRef.current.push(timer);
        return;
      }

      const timer = setTimeout(() => {
        revealResultsSequentially();
      }, 450);

      timersRef.current.push(timer);
    };

    typeNext();

    return () => clearAllTimers();
  }, []);

  const applyTheme = (theme) => {
    setIsTransitioning(true);
    clearAllTimers();

    setTimeout(() => {
      sessionStorage.setItem("theme", theme);
      onSelectTheme(theme);
    }, 420);
  };

  const handleScreenSkip = (event) => {
    const target = event.target;

    const isInteractive =
      target.closest("button") ||
      target.closest("a") ||
      target.closest(".intro__result-button");

    if (isInteractive || isSkipped) return;

    skipAnimation();
  };

  return (
    <main
      className={`intro ${isTransitioning ? "intro--fade-out" : ""}`}
      onClick={handleScreenSkip}
    >
      <button
        type="button"
        className="intro__skip"
        onClick={skipAnimation}
        aria-label="Passer l’animation d’introduction"
      >
        Cliquer pour passer l&apos;animation
      </button>

      <div className="intro__container">
        <header className="intro__hero">
          <h1 className="intro__title">
            Chaque Ambition est unique. L’expérience devrait l’être aussi !
          </h1>
        </header>

        <section className="intro__search" aria-label="Recherche simulée">
          <div className="intro__searchbar">
            <FaSearch className="intro__search-icon" aria-hidden="true" />
            <span className="intro__typing-text">{typingText}</span>

            {!isSkipped && visibleCount === 0 && (
              <span className="intro__cursor" aria-hidden="true">
                |
              </span>
            )}
          </div>

          <p className="intro__eyebrow">Choisis l’univers qui te parle</p>
          <p className="intro__subtitle">
            Cette entrée met en scène une idée simple : un site web peut être
            perçu différemment selon l’univers, le ton et les attentes du
            projet.
          </p>
        </section>

        <section
          className={`intro__results ${showResults ? "visible" : ""}`}
          aria-label="Résultats de recherche simulés"
        >
          <ul className="intro__results-list">
            {RESULTS.map((result, index) => (
              <li
                key={result.theme}
                className={`intro__result-item ${
                  index < visibleCount ? "visible" : ""
                }`}
              >
                <article className="intro__result-card">
                  <button
                    type="button"
                    onClick={() => applyTheme(result.theme)}
                    className="intro__result-button"
                    aria-label={`Choisir ${result.title}`}
                  >
                    <header className="intro__result-header">
                      <img
                        src={result.logo}
                        alt=""
                        className="intro__result-logo"
                        aria-hidden="true"
                      />

                      <p className="intro__result-meta">
                        <span className="intro__result-domain">
                          {result.domain}
                        </span>
                        <span className="intro__result-theme">
                          {result.meta}
                        </span>
                      </p>
                    </header>

                    <h2 className="intro__result-title">{result.title}</h2>
                    <p className="intro__result-description">
                      {result.description}
                    </p>
                  </button>
                </article>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  );
}