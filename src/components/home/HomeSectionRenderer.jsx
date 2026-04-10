import React from "react";
import HomeCardsSection from "./HomeCardsSection.jsx";

const HomeSectionRenderer = ({ section }) => {
  if (!section?.type) return null;

  switch (section.type) {
    case "cards":
      return <HomeCardsSection section={section} />;

    default:
      return null;
  }
};

export default HomeSectionRenderer;