// get the ninja-keys element
const ninja = document.querySelector('ninja-keys');

// add the home and posts menu items
ninja.data = [{
    id: "nav-about",
    title: "About",
    section: "Navigation",
    handler: () => {
      window.location.href = "/";
    },
  },{id: "nav-formations",
          title: "Formations",
          description: "Ressources pédagogiques pour les étudiant·es du BUT Science des Données et les auditeur·rices du certificat CS103 Intelligence Artificielle en Santé du Cnam",
          section: "Navigation",
          handler: () => {
            window.location.href = "/formations/";
          },
        },{id: "formations-ide",
          title: 'IDE',
          description: "Installation de PyCharm et configuration de l&#39;IDE",
          section: "Formations",handler: () => {
              window.location.href = "/formations/but/but2/poo/installation/";
            },},{id: "formations-tp1",
          title: 'TP1',
          description: "Fondamentaux de la Programmation Orientée Objet",
          section: "Formations",handler: () => {
              window.location.href = "/formations/but/but2/poo/introduction/";
            },},{id: "formations-tp2",
          title: 'TP2',
          description: "Utilisation des méthodes spéciales et des décorateurs en Python.",
          section: "Formations",handler: () => {
              window.location.href = "/formations/but/but2/poo/decorateurs/";
            },},{id: "formations-tp3",
          title: 'TP3',
          description: "Relations entre objets (héritage, composition, agrégation).",
          section: "Formations",handler: () => {
              window.location.href = "/formations/but/but2/poo/relations/";
            },},{id: "formations-tp4",
          title: 'TP4',
          description: "Gestion des exceptions et création de tests",
          section: "Formations",handler: () => {
              window.location.href = "/formations/but/but2/poo/exceptions/";
            },},{id: "formations-tp5",
          title: 'TP5',
          description: "Révisions sur les notions de base de la programmation orientée objet",
          section: "Formations",handler: () => {
              window.location.href = "/formations/but/but2/poo/revisions/";
            },},{id: "formations-tp6",
          title: 'TP6',
          description: "TP noté",
          section: "Formations",handler: () => {
              window.location.href = "/formations/but/but2/poo/examen-fa/";
            },},{id: "formations-tp6",
          title: 'TP6',
          description: "TP noté",
          section: "Formations",handler: () => {
              window.location.href = "/formations/but/but2/poo/examen-fi/";
            },},{id: "formations-tp1",
          title: 'TP1',
          description: "Gestion du cache avec Redis",
          section: "Formations",handler: () => {
              window.location.href = "/formations/but/but3/nosql/redis/";
            },},{id: "formations-tp2",
          title: 'TP2',
          description: "Requêtage et agrégation avec MongoDB",
          section: "Formations",handler: () => {
              window.location.href = "/formations/but/but3/nosql/mongodb/";
            },},{id: "formations-tp3",
          title: 'TP3',
          description: "Introduction à Apache Cassandra",
          section: "Formations",handler: () => {
              window.location.href = "/formations/but/but3/nosql/cassandra/";
            },},{id: "formations-tp4",
          title: 'TP4',
          description: "Modélisation de graphs avec Neo4j",
          section: "Formations",handler: () => {
              window.location.href = "/formations/but/but3/nosql/neo4j/";
            },},{id: "formations-tp5",
          title: 'TP5',
          description: "Mini-projet",
          section: "Formations",handler: () => {
              window.location.href = "/formations/but/but3/nosql/mini-projet/";
            },},{id: "formations-tp6",
          title: 'TP6',
          description: "TP noté",
          section: "Formations",handler: () => {
              window.location.href = "/formations/but/but3/nosql/exam/";
            },},{id: "formations-contexte",
          title: 'Contexte',
          description: "Présentation des données",
          section: "Formations",handler: () => {
              window.location.href = "/formations/but/but3/sae/contexte/";
            },},{id: "formations-consignes",
          title: 'Consignes',
          description: "Livrables attendus",
          section: "Formations",handler: () => {
              window.location.href = "/formations/but/but3/sae/consignes/";
            },},{id: "formations-tp-migration",
          title: 'TP migration',
          description: "Migration de la base de données",
          section: "Formations",handler: () => {
              window.location.href = "/formations/but/but3/sae/migration/";
            },},{id: "formations-tp1",
          title: 'TP1',
          description: "Introduction à MongoDB",
          section: "Formations",handler: () => {
              window.location.href = "/formations/cnam/cs103/mongodb/";
            },},{id: "formations-tp2",
          title: 'TP2',
          description: "Introduction à Apache Cassandra et au langage de requête CQL",
          section: "Formations",handler: () => {
              window.location.href = "/formations/cnam/cs103/apache-cassandra/";
            },},{id: "formations-dm",
          title: 'DM',
          description: "Devoir Maison sur MongoDB et Apache Cassandra",
          section: "Formations",handler: () => {
              window.location.href = "/formations/cnam/cs103/devoir-maison/";
            },},{id: "formations-introduction",
          title: 'Introduction',
          description: "Introduction au versionnage",
          section: "Formations",handler: () => {
              window.location.href = "/formations/git/introduction/";
            },},{id: "formations-premiers-pas",
          title: 'Premiers pas',
          description: "",
          section: "Formations",handler: () => {
              window.location.href = "/formations/git/premiers-pas/";
            },},{id: "formations-gérer-un-dépôt-distant",
          title: 'Gérer un dépôt distant',
          description: "",
          section: "Formations",handler: () => {
              window.location.href = "/formations/git/repo-management/";
            },},{id: "formations-collaboration-sur-un-repo",
          title: 'Collaboration sur un repo',
          description: "",
          section: "Formations",handler: () => {
              window.location.href = "/formations/git/software-forge/";
            },},{id: "formations-flux-de-travail",
          title: 'Flux de travail',
          description: "",
          section: "Formations",handler: () => {
              window.location.href = "/formations/git/workflows/";
            },},{id: "formations-github-ci",
          title: 'GitHub CI',
          description: "(optionnel) Introduction aux GitHub Actions",
          section: "Formations",handler: () => {
              window.location.href = "/formations/git/github-ci/";
            },},{id: "formations-terminal",
          title: 'Terminal',
          description: "Commandes de base du terminal",
          section: "Formations",handler: () => {
              window.location.href = "/formations/prerequis/terminal/";
            },},{id: "formations-notebooks-en-python",
          title: 'Notebooks en Python',
          description: "Introduction à Jupyter et marimo",
          section: "Formations",handler: () => {
              window.location.href = "/formations/prerequis/notebooks/";
            },},{id: "formations-docker",
          title: 'Docker',
          description: "Conteneurisation avec Docker",
          section: "Formations",handler: () => {
              window.location.href = "/formations/prerequis/docker/";
            },},{
      id: 'light-theme',
      title: 'Change theme to light',
      description: 'Change the theme of the site to Light',
      section: 'Theme',
      handler: () => {
        setThemeSetting("light");
      },
    },
    {
      id: 'dark-theme',
      title: 'Change theme to dark',
      description: 'Change the theme of the site to Dark',
      section: 'Theme',
      handler: () => {
        setThemeSetting("dark");
      },
    },
    {
      id: 'system-theme',
      title: 'Use system default theme',
      description: 'Change the theme of the site to System Default',
      section: 'Theme',
      handler: () => {
        setThemeSetting("system");
      },
    },];
