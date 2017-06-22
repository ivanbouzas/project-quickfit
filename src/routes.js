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
      component: 'programs'
    })
    .state('programs', {
      url: '/programs',
      component: 'programs'
    })
    .state('program', {
      url: '/program/:id',
      component: 'program'
    })
    .state('timer', {
      url: '/timer',
      component: 'timer'
    })
    .state('createProgram', {
      url: '/createProgram?id',
      component: 'createProgram'
    });
}
