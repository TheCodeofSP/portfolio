import React from "react";
import SectionHeader from "../common/SectionHeader.jsx";
import RevealOnScroll from "../common/RevealOnScroll.jsx";

const WebsiteCreationCardsSection = ({ section }) => {
  if (!section?.items?.length) return null;

  return (
    <section className="websiteCreation__solution">
      {/* HEADER */}
      <RevealOnScroll
        variant="section"
        delay={0}
        threshold={0.12}
        rootMargin="0px 0px -8% 0px"
      >
        <SectionHeader
          className="websiteCreation__section-header"
          eyebrow={section.eyebrow}
          title={section.title}
          intro={section.intro}
        />
      </RevealOnScroll>

      {/* CARDS */}
      <div className="websiteCreation__solution-grid">
        {section.items.map((item, index) => (
          <RevealOnScroll
            key={`${item.title}-${index}`}
            variant="card"
            delay={120 + index * 90}
            threshold={0.12}
            rootMargin="0px 0px -6% 0px"
          >
            <article className="websiteCreation__solution-card">
              <span
                className="websiteCreation__window-label"
                aria-hidden="true"
              >
                {item.windowLabel}
              </span>

              <h3 className="websiteCreation__block-title">
                {item.title}
              </h3>

              <p>{item.description}</p>
            </article>
          </RevealOnScroll>
        ))}
      </div>
    </section>
  );
};

export default WebsiteCreationCardsSection;