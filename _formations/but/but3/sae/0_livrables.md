---
layout: page
type: formation
title: Livrables attendus
description: Consignes du rapport et du code à rendre
category: BUT 3 - SAÉ migration vers NoSQL
visible: true
img: /assets/img/but/but3/sae/livrable.jpg
tabs: true
mermaid:
  enabled: true
  zoomable: true
---

# :package: Rendu final

> **En bref.** Une webradio indépendante vous confie sa base de données et vous demande de la faire passer d’un modèle relationnel (SQLite) à un modèle NoSQL.
> Cette première séance pose les fondations de tout le projet : comprendre la base, puis écrire les requêtes qui serviront de test de réussite à la migration.
{: .block-example }

Lucia ORSINI attend de vous une réponse claire à sa demande : **migrer la base de Radio Kiosque vers NoSQL, en prouvant que rien n'a été perdu ni déformé**. Pour cela, vous devez rendre un **rapport** qui présente et justifie votre migration, ainsi que le **code** qui l'a réalisée et vérifiée.

| Livrable | Format | Où le déposer |
|---|---|---|
| **Rapport** | PDF | Moodle, onglet **SAÉ - Rapport** |
| **Code** | Notebook Python | Dépôt GitHub `sae-groupeXX`, dont le lien est indiqué dans le fichier *Composition des groupes* |

## :blue_book: Rapport

Le rapport a pour objectif de présenter la migration : contexte, difficultés rencontrées, méthodologie, architecture cible, etc. Il doit contenir tout ce qui vous semble pertinent pour discuter de la migration d'une base de données relationnelle vers une base de données NoSQL.

Pensez que votre lectrice est la directrice de la radio : elle connaît son activité, mais pas forcément les détails techniques. Chaque choix doit donc être **justifié** par rapport à ses besoins, et pas seulement décrit.

Le rapport doit faire **5-10 pages** (format PDF). Vous pouvez ajouter des images si vous le souhaitez. Toute image doit être légendée et référencée dans le texte.

Le rapport doit être déposé sur Moodle dans l'onglet **SAÉ - Rapport**.

### Plan conseillé

Ce plan est une suggestion. Vous restez libres de l'organiser autrement, du moment que les points suivants sont couverts.

| Partie | Contenu attendu | Place indicative |
|---|---|---|
| **Contexte et enjeux** | La radio, ses trois problèmes (lenteur, diffusions perdues, jointures à rallonge) et ses contraintes métier (protection du jeune public, quota de nouveautés, déclaration aux sociétés de droits), ainsi que le projet d'antenne consacrée aux podcasts. | ½ à 1 page |
| **Méthodologie** | Les quatre étapes de la SAÉ et la manière dont vous les avez menées. Comment vous avez travaillé en binôme. | ½ à 1 page |
| **Choix du type de base NoSQL** | Le type de base que vous avez jugé le plus adapté aux besoins de la radio, **et pourquoi**. Comparez-le aux autres familles de bases NoSQL que vous avez envisagées : quels avantages et quelles limites pour *ce* cas d'usage ? Appuyez-vous sur les requêtes de la séance 1 et sur les contraintes métier. | 1 page |
| **Architecture cible** | La structure de vos données dans la base retenue : schéma et exemple concret pour chaque élément. **Justifiez vos choix** : qu'avez-vous regroupé, séparé, dupliqué par rapport au relationnel, et pourquoi ? Expliquez en particulier comment vous avez traité les cas qui ne se prêtent pas à une copie directe (relation N-N entre titres et artistes, diffusions très nombreuses, colonnes `genres` et `languages` des podcasts, dates et booléens). | 1 à 2 pages |
| **Migration** | L'algorithme du script, les transformations réalisées et les difficultés rencontrées (et comment vous les avez résolues). | 1 à 2 pages |
| **Vérification** | La preuve que la migration est réussie : pour chaque requête, comparaison entre les résultats SQL (dossier `references`) et NoSQL. Indiquez ce qui est identique et **expliquez honnêtement les écarts éventuels**. Un tableau récapitulatif des 13 requêtes est bienvenu. | 1 à 2 pages |
| **Analyse critique** | Ce que la migration apporte, et ce qu'elle coûte : revenez sur les trois problèmes de la directrice et dites lesquels sont réellement résolus par votre solution. Terminez par une recommandation claire à la directrice. | ½ à 1 page |

> :bulb: Un résultat différent entre SQL et NoSQL n'est pas une faute en soi : c'est une information. Ce qui est évalué, c'est votre capacité à **l'identifier, l'expliquer et le corriger**.
{:.block-example}

Citez les sources (documentation, tutoriels, outils) que vous avez utilisées.

## :computer: Code

Pour ce qui est du code, vous devez rendre le code (commenté, propre et clair) des séances 1 et 3 :

- **Séance 1** : les requêtes SQL sur la base `RadioKiosque.sqlite`, ainsi que le dossier `references` contenant le résultat de chaque requête (`q1.csv`, `q2.csv`, etc.) ;
- **Séance 3** : le code ayant permis la migration de SQLite vers la base NoSQL que vous aurez retenue, ainsi que les requêtes réécrites en NoSQL qui permettent de la vérifier.

Il est préférable de rendre un notebook Python (les fichiers Python seront également acceptés).

Votre dépôt devrait ressembler à ceci :

```text
sae-groupeXX/
├── queries.ipynb        # séance 1 : requêtes SQL
├── references/          # q1.csv ... q13.csv
├── migration.ipynb      # séance 3 : migration et requêtes NoSQL
└── ...
```

Le code doit être mis sur un repo GitHub dont vous mettrez le lien sur le fichier *Composition des groupes*.

> :warning: Ne publiez jamais de mot de passe ou d'identifiant de connexion dans votre dépôt (par exemple l'adresse d'un serveur ou d'un cluster de base de données).
{:.block-warning}

## :white_check_mark: Avant de rendre

Prenez quelques minutes pour vérifier ces points :

- [ ] Le rapport fait entre 5 et 10 pages, au format PDF, avec des images légendées et référencées dans le texte.
- [ ] Le rapport justifie le type de base NoSQL retenu et les choix de structure des données.
- [ ] Le rapport a été déposé sur Moodle dans l'onglet **SAÉ - Rapport**.
- [ ] Le dépôt GitHub contient bien le code des séances 1 et 3 et le dossier `references`, et le lien figure dans le fichier *Composition des groupes*.
- [ ] Le code est commenté, propre et clair, et les notebooks s'exécutent du début à la fin.
- [ ] Aucun mot de passe ni identifiant n'apparaît dans le dépôt.


## :date: Date de rendu

 Le rapport et le code sont à rendre à la **même date limite**.

| Groupe | Date limite                 |
|--------|-----------------------------|
| VCOD   | 30 janvier 2027 à 19 heures |
| EMS    | 6 février 2027 à 19 heures  |

> :warning: Attention, tout rendu en retard sera pénalisé par 1 point par heure de retard, calculé par rapport à la date limite de votre groupe. Au-delà de 5 heures de retard, plus aucun rendu ne sera accepté et la note de 0 sera attribuée.
{:.block-warning}
