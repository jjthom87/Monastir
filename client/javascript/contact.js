$(document).ready(function(){

	$('.loader-container').hide();

	$('#send-email').on('submit', function(e){
    	var loaderImgContainer = $('.loader-container');
		loaderImgContainer.show();
		$('#contact_submit').prop("disabled", true);
		e.preventDefault();

		fetch("/sendemail", {
			method: "post",
			body: JSON.stringify({
				name: $('#name-input').val(),
				email: $('#email-input').val(),
				message: $('#message-input').val()
			}),
			headers: {
				'content-type': 'application/json'
			}
		}).then((response) => response.json())
			.then((results) => {
				$('#messageSentText').text('Message Sent').fadeIn(2000).fadeOut(2000);
				window.location = "/";
		})

		$('#name-input').val('');
		$('#email-input').val('');
		$('#message-input').val('');
	});
});