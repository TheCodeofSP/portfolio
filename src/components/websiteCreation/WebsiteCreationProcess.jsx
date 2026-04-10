import React, { useEffect, useMemo, useRef, useState } from "react";
import SectionHeader from "../common/SectionHeader.jsx";
import RevealOnScroll from "../common/RevealOnScroll.jsx";
import "./websiteCreationProcess.scss";

const clamp = (value, min = 0, max = 1) => Math.min(max, Math.max(min, value));

const DESKTOP_PATH = `
  M50 40
  C50 90, 18 110, 18 160
  C18 210, 82 230, 82 280
  C82 330, 18 350, 18 400
  C18 450, 82 470, 82 520
  C82 570, 18 590, 18 640
  C18 690, 82 710, 82 760
  C82 810, 50 860, 50 920
`;

const MOBILE_PATH = `
  M14 40
  C14 90, 28 110, 28 155
  C28 200, 14 220, 14 265
  C14 310, 28 330, 28 375
  C28 420, 14 440, 14 485
  C14 530, 28 550, 28 595
  C28 640, 14 660, 14 705
  C14 750, 20 810, 20 900
`;

const DESKTOP_STRAIGHT_PATH = `
  M50 40
  L50 920
`;

const MOBILE_STRAIGHT_PATH = `
  M20 40
  L20 900
`;

const MOBILE_BREAKPOINT = 860;

const getThemeVariant = (theme) => {
  switch (theme) {
    case "energique":
      return "energique";
    case "minimaliste":
      return "minimaliste";
    default:
      return "accueillant";
  }
};

const WebsiteCreationProcess = ({
  process,
  showContent = true,
  theme = "accueillant",
}) => {
  const steps = process?.steps || [];
  const pathRef = useRef(null);
  const cardRefs = useRef([]);
  const [progress, setProgress] = useState(0);
  const [pathLength, setPathLength] = useState(0);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [isMobile, setIsMobile] = useState(false);

  const themeVariant = useMemo(() => getThemeVariant(theme), [theme]);

  const isStraightTheme =
    themeVariant === "energique" || themeVariant === "minimaliste";

  const pathD = useMemo(() => {
    if (isStraightTheme) {
      return isMobile ? MOBILE_STRAIGHT_PATH : DESKTOP_STRAIGHT_PATH;
    }

    return isMobile ? MOBILE_PATH : DESKTOP_PATH;
  }, [isMobile, isStraightTheme]);

  useEffect(() => {
    const onResize = () => {
      setIsMobile(window.innerWidth <= MOBILE_BREAKPOINT);
    };

    onResize();
    window.addEventListener("resize", onResize);

    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    if (!pathRef.current || themeVariant === "minimaliste") return;

    const updateLength = () => {
      setPathLength(pathRef.current.getTotalLength());
    };

    updateLength();
    window.addEventListener("resize", updateLength);

    return () => window.removeEventListener("resize", updateLength);
  }, [pathD, themeVariant]);

  useEffect(() => {
    const updateProgressFromCards = () => {
      const cards = cardRefs.current.filter(Boolean);
      if (!cards.length) return;

      const viewportCenter = window.innerHeight / 2;

      const centers = cards.map((card) => {
        const rect = card.getBoundingClientRect();
        return rect.top + rect.height / 2;
      });

      const firstCenter = centers[0];
      const lastCenter = centers[centers.length - 1];
      const raw =
        (viewportCenter - firstCenter) / (lastCenter - firstCenter || 1);

      setProgress(clamp(raw, 0, 1));

      let nearestIndex = 0;
      let nearestDistance = Infinity;

      centers.forEach((center, index) => {
        const distance = Math.abs(center - viewportCenter);

        if (distance < nearestDistance) {
          nearestDistance = distance;
          nearestIndex = index;
        }
      });

      setActiveIndex(nearestIndex);
    };

    updateProgressFromCards();

    window.addEventListener("scroll", updateProgressFromCards, {
      passive: true,
    });
    window.addEventListener("resize", updateProgressFromCards);

    return () => {
      window.removeEventListener("scroll", updateProgressFromCards);
      window.removeEventListener("resize", updateProgressFromCards);
    };
  }, [isMobile, steps.length]);

  if (!process || !steps.length) return null;

  const dashOffset = pathLength * (1 - progress);

  return (
    <section
      className="process"
      data-show={showContent}
      data-mobile={isMobile}
      data-theme-variant={themeVariant}
      aria-labelledby="process-title"
    >
      <div className="process__container">
        <RevealOnScroll
          variant="section"
          delay={0}
          threshold={0.12}
          rootMargin="0px 0px -8% 0px"
        >
          <SectionHeader
            className="process__head"
            eyebrow={process.eyebrow}
            title={process.title}
            intro={process.intro}
          />
        </RevealOnScroll>

        <RevealOnScroll
          className="process__timeline-reveal"
          variant="section"
          delay={100}
          threshold={0.1}
          rootMargin="0px 0px -6% 0px"
        >
          <div className="process__timeline">
            <svg
              className="process__svg"
              viewBox="0 0 100 1000"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              {themeVariant === "minimaliste" && (
                <defs>
                  <linearGradient
                    id="process-gradient-minimal"
                    x1="0%"
                    y1="0%"
                    x2="0%"
                    y2="100%"
                  >
                    <stop offset="0%" stopColor="rgba(40, 40, 40, 0.08)" />
                    <stop offset="25%" stopColor="rgba(40, 40, 40, 0.18)" />
                    <stop offset="55%" stopColor="rgba(40, 40, 40, 0.42)" />
                    <stop offset="80%" stopColor="rgba(40, 40, 40, 0.72)" />
                    <stop offset="100%" stopColor="rgba(40, 40, 40, 1)" />
                  </linearGradient>
                </defs>
              )}

              <path className="process__path process__path--base" d={pathD} />

              {themeVariant !== "minimaliste" && (
                <path
                  ref={pathRef}
                  className="process__path process__path--glow"
                  d={pathD}
                  style={{
                    strokeDasharray: pathLength || 1,
                    strokeDashoffset: dashOffset || 0,
                  }}
                />
              )}
            </svg>

            <div className="process__steps">
              {steps.map((step, index) => {
                const isActive = index === activeIndex;
                const isPassed = index < activeIndex;

                return (
                  <article
                    key={`${step.number}-${step.title}-${index}`}
                    ref={(el) => {
                      cardRefs.current[index] = el;
                    }}
                    className={[
                      "process__card",
                      isActive ? "is-active" : "",
                      isPassed ? "is-passed" : "",
                    ]
                      .filter(Boolean)
                      .join(" ")}
                    aria-label={`Étape ${step.number} : ${step.title}`}
                  >
                    <span className="process__marker" aria-hidden="true" />

                    {step.windowLabel && (
                      <span className="process__window-label" aria-hidden="true">
                        {step.windowLabel}
                      </span>
                    )}

                    <div className="process__card-body">
                      <p className="process__step-number">{step.number}</p>
                      <h3 className="process__card-title">{step.title}</h3>

                      {step.description && (
                        <p className="process__description">
                          {step.description}
                        </p>
                      )}
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
};

export default WebsiteCreationProcess;