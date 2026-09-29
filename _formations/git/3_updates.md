---
layout: page
type: formation
title: Cycle des commits
description: Enregistrer, inspecter et documenter les changements avec Git
category: Versionnage avec Git
visible: true
img: /assets/img/git/git-flow-update.jpg
tabs: true
mermaid:
  enabled: true
  zoomable: true
---

# Cycle des commits

## :ringed_planet: Mission Ares-7 sur Mars

Amara, ingénieure de bord de la mission Ares-7, doit garder une trace de tout ce qui se passe pendant l'expédition : atterrissage, installation du campement, expériences scientifiques...
Même avec un équipage brillant, il est difficile de se souvenir de chaque événement, et surtout de savoir qui a écrit quoi et quand.
Heureusement, il existe un outil pour cela : git !
Amara a décidé de consigner les événements de la mission dans un dépôt git nommé `mission-spatiale`.
Chaque planète aura son propre fichier.
Amara commence par enregistrer les événements de la base martienne.

## Créer un fichier

Commençons par nous assurer que nous sommes dans le bon répertoire.
Vous devriez être dans le répertoire `mission-spatiale`.

```bash
$ pwd
```

Créons un fichier appelé `mars.txt` pour commencer à consigner les événements qui se déroulent sur la planète Mars.

Saisissez le texte ci-dessous dans le fichier `mars.txt` :

```output
L'équipage d'Ares-7 atterrit dans la plaine d'Utopia Planitia.

```

Assurez-vous de terminer le fichier par un retour à la ligne. 
Puis enregistrez le fichier.

## Suivre les modifications du fichier

Si nous vérifions à nouveau l'état de notre projet, Git nous indique qu'il a remarqué le nouveau fichier :

```bash
$ git status
```

```output
On branch main
Your branch is up to date with 'origin/main'.

Untracked files:
  (use "git add <file>..." to include in what will be committed)
        mars.txt

nothing added to commit but untracked files present (use "git add" to track)
```

Le message "Untracked files" (fichiers non suivis) signifie qu'il y a dans le répertoire un fichier
que Git ne suit pas.
Nous pouvons demander à Git de suivre un fichier avec `git add` :

```bash
$ git add mars.txt
```

puis vérifier que l'opération a bien fonctionné :

```bash
$ git status
```

```output
On branch main
Your branch is up to date with 'origin/main'.

Changes to be committed:
  (use "git restore --staged <file>..." to unstage)
        new file:   mars.txt
```

Git sait maintenant qu'il doit suivre `mars.txt`,
mais il n'a pas encore enregistré ces modifications sous forme de commit.
Pour cela,
nous devons exécuter une commande de plus :

```bash
$ git commit -m "Début du journal de bord dans mars.txt"
```

```output
[main 9b26458] Début du journal de bord dans mars.txt
 1 file changed, 1 insertion(+)
 create mode 100644 mars.txt
```

Lorsque nous exécutons `git commit`,
Git prend tout ce que nous lui avons demandé de sauvegarder avec `git add`
et en stocke une copie permanente dans le répertoire spécial `.git`.
Cette copie permanente s'appelle un **commit** (ou révision) et son identifiant court est `9b26458`
(Votre commit aura un autre identifiant.)

Nous utilisons l'option `-m` (pour "message") afin d'enregistrer un commentaire court, descriptif et précis qui nous aidera plus tard à nous rappeler ce que nous avons fait et pourquoi.
Si nous exécutons simplement `git commit` sans l'option `-m`,
Git ouvrira une fenêtre VS Code (ou tout autre éditeur configuré via `core.editor`) afin que nous puissions rédiger un message plus long.

Un [bon message de commit](https://chris.beams.io/posts/git-commit/) commence par un bref résumé (< 50 caractères) des
modifications apportées par le commit. Si vous voulez entrer dans les détails, ajoutez
une ligne vide entre la ligne de résumé et vos notes complémentaires.

Si nous exécutons maintenant `git status` :

```bash
$ git status
```

```output
On branch main
Your branch is ahead of 'origin/main' by 1 commit.
  (use "git push" to publish your local commits)

nothing to commit, working tree clean
```

Git nous indique que tout est à jour.
Si nous voulons savoir ce que nous avons fait récemment,
nous pouvons demander à Git de nous montrer l'historique du projet avec `git log` :

```bash
$ git log
```

```output
commit 9b26458f5d229d48be61023bcb510f8beb3f13db (HEAD -> main)
Author: Amara Okoye <amara.okoye@agence-spatiale.org>
Date:   Sat May 17 20:18:55 2025 -0400

    Début du journal de bord dans mars.txt

commit f537d84c6ef9b6d988f642400b2017f855f9aaa1 (origin/main, origin/HEAD)
Author: Amara Okoye <amara.okoye@agence-spatiale.org>
Date:   Sat May 17 18:34:45 2025 -0400

    Initial commit
```

`git log` liste tous les commits effectués dans un dépôt, du plus récent au plus ancien.
Chaque commit listé comprend son identifiant complet (qui commence par les mêmes caractères que l'identifiant court affiché plus tôt par la commande `git commit`), son auteurice, sa date de création, et le message de commit fourni à Git lors de sa création.

## Apporter d'autres modifications au fichier

Supposons maintenant qu'Amara consigne un nouvel événement dans le fichier.

Ajoutez une deuxième ligne dans le fichier `mars.txt`.

```output
L'équipage d'Ares-7 atterrit dans la plaine d'Utopia Planitia.
L'équipage installe les panneaux solaires du campement.

```

Enregistrez le fichier (assurez-vous de terminer par un retour à la ligne).

Lorsque nous exécutons maintenant `git status`, Git nous indique qu'un fichier qu'il connaît déjà a été modifié. 

```bash
$ git status
```

```output
On branch main
Your branch is ahead of 'origin/main' by 1 commit.
  (use "git push" to publish your local commits)

Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
        modified:   mars.txt

no changes added to commit (use "git add" and/or "git commit -a")
```

La dernière ligne est la phrase clé : "no changes added to commit" (aucune modification ajoutée au commit).
Nous avons modifié ce fichier, mais nous n'avons pas dit à Git que nous voulions conserver ces modifications (ce que nous faisons avec `git add`) ni ne les avons enregistrées (ce que nous faisons avec `git commit`).
Faisons-le maintenant.
C'est une bonne pratique de toujours relire nos modifications avant de les enregistrer.
Nous le faisons avec `git diff`.
Cette commande nous montre les différences entre l'état actuel du fichier et la dernière version enregistrée.

```bash
$ git diff
```

```diff
diff --git a/mars.txt b/mars.txt
index 0b592c6..d27fc77 100644
--- a/mars.txt
+++ b/mars.txt
@@ -1 +1,2 @@
 L'équipage d'Ares-7 atterrit dans la plaine d'Utopia Planitia.
+L'équipage installe les panneaux solaires du campement.
```

Décomposons le résultat de cette sortie :

1.  La première ligne nous indique que Git compare l'ancienne et la nouvelle version du fichier.
2.  La deuxième ligne indique précisément quelles versions du fichier Git compare : `0b592c6` et `d27fc77` sont des étiquettes uniques générées par la machine pour ces versions.
3.  Les troisième et quatrième lignes rappellent le nom du fichier modifié.
4.  Les lignes restantes sont les plus intéressantes : 
   - Elles montrent les différences réelles et les lignes où elles se produisent 
   - En particulier, le signe `+` dans la première colonne indique où nous avons ajouté une ligne.

Après avoir relu notre modification, il est temps de la valider (commit) :

```bash
$ git commit -m "Installation des panneaux solaires"
```

```output
On branch main
Your branch is ahead of 'origin/main' by 1 commit.
  (use "git push" to publish your local commits)

Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
        modified:   mars.txt

no changes added to commit (use "git add" and/or "git commit -a")
```

Oups :
Git refuse de faire le commit car nous n'avons pas utilisé `git add` auparavant.
Corrigeons cela :

```bash
$ git add mars.txt
$ git commit -m "Installation des panneaux solaires"
```

```output
[main ee67c8b] Installation des panneaux solaires
 1 file changed, 1 insertion(+)
```

Git impose d'ajouter les fichiers à l'ensemble que nous voulons valider avant de valider quoi que ce soit.
Cela nous permet de valider nos modifications par étapes et de les regrouper en portions logiques plutôt que en gros lots.

Pour cela, Git dispose d'une **zone d'index** (*staging area*) où il garde la trace de ce qui a été ajouté à l'ensemble de modifications en cours mais pas encore validé.

> ### Staging area
> Voyez Git comme un outil qui **prend des photos instantanées** des modifications au fil de la vie d'un projet.
> Avec `git add` on précise ce qui figurera sur la photo (en plaçant les éléments dans la zone d'index)
> Ensuite, `git commit` fait réellement la capture, et en fait un enregistrement permanent (sous forme de commit).
> Si rien n'est dans la zone d'index quand vous tapez `git commit`, Git vous invitera à utiliser `git commit -a` ou `git commit --all`,  ce qui revient un peu à rassembler *tout le monde* pour la photo !
> 
> Cependant, il est presque toujours préférable d'ajouter explicitement les éléments à la zone d'index, car vous pourriez valider des modifications dont vous aviez oublié l'existence.
> Pour reprendre l'image de l'instantané, vous risqueriez d'avoir des figurants pas encore prêts qui traversent le champ au moment de la photo parce que vous avez utilisé `-a` !
> 
> Essayez d'indexer les éléments manuellement, sinon vous risquez de chercher "git undo commit" plus souvent que vous ne le voudriez !
{:.block-example}

{% include figure.liquid loading="eager" path="assets/img/git/git-staging-area.svg" title="Git staging area" class="img-fluid rounded z-depth-2 mx-auto d-block" max-width="600px" %}

<!---
## Utiliser le volet Contrôle de code source dans VS Code

Observons comment nos modifications d'un fichier passent de notre éditeur
à la zone d'index, puis au stockage à long terme.
Tout d'abord, nous allons ajouter une ligne au fichier :


```output
L'équipage d'Ares-7 atterrit dans la plaine d'Utopia Planitia.
L'équipage installe les panneaux solaires du campement.
L'équipage fait germer les premières graines dans la serre.

```

Enregistrez le fichier (avec un retour à la ligne à la fin !).

Passez du volet Explorateur au volet Contrôle de code source dans VS Code.

Sous "Modifications", vous devriez voir votre fichier `mars.txt`. Cliquez sur le fichier.

Dans votre fenêtre de Terminal, saisissez la commande :

```bash
$ git diff
```

```diff
diff --git a/mars.txt b/mars.txt
index d27fc77..8938f14 100644
--- a/mars.txt
+++ b/mars.txt
@@ -1,2 +1,3 @@
 L'équipage d'Ares-7 atterrit dans la plaine d'Utopia Planitia.
 L'équipage installe les panneaux solaires du campement.
+L'équipage fait germer les premières graines dans la serre.
```

La commande `git diff` accomplit la même chose que le clic sur le fichier sous "Modifications" : elle montre que nous avons ajouté une ligne à la fin du fichier
(signalée par un `+` dans la première colonne).

Dans le volet Contrôle de code source, cliquez sur l'icône `+` à côté du fichier `mars.txt`. 
Le fichier `mars.txt` est déplacé vers la section "Modifications enregistrées".

Cliquer sur l'icône `+` revient à taper `git add mars.txt` dans le terminal.

Maintenant, enregistrons nos modifications. Nous pourrions utiliser le Terminal pour valider :

```bash
$ git commit -m "Fin du journal avec les premières graines"
```

```output
[main 2f2d364] Fin du journal avec les premières graines
 1 file changed, 1 insertion(+)
```

Ou bien nous pouvons saisir le message de commit "Fin du journal avec les premières graines" dans la zone "Message" et cliquer sur "Commit".

Vérifions notre état :

```bash
$ git status
```

```output
On branch main
Your branch is ahead of 'origin/main' by 3 commits.
  (use "git push" to publish your local commits)

nothing to commit, working tree clean
```

et regardons l'historique de ce que nous avons fait jusqu'ici :

```bash
$ git log
```

```output
commit 2f2d364f559efb1101647591d9fbf2cc30ade8bb (HEAD -> main)
Author: Amara Okoye <amara.okoye@agence-spatiale.org>
Date:   Sat May 17 20:29:51 2025 -0400

    Fin du journal avec les premières graines

commit ee67c8b551612e09be46c97726866d04c7b0d785
Author: Amara Okoye <amara.okoye@agence-spatiale.org>
Date:   Sat May 17 20:24:35 2025 -0400

    Installation des panneaux solaires

commit 9b26458f5d229d48be61023bcb510f8beb3f13db
Author: Amara Okoye <amara.okoye@agence-spatiale.org>
Date:   Sat May 17 20:18:55 2025 -0400

    Début du journal de bord dans mars.txt

commit f537d84c6ef9b6d988f642400b2017f855f9aaa1 (origin/main, origin/HEAD)
Author: Amara Okoye <amara.okoye@agence-spatiale.org>
Date:   Sat May 17 18:34:45 2025 -0400

    Initial commit
```
--->


> :bulb: **À retenir**
> - `git status` affiche l'état d'un dépôt.
> - Les fichiers peuvent se trouver dans le **répertoire de travail** du projet (ce que voient les utilisateurs), dans la **zone d'index** (où le prochain commit est préparé) et dans le **dépôt local** (où les commits sont enregistrés de façon permanente).
> - `git add` place des fichiers dans la zone d'index.
> - `git commit` enregistre le contenu indexé sous forme de nouveau commit dans le dépôt local.
> - Rédigez toujours un message de commit lorsque vous validez des modifications.
{:.block-tip}

## Mise en pratique

À votre tour de tenir le journal des activités de la mission Ares-7. Réalisez les étapes ci-dessous dans le dépôt de la mission, en vous aidant des explications précédentes.

1. Créez un fichier `sortie-extravehiculaire.txt` contenant cette première activité :

   ```text
   L'équipage prépare une sortie extravéhiculaire pour inspecter l'antenne de communication.
   ```

2. Examinez l'état du dépôt et repérez le nouveau fichier non suivi.
3. Préparez uniquement ce fichier pour le prochain enregistrement, puis vérifiez que le contenu préparé est correct.
4. Enregistrez cette première version avec un message descriptif de moins de 50 caractères. Évitez les messages vagues comme *mise à jour*.
5. Ajoutez ensuite cette deuxième activité au fichier :

   ```text
   L'antenne est inspectée et son alignement est corrigé.
   ```

6. Examinez l'état du dépôt et comparez le fichier modifié à la dernière version enregistrée. Repérez la ligne ajoutée.
7. Préparez la modification, puis vérifiez une nouvelle fois le contenu qui sera enregistré.
8. Enregistrez une deuxième version avec un message qui décrit précisément la correction apportée.
9. Vérifiez qu'il ne reste aucune modification en attente et consultez l'historique pour retrouver les deux versions créées.

**Pour faire le bilan :** expliquez où se trouve le fichier avant sa préparation, après sa préparation et après son enregistrement. Reliez ces étapes à la métaphore de la photographie et justifiez en quoi les deux messages de version sont descriptifs.

[//]: # -----------------------------------------------------------------------------------------------------------------

# Diffusion des modifications sur GitHub

## :satellite: Transmettre le journal de bord à la Terre

Le journal d'Amara est bien à jour, mais il n'existe pour l'instant que sur son ordinateur de bord.
Si le reste de l'équipe, ou le centre de contrôle sur Terre, veut le consulter, il faut transmettre ces informations.

## Dépôts locaux et distants

Le versionnage prend tout son sens lorsque nous commençons à collaborer avec d'autres personnes.
Nous disposons déjà de presque tout ce qu'il faut pour cela ; il ne manque qu'une chose : copier les changements d'un dépôt vers un autre.

Des systèmes comme Git permettent de déplacer le travail entre deux dépôts quelconques.
En pratique, il est toutefois plus simple d'utiliser une copie comme point central, et de la garder sur le web plutôt que sur l'ordinateur de quelqu'un.
La plupart des développeur·euses utilisent des services d'hébergement comme [GitHub](https://github.com), [Bitbucket](https://bitbucket.org) ou [GitLab](https://gitlab.com/) pour conserver ces copies principales ; nous utilisons GitHub.

Avant de partager nos changements, regardons d'abord notre dépôt `mission-spatiale` sur GitHub.

Même si nous avons modifié notre copie locale de `mission-spatiale`, la copie distante sur GitHub ne contient encore que le fichier README.
C'est parce que nous n'avons pas encore *poussé* (**push**) nos changements (ou commits) vers le dépôt distant.

> ### Connecter un dépôt local à un dépôt distant
> Notez que notre dépôt local contient toujours notre travail sur `mars.txt`, alors que le dépôt distant sur GitHub ne contient que le fichier README.
>
> Comme nous avons d'abord créé notre dépôt sur GitHub, puis que nous l'avons cloné sur notre ordinateur, les deux dépôts sont déjà connectés.
> Si nous avions au contraire créé le dépôt local en premier, puis le dépôt distant sur GitHub, il aurait fallu les connecter manuellement avec une commande comme :
>
> ```bash
> $ git remote add origin git@github.com:amara-okoye/mission-spatiale.git
> ```
>
> `origin` est un nom local qui désigne le dépôt distant.
> Il pourrait s'appeler n'importe comment, mais `origin` est une convention souvent utilisée par défaut dans git et GitHub, il est donc préférable de la conserver sauf raison particulière.
>
> Ici, nous pouvons simplement vérifier que les deux dépôts sont connectés avec la commande :
>
> ```bash
> $ git remote -v
> ```
>
> ```output
> origin  https://github.com/amara-okoye/mission-spatiale.git (fetch)
> origin  https://github.com/amara-okoye/mission-spatiale.git (push)
> ```
{:.block-example}

## Pousser les changements locaux vers GitHub

Cette commande envoie les changements de notre dépôt local vers le dépôt sur GitHub :

```bash
$ git push origin main
```

```output
Enumerating objects: 10, done.
Counting objects: 100% (10/10), done.
Delta compression using up to 8 threads
Compressing objects: 100% (8/8), done.
Writing objects: 100% (9/9), 992 bytes | 992.00 KiB/s, done.
Total 9 (delta 1), reused 0 (delta 0), pack-reused 0
remote: Resolving deltas: 100% (1/1), done.
To https://github.com/amara-okoye/mission-spatiale.git
   f537d84..2f2d364  main -> main
```

Nous pouvons aussi récupérer (**pull**) les changements du dépôt distant vers le dépôt local :

```bash
$ git pull origin main
```

```output
From https://github.com/amara-okoye/mission-spatiale
 * branch            main       -> FETCH_HEAD
Already up to date.
```

Ici, `git pull` n'a aucun effet car les deux dépôts sont déjà synchronisés.
Si quelqu'un d'autre avait poussé des changements vers le dépôt sur GitHub, cette commande les aurait téléchargés dans notre dépôt local.

Vérifions que nos changements sont bien arrivés sur GitHub : allez dans la **fenêtre de votre navigateur avec le dépôt GitHub et actualisez** la page.

{% include figure.liquid loading="eager" path="assets/img/git/github-pushed-changes.png" title="Les changements ont été poussés" class="img-fluid rounded z-depth-2 mx-auto d-block" %}

Vous devriez maintenant voir le fichier `mars.txt`.
Cliquez sur **nom du le fichier** : son contenu est identique à celui affiché dans l'IDE.

{% include figure.liquid loading="eager" path="assets/img/git/github-mars.png" title="Affichage de mars.txt" class="img-fluid rounded z-depth-2 mx-auto d-block" %}

Cliquez maintenant sur le lien **History** (Historique) en haut à droite.
Vous devriez voir chaque commit réalisé sur le fichier, même si nous n'avons poussé qu'une seule fois.

{% include figure.liquid loading="eager" path="assets/img/git/github-mars-history.png" title="Historique des commits de mars.txt" class="img-fluid rounded z-depth-2 mx-auto d-block" %}

> :bulb: **À retenir**
> - Un dépôt Git local peut être connecté à un ou plusieurs dépôts distants.
> - `git push` copie les changements d'un dépôt local vers un dépôt distant.
> - `git pull` copie les changements d'un dépôt distant vers un dépôt local.
{:.block-tip}
