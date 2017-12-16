$(document).ready(function(){


});
	
$(document).keydown(function(e){
	randomlyMoveImage();

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

function randomlyMoveImage(){
    var width = $(".container").width();
    var height = $(".container").height();
    
    var num = Math.floor((Math.random() * width)+1 );
    console.log(num);
    $(".rand-car").css("background-position", "200px 500px");
    
    // var y = Math.floor((Math.random() * height)+1);
  //     $( ".rand-car" ).animate({
  //   	left: x,
  //       // top: y
  // }, function() {
  //   // Animation complete.
  //});

  //   setTimeout(randomlyMoveImage, 2000);
	}




