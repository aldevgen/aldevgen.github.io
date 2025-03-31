---
layout: page
title: Datastax Astra
description: Création d'une base de données Cassandra sur DataStax Astra
importance: 1
category: "Cnam CS103 - Bases de données à grande échelle"
permalink: /cnam/cassandra/database
type: formation
visible: true
mermaid:
  enabled: true
  zoomable: true
---

# Initialisation d'une base de données Cassandra

## Création d'un compte DataStax

Nous allons créer un [compte DataStax](https://astra.datastax.com/signup) afin de pouvoir héberger une base de données Apache Cassandra.

Une fois votre compte créé, vous allez pouvoir créer une base de données. Pour cela, cliquez sur l'onglet **Databases** puis sur **Create Database**.

{% include figure.liquid loading="eager" path="assets/img/cnam/create-database.png" title="Create database" class="img-fluid rounded z-depth-1" %}


Cela vous amènera sur une page où vous pourrez choisir le type de base de données que vous souhaitez créer. Sélectionnez **Serverless (Non-Vector)** puis renseignez, comme indiqué ci-dessous. :warning: Attention à ne pas changer le provider (AWS par défaut).

- **Nom de la base de données** : `cnam`
- **Nom du keyspace** : `health`
- **Région** : `eu-west-1`

{% include figure.liquid loading="eager" path="assets/img/cnam/creating-database.png" title="Creating database" class="img-fluid rounded z-depth-1" %}

La création de la base de données prend quelques minutes. Pendant ce temps, retournons sur le cours.

Une fois l'initialisation terminée, vous pourrez accéder à la console CQL.

{% include figure.liquid loading="eager" path="assets/img/cnam/describe-keyspace.png" title="CQL console" class="img-fluid rounded z-depth-1" %}

Je vous conseille d'écrire les requêtes dans un fichier et de les copier/coller dans le terminal. Cela vous permettra de les réutiliser plus facilement.

> :warning: **Création de keyspace**
> 
> Sur DataStax il n'est pas possible de créer/modifier/supprimer un keyspace via les commandes CQL. Pour cela, vous devrez passer par l'interface web.
{: .block-warning }

{% include figure.liquid loading="eager" path="assets/img/cnam/create-keyspace.png" title="Create keyspace" class="img-fluid rounded z-depth-1" %}


