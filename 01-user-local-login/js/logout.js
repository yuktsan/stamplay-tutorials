var logoutFn = function (e) {
	e.preventDefault();
	user.logout()
}

$('#logout-button').on('click', logoutFn);