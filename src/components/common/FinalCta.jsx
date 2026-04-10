import React from "react";
import { Link } from "react-router-dom";
import RevealOnScroll from "./RevealOnScroll.jsx";

const FinalCtaContent = ({
  sectionClassName = "",
  contentClassName = "",
  titleClassName = "",
  actionsClassName = "",
  buttonClassName = "",
  cta,
}) => {
  if (!cta) return null;

  return (
    <section className={sectionClassName}>
      <div className={contentClassName}>
        {cta?.title && <h2 className={titleClassName}>{cta.title}</h2>}

        <div className={actionsClassName}>
          {cta?.primary && (
            <Link
              to={cta.primary.href}
              className={`${buttonClassName} ${buttonClassName}--primary`}
            >
              {cta.primary.label}
            </Link>
          )}

          {cta?.secondary && (
            <Link
              to={cta.secondary.href}
              className={`${buttonClassName} ${buttonClassName}--secondary`}
            >
              {cta.secondary.label}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
};

const FinalCta = ({
  sectionClassName = "",
  contentClassName = "",
  titleClassName = "",
  actionsClassName = "",
  buttonClassName = "",
  cta,
  reveal = false,
  revealVariant = "section",
  revealDelay = 0,
  revealThreshold = 0.12,
  revealRootMargin = "0px 0px -8% 0px",
}) => {
  if (!cta) return null;

  const content = (
    <FinalCtaContent
      sectionClassName={sectionClassName}
      contentClassName={contentClassName}
      titleClassName={titleClassName}
      actionsClassName={actionsClassName}
      buttonClassName={buttonClassName}
      cta={cta}
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

export default FinalCta;