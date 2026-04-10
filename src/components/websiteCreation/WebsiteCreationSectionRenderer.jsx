import React from "react";
import WebsiteCreationProcess from "./WebsiteCreationProcess.jsx";
import WebsiteCreationListSection from "./WebsiteCreationListSection.jsx";
import WebsiteCreationCardsSection from "./WebsiteCreationCardsSection.jsx";
import WebsiteCreationPricingSection from "./WebsiteCreationPricingSection.jsx";
import WebsiteCreationComparisonSection from "./WebsiteCreationComparisonSection.jsx";
import WebsiteCreationFaqSection from "./WebsiteCreationFaqSection.jsx";

const WebsiteCreationSectionRenderer = ({ section, theme }) => {
  if (!section?.type) return null;

  switch (section.type) {
    case "list":
      return <WebsiteCreationListSection section={section} />;

    case "cards":
      return <WebsiteCreationCardsSection section={section} />;

    case "pricing":
      return <WebsiteCreationPricingSection section={section} />;

    case "comparisonTable":
      return <WebsiteCreationComparisonSection section={section} />;

    case "process":
      return (
        <section className="websiteCreation__process">
          <WebsiteCreationProcess
            process={section}
            theme={theme}
            showContent={true}
          />
        </section>
      );

    case "faq":
      return <WebsiteCreationFaqSection section={section} />;

    default:
      return null;
  }
};

export default WebsiteCreationSectionRenderer;