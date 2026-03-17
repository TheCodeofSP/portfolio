export const FILTER_CONFIG = [
  {
    key: "impactTags",
    label: "Impact / besoin",
    helper: "Explorer les projets selon leur objectif",
  },
  {
    key: "stackPrincipale",
    label: "Stack principale",
    helper: "Voir rapidement les grandes familles techniques",
  },
  {
    key: "languages",
    label: "Langages",
    helper: "Technologies de base utilisées dans les projets",
  },
  {
    key: "frameworks",
    label: "Frameworks / bibliothèques",
    helper: "Outils de structuration et librairies principales",
  },
  {
    key: "outilsDev",
    label: "Outils de développement",
    helper: "Environnement, build, qualité et workflow",
  },
];

export const buildEmptyFilters = () => ({
  impactTags: [],
  stackPrincipale: [],
  languages: [],
  frameworks: [],
  outilsDev: [],
});

export const normalizeValues = (value) => {
  if (!value) return [];
  if (Array.isArray(value)) return value.filter(Boolean);
  return [value].filter(Boolean);
};

export const matchesProjectFilters = (project, filters) => {
  return FILTER_CONFIG.every(({ key }) => {
    if (!filters[key]?.length) return true;

    const values = normalizeValues(project[key]);
    return values.some((value) => filters[key].includes(value));
  });
};