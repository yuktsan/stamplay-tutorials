$('#subscribe').on("click", function (event) {
	event.preventDefault();
	$('#invalid-mail').css('visibility', 'hidden');

	var mail = $('#email-field').val();
	var regExp = new RegExp("^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$");
	var valid = regExp.test(mail);
	if (valid) {
		$.ajax({
			'method': 'POST',
			'url': '/api/form/v0/forms/landing-form/entries',
			data: {
				email: mail
			},
			success: function (response) {
				$('#email-field').val('');
				$('#email-field').hide();
				$('#subscribe').hide();
				$('#space-below').show();
				$('#thank-you').show();
			}
		})
	} else {
		$('#invalid-mail').css('visibility', 'visible');
	}
});