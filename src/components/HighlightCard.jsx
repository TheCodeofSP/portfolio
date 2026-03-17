import React from "react";
import "./highlightCard.scss";

const HighlightCard = ({ number, title, description, ariaLabel }) => {
  return (
    <article className="highlight-card" aria-label={ariaLabel || undefined}>
      <p className="highlight-card__number">{number}</p>

      <div className="highlight-card__content">
        <h3 className="highlight-card__title">{title}</h3>
        <p className="highlight-card__description">{description}</p>
      </div>
    </article>
  );
};

export default HighlightCard;