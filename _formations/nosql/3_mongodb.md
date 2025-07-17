---
layout: page
title: TP3
description: Introduction à MongoDB
importance: 3
category: BUT 3 - NoSQL
related_publications: false
permalink: /nosql/mongodb/introduction/
type: formation
visible: true
---

## Configuration de la base de données

Pour MongoDB, nous allons utiliser le service [MongoDB Atlas](https://www.mongodb.com/cloud/atlas), qui est un service de base de données cloud géré par MongoDB. Il permet de créer des clusters MongoDB facilement et rapidement, sans avoir à gérer l'infrastructure sous-jacente.

### Création du compte Atlas

Pour cela, nous allons créer un [compte MongoDB Atlas](https://account.mongodb.com/account/register?signedOut=true) afin de pouvoir héberger notre base de données MongoDB pour le TP. Il suffit de remplir le formulaire d'inscription avec votre adresse e-mail et un mot de passe. Vous pouvez également vous inscrire avec votre compte Google ou GitHub.

### Création d'un projet Atlas

> :exclamation: Notations
>
> Dans la suite du TP nous allons utiliser un certain nombre de noms de projet, d'utilisateur et de cluster. **Utilisez les mêmes noms que ceux indiqués** pour éviter toute confusion et faciliter le déroulement du TP. 
>
{: .block-danger }

Une fois que vous avez créé votre compte vous allez pouvoir créer un projet, nommé `but-sd` ici. Ensuite, une page demandera d'ajouter des membres, il n'y a rien à faire. Confirmez simplement la création du projet en cliquant sur **Create project**.

<div class="row justify-content-sm-center" style="width: 85%; margin: 0 auto;">
    {% include figure.liquid path="assets/img/nosql/mongodb/creation-project.png" title="Creation project" class="img-fluid rounded z-depth-1" %}
</div>

### Création d'un utilisateur Atlas

Une fois ceci fait on aura besoin de créer un utilisateur, afin de pouvoir requêter la base de données. Pour cela, dans le menu à gauche, cliquez sur **Database access**.

<div class="row justify-content-sm-center">
    {% include figure.liquid path="assets/img/nosql/mongodb/create-user.png" title="Create user" class="img-fluid rounded z-depth-1" %}
</div>

Une fois sur la page des **Database access** cliquez sur **Add new database user** afin d'ajouter un utilisateur de la base de données. Cela ouvrira un nouvel onglet comme ci-dessous. Il faudra ainsi définir son nom, son mot de passe et son rôle. Dans notre cas, nous appelerons notre utilisateur `user_mongo` et nous générerons le mot de passe aléatoirement en cliquant sur **Autogenerate Secure Password**. Enfin, nous lui assignerons le rôle d'administrateur Atlas.

<div class="row justify-content-sm-center" style="width: 80%; margin: 0 auto;">
    {% include figure.liquid path="assets/img/nosql/mongodb/creation-user.png" title="Creation user" class="img-fluid rounded z-depth-1" %}
</div>

> #### :warning: Mot de passe
>
> Pensez à bien enregistrer le mot de passe dans un endroit sécurisé de votre ordinateur et ne pas le mettre sur un repo public GitHub.
>
{: .block-warning }

Une fois ceci fait vous aurez la vue suivante :
<div class="row justify-content-sm-center">
    {% include figure.liquid path="assets/img/nosql/mongodb/user-created.png" title="User created" class="img-fluid rounded z-depth-1" %}
</div>

### Création d'un cluster Atlas

Maintenant nous pouvons créer un cluster qui hébergera notre base de données.

<div class="row justify-content-sm-center">
    {% include figure.liquid path="assets/img/nosql/mongodb/create-cluster.png" title="Create cluster" class="img-fluid rounded z-depth-1" %}
</div>

Nous prenons l'instance `M0` qui est gratuite et donnons un nom à cette dernière, ici `cluster-but-sd`. Il n'y a pas besoin de changer les autres paramètres.

<div class="row justify-content-sm-center" style="width: 80%; margin: 0 auto;">
    {% include figure.liquid path="assets/img/nosql/mongodb/creation-cluster.png" title="Creation cluster" class="img-fluid rounded z-depth-1" %}
</div>

### Connexion au cluster Atlas

Enfin, la dernière étape consiste à choisir le connecteur à la base de données. Dans notre cas, nous utiliserons l'API Python donc nous sélectionnons **Drivers**.

<div class="row justify-content-sm-center" style="width: 70%; margin: 0 auto;">
    {% include figure.liquid path="assets/img/nosql/mongodb/connection-method.png" title="Connection method" class="img-fluid rounded z-depth-1" %}
</div>

Sur la page suivante nous pouvons choisir le type de Driver, Python dans notre cas.

<div class="row justify-content-sm-center" style="width: 70%; margin: 0 auto;">
    {% include figure.liquid path="assets/img/nosql/mongodb/mongodb-driver.png" title="MongoDB driver" class="img-fluid rounded z-depth-1" %}
</div>

> #### :information_source: Connection string
>
> Pensez à copier la _connection string_, cela nous servira ensuite à nous connecter en Python à la base de données que nous venons de créer.
>
{: .block-example }

## Interrogation des données MongoDB en Python

Pour requêter les données dans notre base de données nous allons utiliser le package [`pymongo`](https://docs.mongodb.com/drivers/pymongo/), que l'on peut installer via :

```bash
pip install pymongo[srv]
```

## Connexion à Compass

Maintenant nous allons pouvoir utiliser le cluster créé sur Atlas. Commençons par se connecter à notre instance.

<div class="row justify-content-sm-center">
    {% include figure.liquid path="assets/img/nosql/mongodb/compass-connection.png" title="Compass connection" class="img-fluid rounded z-depth-1" %}
</div>

La connexion va se faire via la _connection string_ qui peut être trouvée dans la configuration du cluster Atlas.

> #### :warning: Mot de passe
>
> N'oubliez pas de remplacer le mot de passe sur l'image ci-dessous par celui que vous avez enregistré plus haut.
>
{: .block-warning }

<div class="row justify-content-sm-center" style="width: 85%; margin: 0 auto;">
    {% include figure.liquid path="assets/img/nosql/mongodb/compass-add-connection.png" title="Compass add connection" class="img-fluid rounded z-depth-1" %}
</div>

Une fois ceci fait, nous allons créer une base de données appelée `tp` qui contiendra une collection nommée `restaurants`.

<div class="row justify-content-sm-center">
    {% include figure.liquid path="assets/img/nosql/mongodb/create-database.png" title="Create database" class="img-fluid rounded z-depth-1" %}
</div>

## Import des données

Ensuite, il suffit d'importer le fichier JSON qui se situe [ici](https://github.com/alannadevgen/formation-nosql/blob/main/TP/TP1/restaurants.json).

<div class="row justify-content-sm-center">
    {% include figure.liquid path="assets/img/nosql/mongodb/import-data.png" title="Import data" class="img-fluid rounded z-depth-1" %}
</div>

Et voilà, vous êtes prêts à requêter les données ! :tada:
