$(document).ready(function(){
	
 	$('.loader-container').hide();

	$('#donate_button').on('click', function(e){
		e.preventDefault();
		$('#donate_modal').modal();
	});

    Stripe.setPublishableKey('pk_test_Spaho4YjalAEzClSviZzIJCw');

    $('#paymentForm').on('submit', function(e) {
    	var loaderImgContainer = $('.loader-container');
		loaderImgContainer.show();
		$('#donate_submit').prop("disabled", true);
    	e.preventDefault();
        var $form = $(e.target);
        // Reset the token first
        $form.find('[name="token"]').val('');

        Stripe.card.createToken($form, function(status, response) {
            if (response.error) {
            	loaderImgContainer.hide();
                bootbox.alert(response.error.message);
            } else {
                $form.find('[name="token"]').val(response.id);
                $.ajax({
                    method: 'post',
                    url: '/donate',
                    data: $form.serialize(),
                    dataType: 'json'
                }).success(function(data) {
                    bootbox.alert(data.outcome.seller_message);
                    if(data.outcome.seller_message === "Payment complete."){
                    	// bootbox.alert("Payment Successful")
                    	alert("Payment Successful")
                    	window.location = "/";
                    }
                });
            }
        });
    });
    
});