$(document).ready(function(){
	
var container = $(".container");
var userCar = $("#box");
var car1 = $("#car1");
var score =$("#score");
var restart = $("#restart");
var container_left = parseInt(container.css('left'));
var container_width = parseInt(container.width());
var container_height = parseInt(container.height());
var car_width = parseInt(userCar.width());
var car_height = parseInt(userCar.height());
var speed = 1;
var score_counter = 0;
var animation;
var roadSpeed = 5000;
// console.log(container_height);
// console.log(parseInt(car1.css("top")));
var canDrive = true;
startGame();
restart.click(function(){
	startGame();
});
function driveCar (){
	if( canDrive === true){
		$(document).keydown(function(e){
			switch(e.which){
				case 37: //left arrow key
				if($("#box").position().left <= 5){
					$("#box").clearQueue();
				}else{
					$("#box").finish().animate({
						left: "-=50"

					},'fast');
				}
					break;
				case 38: // up arrow key
				if($("#box").position().top <= 5){
					$("#box").clearQueue();
				} else {
					$("#box").finish().animate({
						top: "-=50"
					});
				}
					break;
				case 39: // right arrow key
				if($("#box").position().left >= 599){
					$("#box").clearQueue();
				} else{
					$("#box").finish().animate({
						left: "+=50"
					});
				}
					break;
				case 40: // down arrow key
				if($("#box").position().top >=560){
					$("#box").clearQueue();
				}else {
					$("#box").finish().animate({
						top: "+=50"
					});
				}
					break;
			}
		});
	}else if(canDrive == false){
		alert("You crashed!");
	}
}


 function carDown(car) {
    var car_current_top = parseInt(car.css('top'));
    container.css('background-image','url(' +"" + ')');
    
    if (car_current_top > container_height) {
       car_current_top = -10;
     var car_left = parseInt(Math.random() * (container_width - car_width));
    car.css('left', car_left);
     }
	   
    car.css('top', car_current_top +speed);
}

function repeat(){
	if(carCollide(userCar,car1)){
		stopGame();
		return;
	}
	 carDown(car1);
	 score_counter++;
	 if(score_counter % 20 == 0){
	 	score.text(parseInt(score.text())+1); 

	 }
	 if(score_counter % 100 == 0){
	 	speed++;
	 	roadSpeed -= 1000; // test and fix
	 	roadRepeat((roadSpeed)); // test and fix

	 }
	 restart.hide();
	 animation = requestAnimationFrame(repeat);

}

function roadRepeat(speed){
	container.animate({
		'background-position-y':'0px'
	}).animate({
	 	'background-position-y': '300px'
	 },speed,roadRepeat);

	// container.css('animation','5s '+'linear '+'infinite');
}

function startGame(){
	roadRepeat(speed);
	driveCar();
	animation = requestAnimationFrame(repeat);

}

function stopGame(){
	cancelAnimationFrame(animation);
	canDrive = false;
	container.css('animation','0s');
	restart.show();
	
}

function carCollide(car1,car2){
		var x1 = car1.offset().left;
        var y1 = car1.offset().top;
        var h1 = car1.outerHeight(true);
        var w1 = car1.outerWidth(true);
        var b1 = y1 + h1;
        var r1 = x1 + w1;
        var x2 = car2.offset().left;
        var y2 = car2.offset().top;
        var h2 = car2.outerHeight(true);
        var w2 = car2.outerWidth(true);
        var b2 = y2 + h2;
        var r2 = x2 + w2;

        if (b1 < y2 || y1 > b2 || r1 < x2 || x1 > r2) {
        	return false;
        } else{
        	return true;
    	}	
}


});





