$(document).ready(function(){
	$('#send-email').on('submit', function(e){
		e.preventDefault();

		var data = {
		}

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
		})

		$('#name-input').val('');
		$('#email-input').val('');
		$('#message-input').val('');
	});
});