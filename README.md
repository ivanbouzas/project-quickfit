# Projet Web - AngularJS
=====
Ce projet a été réalisé lors d'un cours de projet Web à la HES-SO de Neuchâtel (HE-Arc).
Le but était de démontrer la compréhension et l'utilisation de Git et AngularJS notamment.
## Demarrage rapide
=====
Pour démarrer facilement l'application en utilisant git : 
```sh
$ git clone git@github.com:heg-web/projet-ivanb_alexandruo.git
```
Lancer ensuite la résolution des dépendances de NPM et Bower
```sh
$ npm install
$ bower install
```
Et tout devrait être prêt pour lancer l'application avec Gulp ou Grunt :
```sh
$ grunt serve
Ou
$ gulp serve
```
## Application de gestion de programmes de fitness
=====

### Description
Cette application permet de manière simple et rapide de créer des programmes d'exercices physique et de les "lancer" lors de vos séances.
Le but était de tendre vers le moyen le plus efficient de pouvoir faire une routine que ce soit pour faire des activités par répétitions ou chronométrées.
Il était aussi important de pouvoir s'améliorer avec l'application en fixant des objectifs qui modifient de manière automatisé les temps et les poids employés pour les exercises.

### Outils/Librairies
- JQuery
- AngularJS
- ui-sortable
- bootstrap
- animate.css
- Github/GitShell
- Node.js
- Npm
- Bower
- Gulp

### Plan de départ
L'idée de base était de faire une application de gestion de routines de fitness avec 3 principales fonctionnalités :
- Programmes 
Gestion des routines
- Chronomètre
Simple chronomètre qui peut être appelé n'importe où dans l'application
- Calendrier
Planification des routines dans le temps

#### Croquis
Les croquis suivant représente les premières idées d'écran qui ont été faite avant de commencer le développement de l'application.

!!!!!  insert croquis here !!!!!



### Réalisation
Pour le dévellopement de ce projet plusieurs choses ont été mises en place.
Le dossier 'master' ici contient le code source de l'application.
La branche 'gh-pages' contient l'application après un 'build', donc le dossier 'dist' d'une application Angular.

L'application est accessible pour le moment à :
https://heg-web.github.io/projet-ivanb_alexandruo/
Ne vous attendez pas forcément à voir une application fonctionnel, car elle est pour l'instant toujours susceptible d'évoluer.

#### Travail collaboratif
Pour ce projet, nous avons travaillez à deux sur la branche 'master'. Cela implique plusieurs choses pour éviter au maximum les problèmes avec l'application :
- Communiquer le travail qui est en train d'être fait pour ne pas se 'marcher dessus'
- Toujours commencer son travail en réalisant un pull
- Lors de 'git merge', communiquer avec le collège et essentiel pour ne pas supprimer involontairement du travail important
- Essayer de faire des 'git commit' dès qu'une partie fonctionnel est réalisée et testée.

#### AngularJS
Durant ce projet, la plus grosse partie du temps a été passée à apprendre à utiliser AngularJS.

Notamment sur leur site : https://code.angularjs.org/1.6.1/docs/api

Ainsi que différentes recherches lors de problèmes ou de solutions cherchées.

Une bonne partie du projet a dû être abandonnée, car le temps d'apprentissage a été long, tant bien même que cela avait été en partie vu pendant le cours cité pour la réalisation de ce projet.

#### Fonctionnalités actuelles

L'application contient actuellement la partie de gestion des routines.

Une tentative a été faite pour y intégrer la librairie et l'utilisation de firebase, mais par manque de temps il n'est pour l'instant pas possible d'accéder à ses 'data' depuis différents terminaux.

Les modules Calendrier et Chronomètre sont pour l'instant mis en attente pour les mêmes raisons.

### Problèmes/Solutions

#### BootStrap dependencie

Un problème est survenu avec bootstrap, la version par défaut ne fonctionnait pas correctement avec les plug-ins et fonction utilisé après être passé à Angular 1.6.

Il a donc fallu faire un peu de recherche est installer à l'aide de bower la version nécessaire.

Gulp enlevait aussi par défaut la dépendance a Bootstrap pour ses fichiers de styles.
Il a fallu aller dans le fichier de configurations de gulp dans le dossier 'conf' du projet et enlever le 'exlude' sous 'exports.wiredep' qui est le module qui 'inject' les dépendances dans le fichier index.html.
Le fichier de dépendances avec bower a aussi été modifié avec une propriété 'resolution' qui pointe sur boostrap.

#### Git

Un problème recurant avec l'utilisation de git étant le fameux 'end-of-line' CRLF ou LF.

Quand on envoit les fichiers sur le 'repository' de Github, les 'end-of-line' sont convertis en LF et lors de la récupération, ils sont récupérer et reconverti en CRLF.

Ceci existe pour assurer la compatibilité si différents systèmes d'exploitation travail sur le projet.

Malheureusement cela produit plusieurs problèmes :

- le GitShell se rempli d'erreur 'Expected linebreaks to be 'LF' but found 'CRLF'

    Elles pourraient être ignorées, mais le mieux est de simplement les corrigées.
    Pour ce faire, on peut utiliser NotePad++, effectuer une recherche pour la combinaison de caractère '\r\n'
    et remplacer ces caractères par un simple '\n'
    
    Nous avons ici donc remplacer un 'Carriage return + Line Feed', qui est le end-of-line propre à Windows, en simple 'Line Feed'.
    Ce dernier se retrouve dans les systèmes Unix et Mac OS.
    
- Les fichiers non-text se retrouvent corrompus
  
    Nous avons des images sur notre site, et apparement celle-ci sont aussi passées à la moulinette git. 
    Resultat la plupart des images sont corrompus, pourquoi ?
    Après quelques recherches, on comprend qu'il fait dire à git quel format de fichier considérer comme 'text' ou purement 'binary'
    Dans ce dernier cas, git va simplement ignorer le fichier, car il n'y a pas de end-of-line à gérer.
    Plusieurs solutions sont expliquées, changer les paramètres de configuration git avec la commande '$ git config core.autocrlf true/false',
    ou changer le fichier '.gitattributes' comme cela a été fait sur ce projet.
    Il aurait fallu apparement aussi changer ce paramètre à l'installation de git, enfin bref, pour finir le problème existe toujours même avec ces quelques solutions appliquées.
    Apparement le problème ne survient que susr les fichiers javascript, alors que ceux si sont à la même enseigne que les autres.
    Bref, nous n'avons pas plus creuser de ce côté, ce problème n'empechant pas l'application de fonctionner s'il est traité au final comme expliqué au début.
    
#### Deploiement

Lors du déploiement sur Github, on s'apercoie que le site ne s'affiche pas. 
Cela est dû au routage des fichiers par Angular et que Github soit un serveur web static, impossible de régler donc le routage par ce dernier.

Il existe deux solutions : 

- Desactiver le html5mode
  Dans ce cas, l'adressage ce fait avec un #! ajouter après le domaine.
  La page est entièrement refresh si l'adresse est changée
- Utiliser le html5mode 
  Il faut pour cela ajouter une balise <base> dans le fichier index.html qui indique que ce fichier est la base de l'application
  Avec l'API HTML5, le service Angular $location s'occupent ensuite de gérer les URLs.
  Cela permet de pouvoir modifier, consulter et lancer des requête sans recharger l'entier de la page.
  
Nous avons choisi d'appliquer la dernière solution, car elle est porté vers le futur et permet à l'application d'avoir un fonctionnement plus 'léger'.
Mais pour le site déployer sur Github malheureusement cela implique qu'on le peut pas recharger une page manuellement, sinon le service Angular en charge de l'API HTML5 ($location) perd la racine de l'application et ne peut pas retrouver le fichier index.html.
Idéalement avec ce genre de solution il faudrait un serveur web configurable pour palier à cette perte de la 'base'.
 
#### Date

Problème universelle dans le monde de l'informatique, la gestion des dates durant ce projets à été passé par des moments de casse-tête, de réalisation.. et encore de réalisation. 
Tout d'abord c'était des dates en textes simples - impossible à gérer.
Deuxième solution, implémenter des objets Date.
Il a fallu ajouter pas mal de choses, notamment lors de la recupération des données par le service dans le LocalStorage.
En testant dans la console pour savoir quelle date était retournée par l'objet à sa création, on remarque qu'il met le 1 janvier 1970 oui, mais il est 1h00 et pas 00h00. Bref, un casse-tête qui nous a permis de découvrir le monde magique du formattage de Date en Javascript.
Il faut d'abord comprendre comment fonction l'objet Date en Javascript, ainsi qu'essayer de profiter des méthodes qu'il fournit.
Ensuite, il a fallu voir comment fonctionne la balise HTML <time> pour avoir des 'inputs' stricts, être sûr que l'on récupère une date bien formatter.

Après tout cela, il a fallu implémenter les objets date avec plein de tests à n'en pas finir. Surtout quand on remarque les objets dates se comparent bien pour des "<" ">", mais lorsqu'on tente une égalité il faut récupérer l'horodatage de l'objet et comparer les deux numéros.

Au final, l'application fonctionne pour cette partie avec les Dates, à voir lors de l'implémentation du module 'Calendrier' plus tard..

#### Tests

Souvent dans l'application, il fallait faire des console.log() ou $log pour débeuger. Nous aurions pu chercher à faire des batteries de tests. Mais comme cela n'a pas été vu en cours, nous n'avons pas trop creusé. Il serait intéressant de voir si intégrer des tests maintenant permettrait de développer plus efficacement les futures fonctionnalitées.


### Future de l'application

Il est prévu d'intégrer la gestion des données dans le cloud, notamment par firebase qui est la première idée proposée pour l'instant.

Les deux modules, Calendrier et Chronomètre, sont pour l'instant relayés en second plan.

## Conclusion

Ce projet a demandé beaucoup plus de travail qu'initialement imaginé. Angular étant un framework assez conséquent, il est impossible d'apprendre toutes les combinent possible pour programmer le plus efficacement, mais au final nous avons une application qui fonctionne et nous en sommes fière, même si c'est vrai qu'on avait imaginé mettre beaucoup plus de fonctionnalités.

Cette application sera continuée, car nous allons l'utilisée au quotidien. Rien que ça nous montre que même si cela à été difficile, faire dufaire du JS, Angular et Git pour réaliser ce projet ne nous a pas déplu.

Nous sommes reconnaissant d'avoir pu apprendre à développer des applications de cette manière, cela nous sera définitivement utile par la suite.
