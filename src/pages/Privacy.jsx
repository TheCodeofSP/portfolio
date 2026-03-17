import React, { useEffect } from "react";
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
    <main className={`legal theme-${theme}`}>
      <section className="legal__container">
        <h1 className="page-title">Politique de confidentialité</h1>

        <article className="legal__block">
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

        <article className="legal__block">
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

        <article className="legal__block">
          <h2>Finalité du traitement</h2>
          <p>
            Les données transmises via le formulaire de contact sont utilisées
            uniquement pour :
          </p>

          <ul>
            <li>répondre à votre demande</li>
            <li>
              échanger avec vous au sujet de votre projet ou de votre besoin
            </li>
            <li>
              assurer le suivi de nos échanges précontractuels ou professionnels
            </li>
          </ul>

          <p>
            Vos données ne sont pas utilisées à des fins de prospection
            commerciale sans votre accord préalable.
          </p>
        </article>

        <article className="legal__block">
          <h2>Base légale</h2>
          <p>
            Le traitement de vos données repose sur la nécessité de répondre à
            votre demande et, selon le contexte, sur l’exécution de mesures
            précontractuelles prises à votre initiative.
          </p>
          <p>
            Le consentement n’est pas l’unique base légale possible : la base
            retenue dépend de la finalité du traitement concerné.
          </p>
        </article>

        <article className="legal__block">
          <h2>Destinataires des données</h2>
          <p>
            Les données collectées sont destinées uniquement à{" "}
            <strong>Sandrine PHAM</strong>.
          </p>
          <p>
            Le formulaire de contact est géré via <strong>Formspree</strong>,
            qui intervient en tant que prestataire technique pour la
            transmission et le stockage des soumissions.
          </p>
        </article>

        <article className="legal__block">
          <h2>Durée de conservation</h2>
          <p>
            Les données sont conservées uniquement pendant la durée nécessaire
            au traitement de votre demande et au suivi de nos échanges.
          </p>
          <p>
            Pour un simple message de contact sans suite commerciale ou
            contractuelle, les données ne doivent pas être conservées au-delà de
            ce qui est nécessaire à la finalité poursuivie.
          </p>
        </article>

        <article className="legal__block">
          <h2>Vos droits</h2>
          <p>
            Conformément au RGPD, vous disposez des droits suivants sur vos
            données :
          </p>

          <ul>
            <li>droit d’accès</li>
            <li>droit de rectification</li>
            <li>droit à l’effacement</li>
            <li>droit à la limitation du traitement</li>
            <li>droit d’opposition, lorsque celui-ci est applicable</li>
          </ul>

          <p>
            Vous pouvez exercer ces droits à tout moment en écrivant à :
            <br />
            <strong>thecodeofsp@gmail.com</strong>
          </p>

          <p>
            Si vous estimez, après nous avoir contactés, que vos droits ne sont
            pas respectés, vous pouvez adresser une réclamation à la CNIL.
          </p>
        </article>

        <article className="legal__block">
          <h2>Sécurité</h2>
          <p>
            Des mesures raisonnables sont mises en œuvre pour protéger les
            données personnelles transmises via le site et limiter les accès non
            autorisés.
          </p>
        </article>

        <article className="legal__block">
          <h2>Cookies</h2>
          <p>
            Le site peut utiliser des cookies strictement nécessaires à son bon
            fonctionnement.
          </p>
          <p>
            Si des outils de mesure d’audience ou des services tiers sont
            ajoutés ultérieurement, cette politique sera mise à jour pour
            préciser leur usage.
          </p>
        </article>

        <article className="legal__block">
          <h2>Mise à jour</h2>
          <p>
            La présente politique de confidentialité peut être modifiée à tout
            moment afin de refléter l’évolution du site, des services proposés
            ou des obligations légales applicables.
          </p>
        </article>
      </section>
    </main>
  );
};

export default Privacy;
