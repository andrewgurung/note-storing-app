// Editor controller
// References App module to attach controller to this module
angular.module('App')
  .controller('EditorController', function($scope) {
    // $scope service injected
    // Creates model value and stores on $scope
    $scope.state = {
      editing: false
    };
  });
