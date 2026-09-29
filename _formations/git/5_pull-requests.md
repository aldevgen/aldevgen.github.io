---
layout: page
type: formation
title: Pull Requests
description: Proposer et fusionner des changements avec une Pull Request
category: Versionnage avec Git
visible: true
img: /assets/img/git/pull-request.png
tabs: true
mermaid:
  enabled: true
  zoomable: true
---

# Pull Requests

## :ringed_planet: Valider le scénario retenu pour la mission

Amara a choisi le scénario où la liaison avec la Terre reste stable.
Il reste à l'intégrer à la chronologie principale de la mission, et le centre de contrôle voudra sans doute relire ce changement avant de l'accepter.

> ### À quoi servent les Pull Requests ?
> Les Pull Requests (ou PR) sont un excellent moyen de collaborer avec d'autres personnes sur GitHub.
> Au lieu de modifier directement un dépôt, vous pouvez y **proposer** des changements.
> C'est utile si vous n'avez pas la permission de modifier un dépôt directement, ou si vous souhaitez que quelqu'un d'autre relise vos changements.
{:.block-example}

## Créer une Pull Request

Sur GitHub, dans votre dépôt `mission-spatiale`, cliquez sur l'**onglet Pull requests**.

Puis cliquez sur **New pull request**.
Vous pouvez aussi passer par le bouton **Compare & pull request** : GitHub repère votre nouvelle branche avec des changements récents et vous le propose.
En cliquant dessus, vous arrivez également sur la page de création d'une Pull Request.

{% include figure.liquid loading="eager" path="assets/img/git/github-open-pr.png" title="Ouvrir une Pull Request sur GitHub pour la branche liaison-stable" class="img-fluid rounded z-depth-2 mx-auto d-block" %}

Vérifiez que la branche "base" est `main` et que la branche "compare" est `liaison-stable`.

Ensuite, nous devons donner un titre à notre PR.
Par défaut, la PR reprend le titre de votre dernier commit. Nous pouvons le laisser tel quel.

Cliquez sur **Create pull request**.

{% include figure.liquid loading="eager" path="assets/img/git/github-pr-opened.png" title="La Pull Request est créée" class="img-fluid rounded z-depth-2 mx-auto d-block" %}

## Fusionner la Pull Request

Votre dépôt `mission-spatiale` a maintenant 1 Pull Request.
C'est à cette étape que vous demanderiez normalement une personne pour relire votre travail, qui pourrait laisser des commentaires sur votre code.
Dans les dépôts dont vous n'êtes pas propriétaire, votre PR doit être approuvée par une personne responsable du code (*codeowner*) avant de pouvoir être fusionnée.
Comme vous êtes le ou la propriétaire du code, nous pouvons continuer et cliquer sur **Merge pull request**.
Confirmez et terminez la fusion.

Retournez dans l'onglet *Code* et assurez-vous d'être sur la branche `main`.
Vous devriez maintenant voir un fichier `orbite.txt`.

{% include figure.liquid loading="eager" path="assets/img/git/github-pr-merged.png" title="La Pull Request est créée" class="img-fluid rounded z-depth-2 mx-auto d-block" %}

## Mettre à jour le dépôt local

Retournons dans le terminal.
Basculons vers la branche `main`, puis regardons les fichiers et l'historique :

```bash
$ git switch main
$ git log --oneline
```

```output
2f2d364 (HEAD -> main, origin/main, origin/HEAD) Mise à jour de la sortie extravéhiculaire
ee67c8b Installation des panneaux solaires
9b26458 Début du journal de bord dans mars.txt
f537d84 Initial commit
```

Le fichier `orbite.txt` n'est pas encore sur `main`.
C'est parce que nous devons d'abord récupérer, depuis le dépôt distant, les changements réalisés avec la Pull Request.

```bash
$ git pull
```

```output
remote: Enumerating objects: 1, done.
remote: Counting objects: 100% (1/1), done.
remote: Total 1 (delta 0), reused 0 (delta 0), pack-reused 0 (from 0)
Unpacking objects: 100% (1/1), 952 bytes | 476.00 KiB/s, done.
From https://github.com/amara-okoye/mission-spatiale
   2f2d364..976b48e  main       -> origin/main
Updating 2f2d364..976b48e
Fast-forward
 orbite.txt | 1 +
 1 file changed, 1 insertion(+)
 create mode 100644 orbite.txt
```

```bash
$ git log --oneline
```

```output
976b48e (HEAD -> main, origin/main, origin/HEAD) Merge pull request #1 from amara-okoye/liaison-stable
daf95c3 (origin/liaison-stable, liaison-stable) Création de orbite.txt sur la liaison stable
2f2d364 Fin du journal avec les premières graines
ee67c8b Installation des panneaux solaires
9b26458 Début du journal de bord dans mars.txt
f537d84 Initial commit
```

Notre branche `main` est maintenant à jour.

## Supprimer des branches

Maintenant que nous avons fusionné `liaison-stable` dans `main`, ces changements existent dans les deux branches.
Cela pourrait prêter à confusion plus tard si nous retombions sur la branche `liaison-stable`.

Nous pouvons supprimer nos anciennes branches pour éviter cette confusion.
Pour cela, nous ajoutons l'option `-d` à la commande `git branch`.

```bash
$ git branch -d liaison-stable
```

```output
Deleted branch liaison-stable (was daf95c3).
```

Comme nous ne voulons pas conserver les changements de la branche `liaison-coupee`, nous pouvons aussi la supprimer.

```bash
$ git branch -d liaison-coupee
```

```output
error: The branch 'liaison-coupee' is not fully merged.
If you are sure you want to delete it, run 'git branch -D liaison-coupee'.
```

Comme nous n'avons jamais fusionné les changements de la branche `liaison-coupee`, git nous avertit avant de les supprimer et nous invite à utiliser l'option `-D` à la place.

Puisque nous voulons vraiment supprimer cette branche, nous allons le faire.

```bash
$ git branch -D liaison-coupee
```

```output
Deleted branch liaison-coupee (was 59b9bab).
```

Enfin, nous pouvons aussi supprimer la branche `liaison-stable` **sur GitHub**.
**Cliquez sur "Branches"**, puis, pour supprimer la branche `liaison-stable`, **cliquez sur l'icône de corbeille** à droite du nom de la branche.

> :bulb: **À retenir**
> - Les Pull Requests permettent de proposer des changements à des dépôts sur lesquels vous n'avez pas les droits de modification.
{:.block-tip}
