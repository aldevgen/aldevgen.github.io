---
layout: page
type: formation
title: Flux de travail
description: Organiser son travail avec les branches et les fusions
category: Versionnage avec git
visible: false
img: /assets/img/git/workflow.jpg
tabs: true
mermaid:
  enabled: true
  zoomable: true
---

# Travailler avec des branches

Une branche permet de développer une fonctionnalité, corriger un défaut ou expérimenter sans modifier directement `main`.

```bash
git switch main
git pull
git switch -c ajoute-recherche
```

Travaillez ensuite normalement :

```bash
git add .
git commit -m "Ajoute la recherche par titre"
git push -u origin ajoute-recherche
```

`git branch` liste les branches locales. Pour supprimer une branche déjà fusionnée :

```bash
git branch -d ajoute-recherche
```

## Une stratégie simple

Pour un petit projet :

1. `main` contient une version stable.
2. Chaque tâche est développée dans une branche courte.
3. Les commits sont poussés vers la forge.
4. Une Pull Request est ouverte vers `main`.
5. La revue et les tests sont terminés avant la fusion.

Évitez les branches très longues : elles accumulent des divergences et rendent l'intégration difficile.

## Fusionner une branche

Depuis `main`, récupérez les changements puis fusionnez :

```bash
git switch main
git pull
git merge ajoute-recherche
git push
```

La forge peut aussi effectuer la fusion après validation d'une Pull Request.

## Comprendre un conflit

Un conflit apparaît lorsque Git ne peut pas choisir automatiquement entre deux modifications incompatibles :

```text
[début de la version présente sur main]
version présente sur main
[séparateur entre les deux versions]
version présente dans la branche
[fin de la version présente dans la branche]
```

Pour résoudre le conflit, conservez la version correcte, supprimez les marqueurs, puis :

```bash
git status
git add fichier-concerne
git commit -m "Résout le conflit dans le fichier"
```

Pour abandonner une fusion en cours :

```bash
git merge --abort
```

## Merge ou rebase ?

`git merge` conserve les deux lignes d'historique et crée parfois un commit de fusion. `git rebase` rejoue vos commits au-dessus d'une nouvelle base et produit un historique linéaire.

Pour débuter, utilisez `merge` sur les branches partagées. Un rebase peut être utile sur une branche personnelle :

```bash
git switch ajoute-recherche
git fetch origin
git rebase origin/main
```

Après un rebase, l'historique local a changé. Si un push est nécessaire sur votre branche personnelle, préférez :

```bash
git push --force-with-lease
```

## Exercice

1. Créez une branche `ajoute-documentation`.
2. Faites deux commits cohérents sur cette branche.
3. Modifiez la même ligne dans `main` et dans la branche.
4. Fusionnez les branches et résolvez le conflit.
5. Vérifiez l'historique avec `git log --oneline --graph --all`.
