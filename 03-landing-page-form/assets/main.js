var app = angular.module('landing-page', []);

app.controller('subscribeCtrl', ['$scope', '$http',
	function ($scope, $http) {

		$scope.notValid = false;
		$scope.subscribed = false;

		$scope.subscribe = function () {
			var regExp = new RegExp("^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$");
			var valid = regExp.test($scope.email);
			$scope.invalidMail = false;

			$('#email-field').css('border-color', 'none');

			if (valid) {
				$http({
					method: 'POST',
					url: '/api/form/v0/forms/landing-form/entries',
					data: {
						email: $scope.email
					}
				}).success(function (response) {
					$scope.email = '';
					$scope.subscribed = true;
				}).error(function (err) {

				});
			} else {
				$scope.invalidMail = true;
				$('#email-field').css({
					boxShadow: '1px 3px 6px #444'
				})

				// .css({
				// 	'box-shadow': '0 0 0 10px hsla(0, 80 % , 50 % , 0.5)'
				// });
				// $('#email-field').css('border-width', '2px');
				$scope.notValid = true;
			}
		}


}]);