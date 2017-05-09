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

	$('#stone-form').hide();

	$('#stone-button').on('click', function(){
		showForm = true;
		count++;
		if(showForm && count % 2 == 0){
			$('#stone-form').show()
		} else {
			$('#stone-form').hide()
		}
	})

	$.ajax({
		type: 'GET',
		url: "/person/" + $('#stone-button').data("id"),
		contentType: 'application/json',
		success: function(data){
			if(data){
				for(var i = 0; i < data.length; i++){
					var img = $('<img class="stone-image" data-name="'+data[i].poster+'" + data-message="'+data[i].message+'">');
					img.attr('src', '/static/images/images.jpeg').height(100).width(100);
					$('#stones').append(img);
				}
			}
		}
	});

	$(document).on('mouseover', '.stone-image', function(){
		var rect = $(this).offset();
		$(".stones-span").css({top: rect.top, left: rect.left + 35, position:'absolute'});
		$(".stones-span").html('<strong style="text-decoration: underline;">'+$(this).data('name') + '</strong><br>' + $(this).data('message'));
	})

	$('#stone-form').on('submit', function(e){
		e.preventDefault();
		$.ajax({
			url: "/postMessage",
			type: "post",
			data: JSON.stringify({
				id: $('#stone-button').data("id"),
				name: $('#stone-name').val(),
				message: $('#stone-message').val()
			}),
			headers: {
				'content-type': 'application/json'
			}
		}).then((response) => response.json());

		var img = $('<img class="stone-image" data-name="'+$('#stone-name').val()+'">');
		img.attr('src', '/static/images/images.jpeg').height(100).width(100);
		$('#stones').append(img)

		$('#stone-name').val('');
		$('#stone-message').val('');
		$('#stone-form').hide();
		$('#success-message').text('Stone Placed').fadeIn(5000).fadeOut(5000);

		$('#stone-button').prop("disabled", true);
	});

});