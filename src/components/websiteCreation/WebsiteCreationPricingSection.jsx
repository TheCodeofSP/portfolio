import React from "react";
import { Link } from "react-router-dom";
import SectionHeader from "../common/SectionHeader.jsx";
import RevealOnScroll from "../common/RevealOnScroll.jsx";

const WebsiteCreationPricingSection = ({ section }) => {
  if (!section?.plans?.length) return null;

  return (
    <section className="websiteCreation__pricing">
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

      <div
        className="websiteCreation__list"
        aria-label="Liste des offres de création de site"
      >
        {section.plans.map((offer, index) => (
          <RevealOnScroll
            key={offer.name}
            variant="card"
            delay={120 + index * 90}
            threshold={0.12}
            rootMargin="0px 0px -6% 0px"
          >
            <article
              className={`websiteCreation__card ${
                offer.highlight ? "websiteCreation__card--highlighted" : ""
              }`}
            >
              <div className="websiteCreation__card-head">
                <div>
                  <h3 className="websiteCreation__card-title">{offer.name}</h3>

                  {offer.highlight && (
                    <p className="websiteCreation__badge">{offer.highlight}</p>
                  )}

                  <p className="websiteCreation__card-tagline">
                    {offer.tagline}
                  </p>
                </div>

                <p className="websiteCreation__price">
                  {offer.price}
                  <span className="websiteCreation__asterisk" aria-hidden="true">
                    *
                  </span>
                </p>
              </div>

              {offer?.idealFor?.length > 0 && (
                <div className="websiteCreation__block">
                  <h4 className="websiteCreation__block-title">Idéal si :</h4>
                  <ul className="websiteCreation__list-items">
                    {offer.idealFor.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}

              {offer?.features?.length > 0 && (
                <div className="websiteCreation__block">
                  <h4 className="websiteCreation__block-title">
                    Ce que tu obtiens :
                  </h4>
                  <ul className="websiteCreation__list-items">
                    {offer.features.map((feature) => (
                      <li key={feature}>{feature}</li>
                    ))}
                  </ul>
                </div>
              )}

              {offer?.result && (
                <div className="websiteCreation__result">
                  <h4 className="websiteCreation__block-title">Résultat :</h4>
                  <p>{offer.result}</p>
                </div>
              )}

              {offer?.cta && (
                <Link
                  to={offer.cta.href}
                  className="websiteCreation__cta-button websiteCreation__cta-button--primary"
                >
                  {offer.cta.label}
                </Link>
              )}
            </article>
          </RevealOnScroll>
        ))}
      </div>

      {(section?.notes?.primary || section?.notes?.secondary) && (
        <RevealOnScroll
          variant="section"
          delay={80}
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

export default WebsiteCreationPricingSection;