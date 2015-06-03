/*global angular */

/**
 * The main controller for the app. The controller:
 * - retrieves and persists the model via the todoStorage service
 * - exposes the model to the template and provides event handlers
 */
angular.module('todomvc')
	.controller('TodoCtrl', ['$scope', 'todoStorage', '$stateParams', 'user',

		function TodoCtrl($scope, todoStorage, $stateParams, user) {
			'use strict';
			/**
			 * Filtering functions
			 */
			var activeFn = function (value) {
				return !(value.instance.completed);
			};

			var completedFn = function (value) {
				return value.instance.completed;
			};

			var allFn = function (value) {
				return true;
			};

			var adjustStatus = function ($scope) {
				var status = $scope.status;
				switch (status) {
				case 'active':
					$scope.showFilter = activeFn;
					break;

				case 'completed':
					$scope.showFilter = completedFn;
					break;

				default:
					$scope.showFilter = allFn;
					break;
				}
			};

			$scope.todos = todoStorage.get();
			$scope.remainingCount = $scope.todos.filter(function (todo) {
				return !todo.get('completed');
			}).length;


			$scope.userId = $stateParams.id;
			$scope.status = $stateParams.status;
			adjustStatus($scope);

			$scope.newTodo = '';
			$scope.editedTodo = null;

			$scope.$watch('todos', function (newValue, oldValue) {
				$scope.remainingCount = $scope.todos.filter(function (todo) {
					return !todo.get('completed');
				}).length;
				$scope.completedCount = $scope.todos.length - $scope.remainingCount;
			}, true);

			$scope.addTodo = function () {
				var newTodo = $scope.newTodo.trim();
				if (!newTodo.length) {
					return;
				}
				todoStorage.post(newTodo, $stateParams.id, $scope);
			};

			$scope.removeTodo = function (todo) {
				todoStorage.delete(todo, $scope);
			};

			$scope.toggleCompleted = function (stamplayTodo) {
				todoStorage.save(stamplayTodo, $scope);
			};

			$scope.editTodo = function (stamplayTodo) {
				$scope.editedTodo = stamplayTodo;
				// Clone the original todo to restore it on demand.
				$scope.originalTodo = angular.extend({}, stamplayTodo);
			};

			$scope.doneEditing = function (stamplayTodo) {
				$scope.editedTodo = null;
				var trimmed = stamplayTodo.get('title').trim();

				if (!stamplayTodo.get('title')) {
					$scope.removeTodo(stamplayTodo);
				} else {
					stamplayTodo.set('title', trimmed);
					todoStorage.save(stamplayTodo, $scope);
				}
			};

			$scope.revertEditing = function (todo, $event) {
				if ($event.keyCode == 27) {
					$scope.todos[$scope.todos.indexOf(todo)] = $scope.originalTodo;
					$scope.doneEditing($scope.originalTodo);
				}
			};

			$scope.clearCompletedTodos = function () {
				todoStorage.clearCompleted($scope);
			};

			$scope.markAll = function () {
				var allCompleted = $scope.todos.every(function (todo) {
					return todo.get('completed');
				});
				todoStorage.mark(!allCompleted);
			};

			$scope.logout = function () {
				user.logout();
			};
		}
]);