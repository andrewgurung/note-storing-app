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
  });

  $scope.view = function (index) {
    // Sets editing state to false because you want to just view an item
    $scope.editing = false;

    // Sets a new model for content model to contain note that was clicked
    $scope.content = $scope.notes[index];
  };

  $scope.create = function() {
    $scope.editing = true;

    // Reset content to an empty slate
    $scope.content = {
      title: '',
      content: ''
    };
  };

  $scope.save = function() {
    $scope.content.date = new Date();

    // Check if content exists
    // Yes -> Update using put method
    // No -> Create new note using post method
    if($scope.content.id) {
      $http.put('/notes/' + $scope.content.id, $scope.content).success(function(data) {
        $scope.editing = false;
      });
    } else {
      // Set unique ID based on current timestamp
      $scope.content.id = Date.now();
      $http.post('/notes', $scope.content).success(function(data) {
        // Add to notes array to sync service layer with left notes list
        $scope.notes.push($scope.content);
        $scope.editing = false;
      });
    }
  };

  $scope.remove = function() {
    // Makes delete request to notes API
    $http.delete('/notes/' + $scope.content.id).success(function(data) {
      var found = -1;
      angular.forEach($scope.notes, function(note, index) {
        if(note.id === $scope.content.id) {
          found = index;
        }
      });

      // If found, removes it from notes list
      if(found >= 0) {
        $scope.notes.splice(found, 1);
      }
      // Reset content
      $scope.content = {
        title: '',
        content: ''
      }
    });
  };
});
