import React from "react";
import SectionHeader from "../common/SectionHeader.jsx";
import RevealOnScroll from "../common/RevealOnScroll.jsx";

const FreelanceDevelopmentCardsSection = ({ section }) => {
  if (!section?.items?.length) return null;

  return (
    <section className="freelance-development__section">
      <RevealOnScroll
        variant="section"
        delay={0}
        threshold={0.12}
        rootMargin="0px 0px -8% 0px"
      >
        <SectionHeader
          className="freelance-development__section-header"
          eyebrow={section.eyebrow}
          title={section.title}
          intro={section.intro}
        />
      </RevealOnScroll>

      <div className="freelance-development__grid">
        {section.items.map((item, index) => (
          <RevealOnScroll
            key={`${item.title}-${index}`}
            variant="card"
            delay={120 + index * 90}
            threshold={0.12}
            rootMargin="0px 0px -6% 0px"
          >
            <article className="freelance-development__card">
              <span
                className="freelance-development__window-label"
                aria-hidden="true"
              >
                {item.windowLabel}
              </span>

              <h3 className="freelance-development__card-title">{item.title}</h3>
              <p>{item.description}</p>
            </article>
          </RevealOnScroll>
        ))}
      </div>
    </section>
  );
};

export default FreelanceDevelopmentCardsSection;