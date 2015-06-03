var loginButton = function (e) {
  e.preventDefault();
  var isValid = $('#login-form').parsley().validate();
  if (isValid) {
    var email = $('#login-email').val();
    var password = $('#login-password').val();
    user.login(email, password).then(refreshData).done();
  }
}

$('#login-button').on('click', loginButton);