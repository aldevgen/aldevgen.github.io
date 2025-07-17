---
layout: page
title: Requêtes SQL
description: Requêtage de la base de données
importance: 3
category: BUT 3 - SAÉ NoSQL
related_publications: false
permalink: /sae/queries/
visible: true
type: formation
---

###  Requêtes à programmer en SQL

Voici les requêtes qui vont nous servir de test pour la réussite (ou non) de la migration. Pour chaque requête, faites un choix d’ordonnencement du résultat, s’il n’est pas précisé ou naturel. Cela permettra de mieux comparer les résultats après migration.

1. Lister les clients n’ayant jamais effecuté une commande ;
2. Pour chaque employé, le nombre de clients, le nombre de commandes et le montant total de celles-ci ;
3. Idem pour chaque bureau (nombre de clients, nombre de commandes et montant total), avec en plus le nombre de clients d’un pays différent, s’il y en a ;
4. Pour chaque produit, donner le nombre de commandes, la quantité totale commandée, et le nombre de clients différents ;
5. Donner le nombre de commande pour chaque pays, ainsi que le montant total des commandes et le montant total payé : on veut conserver les clients n’ayant jamais commandé dans le résultat final ;
6. On veut la table de contigence du nombre de commande entre la ligne de produits et le pays du client (utiliser la méthode `pivot_table` de `pandas`) ;
7. On veut la même table croisant la ligne de produits et le pays du client, mais avec le montant total payé dans chaque cellule ;
8. Donner les 10 produits pour lesquels la marge moyenne est la plus importante (cf buyPrice et priceEach) ;
9. Lister les produits (avec le nom et le code du client) qui ont été vendus à perte :
    - Si un produit a été dans cette situation plusieurs fois, il doit apparaître plusieurs fois,
    - Une vente à perte arrive quand le prix de vente est inférieur au prix d’achat ;
10. (bonus) Lister les clients pour lesquels le montant total payé est supérieur aux montants totals des achats ;

A FAIRE : Ecrire donc les requêtes SQL ci-dessus dans un programme Python. Pour certaines, il est nécessaire de ré-organiser le résultat de la requête avec du code Python ensuite.
