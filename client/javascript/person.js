$(document).ready(function(){
	var showForm = false;
	var count = 1;

	$('#mourners-hebrew-phonetic-button').on('click', function(e){
		e.preventDefault();
		$('#mourners-hebrew-phonetic-modal').modal();
	});

	$('#mourners-english-button').on('click', function(e){
		e.preventDefault();
		$('#mourners-english-modal').modal();
	});

	$('#mourners-hebrew-button').on('click', function(e){
		e.preventDefault();
		$('#mourners-hebrew-modal').modal();
	});

	$('#stone-form').hide()

	$('#stone-button').on('click', function(){
		showForm = true;
		count++;
		if(showForm && count % 2 == 0){
			$('#stone-form').show()
		} else {
			$('#stone-form').hide()
		}
	})

	$('#stone-form').on('submit', function(e){
		e.preventDefault();
		$.ajax({
			url: "/postMessage",
			type: "post",
			data: JSON.stringify({
				name: $('#stone-name').val(),
				message: $('#stone-message').val()
			}),
			headers: {
				'content-type': 'application/json'
			}
		}).then((response) => response.json())
		.then((results) => {
		});

	})
});