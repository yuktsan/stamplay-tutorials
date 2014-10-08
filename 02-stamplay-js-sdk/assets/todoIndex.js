/*global angular */

/**
 * The main controller for the app. The controller:
 * - retrieves and persists the model via the todoStorage service
 * - exposes the model to the template and provides event handlers
 */
angular.module('todomvc')
	.controller('TodoIndex', ['$rootScope', '$scope', '$routeParams', '$filter', 'todoStorage',
		function TodoIndex($rootScope, $scope, $routeParams, $filter, todoStorage) {

			$scope.loginYes = true;

			var user = new Stamplay.User().Model;
			user.currentUser().then(function () {
				if (user.get('_id')) {
					window.location.href = '/todos/';
				}
			});

			$scope.login = function () {
				user.login($scope.email, $scope.password).then(function (response) {
					window.location.href = '/todos/';
				});
			}

			$scope.signup = function () {
				var data = {
					email: $scope.email,
					password: $scope.password
				}
				user.signup(data).then(function (response) {
					window.location.href = '/todos/';
				});
			}

			$scope.toggleMode = function () {
				$scope.loginYes = !$scope.loginYes;
				$scope.signupYes = !$scope.signupYes;
			}
}]);