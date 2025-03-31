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
6. Création d'un index


## Présentation des données

Dans ce TP, vous allez manipuler une base de données Cassandra destinée à stocker des informations sur les cas médicaux et les patients. Pour cela, nous avons accès à 2 jeux de données : d'une part, les cas médicaux et d'autre part, les patients. Chaque cas médical est associé à un patient et à une pathologie, et est identifié par un identifiant unique.

### Cas médicaux

La table `cas_medicaux` contient les informations des cas médicaux :

| Colonne             | Description                       | 
|---------------------|-----------------------------------|
| `id`                | Identifiant unique du cas médical |
| `code_patho`        | Code de la pathologie             |
| `date_diag`         | Date du diagnostic                |
| `dept_code`         | Code du département               |
| `dept_nom`          | Nom du département                |
| `pathologie`        | Pathologie diagnostiquée          |
| `patient_naissance` | Date de naissance du patient      |
| `patient_prenom`    | Prénom du patient                 |
| `patient_sexe`      | Sexe du patient                   |

---

### Patients

La table `patients` contient les informations des patients :

| Colonne         | Description                     |
|-----------------|---------------------------------|
| `id`            | Identifiant unique du patient   |
| `prenom`        | Prénom du patient               |
| `sexe`          | Sexe du patient                 |
| `date_naissance`| Date de naissance du patient    |
| `pathologies`   | Liste de pathologies du patient |

---

## Requêtage des données

### 1. Création d'un keyspace

Nous avons créé un keyspace `health` lors de la création de la base de données. Nous allons donc l'utiliser pour stocker nos données. Nous allons maintenant populer ce keyspace avec les données des cas médicaux et des patients.

### 2. Création du schéma de données

À partir du cours, créez les tables `cas_medicaux` et `patients` dans le keyspace `health` avec les colonnes décrites ci-dessus.

### 3. Insertion des données

Insérer dans la table `cas_medicaux` les données du patient `23257`.

| id     | code_patho | date_diag  | dept_code | dept_nom | pathologie         | patient_naissance | patient_prenom | patient_sexe |
|--------|------------|------------|-----------|----------|--------------------|-------------------|----------------|--------------|
| 23257  | addictions | 2021-01-12 |        72 |   Sarthe | Troubles addictifs |        1946-08-27 |        aaliyah |            f |

---

Puis, insérer dans la table `patients` les données suivantes :

| id  | date_naissance | pathologies                                                                                                                                                                                                                                                                       | prenom  | sexe|
|-----|----------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------|-----|
| 403 | 1927-02-11     | [{'date': '2021-08-08', 'dept': '09', 'intitule': 'Maladies inflammatoires chroniques'}, {'date': '2023-04-11', 'dept': '09', 'intitule': 'Accident vasculaire cérébral'}, {'date': '2022-07-02', 'dept': '09', 'intitule': 'Maladies métaboliques, héréditaires ou amylose'}]   | allison |    f|

---

Une fois les deux requêtes d'insertion effectuées, vous pouvez insérer les données contenues dans le fichier `init.cql` qui est téléchargeable <a href="/assets/code/init.cql" download>ici</a>.

### 4. Requêtes sur les données

1) Quel est le résultat de la requête suivante ?

```sql
SELECT *
FROM cas_medicaux
WHERE pathologie='Diabète';
```

Est-elle valide ? Si non, que faire pour corriger cette requête ?

2) Écrivez une requête pour afficher les patients vivant dans le département de la Sarthe.

---

:tada: Bravo, vous venez de requêter des données de santé stockées dans une base de données Apache Cassandra avec CQL !

> :exclamation: Avant de finir, n'oubliez pas de supprimer la base de données pour ne pas consommer de ressources inutilement. Pour cela, il suffit d'aller dans `Settings > Terminate Database`
{: .block-danger }

Cliquer sur l'onglet `Settings`
{% include figure.liquid loading="eager" path="assets/img/cnam/settings.png" title="Settings" class="img-fluid rounded z-depth-1" %}
puis descendre pour trouver la section `Terminate Database`.
{% include figure.liquid loading="eager" path="assets/img/cnam/terminate-database.png" title="Terminate database" class="img-fluid rounded z-depth-1" %}
