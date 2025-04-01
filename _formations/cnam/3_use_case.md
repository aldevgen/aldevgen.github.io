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
tabs: true
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


{% tabs group-name %}

{% tab group-name Question %}

À partir du cours, créez les tables `cas_medicaux` et `patients` dans le keyspace `health` avec les colonnes décrites ci-dessus.

{% endtab %}

{% tab group-name Correction %}

```sql
-- Table pour les cas médicaux
DROP TABLE IF EXISTS cas_medicaux;
CREATE TABLE IF NOT EXISTS cas_medicaux (
    id TEXT PRIMARY KEY,
    date_diag DATE,
    pathologie TEXT,
    code_patho TEXT,
    patient_prenom TEXT,
    patient_sexe TEXT,
    patient_naissance DATE,
    dept_code TEXT,
    dept_nom TEXT
);

-- Table pour les patients avec leur historique de pathologies
DROP TABLE IF EXISTS patients;
CREATE TABLE IF NOT EXISTS patients (
    id TEXT PRIMARY KEY,
    prenom TEXT,
    sexe TEXT,
    date_naissance DATE,
    pathologies LIST<FROZEN<MAP<TEXT, TEXT>>>
);
```

{% endtab %}

{% endtabs %}

### 3. Insertion des données

{% tabs group-name %}

{% tab group-name Question %}

Insérer dans la table `cas_medicaux` les données du patient `23257`.

| id     | code_patho | date_diag  | dept_code | dept_nom | pathologie         | patient_naissance | patient_prenom | patient_sexe |
|--------|------------|------------|-----------|----------|--------------------|-------------------|----------------|--------------|
| 23257  | addictions | 2021-01-12 |        72 |   Sarthe | Troubles addictifs |        1946-08-27 |        aaliyah |            f |


{% endtab %}

{% tab group-name Correction %}

```sql
INSERT INTO cas_medicaux (id, date_diag, pathologie, code_patho, patient_prenom, patient_sexe, patient_naissance, dept_code, dept_nom)
VALUES (
    '23257', 
    '2021-01-12', 
    'Troubles addictifs', 
    'addictions', 
    'aaliyah', 
    'f', 
    '1946-08-27', 
    '72', 
    'Sarthe'
);
```

{% endtab %}

{% endtabs %}

{% tabs group-name %}

{% tab group-name Question %}

Puis, insérer dans la table `patients` les données suivantes :

| id  | date_naissance | pathologies                                                                                                                                                                                                                                                                       | prenom  | sexe|
|-----|----------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------|-----|
| 403 | 1927-02-11     | [{'date': '2021-08-08', 'dept': '09', 'intitule': 'Maladies inflammatoires chroniques'}, {'date': '2023-04-11', 'dept': '09', 'intitule': 'Accident vasculaire cérébral'}, {'date': '2022-07-02', 'dept': '09', 'intitule': 'Maladies métaboliques, héréditaires ou amylose'}]   | allison |    f|

{% endtab %}

{% tab group-name Correction %}

```sql
INSERT INTO patients (id, prenom, sexe, date_naissance, pathologies)
VALUES (
    '403', 
    'allison', 
    'f', 
    '1927-02-11', 
    [{'intitule': 'Maladies inflammatoires chroniques', 'date': '2021-08-08', 'dept': '09'}, {'intitule': 'Accident vasculaire cérébral', 'date': '2023-04-11', 'dept': '09'}, {'intitule': 'Maladies métaboliques, héréditaires ou amylose', 'date': '2022-07-02', 'dept': '09'}]
);
```

{% endtab %}

{% endtabs %}

Une fois les deux requêtes d'insertion effectuées, vous pouvez insérer les données contenues dans le fichier `init.cql` qui est téléchargeable <a href="/assets/code/init.cql" download>ici</a>.

### 4. Requêtes sur les données

1) Afficher les 5 premiers cas médicaux.

2) Afficher les patients ayant les identifiants `408` et `500`.

3) Quel est le résultat de la requête suivante ?

```sql
SELECT *
FROM cas_medicaux
WHERE pathologie='Diabète';
```

Est-elle valide ? Si non, que faire pour corriger cette requête ?

4) Mettre à jour la pathologie du patient `23350` pour remplacer `Diabète` par `Diabète de type 2` (champ `pathologie`).

5) Supprimer les informations concernant le cas médical `23265` (patient Aaren).

6) Comment requêter les patients vivant dans le département de la Sarthe ?
---

:tada: Bravo, vous venez de requêter des données de santé stockées dans une base de données Apache Cassandra avec CQL !

> :exclamation: Avant de finir, n'oubliez pas de supprimer la base de données pour ne pas consommer de ressources inutilement. Pour cela, il suffit d'aller dans `Settings > Terminate Database`
{: .block-danger }

Cliquer sur l'onglet `Settings`
{% include figure.liquid loading="eager" path="assets/img/cnam/settings.png" title="Settings" class="img-fluid rounded z-depth-1" %}
puis descendre pour trouver la section `Terminate Database`.
{% include figure.liquid loading="eager" path="assets/img/cnam/terminate-database.png" title="Terminate database" class="img-fluid rounded z-depth-1" %}
