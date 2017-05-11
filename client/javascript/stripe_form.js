$(document).ready(function(){
	
 	$('.loader-container').hide();

	$('#donate_button').on('click', function(e){
		e.preventDefault();
		$('#donate_modal').modal();
	});

    Stripe.setPublishableKey('pk_test_Spaho4YjalAEzClSviZzIJCw');

    $('#paymentForm')
        .on('submit', function(e) {
        	var loaderImgContainer = $('.loader-container');
			loaderImgContainer.show();
        	e.preventDefault();
            var $form = $(e.target);
            // Reset the token first
            $form.find('[name="token"]').val('');

            Stripe.card.createToken($form, function(status, response) {
                if (response.error) {
                	loaderImgContainer.hide();
                    alert(response.error.message);
                } else {
                    // Set the token value
                    $form.find('[name="token"]').val(response.id);
                    // You can submit the form to back-end as usual
                    // $form.get(0).submit();

                    // Or using Ajax
                    $.ajax({
                        // You need to change the url option to your back-end endpoint
                        method: 'post',
                        url: '/donate',
                        data: $form.serialize(),
                        dataType: 'json'
                    }).success(function(data) {
                        // Handle the response
                        // bootbox.alert(data.message);
                        console.log(data)
                        if(data.outcome.seller_message === "Payment complete."){
                        	window.location = "/";
                        	alert("Payment Successful")
							// $( "#dialog-1" ).dialog({
							//    autoOpen: false,  
							// });
							// $( "#paymentForm" ).on('submit', function() {
							//    $( "#dialog-1" ).dialog( "open" );
							// });
			    //             var loaderImgContainer = $('.loader-container');
							// var bodyWrapper = $('.body-wrapper');
       						// var p = $("<p>");
             //            	p.addClass("alert alert-success");
             //            	p.html("Payment Successful");
             //            	$("#payment_result").append(p).fadeIn(7000).fadeOut(7000);
                        } else {
                        	window.location = "/";
                        	alert("Payment Failed")
                        }
                        // Reset the form
                        // $form.formValidation('resetForm', true);
                    });
                }
            });
        });
});