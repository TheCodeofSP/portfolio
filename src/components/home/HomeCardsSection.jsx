import React from "react";
import { Link } from "react-router-dom";
import SectionHeader from "../common/SectionHeader.jsx";
import RevealOnScroll from "../common/RevealOnScroll.jsx";

const getVariantClasses = (variant = "") => {
  switch (variant) {
    case "audience":
      return {
        section: "home__audience",
        list: "home__audience-list",
        card: "home__audience-card",
        title: "home__audience-title",
        description: "home__audience-description",
      };

    case "benefits":
      return {
        section: "home__benefits",
        list: "home__benefits-list",
        card: "home__benefit-card",
        title: "home__benefit-title",
        description: "home__benefit-description",
      };

    case "collaborationPaths":
      return {
        section: "home__paths",
        list: "home__paths-list",
        card: "home__path-card",
        title: "home__path-title",
        description: "home__path-description",
      };

    default:
      return {
        section: "home__section",
        list: "home__cards-list",
        card: "home__card",
        title: "home__card-title",
        description: "home__card-description",
      };
  }
};

const HomeCardsSection = ({ section }) => {
  if (!section?.items?.length) return null;

  const classes = getVariantClasses(section.variant);

  return (
    <section className={classes.section}>
      <RevealOnScroll
        variant="section"
        delay={0}
        threshold={0.12}
        rootMargin="0px 0px -8% 0px"
      >
        <SectionHeader
          className="home__section-head"
          eyebrow={section.eyebrow}
          title={section.title}
          intro={section.intro}
          description={section.description}
        />
      </RevealOnScroll>

      <div className={classes.list}>
        {section.items.map((item, index) => (
          <RevealOnScroll
            key={`${item.title}-${index}`}
            variant="card"
            delay={120 + index * 90}
            threshold={0.12}
            rootMargin="0px 0px -6% 0px"
          >
            <article className={classes.card}>
              <span className="home__window-label" aria-hidden="true">
                {item.windowLabel}
              </span>

              <h3 className={classes.title}>{item.title}</h3>

              {item.description && (
                <p className={classes.description}>{item.description}</p>
              )}

              {item?.cta && (
                <Link to={item.cta.href} className="home__path-link">
                  {item.cta.label}
                </Link>
              )}
            </article>
          </RevealOnScroll>
        ))}
      </div>
    </section>
  );
};

export default HomeCardsSection;