---
layout: page
type: formation
title: Séance 1
description: Découverte et requêtage des données
category: BUT 3 - SAÉ migration vers NoSQL
visible: true
img: /assets/img/but/but3/sae/radio.jpg
tabs: true
mermaid:
  enabled: true
  zoomable: true
---

# Migration d'une base relationnelle vers NoSQL

> **En bref.** Une webradio indépendante vous confie sa base de données et vous demande de la faire passer d’un modèle relationnel (SQLite) à un modèle NoSQL, **sans rien perdre ni déformer**. Cette première séance pose les fondations de tout le projet : comprendre la base, puis écrire les requêtes qui serviront de test de réussite à la migration.
{: .block-example }

## Contexte

### :studio_microphone: La webradio

Radio Kiosque est une webradio indépendante. Comme toute radio, elle s’organise autour d’une grille de programmes : des **émissions**, présentées par des animateur·ices et réparties sur quatre tranches horaires (matin, après-midi, soirée, nuit). Pendant chaque émission, des **titres** sont diffusés. Les auditeur·ices peuvent de leur côté **demander** un titre à l’antenne. La radio suit enfin le classement de plusieurs **podcasts** dans différents pays.

Toute cette activité est enregistrée dans une base de données SQLite.

### :raising_hand: Le problème

La directrice de la radio, Lucia ORSINI, constate que cette base ne suit plus. Elle veut la migrer vers une base NoSQL, et elle a de bonnes raisons :

- les requêtes de programmation musicale sont **lentes** ;
- des diffusions sont **perdues** quand le serveur plante ;
- chaque nouvelle fonctionnalité demande des **jointures à rallonge**.

Pour une radio, ces défauts ne sont pas qu’un inconfort technique. Une diffusion perdue, c’est une ligne manquante dans la base, mais aussi une déclaration fausse auprès des sociétés de gestion de droits. C’est ce qui rend la migration délicate : elle doit être **fiable**, pas seulement rapide.

### :construction: Les contraintes métier

Au-delà de ces défauts techniques, la radio est soumise à des règles que la nouvelle base devra continuer à permettre de contrôler :

- **Protection du jeune public** : les titres explicites ne doivent pas passer dans les tranches horaires « protégées » (matin et après-midi).
- **Quota de nouveautés** : l’antenne doit diffuser un minimum de titres récents, déterminés par la date de sortie de leur album.
- **Déclaration des diffusions** : pour les sociétés de gestion de droits, il faut pouvoir sortir rapidement, par artiste, le nombre de diffusions et la durée cumulée.

Gardez ces trois règles en tête : vous les retrouverez, traduites en requêtes, dans la dernière partie de cet énoncé.

### :bar_chart: Votre mission

Lucia ORSINI vous confie la migration vers une base NoSQL et met à votre disposition la base actuelle, `RadioKiosque.sqlite`. Son catalogue musical, comme le suivi des podcasts, a été constitué au fil de l’exploitation de la radio.

Mais migrer ne suffit pas : il faut aussi **prouver** que la nouvelle base contient les mêmes informations que l’ancienne et qu’elle répond aux mêmes questions. Toute la méthode du projet est construite autour de cette exigence.

## Méthodologie

Pour cette SAÉ, l’objectif est de migrer vers un format NoSQL à l’aide de Python, en 4 étapes :

1. **Création de requêtes SQL** sur la BD initiale. *Vous obtenez des résultats de référence.*
2. **Réflexion sur le format des données** à obtenir et sur l’algorithme à réaliser.
3. **Écriture du script Python** permettant le passage de SQLite à NoSQL. *Vous obtenez la nouvelle base.*
4. **Réécriture des requêtes initiales** au format NoSQL. *Vous comparez les résultats à la référence pour vérifier que la migration est réussie.*

Le fil conducteur est simple : **on fige d’abord ce que l’on attend, pour pouvoir vérifier ensuite**. C’est pourquoi cette première séance, consacrée à l’étape 1, est la plus importante : les résultats que vous produirez maintenant seront votre test de non-régression jusqu’à la fin du projet.

## La base de données

Avant d’écrire la moindre requête, il faut comprendre ce que contient la base. Le schéma suivant présente ses 11 tables et leurs liens (`PK` désigne une clé primaire, `FK` une clé étrangère).

```mermaid
---
config:
  theme: 'forest'
  look: classic
---
erDiagram
    Albums {
        TEXT album_id PK
        TEXT name
        TEXT album_type
        TEXT release_date
        INTEGER total_tracks
    }
    Artists {
        TEXT artist_id PK
        TEXT name
    }
    Broadcasts {
        INTEGER broadcast_id PK
        INTEGER show_id FK
        TEXT track_id FK
        TEXT played_at
        INTEGER listeners
    }
    Listeners {
        INTEGER listener_id PK
        TEXT pseudo
        TEXT country
        TEXT city
    }
    Shows {
        INTEGER show_id PK
        TEXT title
        TEXT host
        TEXT time_slot
        INTEGER is_protected
    }
    PodcastEpisodes {
        TEXT episode_id PK
        TEXT podcast_id PK, FK
        TEXT name
        TEXT release_date
        INTEGER duration_ms
        INTEGER explicit
        TEXT language
    }
    PodcastRankings {
        TEXT podcast_id PK, FK
        TEXT country PK
        INTEGER rank
        TEXT chart_date
    }
    Podcasts {
        TEXT podcast_id PK
        TEXT name
        TEXT publisher
        TEXT genres
        TEXT languages
        INTEGER total_episodes
        INTEGER explicit
        TEXT media_type
        TEXT match_status
        REAL match_score
    }
    Requests {
        INTEGER request_id PK
        INTEGER listener_id FK
        TEXT track_id FK
        TEXT requested_at
        TEXT status
    }
    TrackArtists {
        TEXT track_id PK, FK
        TEXT artist_id PK, FK
        TEXT role
    }
    Tracks {
        TEXT track_id PK
        TEXT name
        TEXT album_id FK
        INTEGER duration_ms
        INTEGER explicit
        INTEGER track_number
    }
    Tracks ||--o{ Broadcasts : ""
    Shows ||--o{ Broadcasts : ""
    Podcasts ||--o{ PodcastEpisodes : ""
    Podcasts ||--o{ PodcastRankings : ""
    Tracks ||--o{ Requests : ""
    Listeners ||--o{ Requests : ""
    Artists ||--o{ TrackArtists : ""
    Tracks ||--o{ TrackArtists : ""
    Albums ||--o{ Tracks : ""

```

### Comment lire ce schéma

Les tables se regroupent en quatre blocs, qui correspondent aux grandes activités de la radio :

| Bloc | Tables | Ce qu’elles décrivent |
|---|---|---|
| **Catalogue musical** | `Artists`, `Albums`, `Tracks`, `TrackArtists` | Les artistes, leurs albums et leurs titres. `TrackArtists` relie titres et artistes : un titre peut avoir plusieurs artistes (un principal et des invités) et un artiste plusieurs titres. |
| **Antenne** | `Shows`, `Broadcasts` | Les émissions (animateur·ice, tranche horaire, protégée ou non) et chaque diffusion d’un titre dans une émission. |
| **Public** | `Listeners`, `Requests` | Les auditeur·ices et les titres qu’ils et elles ont demandés. |
| **Podcasts** | `Podcasts`, `PodcastEpisodes`, `PodcastRankings` | Les podcasts suivis, leurs épisodes et leur rang dans le classement de chaque pays. |

Un podcast est **programmable** si, à la fois :
- il est classé dans le **top 10** d’**au moins un pays** ;
- sa fiche est **fiable** (cf. `match_status`) ;
- le podcast n’est **pas explicite**.

## Préparation de la migration

### Récupération du template et des données

Un notebook est mis à disposition pour réaliser cette séance.
Pour récupérer le template, vous allez réaliser un fork du projet [GitHub](https://github.com/aldevgen/but3-formation-nosql-sae).
Ainsi, cliquez sur `Fork` en haut à droite.

> :warning: Le fork du projet doit être fait par **un seul membre du binôme**.
{:.block-warning}

{% include figure.liquid loading="eager" path="assets/img/but/but3/sae/git-fork.png" title="Git" class="img-fluid rounded z-depth-1 mx-auto d-block" %}

Ensuite, renommer le repo avec le format `sae-groupeXX`, par exemple : `sae-groupe06`.
Vous pouvez retrouver votre numéro de groupe sur Moodle (*SF15Y520 SAÉ Migration de données vers ou depuis NoSQL*) dans le fichier `Composition des groupes`.

{% include figure.liquid loading="eager" path="assets/img/but/but3/sae/git-create-fork.png" title="Git" class="img-fluid rounded z-depth-1 mx-auto d-block" %}

Une fois ceci fait, vous allez pouvoir ajouter votre binôme au repo. 
Pour cela, allez dans les paramètres et sélectionnez le menu `Collaborators` puis cliquez sur `Add people`.

{% include figure.liquid loading="eager" path="assets/img/but/but3/sae/git-add-collaborators.png" title="Git" class="img-fluid rounded z-depth-1 mx-auto d-block" %}

Cela va ensuite ouvrir un menu où vous pouvez saisir le nom d'utilisateur de votre binôme.

{% include figure.liquid loading="eager" path="assets/img/but/but3/sae/git-add-people-to-repo.png" title="Git" class="img-fluid rounded z-depth-1 mx-auto d-block" %}

Ouvrez un terminal et tapez les commandes suivantes en adaptant selon votre besoin.

```bash
cd NoSQL/
git clone <URL>
cd sae-groupe<XX>
pip install notebook
jupyter notebook
```

### Exploration de la base

Vous connaissez maintenant le contexte, la méthode et les données : il est temps d’écrire les requêtes de l’étape 1.
Elles ont un double rôle. Elles vous font **explorer la base**, et elles serviront de **test de réussite de la migration**.
La migration sera réussie si les résultats sont identiques.

Pour commencer, exécutez quelques requêtes de découverte (compter les lignes de chaque table, afficher quelques titres explicites…) avant d’attaquer les requêtes de l’énoncé.

Deux consignes pratiques en découlent :

- Pour chaque requête, **faites un choix d’ordonnancement du résultat** s’il n’est pas précisé ou naturel, et notez-le. Cela permettra de mieux comparer les résultats après migration.
- Pour certaines requêtes, il sera nécessaire de **réorganiser le résultat avec du code Python** après l’exécution de la requête SQL.

### Requêtage des données

Pour chaque requête, conserver le résultat dans un fichier CSV dans un dossier `references`.
Pour la question 1, sauvegarder les données dans un fichier `references/q1.csv` et ainsi de suite pour les autres requêtes.

1. Lister les auditeur·ices n’ayant jamais effectué de demande musicale.
2. Pour chaque animateur·ice, indiquer le nombre d’émissions, le nombre de diffusions et la durée totale diffusée.
3. Pour chaque tranche horaire, indiquer le nombre de diffusions et le nombre de titres explicites diffusés.
4. Pour chaque titre, indiquer le nombre de diffusions, l’audience cumulée et le nombre d’émissions différentes où il a été programmé.
5. Pour chaque artiste, indiquer le nombre de titres au catalogue, le nombre de diffusions et la durée cumulée diffusée.
6. Présenter le nombre de diffusions sous forme de tableau croisé entre la décennie de sortie de l’album et la tranche horaire.
7. Présenter l’audience cumulée sous forme de tableau croisé entre la décennie de sortie de l’album et la tranche horaire.
8. Parmi les titres diffusés au moins trois fois, lister les dix titres ayant la plus forte audience moyenne par diffusion. Trier par l’audience moyenne.
9. Lister chaque diffusion d’un titre explicite dans une émission protégée, avec le titre, l’identifiant de l’émission et l’horodatage.
10. Lister les albums dont tous les titres ont été diffusés au moins une fois.
11. Pour chaque pays, indiquer le nombre de podcasts classés, le nombre de podcasts explicites et le nombre de podcasts dont la fiche est fiable. 
12. Lister les podcasts programmables, avec leur nom, leur éditeur, le nombre de pays dans le top 10 desquels ils figurent et leur meilleur rang. Trier du plus présent au moins présent, puis par meilleur rang. 
13. Pour chaque podcast programmable, indiquer le nombre d’épisodes connus, la durée moyenne de ses épisodes (en minutes) et la date de son dernier épisode. Ne garder que les podcasts dont la durée moyenne ne dépasse pas une heure.

Les quatre premières requêtes vous font parcourir la base : une simple liste, puis des regroupements de plus en plus riches.
Pour chacune, demandez-vous quelles tables elle traverse, car cette réflexion vous servira directement à l’étape 2.

La requête 5 répond au besoin de déclaration auprès des sociétés de gestion de droits.
Les requêtes 6 et 7 s’appuient sur la date de sortie des albums, la même information qui permet de définir une nouveauté. Les tableaux croisés des requêtes 6 et 7 se construisent plus facilement en deux temps : une requête SQL, puis une réorganisation du résultat avec `pandas`.

Les requêtes 9 et 10 servent à contrôler l’antenne.
La requête 9 est celle qui intéresse le plus la directrice : elle détecte les infractions à la protection du jeune public.
La requête 10 vérifie dans quelle mesure le catalogue est réellement exploité, et c’est la plus délicate des dix.

Les trois dernières questions ont pour objectif de développer la nouvelle offre de podcasts pour la saison prochaine.
En effet, Lucia ORSINI, souhaite développer une nouvelle antenne exclusivement basée sur les podcasts.
Pour cela, elle a demandé au service informatique de collecter des données sur les podcasts afin de programmer les podcasts les plus populaires.



## À l’issue de la séance

Cette première étape de découverte des données est maintenant finie.

Vous devriez avoir les fichiers suivants : 

- Un **notebook Jupyter** contenant les requêtes SQL.
- Les **résultats de chaque requête ** conservés dans des fichiers CSV. Ces fichiers serviront plus tard pour s'assurer de la bonne migration des données.

Une fois ces requêtes écrites et leurs résultats mis de côté, vous disposez de tout ce qu’il faut pour passer à l’étape 2 : réfléchir au format des documents NoSQL qui permettra de répondre à ces mêmes questions.