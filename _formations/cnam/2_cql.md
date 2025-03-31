---
layout: page
title: CQL
description: Requêtage en Cassandra Query Language
importance: 2
category: "Cnam CS103 - Bases de données à grande échelle"
permalink: /cnam/cassandra/cql
type: formation
visible: true
mermaid:
  enabled: true
  zoomable: true
---

# Cassandra Query Language

CQL (Cassandra Query Language) est le langage de requête utilisé par Apache Cassandra. Bien qu'il ressemble à SQL, il est conçu pour les opérations de base de données distribuées sans prise en charge de certaines fonctionnalités comme les jointures.

## Données

Dans le cadre des requêtes ci-dessous, un example de données d'une bibliothèque est utilisé. Les données sont stockées dans un keyspace `library` qui contient deux tables : `users` et `loan` (*emprunt* en anglais).

### Table `users`

La table `users` contient les informations des utilisateurs de la bibliothèque :
- `id` : identifiant unique de l'utilisateur
- `name` : nom de l'utilisateur
- `age` : âge de l'utilisateur

Ci-dessous un exemple de données pour la table `users` :

| id                      | name    | age |
|-------------------------|---------|-----|
| 6a6148d1-4a56-4d6a-a610 | Alice   | 30  |
| 79e9b9b4-8b76-4cb7-8419 | Bob     | 23  |
| cb923190-d658-4471-827d | Charlie | 45  |
| 8eabd71d-c1f0-4496-9415 | Dalia   | 28  |
| 2c524549-09f0-4e8e-9afc | Eve     | 36  |

---

### Table `loan`

La table `loan` contient les informations des emprunts de livres :
- `book_id` : identifiant du livre emprunté
- `user_id` : identifiant de l'utilisateur
- `loan_id` : identifiant unique de l'emprunt
- `timestamp` : date et heure de l'emprunt

Voici des données pour la table `loan` :

| book_id                  | loan_id                 | user_id                 | timestamp                |
|--------------------------| ----------------------- | ----------------------- |--------------------------|
| 549d7790-2aa1-4710-88d4  | 437c10d7-5508-4ecf-b821 | 6a6148d1-4a56-4d6a-a610 | 2021-03-31 10:00:00+0000 |
| 616be2d4-d205-4278-ad6d  | dc880752-f900-4454-8993 | 6a6148d1-4a56-4d6a-a610 | 2022-08-06 15:00:00+0000 |
| 549d7790-2aa1-4710-88d4  | 4c63cb26-f5f1-4ca3-bd62 | 79e9b9b4-8b76-4cb7-8419 | 2023-35-22 11:00:00+0000 |
| b3420ae3-88b8-45f7-adc1  | 4e1e806b-872b-421e-a461 | cb923190-d658-4471-827d | 2025-10-03 12:00:00+0000 |
| 0d7c6069-d250-431a-8573  | 8eabd71d-c1f0-4496-9415 | 8eabd71d-c1f0-4496-9415 | 2021-11-14 13:00:00+0000 |
| 2f228bd5-a517-4214-8303  | f93925d8-79e6-461d-ace8 | 2c524549-09f0-4e8e-9afc | 2021-12-05 14:00:00+0000 |

## Exemples de commandes en CQL

Voici quelques exemples de commandes CQL pour interagir avec la base de données `library` qui contient les données des utilisateurs et des emprunts de livres d'une bibliothèque.

### Keyspaces

Cassandra définit des keyspaces pour regrouper les tables. Un keyspace est l'équivalent d'une base de données dans un système de gestion de base de données relationnelle. Les keyspaces ont des propriétés de réplication qui définissent comment les données sont répliquées sur les nœuds du cluster.

- **Création d'un keyspace** :
```sql
CREATE KEYSPACE library
WITH replication = {'class': 'SimpleStrategy', 'replication_factor': 3};
```
  
- **Changement de keyspace** : 
```sql
USE library ;
```
    L'instruction `USE` replace le keyspace courant par celui spécifié dans la requête.
    Ainsi, toutes les requêtes suivantes seront exécutées dans le keyspace `library`.
    Il n'est pas nécessaire de spécifier le keyspace dans les requêtes suivantes.
    On peut écrire directement `CREATE TABLE users (...)` sans spécifier le keyspace.

- **Liste des keyspaces** :
```sql
DESCRIBE KEYSPACES;
```
    Cette commande permet de lister tous les keyspaces disponibles dans le cluster.

- **Description d'un keyspace** :
```sql
DESCRIBE KEYSPACE library;
```
    Cette commande permet de voir les détails du keyspace `library`.

- **Suppression d'un keyspace** :
  ```sql
  DROP KEYSPACE IF EXISTS library;
  ```

### Création de tables

La création de tables en `CQL` est similaire à `SQL`. Il faut veiller à bien définir la clé primaire pour chaque table qui est essentielle pour la distribution des données dans le cluster.

  - __Clé primaire simple__
```sql
CREATE TABLE library.users (
    id UUID PRIMARY KEY,
    name TEXT,
    age INT
);
```
  Pour plus d'informations sur les types de données supportés par Apache Cassandra, vous pouvez consulter [la documentation](https://cassandra.apache.org/doc/latest/cql/types.html).

  - __Clé primaire composite__
```sql
CREATE TABLE library.loan (
    book_id UUID,
    loan_id UUID,
    user_id UUID,
    timestamp TIMESTAMP,
    PRIMARY KEY (loan_id, user_id)
);
```
  Ici nous avons une table qui possède deux colonnes comme clé primaire. Cela signifie que la combinaison de `loan_id` et `user_id` doit être unique.

  - __Clé de clustering__
```sql
CREATE TABLE library.loan (
    book_id UUID,
    loan_id UUID,
    user_id UUID,
    timestamp TIMESTAMP,
    PRIMARY KEY ((loan_id, user_id), timestamp)
) WITH CLUSTERING ORDER BY (timestamp DESC);
```
  Ici la clé primaire est composée de `loan_id` et `user_id`, et la clé de clustering est `timestamp`.
  On ajoute `WITH CLUSTERING ORDER BY (timestamp DESC)` pour trier les données par ordre décroissant de `timestamp`.

### Manipulation de données

Une fois que les données sont insérées dans le cluster, il est possible de les manipuler en utilisant des requêtes CQL via les clauses `SELECT`, `INSERT`, `UPDATE` et `DELETE`.

- **Liste des tables** :
```sql
DESCRIBE TABLES;
```
Cette commande permet de lister toutes les tables du keyspace courant.

- **Description d'une table** :
```sql
DESCRIBE TABLE library.users;
```
Cette commande permet de voir les détails de la table `users` du keyspace `library`.

- **Insertion de données** :
  ```sql
  INSERT INTO library.users (id, name, age)
  VALUES (6a6148d1-4a56-4d6a-a610-cdf7b7e3b959, 'Alice', 30);
  
  INSERT INTO library.users (id, name, age)
  VALUES (uuid(), 'Bob', 23);
  ```
  Ici, l'identifiant de Bob est généré automatiquement par Cassandra via la fonction `uuid()`.

- **Sélection de données** :
```sql
SELECT name, age FROM library.users WHERE age > 35;
```
Cette requête permet de sélectionner le nom et l'âge des utilisateurs de plus de 35 ans.

<!--
    dont le résultat est le suivant :

    | name    | age |
    |---------|-----|
    | Charlie | 45  |
    | Eve     | 36  |
-->

- **Mise à jour de données** :
```sql
UPDATE library.users SET age = 31 WHERE id = 6a6148d1-4a56-4d6a-a610-cdf7b7e3b959;
```
Ici, on met à jour l'âge d'Alice (qui possède l'identifiant `6a6148d1-4a56-4d6a-a610-cdf7b7e3b959`) de 30 à 31 ans.

- **Suppression de données** :
```sql
DELETE FROM library.users WHERE id = 6a6148d1-4a56-4d6a-a610-cdf7b7e3b959;
```
De même, qu'il est possible de supprimer les données d'Alice de la table `users`. Dans notre cas, il faudrait également supprimer les emprunts d'Alice dans la table `loan`.

- **Suppression d'une table** :
```sql
DROP TABLE IF EXISTS library.users;
```
Si l'on veut supprimer une table, il suffit d'utiliser la commande `DROP TABLE` comme en SQL.

### Index

Les index peuvent être créés pour améliorer les performances des requêtes. Cela permet de rechercher plus rapidement les colonnes qui ne sont pas définies dans la clé de partitionnement.

- **Création d'un index** :
```sql
CREATE INDEX IF NOT EXISTS name_index ON library.users (name);
```

- **Suppression d'un index** :
```sql
DROP INDEX IF EXISTS name_index;
```

> :warning: **Clé primaire et partitionnement** <br/>
> <br/>
> Il est important de bien choisir la clé de partition et la clé de clustering pour optimiser les performances de la base de données. Aussi, il peut être nécessaire de dupliquer les données pour répondre à différents types de requêtes.<br/>
> <br/>
> Toutes les colonnes qui sont dans la PRIMARY KEY doivent être utilisées dans la clause `WHERE` de la requête `SELECT`. Par exemple, si la clé primaire est composée de `id` et `name`, la requête `SELECT` doit contenir ces deux colonnes dans la clause `WHERE`.
> ```sql
> SELECT *
> FROM library.users
> WHERE id = 6a6148d1-4a56-4d6a-a610-cdf7b7e3b959 AND name = 'Alice';
> ```
{: .block-warning }

## Documentation :
- [Manipulation de données](https://cassandra.apache.org/doc/stable/cassandra/cql/ddl.html) : CREATE, ALTER, DROP (table, keyspace)
- [Requêtes](https://cassandra.apache.org/doc/stable/cassandra/cql/dml.html) : SELECT, INSERT, UPDATE, DELETE
