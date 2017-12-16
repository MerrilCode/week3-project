$(document).ready(function(){


	
$(document).keydown(function(e){
	$(".container").css({
		backgroundPosition:"0px 0px"
	});
	var to;
	function infinite(){
	 to = setTimeout(function(){
	    $('.container').animate({backgroundPosition:"-5000px -2500px"},12000,function(){
	      $('.container').css({backgroundPosition:'0px 0px'});
	      infinite();
	    });    
	  });
	}
infinite();
	switch(e.which){
		case 37: //left arrow key
		if($("#box").position().left <= 1){
			$("#box").clearQue();
		}else{
			$("#box").finish().animate({
				left: "-=20"

			},'fast');
		}
			break;
		case 38: // up arrow key
		if($("#box").position().top <= 1){
			$("#box").clearQue();
		} else {
			$("#box").finish().animate({
				top: "-=20"
			});
		}
			break;
		case 39: // right arrow key
		if($("#box").position().left >= 400){
			$("#box").clearQue();
		} else{
			$("#box").finish().animate({
				left: "+=20"
			});
		}
			break;
		case 40: // down arrow key
			$("#box").finish().animate({
				top: "+=20"
			});
			break;
	}

});






});