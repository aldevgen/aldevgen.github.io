---
layout: page
type: formation
title: Pré-requis MongoDB
description: Installation et configuration de MongoDB
category: BUT 3 - Des bases de données distribuées au NoSQL
visible: true
img: /assets/img/mongodb.png
tabs: true
mermaid:
  enabled: true
  zoomable: true
---


# Installation et configuration MongoDB

## Configuration de la base de données

### Création du compte Atlas

Nous allons créer un [compte Atlas](https://account.mongodb.com/account/register?signedOut=true) afin de pouvoir héberger une base de données MongoDB.

### Création d'un projet Atlas

Une fois que vous avez créé votre compte vous allez pouvoir créer un projet, nommé `but-sd` ici. Ensuite, une page demandera d'ajouter des membres, il n'y a rien à faire. Confirmez simplement la création du projet en cliquant sur **Create project**.

{% include figure.liquid loading="eager" path="assets/img/but/but3/nosql/creation-project.png" title="MongoDB" class="img-fluid rounded z-depth-1 mx-auto d-block" max-width="650px"%}

### Création d'un utilisateur Atlas

Une fois ceci fait on aura besoin de créer un utilisateur, afin de pouvoir requêter la base de données. Pour cela, dans le menu à gauche, cliquez sur **Database access**.

{% include figure.liquid loading="eager" path="assets/img/but/but3/nosql/create-user.png" title="MongoDB" class="img-fluid rounded z-depth-1 mx-auto d-block"%}

Une fois sur la page des **Database access** cliquez sur **Add new database user** afin d'ajouter un utilisateur de la base de données. Cela ouvrira un nouvel onglet comme ci-dessous. Il faudra ainsi définir son nom, son mot de passe et son rôle. Dans notre cas, nous appelerons notre utilisateur `user_mongo` et nous générerons le mot de passe aléatoirement en cliquant sur **Autogenerate Secure Password**. Enfin, nous lui assignerons le rôle d'administrateur Atlas.

{% include figure.liquid loading="eager" path="assets/img/but/but3/nosql/creation-user.png" title="MongoDB" class="img-fluid rounded z-depth-1 mx-auto d-block" max-width="650px"%}

> Pensez à bien enregistrer le mot de passe dans un endroit sécurisé de votre ordinateur et ne pas le mettre sur un repo public GitHub.
{:.block-warning}

Une fois ceci fait vous aurez la vue suivante : 

{% include figure.liquid loading="eager" path="assets/img/but/but3/nosql/user-created.png" title="MongoDB" class="img-fluid rounded z-depth-1 mx-auto d-block"%}

### Création d'un cluster Atlas

Maintenant nous pouvons créer un cluster qui hébergera notre base de données.

{% include figure.liquid loading="eager" path="assets/img/but/but3/nosql/create-cluster.png" title="MongoDB" class="img-fluid rounded z-depth-1 mx-auto d-block"%}

Nous prenons l'instance M0 qui est gratuite et donnons un nom à cette dernière, ici `cluster-but-sd`. Il n'y a pas besoin de changer les autres paramètres.

{% include figure.liquid loading="eager" path="assets/img/but/but3/nosql/creation-cluster.png" title="MongoDB" class="img-fluid rounded z-depth-1 mx-auto d-block" max-width="650px"%}

### Connexion au cluster Atlas

Enfin, la dernière étape consiste à choisir le connecteur à la base de données. Dans notre cas, nous utiliserons l'API Python donc nous sélectionnons **Drivers**.

{% include figure.liquid loading="eager" path="assets/img/but/but3/nosql/connection-method.png" title="MongoDB" class="img-fluid rounded z-depth-1 mx-auto d-block" max-width="650px"%}

Sur la page suivante nous pouvons choisir le type de Driver, Python dans notre cas.

{% include figure.liquid loading="eager" path="assets/img/but/but3/nosql/mongodb-driver.png" title="MongoDB" class="img-fluid rounded z-depth-1 mx-auto d-block" max-width="650px"%}

> Pensez à copier la *connection string*, cela nous servira ensuite à nous connecter en Python à la base de données que nous venons de créer.
{:.block-example}

## Installation de MongoDB Compass

Pour visualiser les données de notre base de données, nous allons installer [MongoDB Compass](https://downloads.mongodb.com/compass/mongodb-compass-1.44.7-win32-x64.exe). Pour cela, cliquez sur le lien et suivez les instructions d'installation.

## Connexion à MongoDB Compass

Maintenant nous allons pouvoir utiliser le cluster créé sur Atlas. Commençons par se connecter à notre instance.

{% include figure.liquid loading="eager" path="assets/img/but/but3/nosql/compass-connection.png" title="MongoDB" class="img-fluid rounded z-depth-1 mx-auto d-block" max-width="650px"%}

La connexion va se faire via la *connection string* qui peut être trouvée dans la configuration du cluster Atlas. 

> N'oubliez pas de remplacer le mot de passe sur l'image ci-dessous par celui que vous avez enregistré plus haut.
{:.block-warning}

{% include figure.liquid loading="eager" path="assets/img/but/but3/nosql/compass-add-connection.png" title="MongoDB" class="img-fluid rounded z-depth-1 mx-auto d-block" max-width="650px"%}

Une fois ceci fait, nous allons créer une base de données appelée `tp` qui contiendra une collection nommée `restaurants`.

{% include figure.liquid loading="eager" path="assets/img/but/but3/nosql/create-database.png" title="MongoDB" class="img-fluid rounded z-depth-1 mx-auto d-block"%}

## Import des données

Ensuite, il suffit d'importer le fichier JSON qui se situe [ici](https://github.com/aldevgen/data/blob/main/json/restaurants.json).

{% include figure.liquid loading="eager" path="assets/img/but/but3/nosql/import-data.png" title="MongoDB" class="img-fluid rounded z-depth-1 mx-auto d-block"%}

