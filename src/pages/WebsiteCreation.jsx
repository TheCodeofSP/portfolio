import React, { useEffect } from "react";
import content from "../data/content.json";
import AvailabilityCard from "../components/common/AvailabilityCard.jsx";
import WebsiteCreationSectionRenderer from "../components/websiteCreation/WebsiteCreationSectionRenderer.jsx";
import FinalCta from "../components/common/FinalCta.jsx";
import PageHero from "../components/common/PageHero.jsx";
import RevealOnScroll from "../components/common/RevealOnScroll.jsx";
import "./websiteCreation.scss";

const WebsiteCreation = ({ theme }) => {
  const websiteCreationContent = content?.pages?.websiteCreation;
  const seo = websiteCreationContent?.seo;
  const hero = websiteCreationContent?.hero;
  const sections = websiteCreationContent?.sections || [];
  const availability = websiteCreationContent?.availability;
  const cta = websiteCreationContent?.cta;

  useEffect(() => {
    if (!seo) return;

    document.title = seo.title;

    const desc = document.querySelector("meta[name='description']");
    if (desc) {
      desc.setAttribute("content", seo.description);
    }
  }, [seo]);

  return (
    <main className="websiteCreation">
      <section className="websiteCreation__hero">
        <div className="websiteCreation__container">
          <PageHero
            hero={hero}
            className="websiteCreation__intro"
            eyebrowClassName="websiteCreation__eyebrow"
            titleClassName="websiteCreation__title"
            subtitleClassName="websiteCreation__subtitle"
            descriptionClassName="websiteCreation__description"
            reveal
            revealVariant="hero"
            revealDelay={0}
          />

          {sections.map((section, index) => (
            <WebsiteCreationSectionRenderer
              key={`${section.type}-${section.variant || index}`}
              section={section}
              theme={theme}
            />
          ))}

          <section className="websiteCreation__availability">
            <AvailabilityCard
              availability={availability}
              showContent={true}
              variant="website-creation"
              reveal
              revealVariant="section"
              revealDelay={80}
            />
          </section>

          {cta && (
            <FinalCta
              cta={cta}
              sectionClassName="websiteCreation__final-cta"
              contentClassName="websiteCreation__final-cta-content"
              titleClassName="websiteCreation__final-cta-title"
              actionsClassName="websiteCreation__final-cta-actions"
              buttonClassName="websiteCreation__cta-button"
              reveal
              revealVariant="section"
              revealDelay={120}
            />
          )}
        </div>
      </section>
    </main>
  );
};

export default WebsiteCreation;
