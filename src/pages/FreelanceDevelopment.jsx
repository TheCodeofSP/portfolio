import React, { useEffect } from "react";
import content from "../data/content.json";
import AvailabilityCard from "../components/common/AvailabilityCard.jsx";
import FreelanceDevelopmentSectionRenderer from "../components/freelanceDevelopment/FreelanceDevelopmentSectionRenderer.jsx";
import FinalCta from "../components/common/FinalCta.jsx";
import PageHero from "../components/common/PageHero.jsx";
import RevealOnScroll from "../components/common/RevealOnScroll.jsx";
import "./freelanceDevelopment.scss";

const FreelanceDevelopment = () => {
  const pageData = content?.pages?.freelanceDevelopment;
  const seo = pageData?.seo;
  const hero = pageData?.hero;
  const sections = pageData?.sections || [];
  const availability = pageData?.availability;
  const cta = pageData?.cta;

  useEffect(() => {
    if (!seo) return;

    document.title = seo.title;

    const desc = document.querySelector("meta[name='description']");
    if (desc) {
      desc.setAttribute("content", seo.description);
    }
  }, [seo]);

  if (!pageData) {
    return (
      <main className="freelance-development">
        <p>
          La clé pages.freelanceDevelopment est introuvable dans le contenu.
        </p>
      </main>
    );
  }

  return (
    <main className="freelance-development">
      <div className="freelance-development__container">
        <div className="freelance-development__hero">
          <PageHero
            hero={hero}
            className="freelance-development__hero-content"
            eyebrowClassName="freelance-development__eyebrow"
            titleClassName="freelance-development__title"
            subtitleClassName="freelance-development__subtitle"
            descriptionClassName="freelance-development__description"
            reveal
            revealVariant="hero"
            revealDelay={0}
          />

          {hero?.cta?.note && (
            <RevealOnScroll
              variant="section"
              delay={80}
              threshold={0.12}
              rootMargin="0px 0px -8% 0px"
            >
              <p className="freelance-development__note">{hero.cta.note}</p>
            </RevealOnScroll>
          )}
        </div>

        {sections.map((section, index) => (
          <FreelanceDevelopmentSectionRenderer
            key={`${section.type}-${section.variant || index}`}
            section={section}
            index={index}
          />
        ))}

        <section className="freelance-development__availability">
          <AvailabilityCard
            availability={availability}
            showContent={true}
            variant="freelance"
            reveal
            revealVariant="section"
            revealDelay={80}
          />
        </section>

        {cta && (
          <FinalCta
            cta={cta}
            sectionClassName="freelance-development__final-cta"
            contentClassName="freelance-development__final-cta-content"
            titleClassName="freelance-development__final-cta-title"
            actionsClassName="freelance-development__hero-actions"
            buttonClassName="freelance-development__cta"
            reveal
            revealVariant="section"
            revealDelay={120}
          />
        )}
      </div>
    </main>
  );
};

export default FreelanceDevelopment;
