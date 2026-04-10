import React from "react";
import SectionHeader from "../common/SectionHeader.jsx";
import RevealOnScroll from "../common/RevealOnScroll.jsx";

const WebsiteCreationComparisonSection = ({ section }) => {
  if (!section?.rows?.length) return null;

  return (
    <section className="websiteCreation__comparison">
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

      <RevealOnScroll
        variant="section"
        delay={120}
        threshold={0.12}
        rootMargin="0px 0px -6% 0px"
      >
        <div className="websiteCreation__comparison-table-wrapper">
          <table className="websiteCreation__comparison-table">
            <thead>
              <tr>
                <th>Critères</th>
                {section.columns?.map((column) => (
                  <th key={column}>{column}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {section.rows.map((row) => (
                <tr key={row.label}>
                  <th>{row.label}</th>
                  {row.values?.map((value) => (
                    <td key={`${row.label}-${value}`}>
                      {row.label === "Prix" ? (
                        <>
                          {value}
                          <span
                            className="websiteCreation__asterisk"
                            aria-hidden="true"
                          >
                            *
                          </span>
                        </>
                      ) : (
                        value
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </RevealOnScroll>

      {(section?.notes?.primary || section?.notes?.secondary) && (
        <RevealOnScroll
          variant="section"
          delay={180}
          threshold={0.12}
          rootMargin="0px 0px -8% 0px"
        >
          <div className="websiteCreation__price-notes">
            {section?.notes?.primary && (
              <p className="websiteCreation__price-note">
                {section.notes.primary}
              </p>
            )}
            {section?.notes?.secondary && (
              <p className="websiteCreation__price-note">
                {section.notes.secondary}
              </p>
            )}
          </div>
        </RevealOnScroll>
      )}
    </section>
  );
};

export default WebsiteCreationComparisonSection;