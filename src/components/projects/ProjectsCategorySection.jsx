import React from "react";
import RevealOnScroll from "../common/RevealOnScroll.jsx";

const ProjectsCategorySection = ({ category, items = [], id, children }) => {
  if (!items.length) return null;

  return (
    <section id={id} className="projects__category">
      <RevealOnScroll
        as="header"
        className="projects__category-head"
        variant="section"
        delay={0}
        threshold={0.12}
        rootMargin="0px 0px -8% 0px"
      >
        {category?.title && (
          <h2 className="projects__category-title">{category.title}</h2>
        )}
        {category?.description && (
          <p className="projects__category-description">
            {category.description}
          </p>
        )}
      </RevealOnScroll>

      <div className="projects__row">{children}</div>
    </section>
  );
};

export default ProjectsCategorySection;