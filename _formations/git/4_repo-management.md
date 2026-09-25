---
layout: page
type: formation
title: Gérer un dépôt distant
description: Synchroniser un dépôt local avec GitHub ou GitLab
category: Versionnage avec Git
visible: false
img: /assets/img/git/git-remote.jpg
tabs: true
mermaid:
  enabled: true
  zoomable: true
---

# Dépôt local et dépôt distant

Un dépôt **local** se trouve sur votre machine. Un dépôt **distant** est hébergé sur une forge et sert de point de partage. Le dépôt distant est généralement nommé `origin`.

```bash
git remote -v
```

Ajoutez ou modifiez une URL distante si nécessaire :

```bash
git remote add origin https://github.com/organisation/mon-projet.git
git remote set-url origin git@github.com:organisation/mon-projet.git
```

## Envoyer ses commits

Après avoir créé des commits localement :

```bash
git push -u origin main
```

L'option `-u` associe la branche locale à la branche distante. Les prochains envois pourront être faits avec `git push`.

Le nom de la branche principale peut être `main` ou un autre nom. Consultez la branche courante avec :

```bash
git branch --show-current
```

## Récupérer les changements

`git fetch` télécharge les nouveaux commits sans modifier votre travail :

```bash
git fetch origin
```

`git pull` télécharge puis intègre généralement les changements distants :

```bash
git pull
```

Avant un `pull`, commitez ou mettez de côté vos modifications locales afin de limiter les conflits.

## HTTPS ou SSH ?

Avec HTTPS, la forge peut demander une authentification via un gestionnaire d'identifiants ou un jeton personnel. Avec SSH, vous associez une clé publique à votre compte. Les commandes suivantes fonctionnent sous Linux, macOS et Windows récent lorsque le client OpenSSH est installé :

```text
ssh-keygen -t ed25519 -C "prenom.nom@example.com"
ssh -T git@github.com
```

Sous Windows, vous pouvez lancer ces commandes dans PowerShell ou Git Bash. Si `ssh-keygen` n'est pas reconnu, installez le composant **OpenSSH Client** dans les fonctionnalités facultatives de Windows ou utilisez HTTPS.

Ne partagez jamais le fichier de clé privée (`id_ed25519`). Seule la clé publique (`id_ed25519.pub`) peut être ajoutée à votre compte.

## Publier un projet existant

```bash
git init
git add .
git commit -m "Initialise le projet"
git branch -M main
git remote add origin git@github.com:organisation/mon-projet.git
git push -u origin main
```

Si le dépôt distant contient déjà un README ou un autre commit, récupérez d'abord son historique. Ne forcez pas un `push` sans comprendre les conséquences.

## Règles de collaboration

- Tirez les changements distants avant de commencer une nouvelle tâche.
- Poussez régulièrement des commits cohérents.
- Ne réécrivez pas l'historique d'une branche partagée avec `git push --force`.
- Utilisez `git push --force-with-lease` uniquement pour une branche personnelle et lorsque c'est nécessaire.

### Exercice

1. Créez un dépôt vide sur une forge.
2. Publiez un projet local avec `git push -u origin main`.
3. Modifiez le README depuis l'interface web, puis récupérez la modification avec `git pull`.
4. Comparez `git fetch` et `git pull` sur un dépôt de test.
