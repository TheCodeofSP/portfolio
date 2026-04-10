# The Code of SP — Développeuse Web Freelance

Portfolio professionnel développé avec React pour présenter mes projets, mon approche et ma manière de concevoir des sites web utiles, clairs et orientés résultats.

Ce projet est à la fois :

* une vitrine pour mes clients
* un terrain d’expression technique
* une démonstration concrète de ma façon de structurer une application front-end

---

## Aperçu

Ce portfolio met en avant :

* mes projets (professionnels, personnels, formation)
* mes offres (création de site & développement freelance)
* mon approche orientée clarté et efficacité
* un système de design multi-univers

L’objectif est simple :
montrer comment un site peut s’adapter à un contexte, une cible et un besoin.

---

## Fonctionnalités principales

### 🎨 Système de thèmes (3 univers)

Le site propose trois identités visuelles :

* Accueillant → humain, éditorial
* Affirmée → technique, dynamique
* Minimaliste → structuré, épuré

Chaque thème adapte :

* couleurs
* composants
* animations
* perception globale

Le thème est persisté côté navigateur.

---

### ⚡ Animation d’introduction

Simulation d’une recherche Google sur mon nom.

Permet :

* de choisir un univers
* de comprendre le concept du site
* ou de passer directement

---

### 🧩 Architecture modulaire

* composants React réutilisables
* contenu piloté via JSON
* hooks personnalisés
* séparation claire UI / data

---

### 🎯 Pages principales

**Home**

* positionnement
* accroche
* sections clés
* mise en avant projets

**Création de site**

* problème client
* solution
* offres
* process
* FAQ

**Développement freelance**

* posture technique
* stack
* façon de travailler

**Projets**

* filtres dynamiques
* catégorisation
* cartes interactives

**Contact**

* formulaire (Formspree)
* disponibilité

---

### ✨ Système d’animations

* animations progressives au scroll
* cohérentes avec chaque thème
* respect de `prefers-reduced-motion`

---

## Stack technique

### Front-end

* React
* React Router
* JavaScript (ES6+)
* SCSS (architecture modulaire)

### Architecture

* hooks personnalisés (`useContent`, `useProjects`)
* contenu JSON centralisé
* design system (tokens + mixins + thèmes)

### Outils

* Vite
* Git / GitHub
* VS Code

---

## Structure du projet

```
src
├── components
│   ├── common
│   ├── home
│   ├── websiteCreation
│   ├── freelanceDevelopment
│   └── projects
│
├── pages
│   ├── Home
│   ├── WebsiteCreation
│   ├── FreelanceDevelopment
│   ├── Projects
│   ├── Contact
│   ├── Legal
│   ├── Privacy
│   └── SiteMap
│
├── hooks
├── utils
├── styles
│   ├── foundations
│   └── univers
│
└── data
```

---

## Installation

Cloner le projet :

```
git clone https://github.com/TheCodeofSP/portfolio.git
```

Installer les dépendances :

```
npm install
```

Lancer le projet :

```
npm run dev
```

Accès :

```
http://localhost:5173
```

---

## Déploiement

Compatible avec :

* Vercel
* Netlify
* GitHub Pages

Le projet utilise actuellement `HashRouter` pour simplifier le déploiement statique.

---

## SEO & accessibilité

### SEO

* balises meta dynamiques
* structure HTML sémantique
* titres hiérarchisés
* contenu structuré

### Accessibilité

* navigation clavier
* labels ARIA
* contrastes adaptés
* gestion des animations réduites

---

## Objectif du projet

Ce portfolio démontre :

* ma capacité à structurer une application React propre
* mon attention à l’expérience utilisateur
* ma capacité à adapter un design à différents contextes
* ma vision d’un site web utile (pas juste esthétique)

---

## Auteur

Sandrine,
Développeuse web freelance

GitHub
https://github.com/TheCodeofSP

LinkedIn
https://www.linkedin.com/in/sandrinepham69132b145
