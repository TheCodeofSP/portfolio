import React, { useEffect } from "react";
import RevealOnScroll from "../components/common/RevealOnScroll.jsx";
import "./privacy.scss";

const Privacy = ({ theme }) => {
  const seo = {
    title: "Politique de confidentialité | TheCodeOfSP",
    description:
      "Politique de confidentialité relative au traitement des données personnelles sur le site TheCodeOfSP.",
  };

  useEffect(() => {
    document.title = seo.title;

    const desc = document.querySelector("meta[name='description']");
    if (desc) {
      desc.setAttribute("content", seo.description);
    }
  }, []);

  return (
    <main className={`privacy theme-${theme}`}>
      <section className="privacy__container">
        <RevealOnScroll
          as="header"
          className="privacy__header"
          variant="hero"
          delay={0}
        >
          <h1 className="page-title">Politique de confidentialité</h1>
        </RevealOnScroll>

        <RevealOnScroll variant="section" delay={80}>
          <article className="privacy__block">
            <h2>Responsable du traitement</h2>
            <p>
              Le présent site est édité par <strong>Sandrine PHAM</strong>,
              développeuse web freelance.
            </p>
            <p>
              Pour toute question relative à la protection des données
              personnelles, vous pouvez écrire à :
              <br />
              <strong>thecodeofsp@gmail.com</strong>
            </p>
          </article>
        </RevealOnScroll>

        <RevealOnScroll variant="section" delay={120}>
          <article className="privacy__block">
            <h2>Données collectées</h2>
            <p>
              Lorsque vous utilisez le formulaire de contact, les données
              suivantes peuvent être collectées :
            </p>

            <ul>
              <li>nom</li>
              <li>adresse email</li>
              <li>sujet du message</li>
              <li>contenu du message</li>
            </ul>

            <p>
              Seules les données strictement nécessaires au traitement de votre
              demande sont collectées.
            </p>
          </article>
        </RevealOnScroll>

        <RevealOnScroll variant="section" delay={160}>
          <article className="privacy__block">
            <h2>Finalité du traitement</h2>
            <p>
              Les données transmises via le formulaire de contact sont utilisées
              uniquement pour :
            </p>

            <ul>
              <li>répondre à votre demande</li>
              <li>échanger avec vous au sujet de votre projet</li>
              <li>assurer le suivi de nos échanges</li>
            </ul>

            <p>
              Vos données ne sont pas utilisées à des fins de prospection
              commerciale sans votre accord préalable.
            </p>
          </article>
        </RevealOnScroll>

        <RevealOnScroll variant="section" delay={200}>
          <article className="privacy__block">
            <h2>Base légale</h2>
            <p>
              Le traitement de vos données repose sur la nécessité de répondre à
              votre demande et, selon le contexte, sur l’exécution de mesures
              précontractuelles.
            </p>
          </article>
        </RevealOnScroll>

        <RevealOnScroll variant="section" delay={240}>
          <article className="privacy__block">
            <h2>Destinataires des données</h2>
            <p>
              Les données collectées sont destinées uniquement à{" "}
              <strong>Sandrine PHAM</strong>.
            </p>
            <p>
              Le formulaire est géré via <strong>Formspree</strong>, prestataire
              technique.
            </p>
          </article>
        </RevealOnScroll>

        <RevealOnScroll variant="section" delay={280}>
          <article className="privacy__block">
            <h2>Durée de conservation</h2>
            <p>
              Les données sont conservées uniquement pendant la durée nécessaire
              au traitement de votre demande.
            </p>
          </article>
        </RevealOnScroll>

        <RevealOnScroll variant="section" delay={320}>
          <article className="privacy__block">
            <h2>Vos droits</h2>
            <p>Conformément au RGPD, vous disposez des droits suivants :</p>

            <ul>
              <li>droit d’accès</li>
              <li>droit de rectification</li>
              <li>droit à l’effacement</li>
              <li>droit d’opposition</li>
            </ul>

            <p>
              Contact : <br />
              <strong>thecodeofsp@gmail.com</strong>
            </p>
          </article>
        </RevealOnScroll>

        <RevealOnScroll variant="section" delay={360}>
          <article className="privacy__block">
            <h2>Sécurité</h2>
            <p>
              Des mesures raisonnables sont mises en œuvre pour protéger vos
              données.
            </p>
          </article>
        </RevealOnScroll>

        <RevealOnScroll variant="section" delay={400}>
          <article className="privacy__block">
            <h2>Cookies</h2>
            <p>
              Le site utilise uniquement des cookies nécessaires à son bon
              fonctionnement.
            </p>
          </article>
        </RevealOnScroll>

        <RevealOnScroll variant="section" delay={440}>
          <article className="privacy__block">
            <h2>Mise à jour</h2>
            <p>
              Cette politique peut être modifiée à tout moment pour refléter les
              évolutions légales ou techniques.
            </p>
          </article>
        </RevealOnScroll>
      </section>
    </main>
  );
};

export default Privacy;
