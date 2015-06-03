window.ParsleyValidator
	.addValidator('email_validate', function (value) {
		var result = false;
		$.ajax({
			url: '/api/auth/v1/validate/email',
			method: 'POST',
			async: false,
			data: {
				email: value
			},
			success: function (res, obj, xhr) {
				result = (xhr.status === 200) ? true : false;
			}
		});
		return result;
	}, 32).addMessage('en', 'email_validate', 'Email already in use');