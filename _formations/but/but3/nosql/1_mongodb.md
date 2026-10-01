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

# 1. Préparation de la base de données MongoDB

> :warning: Nous allons créer un serveur. Veuillez **utiliser les noms exacts** indiqués ci-dessous (nom du cluster, nom de la base de données, etc.).
> Si vous les modifiez, il sera plus difficile de vous aider en cas de problème.
{:.block-warning}

## 1.1 Configuration de la base de données 

### Création du compte Atlas

Nous allons créer un [compte Atlas](https://account.mongodb.com/account/register?signedOut=true) afin de pouvoir héberger une base de données MongoDB.
Choissisez le mode de connection qui vous plaît : Google, GitHub ou via adresse mail.

{% include figure.liquid loading="eager" path="assets/img/but/but3/nosql/mongodb/atlas-create-account.png" title="MongoDB" class="img-fluid rounded z-depth-1 mx-auto d-block" %}

Lors de la création du compte, le site demande de renseigner des informations personnelles.
Il est possible d'ignorer cette étape via `Skip personalization` en bas de la page.

{% include figure.liquid loading="eager" path="assets/img/but/but3/nosql/mongodb/atlas-create-account-personalisation.png" title="MongoDB" class="img-fluid rounded z-depth-1 mx-auto d-block" %}

### Création du cluster

Par défaut, MongoDB Atlas créer un cluster, celui-ci hébergera notre base de données.
Pour cela, sélectionner l'**instance gratuite** que nous appelerons `cluster-but-sd`. Il n'y a pas besoin de changer les autres paramètres.
Puis cliquer sur `Create Deployment`.

MongoDB Atlas permet d'avoir **une instance gratuite**, si vous en avez déjà créée une vous ne pourrez pas en créer une autre.

{% include figure.liquid loading="eager" path="assets/img/but/but3/nosql/mongodb/atlas-creation-cluster.png" title="MongoDB" class="img-fluid rounded z-depth-1 mx-auto d-block" %}

### Configuration d'un utilisateur Atlas

Lors de la création du cluster, MongoDB Atlas créé également un utilisateur avec le format `<nom>_db_user` avec un mot de passe aléatoire.
Ici, l'utilisateur est `alannadevgen_db_user` et le mot de passe commence par `wT...`.
Télécharger le fichier de configuration en cliquant sur `Download .env file`.
Ce fichier contient, le nom de l'utilisateur, son mot de passe et une *connection string*.

> :warning: Ce fichier est sensible car il contient un mot de passe et un lien de connexion vers un serveur.
> Veillez à ne pas le partager ni le publier sur un repo Git.
{:.block-warning}

{% include figure.liquid loading="eager" path="assets/img/but/but3/nosql/mongodb/atlas-database-user-credentials.png" title="MongoDB" class="img-fluid rounded z-depth-1 mx-auto d-block" %}

Voici un exemple de fichier `atlas-credentials.env`, caviardé pour des raisons de sécurité.

{% include figure.liquid loading="eager" path="assets/img/but/but3/nosql/mongodb/atlas-credentials.png" title="MongoDB" class="img-fluid rounded z-depth-1 mx-auto d-block" max-width="650px" %}

> Cette **MONGODB_URI** nous servira ensuite à nous connecter à la base de données.
> Conservez-là précieusement
{:.block-example}

### Ajout de l'IP

Parfois la connexion au cluster, depuis un notebook, échoue.
Pour palier ce problème, nous allons permettre que le cluster se connecter à toutes les IP.
Pour ce faire, aller dans l'onglet `Database & Network access`.

{% include figure.liquid loading="eager" path="assets/img/but/but3/nosql/mongodb/atlas-database-network-access-menu.png" title="MongoDB" class="img-fluid rounded z-depth-1 mx-auto d-block" %}

Puis sélectionner le menu `IP access list`.
Pour ajouter une nouvelle addresse IP sélectionner `+ Add IP address`.

{% include figure.liquid loading="eager" path="assets/img/but/but3/nosql/mongodb/atlas-current-ip.png" title="MongoDB" class="img-fluid rounded z-depth-1 mx-auto d-block" %}

Cela nous permet ensuite d'ajouter l'IP `0.0.0.0` à la liste des IP autorisées.

{% include figure.liquid loading="eager" path="assets/img/but/but3/nosql/mongodb/atlas-allow-access-ip.png" title="MongoDB" class="img-fluid rounded z-depth-1 mx-auto d-block" %}


## 1.2 Installation de MongoDB Compass

La base de données MongoDB Atlas est maintenant configurée, nous allons pouvoir l'utiliser via le client MongoDB Compass.
Cliquez sur le lien pour télécharger [**MongoDB Compass Download (GUI)**](https://www.mongodb.com/try/download/compass) et suivez les instructions d'installation selon votre OS.

Une fois l'installation faite, nous allons pouvoir utiliser le cluster créé sur MongoDB Atlas.
Cliquer sur l'un des boutons `+ Add new connection`.

{% include figure.liquid loading="eager" path="assets/img/but/but3/nosql/mongodb/compass-add-connection.png" title="MongoDB" class="img-fluid rounded z-depth-1 mx-auto d-block" %}

La connexion va se faire via la *connection string* (cf. `MONGODB_URI`) qui peut être trouvée dans le fichier `atlas-credentials.env`.
Puis cliquer sur `Save & Connect`.

{% include figure.liquid loading="eager" path="assets/img/but/but3/nosql/mongodb/compass-add-new-connection.png" title="MongoDB" class="img-fluid rounded z-depth-1 mx-auto d-block" %}

Une fois ceci fait, nous allons créer une base de données ainsi qu'une collection. Il faut cliquer sur le **+** à côté du nom du serveur.

{% include figure.liquid loading="eager" path="assets/img/but/but3/nosql/mongodb/compass-create-database.png" title="MongoDB" class="img-fluid rounded z-depth-1 mx-auto d-block" %}

Cette base de données sera appelée `tp` et contiendra une collection nommée `restaurants`.

{% include figure.liquid loading="eager" path="assets/img/but/but3/nosql/mongodb/compass-create-database-restaurants.png" title="MongoDB" class="img-fluid rounded z-depth-1 mx-auto d-block" %}

## 1.3 Import des données

Pour ce TP, nous utiliserons la base de données `restaurants` issue du jeu de données d'exemple de [MongoDB Atlas](https://www.mongodb.com/docs/atlas/sample-data/sample-restaurants/).

Pour ce faire, télécharger le [fichier JSON](https://github.com/aldevgen/data/blob/main/json/restaurants.json) depuis le repo GitHub.

{% include figure.liquid loading="eager" path="assets/img/but/but3/nosql/mongodb/git-dowload-file.png" title="MongoDB" class="img-fluid rounded z-depth-1 mx-auto d-block" %}

Puis de l'importer dans MongoDB Compass via `Import data`. Une fois ceci fait, vous aurez la vue suivante :

{% include figure.liquid loading="eager" path="assets/img/but/but3/nosql/mongodb/compass-database-imported.png" title="MongoDB" class="img-fluid rounded z-depth-1 mx-auto d-block" %}

Vous remarquez que certains champs sont imbriqués tels que `address` et `grades`.
Pour avoir une vue complète d'un document, il suffit de cliquer sur la flèche en haut à gauche comme indiqué ici.
Cela permet de réduire ou agrandir l'affichage d'un document.

{% include figure.liquid loading="eager" path="assets/img/but/but3/nosql/mongodb/compass-expand-document.png" title="MongoDB" class="img-fluid rounded z-depth-1 mx-auto d-block" %}


## 1.4 Utilisation du template

Pour faciliter les TPs, un notebook sera mis à disposition pour réaliser ce TP ainsi que les suivants.
Pour récupérer le template, vous allez réaliser un fork du projet [GitHub](https://github.com/aldevgen/but3-formation-nosql-tp).
Ainsi, cliquez sur `Fork` en haut à droite.

{% include figure.liquid loading="eager" path="assets/img/but/but3/nosql/mongodb/git-fork.png" title="Git fork" class="img-fluid rounded z-depth-1 mx-auto d-block" %}

Cela va ouvrir une nouvelle page pour configurer le fork.
Assurez-vous que votre nom d'utilisateur est bien sélectionné puis cliquez sur `Create fork`.
Vous avez désormais une copie du repo `but3-formation-nosql-tp` sur votre compte GitHub.

{% include figure.liquid loading="eager" path="assets/img/but/but3/nosql/mongodb/git-create-fork.png" title="Git fork" class="img-fluid rounded z-depth-1 mx-auto d-block" %}

Maintenant, nous voulons télécharger le repo en local afin de pouvoir utiliser le notebook Python.
Nous allons utiliser Git Bash. Cherchez et ouvrez un terminal Git Bash depuis la touche Windows. 

{% include figure.liquid loading="eager" path="assets/img/but/but3/nosql/mongodb/windows-git-bash.png" title="Git" class="img-fluid rounded z-depth-1 mx-auto d-block" max-width="650px" %}

Dans la suite de ce cours, nous utiliserons à chaque séance Git.
Si vous ne vous sentez pas à l'aise avec cet outil, vous pouvez vous référer au pré-requis.

Le terminal affiche quelques informations intéressantes :
- le nom de l'utilisateur &rarr; `alanna.devlin`
- le nom de la machine &rarr; `B-1-13-22`
- le dossier courant &rarr; `~`

Commencons par regarder le contenu du dossier courant.
Ici, nous sommes dans le disque `Z` et le dossier courant contient 2 dossiers : `NoSQL` et `POO`. 

{% include figure.liquid loading="eager" path="assets/img/but/but3/nosql/mongodb/git-bash-ls.png" title="Git" class="img-fluid rounded z-depth-1 mx-auto d-block" max-width="650px" %}

Nous allons désormais nous déplacer dans le dossier `NoSQL` avec la commande `cd`.

> Vous pouvez vous aider de la touche *tab* pour vous déplacer de dossier en dossier si vous tapez les premières lettres d'un dossier.
> - Si vous avez un dossier `BUT3` faites `cd BUT3` puis `cd NoSQL`.
> - Si vous n'avez pas encore créé de dossier `NoSQL` depuis l'explorateur de fichier vous pouvez le faire depuis le terminal : `cd BUT3` &rarr; `mkdir NoSQL` &rarr; `cd NoSQL`.
{:.block-example}

{% include figure.liquid loading="eager" path="assets/img/but/but3/nosql/mongodb/git-bash-cd.png" title="Git" class="img-fluid rounded z-depth-1 mx-auto d-block" max-width="650px" %}

Une fois dans le bon dossier, nous allons pouvoir cloner le projet.
Pour cela, retournez sur **votre repo** `but3-formation-nosql-tp` celui que vous avez forké (pas sur mon repo).
Cliquez sur le bouton vert `< > Code` puis sur le bouton **Copy URL to clipboard** situé à côté d'URL.

{% include figure.liquid loading="eager" path="assets/img/but/but3/nosql/mongodb/git-clone-template.png" title="Git" class="img-fluid rounded z-depth-1 mx-auto d-block" %}

Retournez dans le terminal Git Bash et insérer la commande `git clone <URL>` où `<URL>` est celle copiée précédemment.

{% include figure.liquid loading="eager" path="assets/img/but/but3/nosql/mongodb/git-bash-clone.png" title="Git" class="img-fluid rounded z-depth-1 mx-auto d-block" max-width="650px" %}

:tada: Vous venez tout juste de cloner votre premier repo.

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

Il n'est pas nécessaire de créer cette collection pour réaliser le TP : elle sert uniquement à illustrer la syntaxe.
La collection réellement fournie et interrogée dans les exercices est `restaurants`.

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

Le fichier contient plus de 25 000 restaurants new-yorkais. Il est issu du jeu de données d'exemple de [MongoDB Atlas](https://www.mongodb.com/docs/atlas/sample-data/sample-restaurants/).

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

Ouvrez le notebook précédemment cloné dans Jupyter et répondez aux questions suivantes.

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
11. Affichez les restaurants ayant une même évaluation dont le score est `0` et le grade `A`.
    - Utilisez `$elemMatch` et expliquez pourquoi il est préférable ici à deux conditions séparées.
12. Affichez le nom et la rue des restaurants situés sur une rue dont le nom contient le terme `Union`.
    - Indication : recherchez l'opérateur d'expression régulière MongoDB.
13. Affichez les restaurants ayant eu une visite le `1er février 2014`. Attention au type BSON des dates et à la présence éventuelle d'une heure.
14. Affichez les restaurants situés dans la zone délimitée par les longitudes `-74.2` et `-74.1` et les latitudes `40.5` et `40.6`.

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
