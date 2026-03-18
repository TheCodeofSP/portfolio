import { useEffect, useRef, useState } from "react";
import { FaCode, FaWarehouse } from "react-icons/fa";
import useContent from "../hooks/useContent.js";
import "./skills.scss";

const Skills = () => {
  const { content, loading, error } = useContent();
  const refs = useRef([]);
  const [visible, setVisible] = useState([]);

  const ui = content?.ui;
  const skillsData = content?.skills;
  const seo = skillsData?.seo;
  const sections = skillsData?.sections || [];

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
            setVisible((prev) => [...new Set([...prev, index])]);
          }
        });
      },
      { threshold: 0.15 },
    );

    refs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => {
      refs.current.forEach((el) => {
        if (el) observer.unobserve(el);
      });
    };
  }, []);

  if (loading) {
    return (
      <main className="skills">
        <p>{ui?.loading || "Chargement du contenu..."}</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="skills">
        <p>
          {ui?.errorPrefix || "Erreur :"} {error.message}
        </p>
      </main>
    );
  }

  if (!skillsData) return null;

  const getIcon = (iconName) => {
    switch (iconName) {
      case "FaWarehouse":
        return FaWarehouse;
      case "FaCode":
      default:
        return FaCode;
    }
  };

  let globalIndex = 0;

  const renderAnimatedClass = (prefix, index) =>
    visible.includes(`${prefix}-${index}`) ? "visible" : "";

  const renderSectionItem = (sectionType, item, index) => {
    if (sectionType === "tools") {
      return (
        <li
          key={index}
          ref={(el) => (refs.current[index] = el)}
          data-index={`tool-${index}`}
          className={`skills__tool ${renderAnimatedClass("tool", index)}`}
        >
          <img src={item.logo} alt={item.name} className="skills__logo" />
          <span>{item.name}</span>
        </li>
      );
    }

    if (sectionType === "stack") {
      return (
        <article
          key={index}
          ref={(el) => (refs.current[index] = el)}
          data-index={`stack-${index}`}
          className={`skills__card skills__card--stack ${renderAnimatedClass("stack", index)}`}
        >
          <header className="skills__stack-header">
            <img src={item.logo} alt={item.name} className="skills__logo" />
            <div>
              <h3>{item.name}</h3>
              <p className="skills__tag">{item.category}</p>
            </div>
          </header>
          <p>{item.description}</p>
        </article>
      );
    }

    if (sectionType === "diplomas") {
      const Icon = getIcon(item.icon);

      return (
        <article
          key={index}
          ref={(el) => (refs.current[index] = el)}
          data-index={`diploma-${index}`}
          className={`skills__card skills__card--diploma ${renderAnimatedClass("diploma", index)}`}
        >
          <header className="skills__diploma-header">
            <Icon className="skills__diploma-icon" />
            <div>
              <h3>{item.title}</h3>
              <p className="skills__diploma-meta">
                {item.year} · {item.niveau}
              </p>
            </div>
          </header>

          {item.institutionUrl ? (
            <a
              href={item.institutionUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="skills__diploma-link"
            >
              <img
                src={item.logo}
                alt={`${item.institution} logo`}
                className="skills__diploma-logo"
              />
            </a>
          ) : (
            <img
              src={item.logo}
              alt={`${item.institution} logo`}
              className="skills__diploma-logo"
            />
          )}

          <p className="skills__diploma-institution">{item.institution}</p>
          <p className="skills__diploma-location">{item.lieux}</p>
          <p className="skills__diploma-qualification">{item.qualification}</p>
        </article>
      );
    }

    return (
      <article
        key={index}
        ref={(el) => (refs.current[index] = el)}
        data-index={`${sectionType}-${index}`}
        className={`skills__card ${renderAnimatedClass(sectionType, index)}`}
      >
        <h3>{item.title}</h3>
        <p>{item.description}</p>
      </article>
    );
  };

  return (
    <main className="skills">
      <div className="skills__container">
        <header className="skills__header header-page">
          <h1 className="page-title">{skillsData.title}</h1>
          <p className="page-subtitle">{skillsData.subtitle}</p>
        </header>

        <div className="skills__content">
          {sections.map((section, sectionIndex) => {
            const isTools = section.type === "tools";

            return (
              <section key={sectionIndex} className="skills__section">
                <h2 className="section-title">{section.title}</h2>

                {isTools ? (
                  <ul className="skills__tools">
                    {section.items.map((item) => {
                      const index = globalIndex++;
                      return renderSectionItem(section.type, item, index);
                    })}
                  </ul>
                ) : (
                  <div className="skills__grid">
                    {section.items.map((item) => {
                      const index = globalIndex++;
                      return renderSectionItem(section.type, item, index);
                    })}
                  </div>
                )}
              </section>
            );
          })}
        </div>
      </div>
    </main>
  );
};

export default Skills;
