/*global angular */

/**
 * The main controller for the app. The controller:
 * - retrieves and persists the model via the todoStorage service
 * - exposes the model to the template and provides event handlers
 */
angular.module('todomvc')
	.controller('TodoLogout', ['$rootScope', '$scope', '$routeParams', '$filter', 'todoStorage',
		function TodoLogout($rootScope, $scope, $routeParams, $filter, todoStorage) {
			window.location.href = '/auth/v0/logout';
}]);