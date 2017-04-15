$(document).ready(function(){

	$.ajax({
		type: 'GET',
		url: '/list',
		contentType: 'application/json'
	}).done(function(response){
		var name = [];
		for(var i = 0; i < response.length; i++){
			name.push(response[i].first_name + " " + response[i].last_name);
		}
	    $("#person-search").autocomplete({
      		source: name
		});
		$("#person-search-form").on("submit", function(){
			var person = $("#person-search").val().toString();
			for(var i = 0; i < response.length; i++){
				if(person === response[i].first_name + " " + response[i].last_name){
					$.ajax({
						type: 'GET',
						url: '/person/'+response[i].id,
						contentType: "text/plain",
					}).done(function(response){	
						window.location = '/finder/'+response.id;
					});
				}
			}
		});
	});

});