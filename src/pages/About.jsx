import { useEffect, useRef, useState } from "react";
import { FaInstagram, FaLinkedin } from "react-icons/fa";
import { HiOutlinePuzzlePiece } from "react-icons/hi2";
import useContent from "../hooks/useContent.js";
import "./about.scss";

const linkIcons = {
  instagram: FaInstagram,
  linkedin: FaLinkedin,
  quiz: HiOutlinePuzzlePiece,
};

const AboutSection = ({ section, index, isVisible, setRef }) => {
  return (
    <article
      className={`about__article ${isVisible ? "visible" : ""}`}
      ref={setRef}
      data-index={index}
    >
      <header className="about__section-header">
        <h2 className="section-title">{section.subtitle}</h2>
        {section.intro && <p className="about__intro">{section.intro}</p>}
      </header>

      {section.highlight && (
        <aside className="about__highlight" aria-label="Mise en avant">
          <p>{section.highlight}</p>
        </aside>
      )}

      {section.content?.length > 0 && (
        <section
          className="about__content"
          aria-label={`Contenu ${section.subtitle}`}
        >
          {section.content.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </section>
      )}

      {section.commandments?.length > 0 && (
        <section
          className="about__commandments"
          aria-label={`Points clés ${section.subtitle}`}
        >
          <ul className="about__points about__points--commandments">
            {section.commandments.map((item, j) => (
              <li key={j} className="about__point">
                <strong>{item.title}</strong>
                <span>{item.description}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {section.links?.length > 0 && (
        <nav className="about__links" aria-label={`Liens ${section.subtitle}`}>
          {section.links.map((link, j) => {
            const isExternal = link.url.startsWith("http");

            const linkIcons = {
              instagram: FaInstagram,
              linkedin: FaLinkedin,
              quiz: HiOutlinePuzzlePiece,
            };

            const Icon = linkIcons[link.type];

            return (
              <a
                key={j}
                href={link.url}
                className={`about__link-card about__link-card--${link.type}`}
                target={isExternal ? "_blank" : undefined}
                rel={isExternal ? "noopener noreferrer" : undefined}
                aria-label={link.label}
              >
                <div className="about__link-head">
                  <h3>{link.title}</h3>

                  {link.subtitle && (
                    <p className="about__link-meta">
                      {Icon && (
                        <Icon className="about__link-icon" aria-hidden="true" />
                      )}
                      <span>{link.subtitle}</span>
                    </p>
                  )}
                </div>

                <p className="about__link-description">{link.description}</p>

                <span className="about__link-cta">{link.label}</span>
              </a>
            );
          })}
        </nav>
      )}
    </article>
  );
};

const About = () => {
  const { content, loading, error } = useContent();
  const sectionsRef = useRef([]);
  const [visibleSections, setVisibleSections] = useState([]);

  const ui = content?.ui;
  const aboutData = content?.about;
  const seo = aboutData?.seo;

  useEffect(() => {
    if (!seo) return;

    document.title = seo.title;

    const desc = document.querySelector("meta[name='description']");
    if (desc) {
      desc.setAttribute("content", seo.description);
    }
  }, [seo]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = entry.target.dataset.index;
          if (entry.isIntersecting) {
            setVisibleSections((prev) => [...new Set([...prev, index])]);
          }
        });
      },
      { threshold: 0.2 },
    );

    sectionsRef.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      sectionsRef.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  if (loading) {
    return (
      <main className="about">
        <p>{ui?.loading || "Chargement du contenu..."}</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="about">
        <p>
          {ui?.errorPrefix || "Erreur :"} {error.message}
        </p>
      </main>
    );
  }

  if (!aboutData) return null;

  return (
    <main className="about">
      <div className="about__container">
        <header className="about__header header-page">
          <h1 className="page-title">{aboutData.title}</h1>
          <p className="page-subtitle">{aboutData.subtitle}</p>
        </header>

        <section className="about__sections" aria-label="Sections à propos">
          {aboutData.sections.map((section, idx) => (
            <AboutSection
              key={idx}
              section={section}
              index={idx}
              isVisible={visibleSections.includes(String(idx))}
              setRef={(el) => (sectionsRef.current[idx] = el)}
            />
          ))}
        </section>
      </div>
    </main>
  );
};

export default About;
