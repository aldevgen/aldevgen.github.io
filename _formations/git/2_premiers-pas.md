---
layout: page
type: formation
title: Premiers pas avec Git
description: Configuration de Git et création d'un dépôt sur GitHub
category: Versionnage avec Git
visible: true
img: /assets/img/git/first-steps.jpg
tabs: true
toc: true
mermaid:
  enabled: true
  zoomable: true
---

# Créer un compte GitHub

Si vous ne disposez pas encore d'un compte GitHub, rendez-vous sur **[GitHub](https://github.com)** pour en créer un.
Si vous disposez déjà d'un compte GitHub, veuillez vérifier que vous pouvez vous connecter et noter l'adresse e-mail associée à ce compte.
Il est fortement recommandé de configurer l'authentification à deux facteurs (2FA) pour votre compte GitHub et d'utiliser un gestionnaire de mots de passe.

# Créer un nouveau dépôt sur GitHub

La première étape consiste à **créer un nouveau dépôt**.
Il est possible de créer un dépôt localement sans jamais le connecter à un dépôt distant, hébergé sur un service comme GitHub.
Cependant, la méthode la plus courante consiste à créer d'abord un dépôt sur GitHub, puis à le cloner sur l'ordinateur local.

1. Cliquez sur l'icône `+` située en haut à droite.
2. Cliquez sur `New repository`.

{% include figure.liquid loading="eager" path="assets/img/git/github-create-repo.png" title="Create Git repository" class="img-fluid rounded z-depth-2 mx-auto d-block" max-width="600px" %}

## Configurer le dépôt


1. Sélectionner votre nom d'utilisateur GitHub comme Owner.
2. Saisir `mission-spatiale` comme nom du dépôt.
3. Cocher la case `Add README`.
4. Laisser les autres options par défaut :
- le dépôt doit être public ;
- aucun template ne doit être utilisé ;
- aucun fichier `.gitignore` ne doit être sélectionné ;
- aucune licence ne doit être sélectionnée.
5. Cliquer sur le bouton `Create repository`.

{% include figure.liquid loading="eager" path="assets/img/git/github-create-new-repo.png" title="Create Git repository" class="img-fluid rounded z-depth-2 mx-auto d-block" %}

Vous êtes alors redirigé vers le nouveau dépôt `mission-spatiale`.

{% include figure.liquid loading="eager" path="assets/img/git/github-new-repo.png" title="Git repository created" class="img-fluid rounded z-depth-2 mx-auto d-block" %}

# Cloner le dépôt sur l'ordinateur local

Maintenant que le dépôt `mission-spatiale` est créé, il faut le cloner, c'est-à-dire en créer une copie locale sur l'ordinateur. Cette opération peut être réalisée via l'IDE ou dans le terminal.

## Cloner le dépôt via l'IDE

Pour cloner dans PyCharm, il faut d'abord copier l'URL du dépôt. Pour cela, cliquer sur le bouton `Code` puis copier l'URL HTTPS.

{% include figure.liquid loading="eager" path="assets/img/git/git-clone-url.png" title="Git repository created" class="img-fluid rounded z-depth-2 mx-auto d-block" %}

Ensuite, dans PyCharm, cliquer sur `Clone Repository`.

{% include figure.liquid loading="eager" path="assets/img/git/git-clone-in-pycharm.png" title="Git repository created" class="img-fluid rounded z-depth-2 mx-auto d-block" max-width="700px" %}

Cela ouvre une nouvelle fenêtre avec 2 champs :
- l'URL du dépôt dans le champ `URL`
- l'emplacement du dépôt sur l'ordinateur dans le champ `Directory`.

Cliquer ensuite sur `Clone`.

{% include figure.liquid loading="eager" path="assets/img/git/git-clone-url-directory.png" title="Git repository created" class="img-fluid rounded z-depth-2 mx-auto d-block" max-width="700px" %}

## Cloner le dépôt via le terminal

Ouvrir un terminal Bash et se déplacer dans le répertoire où le dépôt doit être cloné (via `cd`), puis exécuter la commande suivante :

```bash
git clone https://github.com/nom-utilisateur/mission-spatiale.git
```
où `nom-utilisateur` doit être remplacé par votre nom d'utilisateur GitHub.

Le dépôt `mission-spatiale` est maintenant ouvert dans l'IDE, avec un terminal Bash prêt à être utilisé. Les premières commandes Git peuvent être saisies.

> :bulb: **À retenir**
> - Créer un nouveau dépôt sur GitHub.
> - Cloner le dépôt sur l'ordinateur en local.
> - Ouvrir le dépôt dans l'IDE.
> - Ouvrir un terminal Bash avec le dépôt.
{:.block-tip}

# Configurer Git

Lorsque Git est utilisé pour la première fois sur un nouvel ordinateur, quelques éléments doivent être configurés.
Les paramètres de base à définir sont notamment :

- le nom de l'utilisateur ;
- l'adresse e-mail ;
- l'éditeur de texte préféré.

Pour commencer, vérifions la configuration actuelle de Git. Ouvrez une fenêtre de terminal et saisissez :

```bash
git config --list
```

## Configurer le nom et l'adresse e-mail

Indiquez d'abord à Git votre nom et votre adresse e-mail.
L'adresse e-mail configurée dans le terminal doit être la même que celle utilisée lors de la création du compte GitHub.

Saisissez les deux commandes suivantes en remplaçant les valeurs par vos propres informations :

```bash
git config --global user.name "Prenom NOM"
git config --global user.email "prenom.nom@mail.com"
```

Si les commandes ont été correctement saisies, le terminal affiche simplement un nouveau prompt, sans message supplémentaire.

Pour vérifier la configuration, utilisez à nouveau la commande suivante :

```bash
git config --list
```

## Configurer l'éditeur de texte

Il est également recommandé de définir l'éditeur de texte par défaut.
Git en a besoin pour certaines opérations.
Par défaut, Git utilise Vim, un éditeur puissant mais difficile à prendre en main lorsqu'on débute.

Comme cette formation utilise PyCharm, nous allons le définir comme éditeur par défaut :

```bash
git config --global core.editor "pycharm --wait"
# ou (sur macOS)
git config --global core.editor "charm --wait"
```
L'option `--wait` demande à Git d'attendre la fermeture du fichier dans l'IDE avant de poursuivre l'opération.

Sous Windows, avec Git Bash, le lanceur peut aussi être `pycharm64.exe` :

```bash
git config --global core.editor "pycharm64.exe --wait"
```

Cette configuration peut être modifiée ultérieurement si nécessaire.

## Choisir le nom de la branche par défaut

Une branche représente une ligne d'évolution du projet. Par défaut, certaines versions de Git utilisent encore le nom `master` lors de la création d'un dépôt avec `git init`.
La communauté du développement privilégie désormais le nom `main`, plus inclusif.
Depuis 2020, la plupart des services d'hébergement de dépôts Git, notamment GitHub et GitLab, utilisent `main` comme branche par défaut.<br>

Pour que les dépôts créés localement utilisent le même nom, configurez Git avec la commande suivante :

```bash
git config --global init.defaultBranch main
```

Cette configuration s'appliquera aux nouveaux dépôts créés avec `git init`. Elle ne renomme pas les branches principales des dépôts déjà existants.

> :bulb: **À retenir**
> 
> Le nom de la branche par défaut doit être cohérent entre le dépôt local et le dépôt distant.
> Dans cette formation, la branche principale s'appelle `main`.
{:.block-tip}