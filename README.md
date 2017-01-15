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
### Problèmes
### Solutions
### Future de l'application
