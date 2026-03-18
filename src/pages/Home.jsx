import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Slogan from "../components/Slogan.jsx";
import HighLightCard from "../components/HighlightCard.jsx";
import ProcessSection from "../components/ProcessSection.jsx";
import TrustStrip from "../components/TrustStrip.jsx";
import AvailabilityCard from "../components/AvailabilityCard.jsx";
import FeaturedProject from "../components/FeaturedProject.jsx";
import useContent from "../hooks/useContent.js";
import useProjects from "../hooks/useProjects.js";
import "./home.scss";

const Home = ({ theme }) => {
  const { content, loading, error } = useContent();
  const {
    projects,
    loading: projectsLoading,
    error: projectsError,
  } = useProjects();

  const [showContent, setShowContent] = useState(false);
  const [showFeaturedProject, setShowFeaturedProject] = useState(false);

  const ui = content?.ui;
  const homeContent = content?.home;
  const seo = homeContent?.seo;
  const highlights = homeContent?.highlights?.cards || [];
  const process = homeContent?.process;
  const trust = homeContent?.trust;
  const availability = homeContent?.availability;

  const allProjects = useMemo(() => {
    return [
      ...(projects?.formations || []),
      ...(projects?.personnels || []),
      ...(projects?.professionnels || []),
    ];
  }, [projects]);

  const featuredProject = useMemo(() => {
    return allProjects.find((project) => project.featured) || null;
  }, [allProjects]);

  useEffect(() => {
    if (!seo) return;

    document.title = seo.title;

    const desc = document.querySelector("meta[name='description']");
    if (desc) {
      desc.setAttribute("content", seo.description);
    }
  }, [seo]);

  useEffect(() => {
    const contentTimer = setTimeout(() => setShowContent(true), 200);
    const featuredTimer = setTimeout(() => setShowFeaturedProject(true), 450);

    return () => {
      clearTimeout(contentTimer);
      clearTimeout(featuredTimer);
    };
  }, []);

  if (loading || projectsLoading) {
    return (
      <main className="home">
        <p>{ui?.loading || "Chargement du contenu..."}</p>
      </main>
    );
  }

  if (error || projectsError) {
    return (
      <main className="home">
        <p>
          {ui?.errorPrefix || "Erreur :"} {(error || projectsError)?.message}
        </p>
      </main>
    );
  }

  return (
    <main className="home">
      <section className="home__hero">
        <div className="home__hero-container">
          <div className="home__contentIntro">
            <section className="home__content" data-show={showContent}>
              <div className="home__slogan-wrapper">
                <Slogan text={homeContent?.slogan} theme={theme} />
                {homeContent?.eyebrow && (
                  <p className="home__eyebrow">{homeContent.eyebrow}</p>
                )}
              </div>

              <div className="home__text">
                <h1 className="home__title">{homeContent?.title}</h1>
                <p className="home__intro">{homeContent?.content}</p>
                <p className="home__accroche">{homeContent?.accroche}</p>

                <div className="home__cta-group">
                  <Link to="/contact" className="home__cta-button">
                    {homeContent?.cta?.label}
                  </Link>
                </div>

                <p className="home__cta-note">{homeContent?.cta?.note}</p>
              </div>
            </section>

            <section className="home__featured" data-show={showFeaturedProject}>
              <FeaturedProject
                project={featuredProject}
                theme={theme}
                showProject={showFeaturedProject}
              />
            </section>
          </div>

          <section className="home__process">
            <ProcessSection
              process={process}
              theme={theme}
              showContent={showContent}
            />
          </section>

          <section className="home__trust-strip" data-show={showContent}>
            <TrustStrip trust={trust} showContent={showContent} />
          </section>

          <section className="home__highlights" data-show={showContent}>
            <header className="home__highlights-head">
              <h2 className="page-title">{homeContent?.highlights?.title}</h2>
            </header>

            <div className="home__highlights-container">
              {highlights.map((card, index) => (
                <HighLightCard
                  key={index}
                  number={card.number}
                  title={card.title}
                  description={card.description}
                  ariaLabel={card.ariaLabel}
                />
              ))}
            </div>
          </section>

          <section className="home__availability">
            <AvailabilityCard
              availability={availability}
              showContent={showContent}
            />
          </section>
        </div>
      </section>
    </main>
  );
};

export default Home;
