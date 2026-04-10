import React from "react";
import { FiClock, FiMessageCircle, FiLayers } from "react-icons/fi";
import "./homeTrustStrip.scss";

const ICONS = [FiClock, FiMessageCircle, FiLayers];

const HomeTrustStrip = ({ trust, showContent = true }) => {
  const items = trust?.items || [];

  if (!trust || !items.length) return null;

  return (
    <section className="trust-strip" data-show={showContent}>
      <div className="trust-strip__container">
        <div className="trust-strip__header">
          {trust?.eyebrow && (
            <p className="trust-strip__eyebrow">{trust.eyebrow}</p>
          )}

          {trust?.title && (
            <h3 className="trust-strip__title">{trust.title}</h3>
          )}
        </div>
        <ul className="trust-strip__list" aria-label="Éléments de réassurance">
          {items.map((item, index) => {
            const Icon = ICONS[index];

            return (
              <li key={`${item}-${index}`} className="trust-strip__item">
                {Icon && (
                  <span className="trust-strip__icon" aria-hidden="true">
                    <Icon />
                  </span>
                )}

                <span className="trust-strip__text">{item}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default HomeTrustStrip;
