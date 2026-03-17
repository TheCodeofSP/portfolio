import React from "react";
import { FiCheckCircle, FiCalendar, FiMessageSquare } from "react-icons/fi";
import "./availabilityCard.scss";

const metaIcons = [FiMessageSquare, FiCalendar, FiCheckCircle];

const AvailabilityCard = ({ availability, showContent = true }) => {
  if (!availability) return null;

  const items = availability?.meta || [];

  return (
    <section className="availability" data-show={showContent}>
      <div className="availability__container">
        {availability?.eyebrow && (
          <p className="availability__eyebrow">{availability.eyebrow}</p>
        )}

        <article className="availability__card">
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

export default AvailabilityCard;