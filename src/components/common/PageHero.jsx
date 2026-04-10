import React from "react";
import RevealOnScroll from "./RevealOnScroll.jsx";

const PageHeroContent = ({
  className = "",
  eyebrowClassName = "",
  titleClassName = "",
  subtitleClassName = "",
  descriptionClassName = "",
  hero,
}) => {
  if (!hero) return null;

  return (
    <header className={className}>
      {hero?.eyebrow && <p className={eyebrowClassName}>{hero.eyebrow}</p>}
      {hero?.title && <h1 className={titleClassName}>{hero.title}</h1>}
      {hero?.subtitle && <p className={subtitleClassName}>{hero.subtitle}</p>}
      {hero?.content && <p className={descriptionClassName}>{hero.content}</p>}
    </header>
  );
};

const PageHero = ({
  className = "",
  eyebrowClassName = "",
  titleClassName = "",
  subtitleClassName = "",
  descriptionClassName = "",
  hero,
  reveal = false,
  revealVariant = "hero",
  revealDelay = 0,
  revealThreshold = 0.12,
  revealRootMargin = "0px 0px -8% 0px",
}) => {
  if (!hero) return null;

  const content = (
    <PageHeroContent
      className={className}
      eyebrowClassName={eyebrowClassName}
      titleClassName={titleClassName}
      subtitleClassName={subtitleClassName}
      descriptionClassName={descriptionClassName}
      hero={hero}
    />
  );

  if (!reveal) {
    return content;
  }

  return (
    <RevealOnScroll
      variant={revealVariant}
      delay={revealDelay}
      threshold={revealThreshold}
      rootMargin={revealRootMargin}
    >
      {content}
    </RevealOnScroll>
  );
};

export default PageHero;
