angular
  .module('app')
  .config(routesConfig);

/** @ngInject */
function routesConfig($stateProvider, $urlRouterProvider, $locationProvider) {
  $locationProvider.html5Mode(false).hashPrefix('!');
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
      url: '/program',
      component: 'program'
    })
    .state('createProgram', {
      url: '/createProgram',
      component: 'createProgram'
    })
    .state('calendarmain', {
      url: '/calendarmain',
      component: 'calendarmain'
    });
}
