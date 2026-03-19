import React, { useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import Slogan from "../components/Slogan.jsx";
import ProcessSection from "../components/ProcessSection.jsx";
import TrustStrip from "../components/TrustStrip.jsx";
import AvailabilityCard from "../components/AvailabilityCard.jsx";
import FeaturedProject from "../components/FeaturedProject.jsx";
import content from "../data/content.json";
import projects from "../data/projects.json";
import "./home.scss";

const Home = ({ theme }) => {
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
  }, []);

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

  return (
    <main className="home">
      <section className="home__hero">
        <div className="home__hero-container">
          <div className="home__contentIntro">
            <section className="home__content" data-show="true">
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

            <section className="home__featured" data-show="true">
              <FeaturedProject
                project={featuredProject}
                theme={theme}
                showProject={true}
              />
            </section>
          </div>

          <section className="home__process">
            <ProcessSection
              process={process}
              theme={theme}
              showContent={true}
            />
          </section>

          <section className="home__trust-strip" data-show="true">
            <TrustStrip trust={trust} showContent={true} />
          </section>

          <section className="home__availability">
            <AvailabilityCard availability={availability} showContent={true} />
          </section>
        </div>
      </section>
    </main>
  );
};

export default Home;
