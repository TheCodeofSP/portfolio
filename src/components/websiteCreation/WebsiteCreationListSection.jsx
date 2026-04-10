import React from "react";
import SectionHeader from "../common/SectionHeader.jsx";
import RevealOnScroll from "../common/RevealOnScroll.jsx";

const WebsiteCreationListSection = ({ section }) => {
  if (!section?.items?.length) return null;

  return (
    <section className="websiteCreation__problem">
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

      <ul className="websiteCreation__problem-list">
        {section.items.map((item, index) => (
          <RevealOnScroll
            key={`${item.description}-${index}`}
            as="li"
            className="websiteCreation__problem-item"
            variant="card"
            delay={120 + index * 90}
            threshold={0.12}
            rootMargin="0px 0px -6% 0px"
          >
            <span
              className="websiteCreation__window-label"
              aria-hidden="true"
            >
              {item.windowLabel}
            </span>

            {item.description}
          </RevealOnScroll>
        ))}
      </ul>
    </section>
  );
};

export default WebsiteCreationListSection;