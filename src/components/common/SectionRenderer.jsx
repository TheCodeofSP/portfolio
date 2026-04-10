import React from "react";
import CardsSection from "./CardsSection.jsx";

const SectionRenderer = ({ section }) => {
  if (!section?.type) return null;

  switch (section.type) {
    case "cards":
      return <CardsSection section={section} />;

    default:
      return null;
  }
};

export default SectionRenderer;