$('#subscribe').on("click", function (event) {
	event.preventDefault();

	$('#email-field').css('border-bottom', '1px solid white');
	$('#invalid-mail-container').hide();

	var email = $('#email-field').val();
	var regExp = new RegExp("^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$");
	var valid = regExp.test(email);
	if (valid) {
		var contact = new Stamplay.Cobject('landing').Model;
		contact.set('email', email);
		contact.save().then(function () {
			$('#email-field').val('');
			$('#email-field').hide();
			$('#subscribe').hide();
			$('#space-below').show();
			$('#thank-you').show();
		}).catch(function (err) {
			console.log(err);
		}).done();
	} else {
		$('#email-field').css('border-bottom', '1px solid red');
		$('#invalid-mail-container').show();
	}
});