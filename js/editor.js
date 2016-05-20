// Editor controller
// References App module to attach controller to this module
angular.module('App')
.controller('EditorController', function($scope, $http) {
  // $scope and $http services injected
  // Creates model value and stores on $scope
  $scope.editing = true;

  // Load notes data using $http service
  $http.get('/notes').success(function(data) {
    $scope.notes = data;
  }).error(function(err) {
    $scope.error = 'Could not load notes';
  })
});
