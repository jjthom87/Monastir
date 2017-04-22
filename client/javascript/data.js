$(document).ready(function() {	

	function NewData(){
		this.first = '';
		this.last = '';
		this.image = '';
		this.getFirst = function(){
			return this.first;
		},
		this.setFirst = function(value){
	 		this.first = value;
		},
		this.getLast = function(){
			return this.last;
		},
		this.setLast = function(value){
	 		this.last = value;
		},
		this.getImage = function(){
			return this.image;
		},
		this.setImage = function(value){
	 		this.image = value;
		}
	}

	var data = new NewData();

	$(function(){
		$(":file").change(function(){
			if(this.files && this.files[0]){
				var reader = new FileReader();
				reader.onload = imageIsLoaded;
				reader.readAsDataURL(this.files[0]);
			}
		});
	});
	function imageIsLoaded(e) {
		data.image = e.target.result;
	};

	$('#dataForm').on('submit', function(e){
		e.preventDefault();
		$.ajax({
			url: "/datapost",
			type: "post",
			data: JSON.stringify({
				first: $('#first_name_input').val(),
				last: $('#last_name_input').val(),
				image: data.image
			}),
			headers: {
				'content-type': 'application/json'
			}
		}).then((response) => response.json())
		.then((results) => {
		});

		$('#first_name_input').val('');
		$('#last_name_input').val('');
		$('#image_input').val('');
	});
});