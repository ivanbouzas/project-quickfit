function searchexoController() {
  this.text = 'My brand new component!';
}

angular
  .module('app')
  .component('searchexo', {
    templateUrl: 'app/components/searchexo/searchexo.html',
    controller: searchexoController
  });

