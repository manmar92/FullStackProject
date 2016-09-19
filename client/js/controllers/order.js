angular
  .module('app')
  .controller('ViewOrderController', ['$scope', 'Order', 'Customer', '$rootScope',
      function($scope, Order, Customer, $rootScope) {

    $rootScope.order = Order.findOne({
      filter: {
        where: { 
          customerid: $scope.currentCustomer.id 
        }
      }
    });

  }])
  .controller('AddOrderController', ['$scope', 'Order', 'Customer', '$rootScope',
      '$state', function($scope, Order, Customer, $rootScope, $state) {
    $scope.action = 'Add';
    $scope.order = {};
    $scope.order.date = new Date();
    $scope.customer = Customer.findOne({ 
      filter: { where: { id: $rootScope.currentCustomer.id} }
    });

    $scope.submitForm = function() {

      latitude = (Math.random() * (-180 - 180) + 180).toFixed(6) * 1;
      longitude = (Math.random() * (-90 - 90) + 90).toFixed(6) * 1;

      address = latitude + ":" + longitude


      Order
        .create({
          date: $scope.order.date,
          customerid: $rootScope.currentCustomer.id,
          businessid: 0,
          address: address
        })
        .$promise
        .then(function() {

          return Customer.prototype$updateAttributes(
              { id: $scope.customer.id },
              { name: $scope.customer.name,
                address: $scope.customer.address,
                unit_number: $scope.customer.unit_number,
                city: $scope.customer.city,
                state: $scope.customer.state,
                zip_code: $scope.customer.zip_code
              }
          );

        })
        .then(function() {
          $rootScope.currentCustomer.name = $scope.customer.name
          addressString = $scope.customer.address + ", " + $scope.customer.unit_number + ", " + $scope.customer.city + ", " + $scope.customer.state + ", " + $scope.customer.zip_code
          $rootScope.currentCustomer.addressString = addressString
        })
        .then(function() {
          $state.go('view-order');
        })
        .catch(function(error) {
          console.log(error)
        });
    };
  }]);
