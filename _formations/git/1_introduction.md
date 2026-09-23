---
layout: page
type: formation
title: Introduction à Git
description: Comprendre le versionnage et les concepts fondamentaux de Git et GitHub
category: Versionnage avec git
visible: true
img: /assets/img/git/git-logo.png
tabs: true
mermaid:
  enabled: true
  zoomable: true
---

# Objectifs

L'objectif de cette séquence est de présenter les concepts et commandes essentiels de Git.
Nous verrons comment créer un dépôt sur GitHub, puis utiliser un IDE pour cloner ce dépôt, effectuer des modifications en local et pousser ces modifications vers le dépôt GitHub distant.

À l'issue de cette séance, vous serez capable de :

- expliquer le rôle d'un gestionnaire de versions ;
- distinguer Git d'une forge comme GitHub ou GitLab ;
- décrire les états principaux d'un fichier suivi par Git ;
- configurer Git pour créer vos premiers commits.

# Qu'est-ce qu'un logiciel de gestion de versions ?

Un **logiciel de gestion de versions** (ou *VCS* en anglais, pour version control system) désigne un ensemble de logiciels permettant d'enregistrer les modifications apportées aux fichiers d'un dossier sur un ordinateur.
Ils sont utilisés pour collaborer dans des environnements de recherche, dans le milieu universitaire ainsi que dans les entreprises. 
Les VCS fonctionnent particulièrement bien avec les fichiers texte, comme les documents ou le code informatique.

Un logiciel de gestion de versions permet d'enregistrer et de suivre des ensembles de modifications apportées aux fichiers d'un ordinateur.
Ces modifications peuvent ensuite être analysées et partagées avec d'autres personnes.

## Quels sont les avantages de la gestion de versions ?

- **Collaboration** : permet de définir des méthodes de travail formelles pour collaborer et partager des textes ou du code. Par exemple, la fusion de modifications provenant de différentes personnes permet de créer collectivement des documents et des logiciels au sein d'équipes distribuées.
- **Versionnage** : l'historique détaillé et rigoureux des modifications apportées à un fichier évite de multiplier les copies renommées comme `v1`, `v2` ou `version_finale`.
- **Retour en arrière** : permet d'annuler rapidement un ensemble de modifications. Cette possibilité est utile lorsque de nouveaux textes ou ajouts de code introduisent des problèmes.
- **Compréhension** : aide à comprendre comment un code ou un texte a été construit, qui a écrit ou modifié certaines parties et à qui demander de l'aide pour mieux le comprendre.
- **Sauvegarde** : permet de stocker le code et les textes sur plusieurs ordinateurs.

Dans ce cadre, nous allons découvrir un outil de gestion de versions très répandu : **Git** !

{% include figure.liquid loading="eager" path="assets/img/git/phd-comics.png" title="Git" class="img-fluid rounded z-depth-2 mx-auto d-block" max-width="500px" %}


## Qu'est-ce que Git et GitHub ?

Les termes Git et GitHub sont souvent employés l'un pour l'autre, mais ils désignent deux choses légèrement différentes.

### Git

Git est l'un des systèmes de gestion de versions les plus utilisés au monde.
C'est un **outil libre et gratuit** qui peut être installé sur un ordinateur pour **enregistrer toutes les modifications** apportées au fil du temps à un ensemble de fichiers.
Cet ensemble de fichiers est appelé un dépôt Git, ou **repo** en abrégé.

Git peut être utilisé seul, sur un ordinateur, pour gérer localement les versions de fichiers.
Il devient toutefois particulièrement puissant lorsqu'il sert à coordonner le travail simultané de plusieurs personnes.

Plutôt que d'envoyer des documents par e-mail avec des modifications suivies et des commentaires, puis de renommer les différentes versions (`exemple.txt`, `exempleV2.txt`, `exempleV3.txt`), Git permet d'enregistrer toutes ces informations directement avec le document.
On appelle cet enregistrement un **commit**.

Il devient alors facile d'obtenir une vue d'ensemble des modifications effectuées au fil du temps en consultant l'historique du fichier.
Les versions précédentes restent conservées dans leur état d'origine : elles ne sont pas écrasées et peuvent être restaurées à tout moment.

Une fois installé, Git s'utilise depuis l'invite de commandes ou Git Bash sous Windows, et depuis le Terminal sous macOS ou Linux.

### GitHub

GitHub est un site web populaire qui permet d'**héberger et de partager des dépôts Git à distance**.
Il propose une interface web ainsi que différentes fonctionnalités et services, gratuits ou payants, pour travailler avec ces dépôts.

La majorité des contenus hébergés sur GitHub sont des logiciels libres.
GitHub est également utilisé pour d'autres projets, comme des revues en libre accès, par exemple le Journal of Open Source Software, des blogs ou des manuels régulièrement mis à jour.

GitHub n'est pas le seul service d'hébergement de dépôts Git. GitLab, Bitbucket et Gitee proposent également des fonctionnalités similaires.

### Visualiser des modifications avec Git

Les systèmes de gestion de versions partent d'une version de base du document, puis enregistrent uniquement les modifications effectuées à chaque étape.

Une comparaison possible consiste à imaginer une cassette vidéo :

1. on commence avec le document d'origine ;
2. chaque modification est enregistrée à la suite de la précédente ;
3. en « rembobinant » jusqu'au document de base, puis en rejouant les modifications, on obtient la version la plus récente.

#### Les modifications sont enregistrées séquentiellement

Les modifications sont enregistrées séparément du document lui-même.
Il devient alors possible de « rejouer » différents ensembles de modifications à partir du même document de base pour obtenir différentes versions du document.

Par exemple, deux personnes peuvent effectuer indépendamment des modifications à partir d'un même document.

{% include figure.liquid loading="eager" path="assets/img/git/git-play-changes.svg" title="Git play changes" class="img-fluid rounded z-depth-2 mx-auto d-block" max-width="600px" %}

#### Différentes versions peuvent être conservées

Chaque personne peut enregistrer sa propre série de modifications sans écraser le document de base ni le travail de l'autre.

{% include figure.liquid loading="eager" path="assets/img/git/git-versions.svg" title="Git versions" class="img-fluid rounded z-depth-2 mx-auto d-block" max-width="500px" %}

#### Plusieurs versions peuvent être fusionnées

Lorsque les modifications ne concernent pas les mêmes parties du document, Git peut appliquer plusieurs séries de changements au même document de base. Il est alors possible de fusionner les différentes versions pour obtenir un document commun.

Si deux modifications sont incompatibles, Git détecte un **conflit**. Il faut alors examiner les changements concernés et choisir ou réécrire la version à conserver.

{% include figure.liquid loading="eager" path="assets/img/git/git-merge.svg" title="Git merge" class="img-fluid rounded z-depth-2 mx-auto d-block" max-width="500px" %}

## Terminologie de Git

L'un des principaux obstacles lorsque l'on débute avec Git est de comprendre le vocabulaire nécessaire pour exécuter les commandes.
Certains termes utilisés par Git correspondent à des mots courants en anglais, tandis que d'autres sont moins intuitifs.

La meilleure façon d'apprendre la terminologie de Git est de l'utiliser.
Elle se compose notamment de verbes comme `add`, `commit` et `push`, généralement précédés du mot `git`.
C'est ce que nous allons faire au cours de cette formation : les commandes seront expliquées progressivement, avec la création d'un nouveau projet versionné.

Dans un terminal, les commandes Git suivent généralement cette structure :

```bash
git verbe options
```

- `git` indique que la commande utilise Git ;
- `verbe` correspond à l'opération à effectuer ;
- `options` fournit des informations supplémentaires et facultatives.

Par exemple :

```bash
git add notes.txt
```

Ici, `add` est le verbe et `notes.txt` indique le fichier concerné.

> :bulb: **Points essentiels**
> - La gestion de versions permet de suivre les modifications apportées aux fichiers et aux projets.
> - Git et GitHub sont deux outils différents.
> - Les commandes Git suivent généralement la forme `git verbe options`.
{:.block-tip}


<!---

## Le modèle de travail de Git

Git distingue trois zones :

1. **L'arbre de travail** : les fichiers que vous modifiez.
2. **La zone d'index** (_staging area_) : les changements sélectionnés pour le prochain commit.
3. **L'historique** : les commits déjà enregistrés dans le dépôt.


Un commit est un instantané cohérent du projet. Il possède un identifiant, un auteur, une date et un message.

### La métaphore de la photo

Imaginez que votre projet soit une scène que vous souhaitez photographier :

1. **L'arbre de travail**, c'est la scène réelle : vous déplacez les objets et modifiez le décor en travaillant sur vos fichiers.
2. **Le stage (`git add`)**, c'est le moment où vous préparez le cadre : vous choisissez précisément ce qui doit apparaître sur la photo.
3. **Le commit (`git commit`)**, c'est le moment où vous appuyez sur le bouton : Git prend une photo de la sélection préparée et l'ajoute à l'album de l'historique.
4. **L'historique**, c'est l'album de photos : vous pouvez consulter les différents états du projet et retrouver une photo précédente.

Modifier un fichier après `git add` ne modifie pas automatiquement la photo préparée : il faut refaire `git add` pour mettre à jour le cadre avant le commit.

## Installer et configurer Git

```bash
git --version
git config --global user.name "Prénom Nom"
git config --global user.email "prenom.nom@example.com"
git config --global --list
```

L'adresse utilisée doit correspondre à celle associée à votre compte de forge si vous souhaitez que vos commits soient correctement attribués.

## Vocabulaire essentiel

- **commit** : enregistrement d'un état du projet ;
- **branche** : ligne d'évolution indépendante du projet ;
- **HEAD** : position courante dans l'historique ;
- **remote** : nom donné à un dépôt distant, généralement `origin` ;
- **clone** : création d'une copie locale d'un dépôt distant ;
- **merge** : fusion de deux historiques ;
- **diff** : comparaison entre deux états.

## Bonnes pratiques

- Faites des commits petits et cohérents.
- Écrivez des messages explicites : `Ajoute la validation du formulaire`.
- Ne versionnez jamais de mots de passe, de clés API ou de secrets.
- Ajoutez un fichier `.gitignore` avant le premier commit si le projet génère des fichiers temporaires.

### Exercice

1. Installez Git et vérifiez sa version.
2. Configurez votre nom et votre adresse e-mail.
3. Expliquez la différence entre Git et GitHub.
4. Identifiez les trois zones de Git dans le schéma précédent.

--->
