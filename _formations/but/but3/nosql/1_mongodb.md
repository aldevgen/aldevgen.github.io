---
layout: page
type: formation
title: TP1
description: Requêtage et agrégation avec MongoDB
category: BUT 3 - Des bases de données distribuées au NoSQL
visible: true
img: /assets/img/mongodb.png
tabs: true
mermaid:
  enabled: true
  zoomable: true
---

<!---
# Prise en main de MongoDB Compass

# Requêtes avancées

# Agrégations

# Indexation et optimisation

# Cas pratique : modélisation d'un blog
--->

# TP MongoDB — Introduction et agrégations

## Objectifs

À l'issue de ce TP, vous saurez :

- créer et utiliser une base MongoDB hébergée sur MongoDB Compass ;
- décrire le modèle document de MongoDB et le format BSON ;
- interroger une collection avec PyMongo (`find`, `count_documents`, `distinct`) ;
- filtrer, projeter, trier et limiter des résultats ;
- construire une pipeline d'agrégation avec `aggregate` ;
- utiliser notamment `$match`, `$project`, `$unwind`, `$group`, `$sort`, `$limit`,
  `$addFields` et `$sortByCount` ;
- exploiter les résultats dans un `DataFrame` pandas.

Le TP est organisé en deux parties. La première présente MongoDB et les requêtes élémentaires. 
La seconde introduit les agrégations et propose des questions plus complexes.

---

# 1. Préparation de l'environnement

Dans un premier temps, nous allons installer MongoDB Compass qui est une interface permettant de visualiser les données.

## 1.1 Configuration de la base de données 

> :warning: Nous allons créer un serveur MongoDB, merci de NE PAS CHANGER les noms mentionnés ci-dessous (nom de l'utilisateur, nom de la collection, etc.)
{:.block-warning}

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

> :warning: Pensez à bien enregistrer le mot de passe dans un endroit sécurisé de votre ordinateur.
{:.block-warning}

Une fois ceci fait vous aurez la vue suivante : 

{% include figure.liquid loading="eager" path="assets/img/but/but3/nosql/user-created.png" title="MongoDB" class="img-fluid rounded z-depth-1 mx-auto d-block"%}

### Création d'un cluster Atlas

Maintenant nous pouvons créer un cluster qui hébergera notre base de données.

{% include figure.liquid loading="eager" path="assets/img/but/but3/nosql/create-cluster.png" title="MongoDB" class="img-fluid rounded z-depth-1 mx-auto d-block"%}

Nous prenons l'instance M0 qui est gratuite et donnons un nom à cette dernière, ici `cluster-but-sd`. Il n'y a pas besoin de changer les autres paramètres.

{% include figure.liquid loading="eager" path="assets/img/but/but3/nosql/creation-cluster.png" title="MongoDB" class="img-fluid rounded z-depth-1 mx-auto d-block" max-width="650px"%}

### Ajout de l'IP

Parfois, la connexion au cluster échoue. Pour palier ce problème, nous allons permettre que le cluster se connecter à notre IP.

{% include figure.liquid loading="eager" path="assets/img/but/but3/nosql/mongo-add-ip-access-list.png" title="MongoDB" class="img-fluid rounded z-depth-1 mx-auto d-block"%}

{% include figure.liquid loading="eager" path="assets/img/but/but3/nosql/mongo-add-new-ip-access-list.png" title="MongoDB" class="img-fluid rounded z-depth-1 mx-auto d-block"%}


### Connexion au cluster Atlas

Enfin, la dernière étape consiste à choisir le connecteur à la base de données. Dans notre cas, nous utiliserons l'API Python donc nous sélectionnons **Drivers**.

{% include figure.liquid loading="eager" path="assets/img/but/but3/nosql/connection-method.png" title="MongoDB" class="img-fluid rounded z-depth-1 mx-auto d-block" max-width="650px"%}

Sur la page suivante nous pouvons choisir le type de Driver, Python dans notre cas.

{% include figure.liquid loading="eager" path="assets/img/but/but3/nosql/mongodb-driver.png" title="MongoDB" class="img-fluid rounded z-depth-1 mx-auto d-block" max-width="650px"%}

> Pensez à copier la *connection string*, cela nous servira ensuite à nous connecter en Python à la base de données que nous venons de créer.
> 
> La *connection string* par défaut ressemble à : `mongodb+srv://user_mongo:<db_password>@cluster-but-sd.7z6bi.mongodb.net/?retryWrites=true&w=majority&appName=cluster-but-sd`.
> Il faut bien évidemment changer le mot de passe.
> 
> Par exemple si le mot de passe est `1g9dsa9kdaw063` alors la *connection string* sera : `mongodb+srv://user_mongo:1g9dsa9kdaw063@cluster-but-sd.7z6bi.mongodb.net/?retryWrites=true&w=majority&appName=cluster-but-sd` sans les crochets.
{:.block-example}

## 1.2 Installation de MongoDB Compass

Pour gérer notre base de données, nous allons utiliser [MongoDB Compass](https://www.mongodb.com/try/download/compass).
Cliquez sur le lien pour télécharger **MongoDB Compass Download (GUI)** et suivez les instructions d'installation selon votre OS.

{% include figure.liquid loading="eager" path="assets/img/cnam/mongodb/compass-connection.png" title="Compass connection" class="img-fluid rounded z-depth-1 mx-auto d-block"%}


Maintenant nous allons pouvoir utiliser le cluster créé sur Atlas. Commençons par se connecter à notre instance.
La connexion va se faire via la *connection string* qui peut être trouvée dans la configuration du cluster Atlas. 

> N'oubliez pas de remplacer le mot de passe sur l'image ci-dessous par celui que vous avez enregistré plus haut.
{:.block-warning}

{% include figure.liquid loading="eager" path="assets/img/but/but3/nosql/compass-add-connection.png" title="MongoDB" class="img-fluid rounded z-depth-1 mx-auto d-block" max-width="650px"%}

Une fois ceci fait, nous allons créer une base de données appelée `tp` qui contiendra une collection nommée `restaurants`.

{% include figure.liquid loading="eager" path="assets/img/but/but3/nosql/create-database.png" title="MongoDB" class="img-fluid rounded z-depth-1 mx-auto d-block"%}

## Import des données

Ensuite, il suffit d'importer le fichier JSON qui se situe [ici](https://github.com/aldevgen/data/blob/main/json/restaurants.json).

{% include figure.liquid loading="eager" path="assets/img/but/but3/nosql/telecharger-fichier.png" title="MongoDB" class="img-fluid rounded z-depth-1 mx-auto d-block"%}

Puis de l'importer dans MongoDB Compass :

{% include figure.liquid loading="eager" path="assets/img/but/but3/nosql/import-data.png" title="MongoDB" class="img-fluid rounded z-depth-1 mx-auto d-block"%}


## 1.3 Utilisation du template

Pour faciliter les TPs, un notebook de template est disponible pour réaliser ce TP ainsi que les suivants.
Vous pouvez réalisez un fork du projet [GitHub](https://github.com/aldevgen/but3-formation-nosql-tp).

{% include figure.liquid loading="eager" path="assets/img/but/but3/nosql/git-fork.png" title="Git fork" class="img-fluid rounded z-depth-1 mx-auto d-block"%}

{% include figure.liquid loading="eager" path="assets/img/but/but3/nosql/git-create-fork.png" title="Git fork" class="img-fluid rounded z-depth-1 mx-auto d-block"%}

---

# 2. Le modèle de données MongoDB

## 2.1. Documents, collections et BSON

Un document MongoDB ressemble à un objet JSON. Il peut contenir des valeurs
simples, des objets imbriqués et des tableaux. MongoDB utilise BSON, qui ajoute
notamment les identifiants spécifiques et les dates.

Pour illustrer le modèle sans utiliser le jeu de données du TP, considérons
une collection fictive `students` :

```json
{
  "_id": "ObjectId(...)",
  "student": {
    "name": "Jeanne",
    "surname": "Dupont"
  },
  "university": "Université de Paris",
  "courses": ["NoSQL", "Python"],
  "grades": [
    {
      "course": "NoSQL",
      "date": "2026-09-15T08:00:00Z",
      "score": 16
    },
    {
      "course": "Python",
      "date": "2026-09-20T08:00:00Z",
      "score": 14
    }
  ]
}
```

Les chemins imbriqués s'écrivent avec des points. Par exemple :

```python
{"student.surname": "Dupont"}
{"grades.score": {"$gte": 15}}
```

Dans cet exemple, `grades` est un tableau de documents et `courses` un tableau
de chaînes de caractères. Une collection peut contenir des documents de
structures différentes, même s'il est préférable de conserver une structure
cohérente pour faciliter les requêtes.

Les exemples de cours ci-dessous utilisent cette collection fictive :

```python
students = db["students"]
```

Il n'est pas nécessaire de créer cette collection pour réaliser le TP :
elle sert uniquement à illustrer la syntaxe. La collection réellement fournie
et interrogée dans les exercices est `restaurants`.

## 2.2. Requêtes et agrégations

MongoDB ne repose pas sur SQL. Deux méthodes seront principalement utilisées :

- `find()` pour sélectionner des documents et choisir les champs à afficher ;
- `aggregate()` pour enchaîner des transformations, calculs et regroupements.

Dans les deux cas, les résultats sont des curseurs PyMongo.

---

# 3. Requêtes élémentaires

## 3.1. Compter des documents

`count_documents` compte précisément les documents correspondant à un filtre.
Le filtre `{}` sélectionne tous les documents.

```python
students.count_documents({})
students.count_documents({"university": "Université de Paris"})
students.count_documents({"courses": "NoSQL"})
```

`estimated_document_count()` peut être utilisé pour obtenir une estimation
rapide du nombre total de documents, mais ne prend pas de filtre.

## 3.2. Valeurs distinctes

`distinct` renvoie les valeurs distinctes d'un champ :

```python
students.distinct("university")
students.distinct("courses")
students.distinct("grades.course", {"university": "Université de Paris"})
```

Un chemin comme `grades.grade` permet d'atteindre un champ présent dans les
éléments d'un tableau.

## 3.3. Filtres et opérateurs

Un filtre peut contenir plusieurs conditions ; elles sont alors combinées avec
un **ET** implicite :

```python
students.count_documents({
    "university": "Université de Paris",
    "courses": "NoSQL"
})
```

Opérateurs de comparaison courants :

| Opérateur | Signification |
| --- | --- |
| `$gt`, `$gte` | strictement supérieur, supérieur ou égal |
| `$lt`, `$lte` | strictement inférieur, inférieur ou égal |
| `$ne` | différent de |
| `$in` | appartient à une liste de valeurs |
| `$nin` | n'appartient pas à une liste de valeurs |
| `$exists` | le champ existe ou non |

Exemples :

```python
students.count_documents({"grades.score": {"$gte": 15}})

students.count_documents({
    "courses": {"$in": ["NoSQL", "Python"]}
})
```

Pour vérifier que plusieurs conditions concernent le **même élément** d'un
tableau, utilisez `$elemMatch` :

```python
students.count_documents({
    "grades": {"$elemMatch": {"course": "NoSQL", "score": {"$gte": 15}}}
})
```

## 3.4. Sélectionner et projeter

`find(filtre, projection)` sélectionne les documents et les champs à afficher.
Dans une projection, `1` conserve un champ et `0` le supprime. L'identifiant
`_id` est conservé par défaut :

```python
cursor = students.find(
    {"courses": "NoSQL"},
    {"_id": 0, "student.name": 1, "student.surname": 1}
)
pd.DataFrame(list(cursor))
```

Il est possible de projeter un champ imbriqué :

```python
cursor = students.find(
    {},
    {"_id": 0, "student.name": 1, "student.surname": 1, "university": 1}
)
```

On ne mélange généralement pas inclusion et exclusion dans une même projection,
à l'exception de `_id`.

## 3.5. Trier et limiter

Avec PyMongo, `sort` reçoit des couples `(champ, direction)` :

```python
cursor = (
    students.find({}, {"_id": 0, "student.name": 1, "student.surname": 1})
    .sort([("student.surname", 1), ("student.name", 1)])
    .skip(10)
    .limit(5)
)
pd.DataFrame(list(cursor))
```

`1` signifie croissant et `-1` décroissant.

---

# 4. Mise en pratique

## 4.1. Import des données dans MongoDB Compass

1. Connectez Compass au cluster avec la chaîne de connexion ;
2. Créez une base `tp` et une collection `restaurants` ;
3. Importez le fichier `restaurants.json` fourni avec le TP.

Le fichier contient plus de 25 000 restaurants new-yorkais. Il est également issu du jeu de données d'exemple de [MongoDB Atlas](https://www.mongodb.com/docs/atlas/sample-data/sample-restaurants/).

## 4.2 Connexion depuis Python

```python
import pandas as pd
from pymongo import MongoClient

client = MongoClient("MONGODB_URI")
db = client["tp"]
restaurants = db["restaurants"]

print(db.list_collection_names())
print(restaurants.count_documents({}))
```

Une requête PyMongo renvoie généralement un **curseur**. Il faut le parcourir
ou le convertir en liste pour observer les documents :

```python
documents = list(restaurants.find().limit(5))
pd.DataFrame(documents)
```

## 4.3 Questions

<!---
1. Combien de documents contient la collection `restaurants` ?
2. Quels sont les styles de cuisine présents dans la collection ?
3. Quels sont tous les grades possibles ?
4. Combien de restaurants proposent une cuisine française (`French`) ?
5. Combien de restaurants sont situés sur `Central Avenue` ?
6. Combien de restaurants ont obtenu au moins une note strictement supérieure à 50 ?
7. Affichez tous les restaurants en ne conservant que leur nom, le numéro de l'immeuble et la rue.
8. Affichez les restaurants nommés `Burger King`, avec uniquement leur nom et leur quartier.
9. Affichez les restaurants situés sur `Union Street` ou `Union Square`.
10. Affichez les restaurants dont la latitude est strictement supérieure à `40.90`. Affichez le nom, le quartier et les coordonnées.
11. Affichez les restaurants ayant une même évaluation dont le score est `0` et le grade `A`. Utilisez `$elemMatch` et expliquez pourquoi il est préférable ici à deux conditions séparées.
12. Affichez le nom et la rue des restaurants situés sur une rue dont le nom contient le terme `Union`. Indication : recherchez l'opérateur d'expression régulière MongoDB.
13. Affichez les restaurants ayant eu une visite le `1er février 2014`. Attention au type BSON des dates et à la présence éventuelle d'une heure.
14. Affichez les restaurants situés dans la zone délimitée par les longitudes `-74.2` et `-74.1` et les latitudes `40.5` et `40.6`.
--->

1. Donner les styles de cuisine présent dans la collection
1. Donner tous les grades possibles dans la base
1. Compter le nombre de restaurants proposant de la cuisine française ("French")
1. Compter le nombre de restaurants situés sur la rue "Central Avenue"
1. Compter le nombre de restaurants ayant eu une note supérieure à 50
1. Lister tous les restaurants, en n'affichant que le nom, l'immeuble et la rue
1. Lister tous les restaurants nommés "Burger King" (nom et quartier uniquement)
1. Lister les restaurants situés sur les rues "Union Street" ou "Union Square"
1. Lister les restaurants situés au-dessus de la lattitude 40.90
1. Lister les restaurants ayant eu un score de 0 et un grade "A"

---

# 5. Pipelines d'agrégation

## 5.1. Principe

Une agrégation transforme les documents par étapes successives. Chaque étape
reçoit le résultat de l'étape précédente :

```python
pipeline = [
    {"$match": {"university": "Université de Paris"}},
    {"$sort": {"student.surname": 1}},
    {"$limit": 10}
]

result = students.aggregate(pipeline)
pd.DataFrame(list(result))
```

L'ordre des étapes est essentiel. Par exemple, limiter avant de filtrer ne
produit pas le même résultat que filtrer avant de limiter.

## 5.2. Étapes courantes

| Étape | Rôle |
| --- | --- |
| `$match` | filtrer les documents |
| `$project` | conserver, supprimer ou calculer des champs |
| `$addFields` | ajouter des champs sans supprimer les autres |
| `$unwind` | transformer chaque élément d'un tableau en document |
| `$group` | regrouper et calculer des agrégats |
| `$sort` | trier les documents |
| `$limit` | conserver un nombre limité de documents |
| `$sortByCount` | compter les modalités et les trier décroissant |

## 5.3. `$match`, `$sort` et `$limit`

Ces étapes reprennent les opérations déjà vues avec `find`, mais s'intègrent
dans une pipeline :

```python
pipeline = [
    {"$match": {"university": "Université de Paris"}},
    {"$sort": {"student.surname": 1}},
    {"$limit": 10},
    {"$project": {"_id": 0, "student": 1, "university": 1}}
]
pd.DataFrame(list(students.aggregate(pipeline)))
```

Filtrer tôt réduit le nombre de documents transmis aux étapes suivantes et
rend généralement la pipeline plus efficace.

## 5.4. `$project` et `$addFields`

`$project` redéfinit les champs conservés. Il peut aussi créer un champ calculé
ou renommer un champ :

```python
pipeline = [
    {"$limit": 5},
    {"$project": {
        "_id": 0,
        "nom": {"$toUpper": "$student.surname"},
        "universite": "$university",
        "nb_cours": {"$size": "$courses"}
    }}
]
pd.DataFrame(list(students.aggregate(pipeline)))
```

`$addFields` ajoute un champ en conservant les autres :

```python
pipeline = [
    {"$addFields": {"nb_cours": {"$size": "$courses"}}},
    {"$project": {"_id": 0, "student": 1, "nb_cours": 1}}
]
```

Opérateurs utiles :

- `$arrayElemAt: ["$grades", 0]` : élément d'un tableau ;
- `$first` et `$last` : premier ou dernier élément ;
- `$size` : taille d'un tableau ;
- `$toUpper` : conversion en majuscules ;
- `$substr` : extraction d'une sous-chaîne ;
- `$cond` : expression conditionnelle.

## 5.5. `$unwind`

`$unwind` éclate un tableau. Un document qui possède deux évaluations devient
alors deux documents, un par évaluation :

```python
pipeline = [
    {"$limit": 10},
    {"$unwind": "$grades"},
    {"$project": {
        "_id": 0,
        "student": 1,
        "course": "$grades.course",
        "score": "$grades.score"
    }}
]
pd.DataFrame(list(students.aggregate(pipeline)))
```

Cette étape est indispensable lorsque l'on veut calculer une moyenne, un
minimum ou un maximum sur les éléments d'un tableau.

## 5.6. `$group` et accumulateurs

`$group` regroupe les documents selon `_id`. Les accumulateurs les plus
courants sont :

| Accumulateur | Rôle |
| --- | --- |
| `$sum` | somme ou comptage avec `$sum: 1` |
| `$avg` | moyenne |
| `$min`, `$max` | minimum, maximum |
| `$addToSet` | ensemble de valeurs distinctes |
| `$push` | tableau contenant toutes les valeurs |

Compter les étudiants par université :

```python
pipeline = [
    {"$group": {
        "_id": "$university",
        "nb_etudiants": {"$sum": 1}
    }},
    {"$sort": {"nb_etudiants": -1}}
]
pd.DataFrame(list(students.aggregate(pipeline)))
```

Calculer le score moyen à chaque cours :

```python
pipeline = [
    {"$unwind": "$grades"},
    {"$group": {
        "_id": "$grades.course",
        "score_moyen": {"$avg": "$grades.score"},
        "nb_evaluations": {"$sum": 1}
    }},
    {"$sort": {"score_moyen": 1}}
]
pd.DataFrame(list(students.aggregate(pipeline))).round(2)
```

Lorsque plusieurs champs définissent le groupe, `_id` peut être un document :

```python
{"$group": {
    "_id": {
        "university": "$university",
        "course": "$grades.course"
    },
    "nb_evaluations": {"$sum": 1}
}}
```

`$addToSet` supprime les doublons, contrairement à `$push` :

```python
{"$group": {
    "_id": "$student.surname",
    "cours_distincts": {"$addToSet": "$grades.course"},
    "cours_evalues": {"$push": "$grades.course"}
}}
```

## 5.7. `$sortByCount`

`$sortByCount` est un raccourci pour regrouper par une valeur, compter les
documents puis trier le résultat par effectif décroissant :

```python
pipeline = [
    {"$sortByCount": "$university"}
]
pd.DataFrame(list(students.aggregate(pipeline)))
```

Son équivalent explicite est :

```python
[
    {"$group": {"_id": "$university", "count": {"$sum": 1}}},
    {"$sort": {"count": -1}}
]
```

## 5.8. Résultats

La conversion en `DataFrame` facilite l'affichage et l'arrondi des résultats :

```python
df = pd.DataFrame(list(students.aggregate(pipeline)))
df.round(2)
```

Les objets imbriqués et les tableaux peuvent rester dans une cellule. Si
nécessaire, utilisez `pd.json_normalize` pour aplatir des documents :

```python
pd.json_normalize(list(students.find().limit(5)))
```

---

# 6. Mise en pratique — agrégations

Pour chaque question, écrivez une pipeline lisible, exécutez-la et justifiez
les étapes utilisées. Sauf indication contraire, les champs demandés doivent
être les seuls champs affichés, avec `_id` supprimé si nécessaire.

1. Quelles sont les 10 plus grandes chaînes de restaurants (i.e les restaurants avec un nom identique) ?
2. Donner le top 5 et le flop 5 des types de cuisine, en terme de nombre de restaurants.
1. Quelles sont les 10 rues avec le plus de restaurants ?
1. Quelles sont les rues situées sur strictement plus de 2 quartiers ? Ajouter le nom des quartiers de chaque rue.
1. Lister par quartier le nombre de restaurants et le score moyen.
1. Donner les dates de début et de fin des évaluations
1. Quels sont les 10 restaurants (nom, quartier, addresse et score) avec le plus petit score moyen ?

<!---
1. Quelles sont les dix plus grandes chaînes de restaurants, c'est-à-dire les
   dix noms apparaissant le plus souvent ? Réalisez la question avec
   `$sortByCount`, puis réécrivez-la avec `$group` et `$sort`.
2. Donnez le Top 5 et le Flop 5 des types de cuisine selon le nombre de
   restaurants. Écrivez deux pipelines.
3. Quelles sont les dix rues qui comportent le plus de restaurants ?
4. Quelles sont les rues présentes dans strictement plus de deux quartiers ?
   Ajoutez à chaque rue la liste des quartiers concernés et son nombre de
   quartiers distincts. Utilisez `$addToSet` et `$size`.
5. Donnez, pour chaque quartier, le nombre de restaurants et le score moyen
   de toutes les évaluations. Expliquez pourquoi `$unwind` est nécessaire.
6. Donnez la date de la première et de la dernière évaluation de l'ensemble
   des restaurants.
7. Donnez les dix restaurants ayant le plus petit score moyen. Affichez leur
   nom, quartier, adresse, score moyen et nombre d'évaluations. Ignorez les
   évaluations dont le score est négatif ou manquant.
8. Listez les restaurants dont tous les grades sont `A`. Veillez à ne pas
   sélectionner un restaurant qui possède à la fois un grade `A` et un autre
   grade. Vous pouvez comparer un tableau produit avec `$addToSet` ou utiliser
   une autre stratégie justifiée.
9. Comptez le nombre d'évaluations pour chaque jour de la semaine. Utilisez
   l'opérateur d'agrégation permettant d'extraire le jour depuis une date,
   puis triez les jours dans un ordre compréhensible.
10. Donnez, pour chaque quartier, les trois types de cuisine les plus présents.
    Indication : il faut compter les couples `(quartier, cuisine)`, trier,
    regrouper une seconde fois et conserver les trois premiers éléments de
    chaque tableau.
11. Comparez le score moyen calculé sur toutes les évaluations avec le score
    moyen calculé uniquement sur la dernière évaluation de chaque restaurant.
    Présentez les deux résultats par quartier et expliquez les différences.
12. Pour les dix rues dont le score moyen est le plus faible, affichez le
    quartier, la rue, le score moyen et le nombre de restaurants concernés.
--->
---

# 7. Bilan

1. Quelle différence faites-vous entre une requête `find` et une pipeline
   `aggregate` ?
2. Dans quelles situations l'utilisation de `$unwind` peut-elle modifier le
   nombre de lignes et donc le résultat d'un comptage ?
3. Quelle est la différence entre `$addToSet` et `$push` ?
4. Pourquoi est-il important de placer `$match` le plus tôt possible lorsque
   cela ne change pas le résultat ?
5. Donnez un exemple de document imbriqué ou de tableau pour lequel MongoDB
   est plus naturel qu'un schéma relationnel classique.
