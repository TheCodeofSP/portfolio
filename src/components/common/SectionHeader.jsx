import React from "react";
import "./sectionHeader.scss";

const SectionHeader = ({
  className = "",
  eyebrow,
  title,
  intro,
  description,
  titleTag: TitleTag = "h2",
}) => {
  if (!eyebrow && !title && !intro && !description) return null;

  const text = intro || description;

  return (
    <div className={`section-header ${className}`.trim()}>
      {eyebrow && <p className="section-header__eyebrow">{eyebrow}</p>}
      {title && <TitleTag className="section-header__title">{title}</TitleTag>}
      {text && <p className="section-header__description">{text}</p>}
    </div>
  );
};

export default SectionHeader;