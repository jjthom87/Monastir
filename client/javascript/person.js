$(document).ready(function(){
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
});