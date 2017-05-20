$(document).ready(function(){
  
  	var all = []
  	$.ajax({
  		type: 'GET',
  		url: '/list',
  		contentType: 'application/json'
  	}).done(function(response){
  		response.forEach(function(r){
  			all.push({
  				label: r.name, 
  				value: r.name.toLowerCase(), 
  				id: r.id
  			});
  		});
  	});

    $("#person-search").autocomplete({
      source: function(request, response) {
        var results = $.ui.autocomplete.filter(all, request.term);

        response(results.slice(0, 5));
      },
      minLength: 0,
      focus: function( event, ui ) {
        $( "#person-search" ).val( ui.item.label );
        return false;
      },
      select: function( event, ui ) {
      	$( "#person-search" ).val(ui.item.label)
       	window.location = '/finder/'+ui.item.id
        $( "#person-search" ).val("")
       	return false;
      },
      create: function(){
  	  	$(this).data( "ui-autocomplete" )._renderItem = function( ul, item ) {
      		return $( "<li></li>" )
		        .append( "<div>" + item.label + "</div>" )
		        .appendTo( ul );
      		}
      }
    });

    $('#paymentForm').parsley();
    $('#sign-up').parsley();

    var showForm = false;
    var count = 1;
    $('#signUpForm').hide();
    $('#signInForm').hide();

    $('#sign-up-button').on('click', function(){
        $('#signInForm').hide();
        showForm = true;
        count++;
        if(showForm && count % 2 == 0){
          $('#signUpForm').show();
        } else {
          $('#signUpForm').hide();
        }
    });

    $('#sign-in-button').on('click', function(){
        $('#signUpForm').hide();
        showForm = true;
        count++;
        if(showForm && count % 2 == 0){
          $('#signInForm').show();
        } else {
          $('#signInForm').hide();
        }
    });  

});