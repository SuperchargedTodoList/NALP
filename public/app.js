(function() {
  angular.module( 'myApp', ['ui.router'])
    .config(function($stateProvider, $urlRouterProvider){
      $urlRouterProvider.otherwise('/')

      $stateProvider
        .state(/*name of state*/'welcome', /*templateUrl and controller*/ {
          url: '/',
          templateUrl: 'partials/welcome.html',
          controller: 'WelcomeCtrl as welcome_ctrl'
        })
        .state('profile', {
          url: '/profile',
          templateUrl: 'partials/profile.html',
          controller: 'WelcomeCtrl as welcome_ctrl'
        })
    })
})()