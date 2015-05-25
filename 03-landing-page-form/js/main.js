$('#subscribe').on("click", function (event) {
	event.preventDefault();

	$('#email-field').css('border-bottom', '1px solid white');
	$('#invalid-mail-container').hide();

	var mail = $('#email-field').val();
	var regExp = new RegExp("^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$");
	var valid = regExp.test(mail);
	if (valid) {
		$.ajax({
			'method': 'POST',
			'url': '/api/form/v1/forms/landing/entries',
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
		$('#email-field').css('border-bottom', '1px solid red');
		$('#invalid-mail-container').show();
	}
});