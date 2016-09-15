angular
  .module('app')
  .controller('ViewOrderController', ['$scope', 'Order', '$rootScope',
      function($scope, Order $rootScope) {
    $scope.orders = Order.find({
      filter: {
        where: { 
          customerid: $rootScope.currentCustomer.id 
        }
      }
    });
  }])
  .controller('AddOrderController', ['$scope', 'Order', '$rootScope',
      '$state', function($scope, Order, $rootScope, $state) {
    $scope.action = 'Add';
    $scope.order = {};

    $scope.submitForm = function() {
      Order
        .create({
          date: $scope.order.date,
          customerid: $rootScope.currentCustomer.id
        })
        .$promise
        .then(function() {
          $state.go('view-order');
        });
    };
  }]);
