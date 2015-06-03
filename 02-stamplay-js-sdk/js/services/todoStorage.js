/*global angular */

/**
 * Services that persists and retrieves TODOs from localStorage
 */
angular.module('todomvc.service')
	.factory('todoStorage', function () {
		'use strict';

		var todos = new Stamplay.Cobject('todo').Collection;

		return {

			fetch: function (userId) {
				if (todos.instance.length > 0) {
					var deferred = Q.defer();
					deferred.resolve();
					return deferred.promise;
				} else {
					todos.instance = [];
					return todos.fetch({
						owner: userId
					});
				}
			},

			get: function () {
				return todos;
			},

			post: function (title, owner, $scope) {
				var stamplayTodo = new Stamplay.Cobject('todo').Model;
				stamplayTodo.set('title', title);
				stamplayTodo.set('completed', false);
				stamplayTodo.set('owner', owner);
				return stamplayTodo.save().then(function () {
					$scope.$apply(function () {
						todos.add(stamplayTodo);
						$scope.newTodo = '';
					});
				});
			},

			delete: function (todo, $scope) {
				var _id = todo.instance._id;
				var toDelete = todos.get(_id);
				return toDelete.destroy().then(function () {
					$scope.$apply(function () {
						todos.remove(_id);
					});
				});
			},

			save: function (todo, $scope) {
				return todo.save().done();
			},

			mark: function (isCompleted) {
				todos.forEach(function (todo) {
					todo.set('completed', isCompleted);
				});
				var promises = todos.map(function (elem) {
					return elem.save();
				});
				Q.all(promises).then(function () {}).catch(function (err) {
					console.log(err);
				}).done();
			},

			clearCompleted: function ($scope) {
				var toRemove = todos.filter(function (stamplayTodo) {
					return stamplayTodo.get('completed');
				});
				var promises = toRemove.map(function (elem) {
					return elem.destroy();
				});
				Q.all(promises).then(function () {
					$scope.$apply(function () {
						toRemove.forEach(function (toRemoveElem) {
							todos.remove(toRemoveElem.get('id'));
						});
					});
				}).catch(function (err) {
					console.log(err);
				}).done();
			}

		};
	});