angular
  .module('app')
  .controller('AuthLoginController', ['$scope', 'AuthService', '$state',
      function($scope, AuthService, $state) {
    $scope.customer = {
      email: '',
      password: ''
    };

    $scope.login = function() {
      AuthService.login($scope.customer.email, $scope.customer.password)
        .then(function() {
          $state.go('view-order');
        });
    };
  }])
  .controller('AuthLogoutController', ['$scope', 'AuthService', '$state',
      function($scope, AuthService, $state) {
    AuthService.logout()
      .then(function() {
        $state.go('login');
      });
  }])
  .controller('SignUpController', ['$scope', 'AuthService', '$state',
      function($scope, AuthService, $state) {
    $scope.customer = {
      email: '',
      password: ''
    };        

    $scope.register = function() {
      AuthService.register($scope.customer.email, $scope.customer.password)
        .then(function() {
          $state.transitionTo('sign-up-success');
        })
        .catch(function(error) {
          console.log(error.data.error.message)
        });
    };
  }]);
