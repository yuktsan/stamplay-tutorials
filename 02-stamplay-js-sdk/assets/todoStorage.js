/*global angular */

/**
 * Services that persists and retrieves TODOs from localStorage
 */
angular.module('todomvc.factory', [])
	.factory('todoStorage', function () {
		'use strict';

		var todos = new Stamplay.Cobject('todo').Collection;

		return {
			forceFetch: function () {
				todos.instance = [];
				return todos.fetch();
			},

			fetch: function (userId) {
				if (todos.instance.length > 0) {
					var deferred = Q.defer();
					deferred.resolve();
					return deferred.promise;
				} else {
					todos.instance = [];
					return todos.fetch({
						user: userId
					});
				}
			},

			get: function () {
				return todos;
			},

			post: function (stamplayTodo) {
				return stamplayTodo.save().then(function (response) {
					var newObj = JSON.parse(response);
					stamplayTodo.set('_id', newObj._id);
					stamplayTodo.set('completed', false);
					stamplayTodo.set('user', newObj.user);
					todos.add(stamplayTodo);
				})
			},

			delete: function (todo) {
				var _id = todo.instance._id;
				var toDelete = todos.get(_id);
				return toDelete.destroy().then(function () {
					todos.remove(_id);
				});
			},

			save: function () {
				return todos.save();
			}


		};
	});