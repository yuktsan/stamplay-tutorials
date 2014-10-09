/*global angular */

/**
 * The main TodoMVC app module
 *
 * @type {angular.Module}
 */
angular.module('todomvc', ['ngRoute', 'todomvc.factory'])
	.config(function ($interpolateProvider, $routeProvider, $locationProvider, $sceDelegateProvider) {
		'use strict';

		/* Since templates are on AWS S3 we load templates from http whitelisting the assets URL */
		$sceDelegateProvider.resourceUrlWhitelist(['self', 'https://s3-eu-west-1.amazonaws.com/cdn.stamplay.com/apps/' + appId + '/assets/**']);


		$interpolateProvider.startSymbol('[[');
		$interpolateProvider.endSymbol(']]');

		/* Activating the HTML 5 mode for client side route handling */
		$locationProvider.html5Mode('true');

		$routeProvider
			.when('/', {
				controller: 'TodoIndex',
				templateUrl: 'https://s3-eu-west-1.amazonaws.com/cdn.stamplay.com/apps/' + appId + '/assets/todomvc-index.html',
			})
			.when('/todos/', {
				controller: 'TodoCtrl',
				templateUrl: 'https://s3-eu-west-1.amazonaws.com/cdn.stamplay.com/apps/' + appId + '/assets/todomvc-todos.html',
				resolve: {
					todos: function (todoStorage) {
						return todoStorage.fetch(userId);
					}
				}
			})
			.when('/todos/:status', {
				controller: 'TodoCtrl',
				templateUrl: 'https://s3-eu-west-1.amazonaws.com/cdn.stamplay.com/apps/' + appId + '/assets/todomvc-todos.html',
				resolve: {
					todos: function (todoStorage) {
						return todoStorage.fetch(userId);
					}
				}
			})
			.otherwise({
				redirectTo: '/'
			});
	});