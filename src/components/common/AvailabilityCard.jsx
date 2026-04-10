import React from "react";
import { FiCheckCircle, FiCalendar, FiMessageSquare } from "react-icons/fi";
import RevealOnScroll from "./RevealOnScroll.jsx";
import "./availabilityCard.scss";

const defaultMetaIcons = [FiMessageSquare, FiCalendar, FiCheckCircle];

const AvailabilityCardContent = ({
  availability,
  showContent = true,
  className = "",
  variant = "default",
  metaIcons = defaultMetaIcons,
}) => {
  if (!availability) return null;

  const items = availability?.meta || [];

  return (
    <section
      className={`availability availability--${variant} ${className}`.trim()}
      data-show={showContent}
    >
      <div className="availability__container">
        {availability?.eyebrow && (
          <p className="availability__eyebrow">{availability.eyebrow}</p>
        )}

        <article className="availability__card">
          <span className="availability__window-label" aria-hidden="true">
            {availability.windowLabel}
          </span>

          <header className="availability__status-row">
            <span className="availability__dot" aria-hidden="true" />
            <p className="availability__status">{availability.status}</p>
          </header>

          {availability?.details && (
            <p className="availability__details">{availability.details}</p>
          )}

          {items.length > 0 && (
            <ul
              className="availability__meta"
              aria-label="Informations de disponibilité"
            >
              {items.map((item, index) => {
                const Icon = metaIcons[index] || FiCheckCircle;

                return (
                  <li key={index} className="availability__meta-item">
                    <span className="availability__icon" aria-hidden="true">
                      <Icon />
                    </span>
                    <span>{item}</span>
                  </li>
                );
              })}
            </ul>
          )}
        </article>
      </div>
    </section>
  );
};

const AvailabilityCard = ({
  availability,
  showContent = true,
  className = "",
  variant = "default",
  metaIcons = defaultMetaIcons,
  reveal = false,
  revealVariant = "section",
  revealDelay = 0,
  revealThreshold = 0.12,
  revealRootMargin = "0px 0px -8% 0px",
}) => {
  if (!availability) return null;

  const content = (
    <AvailabilityCardContent
      availability={availability}
      showContent={showContent}
      className={className}
      variant={variant}
      metaIcons={metaIcons}
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

export default AvailabilityCard;