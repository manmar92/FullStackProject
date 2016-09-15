angular
  .module('app')
  .controller('ViewOrderController', ['$scope', 'Order',
      function($scope, Order) {
    $scope.order = Order.find({
      filter: {
        where: { 
          customerid: $scope.currentCustomer.id 
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
