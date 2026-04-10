import React from "react";
import { Link } from "react-router-dom";

const getSectionClassName = (variant = "") => {
  switch (variant) {
    case "audience":
      return "home__audience";
    case "benefits":
      return "home__benefits";
    case "collaborationPaths":
      return "home__paths";
    default:
      return "home__section";
  }
};

const getListClassName = (variant = "") => {
  switch (variant) {
    case "audience":
      return "home__audience-list";
    case "benefits":
      return "home__benefits-list";
    case "collaborationPaths":
      return "home__paths-list";
    default:
      return "home__cards-list";
  }
};

const getCardClassName = (variant = "") => {
  switch (variant) {
    case "audience":
      return "home__audience-card";
    case "benefits":
      return "home__benefit-card";
    case "collaborationPaths":
      return "home__path-card";
    default:
      return "home__card";
  }
};

const getTitleClassName = (variant = "") => {
  switch (variant) {
    case "audience":
      return "home__audience-title";
    case "benefits":
      return "home__benefit-title";
    case "collaborationPaths":
      return "home__path-title";
    default:
      return "home__card-title";
  }
};

const getDescriptionClassName = (variant = "") => {
  switch (variant) {
    case "audience":
      return "home__audience-description";
    case "benefits":
      return "home__benefit-description";
    case "collaborationPaths":
      return "home__path-description";
    default:
      return "home__card-description";
  }
};

const CardsSection = ({ section }) => {
  if (!section?.items?.length) return null;

  const sectionClassName = getSectionClassName(section.variant);
  const listClassName = getListClassName(section.variant);
  const cardClassName = getCardClassName(section.variant);
  const titleClassName = getTitleClassName(section.variant);
  const descriptionClassName = getDescriptionClassName(section.variant);

  return (
    <section className={sectionClassName} data-show="true">
      <div className="home__section-head">
        {section?.eyebrow && (
          <p className="home__section-eyebrow">{section.eyebrow}</p>
        )}
        <h2 className="home__section-title">{section?.title}</h2>
      </div>

      <div className={listClassName}>
        {section.items.map((item, index) => (
          <article
            className={cardClassName}
            key={`${item.title}-${index}`}
          >
            <span className="home__window-label" aria-hidden="true">
              {item.windowLabel}
            </span>

            <h3 className={titleClassName}>{item.title}</h3>
            <p className={descriptionClassName}>{item.description}</p>

            {item?.cta && (
              <Link to={item.cta.href} className="home__path-link">
                {item.cta.label}
              </Link>
            )}
          </article>
        ))}
      </div>
    </section>
  );
};

export default CardsSection;