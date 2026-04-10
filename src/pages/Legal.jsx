import React, { useEffect } from "react";
import RevealOnScroll from "../components/common/RevealOnScroll.jsx";
import "./legal.scss";

const Legal = ({ theme }) => {
  const seo = {
    title: "Mentions légales | TheCodeOfSP",
    description:
      "Mentions légales du site TheCodeOfSP, portfolio de développeuse web freelance.",
  };

  useEffect(() => {
    document.title = seo.title;

    const desc = document.querySelector("meta[name='description']");
    if (desc) {
      desc.setAttribute("content", seo.description);
    }
  }, []);

  return (
    <main className={`legal theme-${theme}`}>
      <section className="legal__container">
        <RevealOnScroll
          as="header"
          className="legal__header"
          variant="hero"
          delay={0}
        >
          <h1 className="page-title">Mentions légales</h1>
        </RevealOnScroll>

        <RevealOnScroll variant="section" delay={80}>
          <article className="legal__block">
            <h2>Éditeur du site</h2>
            <p>
              Le présent site, accessible à l’adresse
              <strong> https://thecodeofsp.fr</strong>, est édité par :
            </p>

            <p>
              <strong>Pham Sandrine</strong>
              <br />
              Développeuse web freelance
              <br />
              SIRET : 10151044400017
              <br />
              Email : thecodeofsp@gmail.com
            </p>
          </article>
        </RevealOnScroll>

        <RevealOnScroll variant="section" delay={120}>
          <article className="legal__block">
            <h2>Directeur de publication</h2>
            <p>Sandrine Pham</p>
          </article>
        </RevealOnScroll>

        <RevealOnScroll variant="section" delay={160}>
          <article className="legal__block">
            <h2>Hébergement</h2>
            <p>
              Le site est hébergé par :
              <br />
              <strong>OVHcloud</strong>
              <br />
              OVH SAS
              <br />
              2 rue Kellermann
              <br />
              59100 Roubaix
              <br />
              France
              <br />
              www.ovhcloud.com
            </p>
          </article>
        </RevealOnScroll>

        <RevealOnScroll variant="section" delay={200}>
          <article className="legal__block">
            <h2>Propriété intellectuelle</h2>
            <p>
              L’ensemble des contenus présents sur ce site (textes, images,
              graphismes, logo, code, etc.) est la propriété exclusive de
              l’éditeur sauf mention contraire.
            </p>

            <p>
              Toute reproduction, distribution ou modification sans autorisation
              écrite préalable est interdite.
            </p>
          </article>
        </RevealOnScroll>

        <RevealOnScroll variant="section" delay={240}>
          <article className="legal__block">
            <h2>Responsabilité</h2>
            <p>
              Les informations présentes sur ce site sont fournies à titre
              indicatif. L’éditeur ne peut être tenu responsable des omissions ou
              inexactitudes.
            </p>
          </article>
        </RevealOnScroll>

        <RevealOnScroll variant="section" delay={280}>
          <article className="legal__block">
            <h2>Droit applicable</h2>
            <p>
              Tout litige en relation avec l’utilisation du site est soumis au
              droit français.
            </p>
          </article>
        </RevealOnScroll>
      </section>
    </main>
  );
};

export default Legal;