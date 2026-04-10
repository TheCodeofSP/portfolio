import React, { useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import content from "../data/content.json";
import projects from "../data/projects.json";
import HomeSlogan from "../components/home/HomeSlogan.jsx";
import HomeFeaturedProject from "../components/home/HomeFeaturedProject.jsx";
import HomeTrustStrip from "../components/home/HomeTrustStrip.jsx";
import AvailabilityCard from "../components/common/AvailabilityCard.jsx";
import HomeSectionRenderer from "../components/home/HomeSectionRenderer.jsx";
import RevealOnScroll from "../components/common/RevealOnScroll.jsx";
import "./home.scss";

const Home = ({ theme }) => {
  const homeContent = content?.pages?.home;
  const seo = homeContent?.seo;
  const hero = homeContent?.hero;
  const sections = homeContent?.sections || [];
  const trust = homeContent?.trust;
  const availability = homeContent?.availability;

  const featuredProjects = useMemo(() => {
    return [
      ...(projects?.formations || []),
      ...(projects?.personnels || []),
      ...(projects?.professionnels || []),
    ].filter((project) => project.featured);
  }, []);

  useEffect(() => {
    if (!seo) return;

    document.title = seo.title;

    const desc = document.querySelector("meta[name='description']");
    if (desc) {
      desc.setAttribute("content", seo.description);
    }
  }, [seo]);

  return (
    <main className="home">
      <section className="home__hero">
        <div className="home__hero-container">
          <div className="home__contentIntro">
            <RevealOnScroll
              as="section"
              className="home__content"
              variant="hero"
              delay={0}
            >
              <div className="home__text">
                <HomeSlogan text={hero?.slogan} theme={theme} />

                {hero?.eyebrow && (
                  <p className="home__eyebrow">{hero.eyebrow}</p>
                )}

                {hero?.title && <h1 className="home__title">{hero.title}</h1>}

                {hero?.subtitle && (
                  <p className="home__subtitle">{hero.subtitle}</p>
                )}

                <div className="home__cta-group">
                  <div className="home__cta-buttons">
                    {hero?.cta?.primary && (
                      <Link
                        to={hero.cta.primary.href}
                        className="home__cta-button home__cta-button--primary"
                      >
                        {hero.cta.primary.label}
                      </Link>
                    )}

                    {hero?.cta?.secondary && (
                      <Link
                        to={hero.cta.secondary.href}
                        className="home__cta-button home__cta-button--secondary"
                      >
                        {hero.cta.secondary.label}
                      </Link>
                    )}
                  </div>
                </div>

                {hero?.cta?.tertiary && (
                  <Link
                    to={hero.cta.tertiary.href}
                    className="home__accroche home__accroche--link"
                  >
                    {hero.cta.tertiary.label}
                  </Link>
                )}
                {hero?.content && (
                  <p className="home__supporting-text">{hero.content}</p>
                )}
              </div>
            </RevealOnScroll>

            <RevealOnScroll
              as="section"
              className="home__featured"
              variant="hero"
              delay={90}
            >
              <HomeFeaturedProject
                projects={featuredProjects}
                showProject={true}
                windowLabel="Projet à la une!"
                layout="compact"
              />
            </RevealOnScroll>
          </div>

          {sections.map((section, index) => (
            <HomeSectionRenderer
              key={`${section.type}-${section.variant || index}`}
              section={section}
            />
          ))}

          <RevealOnScroll
            as="section"
            className="home__trust-strip"
            variant="section"
            delay={80}
          >
            <HomeTrustStrip trust={trust} showContent={true} />
          </RevealOnScroll>

          <section className="home__availability">
            <AvailabilityCard
              availability={availability}
              showContent={true}
              reveal
              revealVariant="section"
              revealDelay={120}
            />
          </section>
        </div>
      </section>
    </main>
  );
};

export default Home;
