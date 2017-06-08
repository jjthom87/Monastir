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
	});

	// var id;
	// if(!($('#no-leave-message').data("id"))){
	// 	id = $('#stone-button').data("id");
	// } else {
	// 	id = $('#no-leave-message').data("id");
	// }

	$.ajax({
		type: 'GET',
		url: "/person/" + $("stone-button").data("id"),
		contentType: 'application/json',
		success: function(data){

			if(data.rocks.length > 0){
				for(var i = 0; i < data.rocks.length; i++){
					if(data.rocks[i].UserId == data.id){
						$('#stone-button').prop("disabled", true);
					}
					var img = $('<img class="stone-image" data-name="'+data.rocks[i].poster+'" data-message="'+data.rocks[i].message+'">');
					img.attr('src', '/static/images/images.jpeg').height(100).width(100);
					$('#stones').append(img);
				}
			}
		}
	});

	$(document).on('mouseenter', '.stone-image', function(){
		$('#stone-pic').css("opacity", 0);
		$('#stone-pic').css("transition", "opacity 2s");
		$(".stones-span").css({top: 275, left: 650, position:'absolute'});
		$('.stones-span').css("z-index", -1);
		$(".stones-span").html('<strong style="text-decoration: underline;">' + $(this).data('name') + '</strong><br>' + $(this).data('message'));
	})

	$(document).on('mouseleave', '.stone-image', function(){
         $('#stone-pic').css("opacity", 1);
    });

	// $.ajax({
	// 	url: "/stoneInfo",
	// 	type: "get",
 //        contentType: 'application/json',
 //        success: function(data){
 //        	console.log(data)
			$('#stone-form').on('submit', function(e){
				e.preventDefault();
				$.ajax({
					url: "/postMessage",
					type: "post",
					data: JSON.stringify({
						message: $('#stone-message').val(),
						poster: $('#poster-name').val(),
						id: $("stone-button").data("id")
					}),
					headers: {
						'content-type': 'application/json'
					}
				}).then((results) => {
					var img = $('<img class="stone-image" data-name="'+results.poster+'" data-message="'+$('#stone-message').val()+'">');
					img.attr('src', '/static/images/images.jpeg').height(100).width(100);
					$('#stones').append(img)

					$('#stone-name').val('');
					$('#stone-message').val('');
					$('#stone-form').hide();
					$('#success-message').text('Stone Placed').fadeIn(5000).fadeOut(5000);

					$('#stone-button').prop("disabled", true);
				});
			});
	// 	}
	// });

});