import React, { useEffect, useState } from "react";

import { useForm, ValidationError } from "@formspree/react";
import useContent from "../hooks/useContent.js";
import AvailabilityCard from "../components/AvailabilityCard.jsx";
import "./contact.scss";


const ContactField = ({
  id,
  type = "text",
  name,
  label,
  placeholder,
  required = true,
  autoComplete = "off",
  errors,
  validationPrefix,
  isTextarea = false,
  rows = 7,
}) => {
  return (
    <div className="contact__field">
      <label className="contact__label" htmlFor={id}>
        {label}
      </label>

      {isTextarea ? (
        <textarea
          className="contact__textarea"
          id={id}
          name={name}
          placeholder={placeholder}
          rows={rows}
          required={required}
          aria-required={required ? "true" : undefined}
        />
      ) : (
        <input
          className="contact__input"
          id={id}
          type={type}
          name={name}
          placeholder={placeholder}
          required={required}
          aria-required={required ? "true" : undefined}
          autoComplete={autoComplete}
        />
      )}

      <ValidationError
        prefix={validationPrefix}
        field={name}
        errors={errors}
        className="contact__error"
      />
    </div>
  );
};

const Contact = () => {
  const { content, loading, error } = useContent();
  const [showContent, setShowContent] = useState(false);
  const [state, handleSubmit] = useForm("xqeyldol");

  const ui = content?.ui;
  const contactData = content?.contact;
  const seo = contactData?.seo;
  const hero = contactData?.hero;
  const form = contactData?.form;
  const success = contactData?.success;
  const validation = contactData?.validation;
  const homeContent = content?.home;
  const availability = homeContent?.availability;

  useEffect(() => {
    if (!seo) return;

    document.title = seo.title;

    const desc = document.querySelector("meta[name='description']");
    if (desc) {
      desc.setAttribute("content", seo.description);
    }
  }, [seo]);

  useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), 200);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <main className="contact" data-show={showContent}>
        <p>{ui?.loading || "Chargement du contenu..."}</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="contact" data-show={showContent}>
        <p>
          {ui?.errorPrefix || "Erreur :"} {error.message}
        </p>
      </main>
    );
  }

  if (!contactData) return null;

  if (state.succeeded) {
    return (
      <main className="contact" data-show={showContent}>
        <section className="contact__success">
          <article className="contact__success-card">
            <p className="page-title">{success?.pageTitle}</p>
            <h1>{success?.title}</h1>
            <p>{success?.message}</p>
          </article>

        </section>
      </main>
    );
  }

  return (
    <main className="contact" data-show={showContent}>
      <section className="contact__hero">
        <div className="contact__hero-container">
          <section className="contact__intro" aria-labelledby="contact-title">
            <p className="page-title">{hero?.pageTitle}</p>
            <h1 id="contact-title">{hero?.title}</h1>

            {hero?.paragraphs?.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </section>

          <section className="contact__availability" aria-label="Disponibilité">
            <AvailabilityCard
              availability={availability}
              showContent={showContent}
            />
          </section>

          <section
            className="contact__card"
            aria-labelledby="contact-form-title"
          >
            <h2 id="contact-form-title" className="sr-only">
              Formulaire de contact
            </h2>

            <form className="contact__form" onSubmit={handleSubmit}>
              <input
                type="hidden"
                name="_subject"
                value="Nouveau message depuis le portfolio"
              />
              <input type="hidden" name="_template" value="table" />

              <input
                type="text"
                name="_gotcha"
                style={{ display: "none" }}
                tabIndex="-1"
                autoComplete="off"
              />

              <div className="contact__row contact__row--split">
                <ContactField
                  id="name"
                  type="text"
                  name="name"
                  label={form?.name?.label}
                  placeholder={form?.name?.placeholder}
                  autoComplete="name"
                  errors={state.errors}
                  validationPrefix={validation?.name || "Nom"}
                />

                <ContactField
                  id="email"
                  type="email"
                  name="email"
                  label={form?.email?.label}
                  placeholder={form?.email?.placeholder}
                  autoComplete="email"
                  errors={state.errors}
                  validationPrefix={validation?.email || "Email"}
                />
              </div>

              <div className="contact__row">
                <ContactField
                  id="subject"
                  type="text"
                  name="subject"
                  label={form?.subject?.label}
                  placeholder={form?.subject?.placeholder}
                  errors={state.errors}
                  validationPrefix={validation?.subject || "Sujet"}
                />
              </div>

              <div className="contact__row">
                <ContactField
                  id="message"
                  name="message"
                  label={form?.message?.label}
                  placeholder={form?.message?.placeholder}
                  errors={state.errors}
                  validationPrefix={validation?.message || "Message"}
                  isTextarea
                  rows={7}
                />
              </div>

              <div className="contact__row">
                <div className="contact__field">
                  <label className="contact__checkbox" htmlFor="privacy">
                    <input
                      id="privacy"
                      type="checkbox"
                      name="privacy"
                      value="accepted"
                      required
                    />
                    <span>
                      {form?.privacy?.labelBefore}
                      <a
                        href={form?.privacy?.linkUrl}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {form?.privacy?.linkLabel}
                      </a>
                      {form?.privacy?.labelAfter}
                    </span>
                  </label>

                  <ValidationError
                    prefix={validation?.privacy || "Confidentialité"}
                    field="privacy"
                    errors={state.errors}
                    className="contact__error"
                  />
                </div>
              </div>

              <div className="contact__actions">
                <button
                  className="contact__button"
                  type="submit"
                  disabled={state.submitting}
                >
                  {state.submitting
                    ? form?.submit?.loading
                    : form?.submit?.idle}
                </button>

                <p className="contact__hint">{form?.hint}</p>
              </div>
            </form>
          </section>
        </div>
      </section>
    </main>
  );
};

export default Contact;
