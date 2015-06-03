angular.module('todomvc.service')
	.factory('userService', ['$q', '$http', '$stamplay', function ($q, $http, $stamplay) {
		'use strict';

		var user = $stamplay.User().Model;

		return {

			getUserModel: function () {
				var def = $q.defer();
				if (user.get('_id')) {
					def.resolve(user);
				} else {
					user.currentUser()
						.then(function () {
							def.resolve(user);
						})
						.catch(function (err) {
							def.reject(err);
						});
				}
				return def.promise;
			}
		};
	}]);