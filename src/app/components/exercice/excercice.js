function excerciceController() {
  this.text = 'My brand new component!';
}

angular
  .module('app')
  .component('excercice', {
    templateUrl: 'app/components/exercice/excercice.html',
    controller: excerciceController
  });

