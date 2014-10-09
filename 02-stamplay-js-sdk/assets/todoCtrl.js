/*global angular */

/**
 * The main controller for the app. The controller:
 * - retrieves and persists the model via the todoStorage service
 * - exposes the model to the template and provides event handlers
 */
angular.module('todomvc')
	.controller('TodoCtrl', ['$scope', '$routeParams', '$filter', 'todoStorage',
		function TodoCtrl($scope, $routeParams, $filter, todoStorage) {
			'use strict';

			var t = todoStorage.get();
			var todos = $scope.todos = t.instance;

			$scope.newTodo = '';
			$scope.editedTodo = null;

			$scope.$watch('todos', function (newValue, oldValue) {
				$scope.remainingCount = $filter('filter')($scope.todos, function (todo, index) {
					return !todo.get('completed');
				}).length;
				$scope.completedCount = $scope.todos.length - $scope.remainingCount;
				$scope.allChecked = !$scope.remainingCount;
			}, true);

			// Monitor the current route for changes and adjust the filter accordingly.
			$scope.$on('$routeChangeSuccess', function () {
				var status = $scope.status = $routeParams.status || '';

				var activeFn = function (value, index) {
					return !(value.instance.completed);
				}

				var completedFn = function (value, index) {
					return value.instance.completed;
				}

				var allFn = function (value) {
					return true;
				}

				if (status === 'active') {
					$scope.statusFilter = activeFn;
				} else if (status === 'completed') {
					$scope.statusFilter = completedFn;
				} else {
					$scope.statusFilter = allFn;
				}

				// $scope.statusFilter = (status === 'active') ? activeFn : (status === 'completed') ? completedFn : null;
			});

			$scope.addTodo = function () {
				var newTodo = $scope.newTodo.trim();
				if (!newTodo.length) {
					return;
				}

				var todo = {
					title: newTodo,
					completed: false
				};

				var stamplayTodo = new Stamplay.Cobject('todo').Model;
				stamplayTodo.set('title', newTodo);
				stamplayTodo.set('completed', false);
				stamplayTodo.set('user', userId);

				todoStorage.post(stamplayTodo).then(function () {
					$scope.$apply(function () {
						$scope.todos = todoStorage.get().instance;
						todos = $scope.todos;
						$scope.newTodo = '';
					});

				}, function () {
					console.log('ERROR');
				})


			};

			$scope.toggleCompleted = function (stamplayTodo) {
				stamplayTodo.set('completed', !(stamplayTodo.get('completed')));
				var goodToSave = new Stamplay.Cobject('todo').Model;
				goodToSave.set('_id', stamplayTodo.get('_id'));
				goodToSave.set('title', stamplayTodo.get('title').trim());
				goodToSave.set('user', userId);
				goodToSave.set('completed', !(stamplayTodo.get('completed')));
				goodToSave.save();
			}

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
					var goodToSave = new Stamplay.Cobject('todo').Model;
					goodToSave.set('_id', stamplayTodo.get('_id'));
					goodToSave.set('title', trimmed);
					goodToSave.set('user', userId);
					goodToSave.set('completed', stamplayTodo.get('completed'));
					goodToSave.save();
				}
			};

			$scope.revertEditing = function (todo) {
				todos[todos.indexOf(todo)] = $scope.originalTodo;
				$scope.doneEditing($scope.originalTodo);
			};

			$scope.removeTodo = function (todo) {
				todoStorage.delete(todo).then(function () {
					$scope.$apply(function () {
						$scope.todos = todoStorage.get().instance;
					});
				});
			};

			$scope.clearCompletedTodos = function () {
				var toRemove = todos.filter(function (stamplayTodo) {
					return stamplayTodo.get('completed');
				});
				async.each(toRemove, function (rm, cb) {
					todoStorage.delete(rm).then(cb);
				}, function () {
					$scope.$apply(function () {
						$scope.todos = todoStorage.get().instance;
					})
				});
			};

			$scope.markAll = function (completed) {
				async.each(todos, function (todo, cb) {
					todo.set('completed', !completed);

					var goodToSave = new Stamplay.Cobject('todo').Model;
					goodToSave.set('_id', todo.get('_id'));
					goodToSave.set('title', todo.get('title'));
					goodToSave.set('user', userId);
					goodToSave.set('completed', todo.get('completed'));
					goodToSave.save().then(cb);
				});
			};


			$scope.logout = function () {
				window.location.href = "/auth/v0/logout"
			};


}]);