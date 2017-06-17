(function() {
  angular.module( 'NAME_ME', ['ui.router'])
    .config(function($stateProvider, $urlRouterProvider){
      $urlRouterProvider.otherwise('/')

      $stateProvider
        .state(/*name of state*/'', /*templateUrl and controller*/ {
          url: '/',
          templateUrl: 'INSERT_HERE.html',
          controller: 'INSERT_CTRL'
        })
        .state('', {
          url: '/',
          templateUrl: 'INSERT_HERE.html',
          controller: 'INSERT_CTRL'
        })
    })
})()