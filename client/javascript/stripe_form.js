$(document).ready(function(){
	
    $('.donate-button').click(function(event) {
        var amount = $('#custom-donation-amount').val();
        $('.stripe-button').attr('data-amount', amount * 100)
    });
	// var stripe = Stripe("pk_test_Spaho4YjalAEzClSviZzIJCw");
	// var elements = stripe.elements();

	// var card = elements.create('card', {
	//   style: {
	//     base: {
	//       iconColor: '#666EE8',
	//       color: '#31325F',
	//       lineHeight: '40px',
	//       fontWeight: 300,
	//       fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
	//       fontSize: '15px',

	//       '::placeholder': {
	//         color: '#CFD7E0',
	//       },
	//     },
	//   }
	// });
	// card.mount('#card-element');

	// function setOutcome(result) {
	//   var successElement = document.querySelector('.success');
	//   var errorElement = document.querySelector('.error');
	//   successElement.classList.remove('visible');
	//   errorElement.classList.remove('visible');

	//   if (result.token) {
	//     // Use the token to create a charge or a customer
	//     // https://stripe.com/docs/charges
	//     successElement.querySelector('.token').textContent = result.token.id;
	//     successElement.classList.add('visible');
	//   } else if (result.error) {
	//     errorElement.textContent = result.error.message;
	//     errorElement.classList.add('visible');
	//   }
	// }

	// card.on('change', function(event) {
	//   // setOutcome(event);
	//   	console.log(event)
	// 	fetch("/donate", {
	// 		method: "post",
	// 		body: JSON.stringify({
	// 			stripeToken: event.token.id
	// 		}),
	// 		headers: {
	// 			'content-type': 'application/json'
	// 		}
	// 	}).then((response) => response.json())
	// 		.then((results) => {
	// 	});
	// });

	// document.querySelector('form').addEventListener('submit', function(e) {
	//   e.preventDefault();
	//   var form = document.querySelector('form');
	//   var extraDetails = {
	//     name: form.querySelector('input[name=cardholder-name]').value,
	//   };
	//   stripe.createToken(card, extraDetails).then(setOutcome);
	// });

	$('#donate_button').on('click', function(e){
		e.preventDefault();
		$('#donate_modal').modal();
	});

		// e.preventDefault();

		// fetch("/donate", {
		// 	method: "post",
		// 	body: JSON.stringify({
		// 		name: $('#name-input').val(),
		// 		email: $('#email-input').val(),
		// 		stripeToken: document.querySelector('.success').querySelector('.token').textContent
		// 	}),
		// 	headers: {
		// 		'content-type': 'application/json'
		// 	}
		// }).then((response) => response.json())
		// 	.then((results) => {
		// });
});