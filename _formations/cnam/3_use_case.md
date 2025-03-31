---
layout: page
title: Cas pratique
description: Utilisation d'Apache Cassandra sur des données de santé
importance: 3
category: "Cnam CS103 - Bases de données à grande échelle"
permalink: /cnam/cassandra/usecase
type: formation
visible: true
mermaid:
  enabled: true
  zoomable: true
---

# Cas pratique avec Apache Cassandra

Apache Cassandra est un système de gestion de base de données distribuée open-source conçu pour gérer de grandes quantités de données à travers de nombreux serveurs sans point de défaillance. Il est idéal pour les applications nécessitant une haute disponibilité, une scalabilité horizontale et une performance constante.

## Objectif

L'objectif de ce TP est de se familiariser avec la base de données `Apache Cassandra` en réalisant les tâches suivantes :
1. Création d'un keyspace et d'une table
2. Insertion de données 
3. Requêtes sur les données
4. Suppression de données
5. Mise à jour de données

[//]: # (6. Création d'un index)

## Place à la pratique

### Présentation des données

Les données que nous allons utiliser sont des données de santé qui portent sur des cas médicaux et des patients.

### Requêtage des données


:tada: Bravo, vous venez de requêter des données de santé stockées dans une base de données Apache Cassandra avec CQL !

> :exclamation: Avant de finir, n'oubliez pas de supprimer la base de données pour ne pas consommer de ressources inutilement. Pour cela, il suffit d'aller dans `Settings > Terminate Database`
{: .block-danger }

Cliquer sur l'onglet `Settings`
{% include figure.liquid loading="eager" path="assets/img/cnam/settings.png" title="Settings" class="img-fluid rounded z-depth-1" %}
puis scroll down pour trouver `Terminate Database`
{% include figure.liquid loading="eager" path="assets/img/cnam/terminate-database.png" title="Terminate database" class="img-fluid rounded z-depth-1" %}
