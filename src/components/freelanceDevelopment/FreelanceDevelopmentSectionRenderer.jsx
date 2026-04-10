import React from "react";
import FreelanceDevelopmentCardsSection from "./FreelanceDevelopmentCardsSection.jsx";
import FreelanceDevelopmentRichTextSection from "./FreelanceDevelopmentRichTextSection.jsx";
import FreelanceDevelopmentStackGroupsSection from "./FreelanceDevelopmentStackGroupsSection.jsx";

const FreelanceDevelopmentSectionRenderer = ({ section }) => {
  if (!section?.type) return null;

  switch (section.type) {
    case "cards":
      return <FreelanceDevelopmentCardsSection section={section} />;

    case "richText":
      return <FreelanceDevelopmentRichTextSection section={section} />;

    case "stackGroups":
      return <FreelanceDevelopmentStackGroupsSection section={section} />;

    default:
      return null;
  }
};

export default FreelanceDevelopmentSectionRenderer;