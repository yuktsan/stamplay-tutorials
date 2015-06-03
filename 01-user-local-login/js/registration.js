var user = new Stamplay.User().Model;

user.currentUser().then(function () {
  refreshData();
});

var registrationFn = function (e) {
  e.preventDefault();
  var isValid = $('#reg-form').parsley().validate();

  if (isValid) {

    var email = $('#reg-email').val();
    var password = $('#reg-password').val();
    var registrationData = {
      email: email,
      password: password
    };

    user.signup(registrationData)
      .then(refreshData, handleSignupError)
      .then(finalCb, handleRefreshDataError)
      .done()
  }
}

var registerUser = function (registrationData) {
  return user.signup(registrationData)
}

var handleSignupError = function (err) {
  /**
   * Error handling for user.signup
   */
  console.log('Error during user.signup ' + err);
}

var handleRefreshDataError = function (err) {
  console.log('Error during refreshData ' + err);
}

var finalCb = function () {
  console.log('All good');
}

var refreshData = function () {
  if (user.isLogged()) {
    $('.hide-if-logged').hide();
    $('.show-if-logged').show();
    /* Header */
    var html = 'Currently logged in as : ' + user.get('email');
    $('#current-status').html(html);

  } else {
    $('.show-if-logged').hide();
  }
}


$('#reg-button').on('click', registrationFn);