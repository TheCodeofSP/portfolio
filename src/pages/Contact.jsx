import React, { useEffect } from "react";
import { useForm, ValidationError } from "@formspree/react";
import useContent from "../hooks/useContent.js";
import AvailabilityCard from "../components/common/AvailabilityCard.jsx";
import PageHero from "../components/common/PageHero.jsx";
import RevealOnScroll from "../components/common/RevealOnScroll.jsx";
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
  isSelect = false,
  options = [],
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
      ) : isSelect ? (
        <select
          className="contact__select"
          id={id}
          name={name}
          required={required}
          aria-required={required ? "true" : undefined}
          defaultValue=""
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
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
  const [state, handleSubmit] = useForm("xqeyldol");

  const ui = content?.ui;
  const pageData = content?.pages?.contact;
  const formData = content?.forms?.contact;

  const seo = pageData?.seo;
  const hero = pageData?.hero;
  const availability = pageData?.availability;

  const fields = formData?.fields;
  const privacy = formData?.privacy;
  const submit = formData?.submit;
  const success = formData?.success;
  const validation = formData?.validation;

  useEffect(() => {
    if (!seo) return;

    document.title = seo.title;

    const desc = document.querySelector("meta[name='description']");
    if (desc) {
      desc.setAttribute("content", seo.description);
    }
  }, [seo]);

  if (loading) {
    return (
      <main className="contact">
        <section className="contact__hero">
          <div className="contact__container">
            <p>{ui?.loading || "Chargement du contenu..."}</p>
          </div>
        </section>
      </main>
    );
  }

  if (error) {
    return (
      <main className="contact">
        <section className="contact__hero">
          <div className="contact__container">
            <p>
              {ui?.errorPrefix || "Erreur :"} {error.message}
            </p>
          </div>
        </section>
      </main>
    );
  }

  if (!pageData || !formData) return null;

  if (state.succeeded) {
    return (
      <main className="contact">
        <section className="contact__hero">
          <div className="contact__container">
            <RevealOnScroll
              as="section"
              className="contact__success"
              variant="section"
              delay={0}
            >
              <article
                className="contact__success-card"
                aria-labelledby="contact-success-title"
              >
                {success?.eyebrow && (
                  <p className="contact__eyebrow">{success.eyebrow}</p>
                )}

                <h1
                  id="contact-success-title"
                  className="contact__success-title"
                >
                  {success?.title}
                </h1>

                {success?.subtitle && (
                  <p className="contact__success-subtitle">
                    {success.subtitle}
                  </p>
                )}

                {success?.content && <p>{success.content}</p>}
              </article>
            </RevealOnScroll>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="contact">
      <section className="contact__hero">
        <div className="contact__container">
          <header className="contact__header" aria-labelledby="contact-title">
            <PageHero
              hero={hero}
              className="contact__intro"
              eyebrowClassName="contact__eyebrow"
              titleClassName="contact__title"
              subtitleClassName="contact__subtitle"
              descriptionClassName="contact__description"
              reveal
              revealVariant="hero"
              revealDelay={0}
            />
          </header>

          <section className="contact__availability" aria-label="Disponibilité">
            <AvailabilityCard
              availability={availability}
              showContent={true}
              reveal
              revealVariant="section"
              revealDelay={80}
            />
          </section>

          <RevealOnScroll
            as="section"
            className="contact__form-section"
            aria-labelledby="contact-form-title"
            variant="section"
            delay={120}
          >
            <article className="contact__card">
              <span className="contact__window-label" aria-hidden="true">
                {formData?.windowLabel}
              </span>

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
                    label={fields?.name?.label}
                    placeholder={fields?.name?.placeholder}
                    autoComplete="name"
                    errors={state.errors}
                    validationPrefix={validation?.name || "Nom"}
                  />

                  <ContactField
                    id="email"
                    type="email"
                    name="email"
                    label={fields?.email?.label}
                    placeholder={fields?.email?.placeholder}
                    autoComplete="email"
                    errors={state.errors}
                    validationPrefix={validation?.email || "Email"}
                  />
                </div>

                <div className="contact__row">
                  <ContactField
                    id="subject"
                    name="subject"
                    label={fields?.subject?.label}
                    placeholder={fields?.subject?.placeholder}
                    options={fields?.subject?.options || []}
                    errors={state.errors}
                    validationPrefix={validation?.subject || "Sujet"}
                    isSelect
                  />
                </div>

                <div className="contact__row">
                  <ContactField
                    id="message"
                    name="message"
                    label={fields?.message?.label}
                    placeholder={fields?.message?.placeholder}
                    errors={state.errors}
                    validationPrefix={validation?.message || "Message"}
                    isTextarea
                    rows={7}
                  />
                </div>

                <div className="contact__row">
                  <div className="contact__field">
                    <div className="contact__checkbox-row">
                      <input
                        id="privacy"
                        className="contact__checkbox-input"
                        type="checkbox"
                        name="privacy"
                        value="accepted"
                        required
                      />

                      <label
                        className="contact__checkbox-label"
                        htmlFor="privacy"
                      >
                        {privacy?.labelBefore}
                        <a
                          href={privacy?.linkUrl}
                          target="_blank"
                          rel="noreferrer"
                          onClick={(e) => e.stopPropagation()}
                        >
                          {privacy?.linkLabel}
                        </a>
                        {privacy?.labelAfter}
                      </label>
                    </div>

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
                    {state.submitting ? submit?.loading : submit?.idle}
                  </button>

                  <p className="contact__hint">{formData?.hint}</p>
                </div>
              </form>
            </article>
          </RevealOnScroll>
        </div>
      </section>
    </main>
  );
};

export default Contact;