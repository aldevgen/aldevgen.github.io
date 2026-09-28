---
layout: page
type: formation
title: Création de branches
description: Travailler en parallèle et tester plusieurs scénarios avec les branches Git
category: Versionnage avec Git
visible: true
img: /assets/img/git/workflow.jpg
tabs: true
mermaid:
  enabled: true
  zoomable: true
---

# Création de branches

## :ringed_planet: Deux scénarios pour la mission Ares-7

Jusqu'ici, nous avons toujours travaillé sur une chronologie linéaire.
Cependant, il arrive que nous souhaitions protéger notre travail principal des modifications expérimentales sur lesquelles nous travaillons.
Pour cela, nous pouvons utiliser des **branches** afin de travailler sur des tâches distinctes en parallèle, sans modifier notre branche actuelle, `main`.

Nous ne l'avions pas vu, mais la première branche créée s'appelle `main`.
C'est la branche par défaut créée lors de l'initialisation d'un dépôt, et elle est souvent considérée comme la version *propre* ou *fonctionnelle* du code d'un dépôt.

Nous pouvons voir quelles branches existent dans un dépôt en tapant :

```bash
$ git branch
```

```output
* main
```

L'astérisque `*` indique la branche sur laquelle nous nous trouvons.

Dans cette leçon, Amara doit suivre deux scénarios possibles pour la mission, avec deux versions différentes des événements en orbite.
Une seule de ces branches deviendra la chronologie *main* de la mission.
Dans le premier scénario, la sonde relais reste en orbite et maintient une liaison stable avec la Terre.
Dans le second, une tempête solaire coupe la liaison et l'équipage se retrouve isolé.

Commençons par créer la branche où la liaison reste stable.
Nous utilisons la même commande `git branch`, mais en ajoutant cette fois le nom que nous voulons donner à notre nouvelle branche :

```bash
$ git branch liaison-stable
```

Nous pouvons maintenant vérifier notre travail avec la commande `git branch`.

```bash
$ git branch
```

```output
  liaison-stable
* main
```

Nous voyons que la branche `liaison-stable` a bien été créée, mais que nous sommes toujours sur la branche `main`.

Nous pouvons aussi le constater dans la sortie de la commande `git status`.

```bash
$ git status
```

```output
On branch main
nothing to commit, working directory clean
```

Pour passer à notre nouvelle branche, nous utilisons la commande `switch`, puis nous vérifions avec `git branch`.

```bash
$ git switch liaison-stable
$ git branch
```

```output
* liaison-stable
  main
```

> ### `switch` ou `checkout` ?
> La commande git `switch` est relativement récente. Vous pouvez aussi utiliser la commande `checkout`.
> Il y a quelques années, les commandes `switch` et `restore` ont été introduites pour distinguer les deux fonctions remplies par `checkout`.
> La commande `checkout` reste disponible si vous préférez l'utiliser.
>
> On peut utiliser `checkout` pour récupérer un fichier d'un commit précis, à l'aide des identifiants de commit ou de `HEAD` et du nom du fichier (`git checkout HEAD <fichier>`).
> La commande `checkout` peut aussi servir à retrouver une version entière du dépôt, en mettant à jour tous les fichiers pour qu'ils correspondent à l'état d'un commit donné.
>
> Les branches nous permettent de le faire avec un nom lisible plutôt qu'en mémorisant un identifiant de commit.
> Ce nom donne aussi généralement un sens à l'ensemble des modifications de la branche.
> Quand nous utilisons `git checkout <nom_de_branche>`, nous utilisons un surnom pour retrouver une version du dépôt qui correspond au commit le plus récent de cette branche (le `HEAD` de cette branche).
{:.block-example}

Vous pouvez utiliser `git log` et `ls` pour constater que l'historique et les fichiers sont les mêmes que sur notre branche `main`.
Cela restera vrai tant que nous n'aurons pas validé de modifications sur notre nouvelle branche.

```bash
$ git log --oneline
```

```output
2f2d364 (HEAD -> liaison-stable, origin/main, origin/HEAD, main) Fin du journal avec les premières graines
ee67c8b Installation des panneaux solaires
9b26458 Début du journal de bord dans mars.txt
f537d84 Initial commit
```

Écrivons maintenant ce qui se passe en orbite.

Créez un nouveau fichier appelé `orbite.txt`.
Ajoutez-y une ligne (en terminant par un retour à la ligne), puis enregistrez le fichier :

```output
La sonde relais reste en orbite et maintient la liaison avec la Terre.
```

Nous pouvons maintenant ajouter ce fichier et le valider sur notre branche.

```bash
$ git add orbite.txt
$ git commit -m "Création de orbite.txt sur la liaison stable"
```

```output
[liaison-stable daf95c3] Création de orbite.txt sur la liaison stable
 1 file changed, 1 insertion(+)
 create mode 100644 orbite.txt
```

Vérifions notre travail !

```bash
$ git log --oneline
```

```output
daf95c3 (HEAD -> liaison-stable) Création de orbite.txt sur la liaison stable
2f2d364 (origin/main, origin/HEAD, main) Fin du journal avec les premières graines
ee67c8b Installation des panneaux solaires
9b26458 Début du journal de bord dans mars.txt
f537d84 Initial commit
```

Comme prévu, nous voyons notre commit dans le journal.

Revenons maintenant à la branche `main`.

```bash
$ git switch main
$ git branch
```

```output
  liaison-stable
* main
```

Explorons un peu le dépôt.

Maintenant que nous avons confirmé que nous sommes de nouveau sur la branche `main`, vérifions que `orbite.txt` et notre dernier commit n'y figurent pas.

```bash
$ git log --oneline
```

```output
2f2d364 (HEAD -> main, origin/main, origin/HEAD) Fin du journal avec les premières graines
ee67c8b Installation des panneaux solaires
9b26458 Début du journal de bord dans mars.txt
f537d84 Initial commit
```

> ### Rien n'est perdu
> Nous ne voyons plus le fichier `orbite.txt`, et notre dernier commit n'apparaît plus dans l'historique de cette branche.
> Mais pas d'inquiétude ! Tout notre travail est conservé dans la branche `liaison-stable`.
> Nous pouvons le confirmer en retournant sur cette branche.
>
> ```bash
> $ git switch liaison-stable
> $ git branch
> ```
>
> ```output
> * liaison-stable
>   main
> ```
>
> ```bash
> $ git log --oneline
> ```
>
> Nous constatons que le fichier `orbite.txt` et son commit ont bien été préservés dans la branche `liaison-stable`.
>
> Revenez ensuite sur la branche `main` pour préparer la création d'une autre branche basée sur l'historique de `main`.
> Une nouvelle branche inclut tout l'historique jusqu'au commit courant, et nous voulons garder ces deux tâches séparées.
>
> ```bash
> $ git switch main
> $ git branch
> ```
>
> ```output
>   liaison-stable
> * main
> ```
{:.block-example}

Nous pouvons maintenant suivre un autre scénario qui part de la chronologie principale.

Cette fois, créons et basculons vers la branche `liaison-coupee` en une seule commande.

Pour cela, nous ajoutons l'option `-c` à la commande `switch`.

```bash
$ git switch -c liaison-coupee
$ git branch
```

```output
  liaison-stable
* liaison-coupee
  main
```

Nous pouvons utiliser `git log` pour vérifier que cette branche est identique à notre branche `main` actuelle.

```bash
$ git log --oneline
```

```output
2f2d364 (HEAD -> liaison-coupee, origin/main, origin/HEAD, main) Fin du journal avec les premières graines
ee67c8b Installation des panneaux solaires
9b26458 Début du journal de bord dans mars.txt
f537d84 Initial commit
```

Nous pouvons maintenant créer à nouveau un fichier pour l'orbite et y écrire l'autre version des événements.
Cette fois, créons un fichier Markdown plutôt qu'un fichier texte.

Créez un nouveau fichier appelé `orbite.md` et ajoutez cette ligne :

```
Une *tempête solaire* coupe la liaison avec la Terre, l'équipage est isolé.
```

```bash
$ git add orbite.md
$ git commit -m "Création de orbite.md sur la liaison coupée"
```

```output
[liaison-coupee 59b9bab] Création de orbite.md sur la liaison coupée
 1 file changed, 1 insertion(+)
 create mode 100644 orbite.md
```

Vérifions à nouveau notre travail avant de revenir à la branche principale.

```bash
$ git log --oneline
```

```output
59b9bab (HEAD -> liaison-coupee) Création de orbite.md sur la liaison coupée
2f2d364 (origin/main, origin/HEAD, main) Fin du journal avec les premières graines
ee67c8b Installation des panneaux solaires
9b26458 Début du journal de bord dans mars.txt
f537d84 Initial commit
```

Amara décide que la version des événements où la liaison reste stable doit faire partie de la chronologie principale.

Nous allons fusionner la branche `liaison-stable` dans notre branche `main` via une **Pull Request**, afin de pouvoir l'utiliser pour la suite de notre travail.

Avant de pouvoir créer une Pull Request sur GitHub, nous devons pousser cette branche vers le dépôt distant.

Basculons vers la branche `liaison-stable` et poussons-la :

```bash
$ git switch liaison-stable
$ git push
```

Oups, nous obtenons une erreur :

```output
fatal: The current branch liaison-stable has no upstream branch.
To push the current branch and set the remote as upstream, use

    git push --set-upstream origin liaison-stable

To have this happen automatically for branches without a tracking
upstream, see 'push.autoSetupRemote' in 'git help config'.
```

Alors que notre branche `main` existait déjà à la fois sur notre dépôt local et sur le dépôt distant, notre branche `liaison-stable` n'existe que sur notre ordinateur.
Vous pouvez le vérifier en allant sur GitHub et en cherchant la branche `liaison-stable` : vous ne la trouverez pas !

Nous devons utiliser l'option `-u` dans notre commande et préciser la branche de destination.

```bash
$ git push -u origin liaison-stable
```

```output
Enumerating objects: 4, done.
Counting objects: 100% (4/4), done.
Delta compression using up to 8 threads
Compressing objects: 100% (3/3), done.
Writing objects: 100% (3/3), 406 bytes | 406.00 KiB/s, done.
Total 3 (delta 0), reused 0 (delta 0), pack-reused 0
remote: 
remote: Create a pull request for 'liaison-stable' on GitHub by visiting:
remote:      https://github.com/amara-okoye/mission-spatiale/pull/new/liaison-stable
remote: 
To https://github.com/amara-okoye/mission-spatiale.git
 * [new branch]      liaison-stable -> liaison-stable
branch 'liaison-stable' set up to track 'origin/liaison-stable'.
```

> ### L'option `-u`
> Vous verrez peut-être l'option `-u` utilisée avec `git push` dans certaines documentations.
> Cette option est synonyme de l'option `--set-upstream-to` de la commande `git branch`.
> Elle sert à associer la branche courante à une branche distante, de sorte que la commande `git pull` puisse ensuite être utilisée sans argument.
> Pour cela, il suffit d'utiliser `git push -u origin <nom-de-branche>`.
{:.block-example}

Nous pouvons maintenant retourner sur GitHub et vérifier que nous avons une nouvelle branche nommée `liaison-stable`.

{% include figure.liquid loading="eager" path="assets/img/git/github-branch-pushed.png" title="GitHub contient la branche liaison-stable" class="img-fluid rounded z-depth-2 mx-auto d-block" %}

> :bulb: **À retenir**
> - Les branches sont utiles pour développer tout en gardant la ligne principale stable.
{:.block-tip}
