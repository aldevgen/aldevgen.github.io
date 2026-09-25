---
layout: page
type: formation
title: Collaboration sur un repo
description: Utiliser GitHub ou GitLab pour collaborer sur un projet
category: Versionnage avec Git
visible: false
img: /assets/img/git/version-control.jpg
tabs: true
mermaid:
  enabled: true
  zoomable: true
---

# Une forge pour collaborer

Une forge logicielle complète Git avec des outils de collaboration :

- dépôt distant et gestion des droits ;
- tickets (_issues_) pour décrire les tâches et les anomalies ;
- demandes de fusion (_pull requests_ ou _merge requests_) ;
- revue de code ;
- documentation et automatisation.

GitHub et GitLab proposent des fonctionnalités proches, même si leur interface et leur vocabulaire diffèrent.

## Le fichier README

Le `README.md` est la première page d'un dépôt. Il doit présenter le but du projet, les prérequis, l'installation, l'utilisation et la manière de contribuer.

````markdown
# Nom du projet

Description en une ou deux phrases.

## Installation

```bash
git clone https://github.com/organisation/projet.git
```

## Utilisation

Expliquez ici la commande principale.

```

```
````

## Ignorer les fichiers inutiles

Le fichier `.gitignore` indique à Git quels fichiers ne doivent pas être suivis :

```gitignore
.venv/
__pycache__/
.env
dist/
build/
```

Un `.gitignore` ne retire pas un fichier déjà commité. Dans ce cas, retirez-le de l'index sans le supprimer localement :

```bash
git rm --cached .env
git commit -m "Retire le fichier de configuration local"
```

Si un secret a été publié, considérez-le comme compromis : révoquez-le et remplacez-le. Effacer le fichier dans un nouveau commit ne suffit pas à supprimer son contenu de l'historique.

## Tickets et demandes de fusion

Un ticket doit décrire un besoin précis. Donnez un contexte, les étapes pour reproduire un problème et le résultat attendu.

Une demande de fusion (_Pull Request_ sur GitHub, _Merge Request_ sur GitLab) propose d'intégrer une branche dans une autre. Elle doit expliquer le problème traité, la solution choisie et les tests réalisés.

Une revue de code vérifie le comportement, les cas limites, la lisibilité et les risques de régression, pas seulement le style.

## Les droits d'accès

Accordez le niveau de permission minimal nécessaire. N'ajoutez pas de jeton personnel dans le dépôt, les issues ou les logs de CI. Utilisez les secrets de la forge pour les valeurs sensibles.

## Exercice

1. Créez un dépôt de démonstration avec un README.
2. Ajoutez un `.gitignore` adapté à votre langage.
3. Ouvrez un ticket décrivant une amélioration.
4. Créez une branche pour cette amélioration et ouvrez une demande de fusion.
5. Demandez une revue à une autre personne et répondez à ses commentaires.

## À retenir

La forge ne remplace pas Git : elle fournit un espace partagé et des outils pour organiser le travail autour des dépôts Git.
