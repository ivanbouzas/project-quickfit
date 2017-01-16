angular
  .module('app')
  .config(routesConfig);

/** @ngInject */
function routesConfig($stateProvider, $urlRouterProvider, $locationProvider) {
  $locationProvider.html5Mode(true).hashPrefix('!');
  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('home', {
      url: '/',
      component: 'home'
    })
    .state('programs', {
      url: '/programs',
      component: 'programs'
    })
    .state('program', {
      url: '/program/:id',
      component: 'program'
    })
    .state('createProgram', {
      url: '/createProgram?id',
      component: 'createProgram'
    });
}
