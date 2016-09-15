angular
  .module('app')
  .factory('AuthService', ['Customer', '$q', '$rootScope', function(Customer, $q,
      $rootScope) {
    function login(email, password) {
      return Customer
        .login({email: email, password: password})
        .$promise
        .then(function(response) {
          $rootScope.currentCustomer = {
            id: response.user.id,
            tokenId: response.id,
            email: email
          };
        });
    }

    function logout() {
      return Customer
       .logout()
       .$promise
       .then(function() {
         $rootScope.currentCustomer = null;
       });
    }

    function register(email, password) {

      console.log(email + ":" + password);

      return Customer
        .create({
         name: "",
         address: "",
         unit_number: "",
         city: "",
         state: "",
         zip_code: 0,
         username: email,
         email: email,
         password: password
       })
       .$promise;
    }

    return {
      login: login,
      logout: logout,
      register: register
    };
  }]);
