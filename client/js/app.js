angular
  .module('app', [
    'lbServices',
    'ui.router'
  ])
  .config(['$stateProvider', '$urlRouterProvider', function($stateProvider,
      $urlRouterProvider) {
    $stateProvider
      .state('add-order', {
        url: '/add-order',
        templateUrl: 'views/order-form.html',
        controller: 'AddOrderController',
        authenticate: true
      })
      .state('view-order', {
        url: '/view-order',
        templateUrl: 'views/order.html',
        controller: 'ViewOrderController',
        authenticate: true
      })
      .state('forbidden', {
        url: '/forbidden',
        templateUrl: 'views/forbidden.html',
      })
      .state('login', {
        url: '/login',
        templateUrl: 'views/login.html',
        controller: 'AuthLoginController'
      })
      .state('sign-up', {
        url: '/sign-up',
        templateUrl: 'views/sign-up-form.html',
        controller: 'SignUpController'
      })
      .state('not-found', {
        url: '/not-found',
        templateUrl: 'views/not-found.html',
        authenticate: true
      });
    $urlRouterProvider.otherwise('not-found');
  }])
  .run(['$rootScope', '$state', function($rootScope, $state) {
    $rootScope.$on('$stateChangeStart', function(event, next) {
      // redirect to login page if not logged in
      if (next.authenticate && !$rootScope.currentCustomer) {
        event.preventDefault(); //prevent current page from loading
        $state.go('login');
      }
    });
  }]);
