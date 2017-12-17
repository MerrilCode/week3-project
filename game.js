$(document).ready(function(){
	
var container = $(".container");
var userCar = $("#box");
var car1 = $("#car1");
var container_left = parseInt(container.css('left'));
var container_width = parseInt(container.width());
var container_height = parseInt(container.height());
var car_width = parseInt(userCar.width());
var car_height = parseInt(userCar.height());
var speed = 2;
var score_counter = 1;
var animation;
console.log(container_height);
console.log(parseInt(car1.css("top")));

animation = requestAnimationFrame(repeat);

	// moveRandomCarUp();
$(document).keydown(function(e){
	// randomlyMoveImage();

	switch(e.which){
		case 37: //left arrow key
		if($("#box").position().left <= 1){
			$("#box").clearQueue();
		}else{
			$("#box").finish().animate({
				left: "-=5"

			},'fast');
		}
			break;
		case 38: // up arrow key
		if($("#box").position().top <= 1){
			$("#box").clearQueue();
		} else {
			$("#box").finish().animate({
				top: "-=5"
			});
		}
			break;
		case 39: // right arrow key
		if($("#box").position().left >= 400){
			$("#box").clearQueue();
		} else{
			$("#box").finish().animate({
				left: "+=5"
			});
		}
			break;
		case 40: // down arrow key
			$("#box").finish().animate({
				top: "+=5"
			});
			break;
	}
});

// function randomlyMoveImage(){
//     var width = $(".container").width();
//     var height = $(".container").height();
    
//     var num = Math.floor((Math.random() * width)+1 );
//     console.log(num);
    
    
//     // var y = Math.floor((Math.random() * height)+1);
//   //     $( ".rand-car" ).animate({
//   //   	left: x,
//   //       // top: y
//   // }, function() {
//   //   // Animation complete.
//   //});

//   //   setTimeout(randomlyMoveImage, 2000);
// 	}

 function carDown(car) {
    var car_current_top = parseInt(car.css('top'));
    if (car_current_top > container_height) {
       car_current_top = -10;
     var car_left = parseInt(Math.random() * (container_width - car_width));
    car.css('left', car_left);
     }
   
    car.css('top', car_current_top +speed);
}

function repeat(){
	 carDown(car1);
	 animation = requestAnimationFrame(repeat);

}

});

// function moveRandomCarUp(){
// 	var height = $(".container").height();
// 	$("#start").keyup(function(){
// 			$("#car").animate({
// 				top: "-=20"
// 			});
			
	
		
// 	});




