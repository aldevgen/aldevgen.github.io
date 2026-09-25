---
layout: page
type: formation
title: GitHub CI
description: Automatiser les tests d'un projet avec GitHub Actions
category: Versionnage avec Git
visible: false
img: /assets/img/git/github-actions.jpg
tabs: true
mermaid:
  enabled: true
  zoomable: true
---

# Intégration continue

L'intégration continue (CI, _Continuous Integration_) consiste à vérifier automatiquement les changements proposés au projet. Une CI peut installer les dépendances, lancer les tests, vérifier le formatage et construire l'application.

L'objectif est de détecter rapidement une régression, avant la fusion dans `main`.

## GitHub Actions

GitHub Actions exécute des workflows décrits dans des fichiers YAML placés dans `.github/workflows/`. Créez par exemple `.github/workflows/tests.yml` :

> Le workflow ci-dessous s'exécute sur un runner Linux hébergé par GitHub. Il reste donc identique quel que soit le système utilisé sur votre ordinateur.

```yaml
name: Tests

on:
  push:
    branches: [main]
  pull_request:

jobs:
  test:
    runs-on: ubuntu-latest

    steps:
      - name: Récupérer le dépôt
        uses: actions/checkout@v4

      - name: Installer Python
        uses: actions/setup-python@v5
        with:
          python-version: "3.12"

      - name: Installer les dépendances
        run: |
          python -m pip install --upgrade pip
          pip install -r requirements.txt

      - name: Lancer les tests
        run: pytest
```

## Lire un workflow

- `name` est le nom affiché dans l'onglet **Actions**.
- `on` définit les événements qui déclenchent le workflow.
- `jobs` regroupe les tâches exécutées.
- `runs-on` choisit l'environnement d'exécution.
- `steps` décrit les étapes, avec une action `uses` ou une commande `run`.

Chaque exécution est associée à un commit précis, ce qui permet de retrouver le contexte d'un échec.

## Secrets et variables

Les informations sensibles doivent être stockées dans les **Secrets and variables** du dépôt ou de l'organisation :

```yaml
env:
  API_TOKEN: ${{ secrets.API_TOKEN }}
```

Ne faites jamais afficher un secret dans une commande ou un message de debug. Limitez aussi les permissions du jeton au strict nécessaire.

## CI et Pull Requests

Configurez les règles de protection de `main` pour demander le succès du workflow avant fusion. Une CI utile doit être reproductible, suffisamment rapide et explicite lorsqu'un test échoue.

La CI ne remplace pas une revue de code ni les tests manuels nécessaires à l'interface utilisateur.

## Exercice

1. Ajoutez un workflow de test à un dépôt d'exemple.
2. Provoquez volontairement un échec de test et observez le journal dans l'onglet **Actions**.
3. Corrigez le test et vérifiez que le workflow repasse au vert.
4. Ouvrez une Pull Request et vérifiez que le résultat de la CI est visible avant la fusion.

## À retenir

Un workflow GitHub Actions est un fichier versionné comme le code. Chaque modification de ce fichier doit donc être relue avec la même attention qu'une modification applicative.
