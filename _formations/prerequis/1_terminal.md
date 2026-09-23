---
layout: page
type: formation
title: Terminal
description: Commandes de base du terminal
category: Prérequis
visible: true
img: /assets/img/prerequis/terminal.jpg
tabs: true
mermaid:
  enabled: true
  zoomable: true
---

# Qu'est-ce qu'un terminal ?

Un **terminal** est une interface qui permet d'interagir avec une machine (ordinateur ou serveur distant) en saisissant des commandes.
Il donne accès aux fichiers, aux programmes et aux outils de développement sans passer par une interface graphique.

Pour ce cours, nous utiliserons **Git Bash** sous Windows (cf. section [pré-requis](https://aldevgen.github.io/formations/prerequis/git-bash/) pour installer Git for Windows si ce n'est pas déjà fait) et **Terminal** sous macOS ou Linux.

## Découverte du terminal

Lorsque le terminal attend une commande, il affiche un **prompt**. Il contient généralement le nom de l'utilisateur, celui de la machine ainsi que le dossier courant.

```shell
utilisateur@machine:~/mon-projet$
```

Le symbole `$` n'est pas une partie de la commande : il indique simplement que la commande doit être saisie après le prompt.

{% include figure.liquid loading="eager" path="assets/img/prerequis/terminal-prompt.png" title="Terminal prompt" class="img-fluid rounded z-depth-2 mx-auto d-block" max-width="600px" %}

Dans cet exemple, l'utilisateur est `alanna`, le nom de la machine est `ordi-alanna` et le terminal est dans le dossier `Documents`.

> :sassy_woman: La touche `tabulation` (ou `tab`) complète souvent le nom d'un fichier ou d'une commande.
> Les flèches haut et bas permettent de retrouver les commandes précédentes.
{:.block-tip}

## Commandes de base

### Identifier l'utilisateur courant

Connaître l'utilisateur courant est particulièrement utile lorsque l'on se connecte à divers serveurs et savoir quelle identité on a.
Pour cela, la commande `whoami` (*who am I*) indique le nom de l'utilisateur courant.

{% include figure.liquid loading="eager" path="assets/img/prerequis/terminal-whoami.png" title="Terminal whoami" class="img-fluid rounded z-depth-2 mx-auto d-block" max-width="600px" %}

### Identifier le dossier courant

Le terminal travaille toujours depuis un dossier courant. Pour connaître ce dossier, écrire `pwd` (pour print work directory) dans le terminal.

```bash
pwd
```

{% include figure.liquid loading="eager" path="assets/img/prerequis/terminal-pwd.png" title="Terminal pwd" class="img-fluid rounded z-depth-2 mx-auto d-block" max-width="600px" %}

Ici le terminal indique qu'il le situe dans le dossier `/Users/alanna/Documents`.

### Lister le contenu d'un dossier

Il est souvent utile de connaître le contenu d'un dossier, sans passer par l'explorateur de fichiers. Pour cela, la commande `ls` permet d'en lire le contenu.
La majorité des commandes shell permettent d'ajouter des options. Ces options sont préfixées par un tiret.

Dans le cas de la commande `ls`, deux options sont particulièrement utiles en termes d'affichage :
`-a` affiche les fichiers cachés (ceux dont le nom commencent par un point) et
`-l` affiche les fichiers cachés (ceux dont le nom commencent par un point).
Il est possible de les concaténer comme une seule option `-al` (au lieu d'ajouter deux options `-a` et `-l`).

```bash
# affiche les fichiers
ls
# affiche tous les fichiers (dont ceux cachés)
ls -a
# affiche tous les fichiers (dont ceux cachés) sous forme de liste
ls -al
```
`ls -la` affiche également les fichiers cachés et leurs informations détaillées.

{% include figure.liquid loading="eager" path="assets/img/prerequis/terminal-ls.png" title="Terminal ls" class="img-fluid rounded z-depth-2 mx-auto d-block" max-width="600px" %}

`drwxr-xr-x` décrit le type et les permissions d’un fichier ou dossier :

{% include figure.liquid loading="eager" path="assets/img/prerequis/terminal-permissions.png" title="Terminal permissions" class="img-fluid rounded z-depth-2 mx-auto d-block" max-width="500px" %}

- `r` (read) : lire le contenu ;
- `w` (write) : modifier le contenu ;
- `x` (execute) : exécuter un fichier ou, pour un dossier, y entrer et accéder à son contenu ;
- `-` : permission absente.

| Utilisateur  | Permissions | Signification                                |
|--------------|-------------|----------------------------------------------|
| Propriétaire | rwx         | lire, modifier et accéder au dossier         |
| Groupe       | r-x         | lire et accéder au dossier, sans le modifier |
| Autres       | r-x         | lire et accéder au dossier, sans le modifier |

### Se déplacer dans les dossiers

La commande `cd` (*change directory*) permet de changer de dossier.

```shell
# se déplacer dans le dossier "nom-du-dossier"
cd nom-du-dossier
# se déplacer dans le dossier parent
cd ..
# se déplacer dans le dossier personnel
cd ~
```

{% include figure.liquid loading="eager" path="assets/img/prerequis/terminal-cd.png" title="Terminal cd" class="img-fluid rounded z-depth-2 mx-auto d-block" max-width="600px" %}

{% tabs group-name %}

{% tab group-name Git Bash %}

Dans Git Bash, un chemin Windows s'écrit avec des `/`.
Voici un exemple pour changer de disque.

```bash
cd /d/Users/monutilisateur/Documents
cd "/d/Users/monutilisateur/Documents/Documents personnels"
```

Les guillemets permettent de gérer les chemins contenant des espaces. Dans la pratique, il est conseillé de ne pas utiliser d'espaces dans le nom des fichiers et dossiers.

{% endtab %}

{% tab group-name Linux/Mac %}

Sous Linux et macOS, un chemin ressemble à ceci :

```bash
cd /Users/monutilisateur/Documents/
cd "/Users/monutilisateur/Documents/Documents personnels"
```

Les guillemets permettent de gérer les chemins contenant des espaces. Dans la pratique, il est conseillé de ne pas utiliser d'espaces dans le nom des fichiers et dossiers.

{% endtab %}

{% endtabs %}

### Chemins relatifs et absolus

Un **chemin relatif** part du dossier courant :

```text
exercices/notes.txt
```

Un **chemin absolu** indique l'emplacement complet du fichier.

{% tabs group-name %}

{% tab group-name Windows %}

Il commence généralement par une lettre de lecteur sous Windows :

```text
Windows : C:\Users\utilisateur\Documents\exercices\notes.txt
```

{% endtab %}

{% tab group-name Linux %}

Il commence généralement par `/` sous Linux et macOS :

```text
Linux   : /home/utilisateur/Documents/exercices/notes.txt
```

{% endtab %}

{% tab group-name Mac %}

Il commence généralement par `/` sous Linux et macOS :

```text
macOS   : /Users/utilisateur/Documents/exercices/notes.txt
```

{% endtab %}

{% endtabs %}

> :sassy_woman: Il est recommandé d'utiliser des noms de fichiers simples, sans caractères spéciaux ni espaces. Sinon, il faut ajouter des guillemets autour du chemin vers le fichier
{:.block-tip}

### Créer des dossiers et des fichiers

Lors que l'on est connecté à un serveur, il est nécessaire de créer des dossiers ou des fichiers de configuration.
Dans ces cas-là, on n'a pas accès à un explorateur de fichier.
Il est donc nécessaire de savoir créer un dossier ou un fichier via le terminal.

#### Créer un dossier

La commande `mkdir` pour *make directory* permet de créer un dossier.

```bash
mkdir exercices
```

{% include figure.liquid loading="eager" path="assets/img/prerequis/terminal-mkdir.png" title="Terminal mkdir" class="img-fluid rounded z-depth-2 mx-auto d-block" max-width="600px" %}

#### Créer et modifier un fichier

Pour créer un fichier vide, la commande `touch` permet de créer le fichier s’il n’existe pas. S’il existe déjà, elle actualise sa date de dernière modification sans modifier son contenu.

```bash
touch notes.txt
```

```bash
# Ouvre le fichier avec l'éditeur vi
vi notes.txt
# Ouvre le fichier avec l'éditeur vim, une version améliorée de vi
vim notes.txt
# Ouvre le fichier avec l'éditeur nano, plus simple pour débuter
nano notes.txt
```

La commande ouvre le fichier dans l'éditeur choisi. Si le fichier n'existe pas, l'éditeur le crée lorsqu'il est enregistré.


##### Installer un éditeur de texte

Pour vérifier si un éditeur est installé, il faut utiliser la commande `command -v` :

```bash
command -v nano
command -v vim
command -v vi
```

Si la commande affiche un chemin, l'éditeur est installé. Sinon, le terminal affiche généralement une erreur ou ne renvoie aucun résultat.

{% tabs group-name %}

{% tab group-name Git Bash %}

Git Bash contient généralement `vi` et `vim`.

L'éditeur `nano` peut également être disponible selon la version de Git for Windows installée.

{% endtab %}

{% tab group-name Linux %}

Sur Ubuntu ou Debian :

```bash
sudo apt update
sudo apt install nano vim
```

Sur Fedora :

```bash
sudo dnf install nano vim
```

{% endtab %}

{% tab group-name MacOS %}

Sur macOS, `vi` et `nano` sont généralement déjà installés. Via Homebrew, il est possible d'installer ou mettre à jour Vim :

```bash
# installer Homebrew
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
# installer Vim
brew install vim
```

{% endtab %}

{% endtabs %}

Après l'installation, il suffit de vérifier que l'éditeur est bien installé.

```bash
command -v nano
command -v vim
```

##### Modifier un fichier avec `vi` ou `vim`

`vi` et `vim` sont des éditeurs **modaux** : le clavier ne sert pas toujours à saisir du texte.

```bash
vim notes.txt
```

Au démarrage, le terminal est en mode commande.
Pour commencer à écrire :

1. Appuyer sur `i` pour passer en mode insertion.
2. Saisir ou modifier le texte.
3. Appuyer sur `Échap` pour revenir au mode commande.
4. Saisir `:wq`, puis appuyer sur `Entrée` pour enregistrer et quitter.

Pour quitter sans enregistrer, utiliser `:q!`, puis appuyer sur `Entrée`.

> :warning: Pour débuter, `nano` est plus simple à prendre en main : ses commandes sont affichées en bas de l'écran.
{:.block-warning}

##### Modifier un fichier avec `nano`

Pour débuter, utiliser `nano` :

```bash
nano notes.txt
```

1. Déplacer le curseur avec les flèches.
2. Saisir ou modifier le texte directement.
3. Appuyer sur `Ctrl + O` pour enregistrer le fichier (*Write Out*).
4. Appuyer sur `Entrée` pour confirmer le nom du fichier.
5. Appuyer sur `Ctrl + X` pour quitter `nano`.

Dans `nano`, le symbole `^` signifie la touche `Ctrl`. Par exemple, `^X` signifie `Ctrl + X`.
En quittant `nano` sans enregistrer, une confirmation permet de sauvegarder ou non les modifications.

### Lire le contenu d'un fichier

```bash
cat notes.txt
```

Pour lire un long fichier page par page, en utilisant le curseur de la souris ou le pad pour faire défiler le texte.
Pour quitter l'affichage du texte, il faut appuyer sur la touche `q`.

```bash
less notes.txt
```

{% include figure.liquid loading="eager" path="assets/img/prerequis/terminal-cat.png" title="Terminal cat" class="img-fluid rounded z-depth-2 mx-auto d-block" max-width="600px" %}

### Copier, déplacer et supprimer

Pour manipuler des fichiers et dossiers, de nombreuses commandes sont pertinentes : `cp`, `mv` et `rm`.
- La commande `cp` pour *copy* permet de copier un fichier d'un dossier vers un autre dossier.
- La commande `mv` pour *mv* permet de déplacer un fichier d'un dossier vers un autre dossier.
Il n'existe pas de commande pour renommer un fichier, pour cela on utilise la commande *move*.
- Enfin, la commande `rm` pour *remove* permet de supprimer un fichier ou un dossier avec l'option `-r` pour itérer de manière récursive sur le dossier.

```bash
# Copie d'un fichier
cp path/to/old/folder/notes.txt path/to/old/folder/copie.txt
# Déplacement d'un fichier
mv copie.txt exercices/
# Renommage d'un fichier
mv old_name.txt new_name.txt
# Suppression d'un fichier
rm exercices/copie.txt
# Suppression d'un dossier
rm -r exercices/
```
> :warning: Il est fortement conseillé de vérifier avec `pwd` et `ls` le fichier/dossier à supprimer avant d'exécuter la commande de suppression. En effet, la suppression est irréversible.
{:.block-warning}

### Utiliser l'aide

Il est normal de ne pas connaître toutes les options d'une commande.
Pour cela, deux options existent :
- utiliser l'option `--help`, qui affiche une aide synthétique directement dans le terminal ;
- utiliser le manuel avec `man`. Il est généralement exhaustif. Pour le quitter, appuyez sur la touche `q`.

```bash
ls --help
```

{% include figure.liquid loading="eager" path="assets/img/prerequis/terminal-help.png" title="Terminal help" class="img-fluid rounded z-depth-2 mx-auto d-block" max-width="600px" %}

```bash
man ls
```

{% include figure.liquid loading="eager" path="assets/img/prerequis/terminal-man.png" title="Terminal man" class="img-fluid rounded z-depth-2 mx-auto d-block" max-width="600px" %}

### Variables d'environnement

Les variables d'environnement configurent le comportement des programmes. Par exemple, `PATH` indique où rechercher les exécutables. Les commandes ci-dessous permettent d'afficher la valeur de la variable d'environnement.

```bash
echo $PATH
```

## Place à la pratique

Réaliser les opérations suivantes dans un dossier de travail :

1. Afficher le dossier courant.
2. Créer un dossier `boutique`.
3. Entrer dans ce dossier et créer `fruits.txt`.
4. Ajouter une liste de fruits dans le fichier.
5. Afficher son contenu.
6. Créer une copie nommée `fruits-exotiques.txt` contenant les fruits suivants : `ananas`, `papaye`, `mangue` et `banane`.
7. Créer un sous-dossier `archive` et y déplacer la copie.
8. Lister le contenu du dossier et de `archive`.
9. Supprimer le fichier dans `archive` uniquement après avoir vérifié son chemin.
