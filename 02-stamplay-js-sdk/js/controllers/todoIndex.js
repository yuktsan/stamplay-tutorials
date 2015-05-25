/*global angular */

/**
 * The main controller for the app. The controller:
 * - retrieves and persists the model via the todoStorage service
 * - exposes the model to the template and provides event handlers
 */
angular.module('todomvc')
	.controller('TodoIndex', ['$rootScope', '$scope', 'user',
		function TodoIndex($rootScope, $scope, user) {

			$scope.loginyes = true;
			$scope.signupyes = false;

			if (user.isLogged()) {
				window.location.href = '/#/todos/' + user.get('_id');
			}

			$scope.login = function () {
				user.login($scope.email, $scope.password).then(function (response) {
					window.location.href = '/#/todos/' + user.get('_id');
				});
			};

			$scope.signup = function () {
				var data = {
					email: $scope.email,
					password: $scope.password
				};
				user.signup(data).then(function (response) {
					window.location.href = '#/todos/' + user.get('_id');
				});
			};

			$scope.toggleMode = function () {
				$scope.loginyes = !($scope.loginyes);
				$scope.signupyes = !($scope.signupyes);
			};

}]);