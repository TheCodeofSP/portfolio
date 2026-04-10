import React from "react";
import SectionHeader from "../common/SectionHeader.jsx";
import RevealOnScroll from "../common/RevealOnScroll.jsx";

const FreelanceDevelopmentRichTextSection = ({ section }) => {
  if (!section) return null;

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
        />
      </RevealOnScroll>

      <RevealOnScroll
        variant="section"
        delay={120}
        threshold={0.12}
        rootMargin="0px 0px -6% 0px"
      >
        <article className="freelance-development__profile">
          <span
            className="freelance-development__window-label"
            aria-hidden="true"
          >
            {section.windowLabel}
          </span>

          {section?.intro && (
            <p className="freelance-development__profile-intro">
              {section.intro}
            </p>
          )}

          <div className="freelance-development__profile-content">
            {section?.content?.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </article>
      </RevealOnScroll>
    </section>
  );
};

export default FreelanceDevelopmentRichTextSection;