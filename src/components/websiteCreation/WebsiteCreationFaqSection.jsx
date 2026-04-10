import React from "react";
import SectionHeader from "../common/SectionHeader.jsx";
import RevealOnScroll from "../common/RevealOnScroll.jsx";

const WebsiteCreationFaqSection = ({ section }) => {
  if (!section?.items?.length) return null;

  return (
    <section className="websiteCreation__faq">
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

      {/* FAQ ITEMS */}
      <div className="websiteCreation__faq-list">
        {section.items.map((item, index) => (
          <RevealOnScroll
            key={`${item.question}-${index}`}
            variant="card"
            delay={120 + index * 90}
            threshold={0.12}
            rootMargin="0px 0px -6% 0px"
          >
            <article className="websiteCreation__faq-item">
              <span
                className="websiteCreation__window-label"
                aria-hidden="true"
              >
                {item.windowLabel}
              </span>

              <h3 className="websiteCreation__faq-question">
                {item.question}
              </h3>

              <p className="websiteCreation__faq-answer">
                {item.answer}
              </p>
            </article>
          </RevealOnScroll>
        ))}
      </div>
    </section>
  );
};

export default WebsiteCreationFaqSection;