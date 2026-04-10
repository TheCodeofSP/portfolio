import React, { useState, useEffect, useMemo, useCallback } from "react";
import RevealOnScroll from "../common/RevealOnScroll.jsx";
import "./projectsFilter.scss";
import useContent from "../../hooks/useContent.js";
import {
  FILTER_CONFIG,
  buildEmptyFilters,
  normalizeValues,
} from "../../utils/projectFilters.js";

const Tag = React.memo(({ value, active, onClick, ariaPrefix }) => (
  <button
    type="button"
    className={`filter-tag ${active ? "filter-tag--active" : ""}`}
    onClick={() => onClick(value)}
    aria-pressed={active}
    aria-label={`${ariaPrefix} ${value}`}
  >
    {value}
  </button>
));

const ActiveFilterPill = React.memo(
  ({ label, value, onRemove, removeAriaLabel }) => (
    <button
      type="button"
      className="active-filter-pill"
      onClick={onRemove}
      aria-label={`${removeAriaLabel} ${label} : ${value}`}
    >
      <span className="active-filter-pill__label">{label}</span>
      <span className="active-filter-pill__value">{value}</span>
      <span className="active-filter-pill__close">×</span>
    </button>
  ),
);

const FILTER_GROUPS = [
  { key: "impactTags", type: "single" },
  { key: "stackPrincipale", type: "single" },
  {
    key: "stackTechnique",
    type: "group",
    label: "Stack technique",
    helper: "Langages, frameworks, bibliothèques et outils",
    children: ["languages", "frameworks", "outilsDev"],
  },
];

const DEFAULT_OPEN_CATEGORIES = {
  impactTags: true,
  stackPrincipale: false,
  stackTechnique: false,
};

const ProjectsFilterContent = ({ onFilterChange, projectsData = [] }) => {
  const { content } = useContent();

  const allProjects = useMemo(() => {
    return Array.isArray(projectsData) ? projectsData : [];
  }, [projectsData]);

  const filterContent = content?.pages?.projectsPage?.filterPanel;
  const categoryContent = filterContent?.categories || {};

  const [filtersData, setFiltersData] = useState(buildEmptyFilters());
  const [activeFilters, setActiveFilters] = useState(buildEmptyFilters());
  const [openCategories, setOpenCategories] = useState(DEFAULT_OPEN_CATEGORIES);

  useEffect(() => {
    if (!allProjects.length) {
      setFiltersData(buildEmptyFilters());
      return;
    }

    const nextFilters = buildEmptyFilters();

    FILTER_CONFIG.forEach(({ key }) => {
      nextFilters[key] = [
        ...new Set(
          allProjects.flatMap((project) => normalizeValues(project[key])),
        ),
      ].sort((a, b) => a.localeCompare(b, "fr"));
    });

    setFiltersData(nextFilters);
  }, [allProjects]);

  const updateFilters = useCallback(
    (updatedFilters) => {
      setActiveFilters(updatedFilters);

      if (typeof onFilterChange === "function") {
        onFilterChange(updatedFilters);
      }
    },
    [onFilterChange],
  );

  const toggleFilter = useCallback(
    (category, value) => {
      const currentValues = activeFilters[category] || [];

      const updatedCategory = currentValues.includes(value)
        ? currentValues.filter((item) => item !== value)
        : [...currentValues, value];

      updateFilters({
        ...activeFilters,
        [category]: updatedCategory,
      });
    },
    [activeFilters, updateFilters],
  );

  const removeFilter = useCallback(
    (category, value) => {
      updateFilters({
        ...activeFilters,
        [category]: (activeFilters[category] || []).filter(
          (item) => item !== value,
        ),
      });
    },
    [activeFilters, updateFilters],
  );

  const toggleCategory = useCallback((category) => {
    setOpenCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  }, []);

  const resetFilters = useCallback(() => {
    updateFilters(buildEmptyFilters());
  }, [updateFilters]);

  const filteredCount = useMemo(() => {
    if (!allProjects.length) return 0;

    return allProjects.filter((project) =>
      FILTER_CONFIG.every(({ key }) => {
        const currentFilters = activeFilters[key] || [];
        if (!currentFilters.length) return true;

        const values = normalizeValues(project[key]);
        return values.some((value) => currentFilters.includes(value));
      }),
    ).length;
  }, [allProjects, activeFilters]);

  const hasActiveFilters = useMemo(() => {
    return Object.values(activeFilters).some(
      (values) => Array.isArray(values) && values.length > 0,
    );
  }, [activeFilters]);

  const activeFilterEntries = useMemo(() => {
    return FILTER_CONFIG.flatMap(({ key, label }) =>
      (activeFilters[key] || []).map((value) => ({
        key,
        label: categoryContent[key]?.label || label,
        value,
      })),
    );
  }, [activeFilters, categoryContent]);

  const renderTags = useCallback(
    (key, label) => {
      const options = filtersData[key] || [];

      if (!options.length) {
        return (
          <p className="filter-category-card__empty">
            {filterContent?.emptyCategory || "Aucun filtre disponible."}
          </p>
        );
      }

      return options.map((option) => (
        <Tag
          key={`${key}-${option}`}
          value={option}
          active={(activeFilters[key] || []).includes(option)}
          onClick={(value) => toggleFilter(key, value)}
          ariaPrefix={filterContent?.tagAriaPrefix || `Filtrer par ${label}`}
        />
      ));
    },
    [filtersData, activeFilters, toggleFilter, filterContent],
  );

  return (
    <section
      className="filter-panel"
      role="region"
      aria-label={filterContent?.ariaLabel || "Filtres de projets"}
    >
      {filterContent?.windowLabel && (
        <span className="filter-panel__window-label" aria-hidden="true">
          {filterContent.windowLabel}
        </span>
      )}

      <header className="filter-panel__hero">
        <div className="filter-panel__hero-text">
          <p className="filter-panel__eyebrow">
            {filterContent?.eyebrow || "Navigation intelligente"}
          </p>

          <h2 className="filter-panel__title">
            {filterContent?.title || "Trouver les projets les plus pertinents"}
          </h2>

          <p className="filter-panel__subtitle">
            {filterContent?.subtitle ||
              "Filtre les réalisations selon les besoins, la stack ou les outils utilisés pour parcourir plus facilement les projets qui t’intéressent."}
          </p>
        </div>

        <aside
          className="filter-panel__summary-card"
          aria-label="Résumé des résultats"
        >
          <p className="filter-panel__summary-label">
            {filterContent?.summary?.label || "Résultats"}
          </p>

          <p className="filter-panel__summary-count">
            {filteredCount}
            <span>
              {filteredCount > 1
                ? ` ${filterContent?.summary?.foundPlural || "projets trouvés"}`
                : ` ${filterContent?.summary?.foundSingular || "projet trouvé"}`}
            </span>
          </p>

          {allProjects.length > 0 && (
            <p className="filter-panel__summary-total">
              {filterContent?.summary?.totalPrefix || "sur"} {allProjects.length}{" "}
              {filterContent?.summary?.totalSuffix || "projets"}
            </p>
          )}
        </aside>
      </header>

      {hasActiveFilters && (
        <section className="filter-panel__active" aria-label="Filtres actifs">
          <div className="filter-panel__active-head">
            <p className="filter-panel__active-title">
              {filterContent?.activeFilters?.title || "Filtres actifs"}
            </p>

            <button
              type="button"
              className="filter-panel__reset-inline"
              onClick={resetFilters}
            >
              {filterContent?.activeFilters?.reset || "Tout réinitialiser"}
            </button>
          </div>

          <div className="filter-panel__active-list">
            {activeFilterEntries.map(({ key, label, value }) => (
              <ActiveFilterPill
                key={`${key}-${value}`}
                label={label}
                value={value}
                onRemove={() => removeFilter(key, value)}
                removeAriaLabel={
                  filterContent?.activeFilters?.removeAriaLabel ||
                  "Retirer le filtre"
                }
              />
            ))}
          </div>
        </section>
      )}

      <div className="filter-panel__categories">
        {FILTER_GROUPS.map((group) => {
          if (group.type === "single") {
            const config = FILTER_CONFIG.find((item) => item.key === group.key);
            if (!config) return null;

            const key = config.key;
            const label = categoryContent[key]?.label || config.label;
            const helper = categoryContent[key]?.helper || config.helper;

            return (
              <section className="filter-category-card" key={key}>
                <button
                  type="button"
                  onClick={() => toggleCategory(key)}
                  className="filter-category-card__header"
                  aria-expanded={!!openCategories[key]}
                  aria-controls={`filter-panel-${key}`}
                >
                  <div className="filter-category-card__header-text">
                    <span className="filter-category-card__title">{label}</span>
                    {helper && (
                      <span className="filter-category-card__helper">
                        {helper}
                      </span>
                    )}
                  </div>

                  <span
                    className={`filter-category-card__arrow ${
                      openCategories[key] ? "open" : ""
                    }`}
                    aria-hidden="true"
                  >
                    ▼
                  </span>
                </button>

                <div
                  id={`filter-panel-${key}`}
                  className={`filter-category-card__body ${
                    openCategories[key] ? "open" : ""
                  }`}
                  role="group"
                  aria-label={`${
                    filterContent?.categoryAriaPrefix || "Filtres"
                  } ${label}`}
                >
                  {renderTags(key, label)}
                </div>
              </section>
            );
          }

          const groupLabel = categoryContent[group.key]?.label || group.label;
          const groupHelper =
            categoryContent[group.key]?.helper || group.helper;

          return (
            <section className="filter-category-card" key={group.key}>
              <button
                type="button"
                onClick={() => toggleCategory(group.key)}
                className="filter-category-card__header"
                aria-expanded={!!openCategories[group.key]}
                aria-controls={`filter-panel-${group.key}`}
              >
                <div className="filter-category-card__header-text">
                  <span className="filter-category-card__title">
                    {groupLabel}
                  </span>
                  {groupHelper && (
                    <span className="filter-category-card__helper">
                      {groupHelper}
                    </span>
                  )}
                </div>

                <span
                  className={`filter-category-card__arrow ${
                    openCategories[group.key] ? "open" : ""
                  }`}
                  aria-hidden="true"
                >
                  ▼
                </span>
              </button>

              <div
                id={`filter-panel-${group.key}`}
                className={`filter-category-card__body filter-category-card__body--stack ${
                  openCategories[group.key] ? "open" : ""
                }`}
                role="group"
                aria-label={`${
                  filterContent?.categoryAriaPrefix || "Filtres"
                } ${groupLabel}`}
              >
                {group.children.map((childKey) => {
                  const childConfig = FILTER_CONFIG.find(
                    (item) => item.key === childKey,
                  );

                  if (!childConfig) return null;

                  const childLabel =
                    categoryContent[childKey]?.label || childConfig.label;
                  const childHelper =
                    categoryContent[childKey]?.helper || childConfig.helper;

                  return (
                    <section
                      className="filter-subcategory"
                      key={`${group.key}-${childKey}`}
                    >
                      <div className="filter-subcategory__head">
                        <p className="filter-subcategory__title">
                          {childLabel}
                        </p>
                        {childHelper && (
                          <p className="filter-subcategory__helper">
                            {childHelper}
                          </p>
                        )}
                      </div>

                      <div className="filter-subcategory__tags">
                        {renderTags(childKey, childLabel)}
                      </div>
                    </section>
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>
    </section>
  );
};

const ProjectsFilter = ({
  onFilterChange,
  projects = [],
  reveal = false,
  revealVariant = "section",
  revealDelay = 0,
  revealThreshold = 0.12,
  revealRootMargin = "0px 0px -8% 0px",
}) => {
  const content = (
    <ProjectsFilterContent
      onFilterChange={onFilterChange}
      projectsData={projects}
    />
  );

  if (!reveal) {
    return content;
  }

  return (
    <RevealOnScroll
      variant={revealVariant}
      delay={revealDelay}
      threshold={revealThreshold}
      rootMargin={revealRootMargin}
    >
      {content}
    </RevealOnScroll>
  );
};

export default ProjectsFilter;