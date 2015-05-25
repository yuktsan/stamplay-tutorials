/*global angular */

/**
 * The main TodoMVC app module
 *
 * @type {angular.Module}
 */
angular.module('todomvc', ['ui.router', 'todomvc.service', 'ngStamplay']);

angular
	.module('todomvc')
	.config(function ($stateProvider, $urlRouterProvider) {

		$urlRouterProvider.otherwise('/');

		$stateProvider
			.state('home', {
				url: '/',
				controller: 'TodoIndex',
				templateUrl: './templates/todomvc-index.html',
				resolve: {
					user: ['userService', function (userService) {
						return userService.getUserModel();
					}]
				}
			})
			.state('todos', {
				url: '/todos/:id',
				controller: 'TodoCtrl',
				templateUrl: './templates/todomvc-todos.html',
				resolve: {
					todos: function (todoStorage, $stateParams) {
						return todoStorage.fetch($stateParams.id);
					},
					user: ['userService', function (userService) {
						return userService.getUserModel();
					}]
				}
			})
			.state('status', {
				url: '/todos/:id/:status',
				controller: 'TodoCtrl',
				templateUrl: './templates/todomvc-todos.html',
				resolve: {
					todos: function (todoStorage, $stateParams) {
						return todoStorage.fetch($stateParams.id);
					},
					user: ['userService', function (userService) {
						return userService.getUserModel();
					}]
				}
			});
	});