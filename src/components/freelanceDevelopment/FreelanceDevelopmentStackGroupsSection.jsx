import React from "react";
import SectionHeader from "../common/SectionHeader.jsx";
import RevealOnScroll from "../common/RevealOnScroll.jsx";

const FreelanceDevelopmentStackGroupsSection = ({ section }) => {
  if (!section?.groups?.length) return null;

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

      <div className="freelance-development__stack-groups">
        {section.groups.map((group, index) => (
          <RevealOnScroll
            key={`${group.name}-${index}`}
            variant="card"
            delay={120 + index * 90}
            threshold={0.12}
            rootMargin="0px 0px -6% 0px"
          >
            <article className="freelance-development__stack-group">
              <span
                className="freelance-development__window-label"
                aria-hidden="true"
              >
                {group.windowLabel}
              </span>

              <h3 className="freelance-development__stack-title">
                {group.name}
              </h3>

              <ul className="freelance-development__tags">
                {group.items.map((item, i) => (
                  <li
                    key={`${item.name}-${i}`}
                    className="freelance-development__tag"
                  >
                    {item.logo && (
                      <img
                        src={item.logo}
                        alt={item.name}
                        className="freelance-development__tag-logo"
                      />
                    )}
                    <span>{item.name}</span>
                  </li>
                ))}
              </ul>
            </article>
          </RevealOnScroll>
        ))}
      </div>
    </section>
  );
};

export default FreelanceDevelopmentStackGroupsSection;