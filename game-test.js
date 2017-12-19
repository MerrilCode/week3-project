$(document).ready(function(){


$("#instructionClose").on("click", function(){
var roadCol = $("#roadCol");
var userCar = $("#box");
var car1 = $("#car1");
var car2 = $("#car2");
var car3 = $("#car3");
var line1 = $('#line1');
var line2 = $('#line2');
var line3 = $('#line3');
var score =$("#score");
var restart = $("#restart");
var restartDiv = $("#restartDiv");
var instruction = $("#instruction");
var audio = $("#audio");
var roadColLeft = parseInt(roadCol.css('left'));
var roadColWidth = parseInt(roadCol.width());
var roadColHeight = parseInt(roadCol.height());
var carWidth = parseInt(userCar.width());
var carHeight = parseInt(userCar.height());
var speed = 2;
var lineSpeed = 5;
var fps = 0;
var scoreCounter = 0;
var animation;
var cars = new Array();
cars[0] = 'car1.png';
cars[1] = 'userCar.png';
cars[2] = 'lambo.png';
// var roadSpeed = 5000;
var audioTag = $();
startGame();
instruction.hide();

restart.click(function(){
	location.reload();

});

function driveCar (){
	$(document).on("keydown",function(e){
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
			if($("#box").position().top >=500){
				$("#box").clearQueue();
			}else {
				$("#box").finish().animate({
					top: "+=50"
				});
			}
				break;
		}
	});
}


 function carDown(car) {
    var carCurrentTop = parseInt(car.css('top'));
    roadCol.css('background-image','url(' +"road.jpg" + ')');
    
    if (carCurrentTop > roadColHeight) {
       carCurrentTop = -200;
     var carLeft = parseInt(Math.random() * (roadColWidth - carWidth));
    car.css('left', carLeft);
     }
	   
    car.css('top', carCurrentTop +speed);
}
function lineDown(line){
	var lineCurrentTop = parseInt(line.css('top'));
    if (lineCurrentTop > roadColHeight) {
        lineCurrentTop = -300;
    }
    line.css('top', lineCurrentTop + lineSpeed);
}

function repeat(){
	if(carCollide(userCar,car1)||carCollide(userCar,car2)||carCollide(userCar,car3)){
		stopGame();
	} else{
		 carDown(car1);
		 carDown(car2);
		 carDown(car3);
		 lineDown(line1);
		 lineDown(line2);
		 lineDown(line3);
		 scoreCounter++;
		 fps++;

		 if(scoreCounter % 20 == 0){
		 	score.text(parseInt(score.text())+1); 


		 } 
		 if(fps%1000 == 0){
		 	speed++;
		 	// roadSpeed -= 1000; // test and fix
		 	// roadRepeat(5000); // test and fix
		 	lineSpeed++;
		 	// selectCars();

		 }
		
		 restart.hide();
		 restartDiv.hide();
		requestAnimationFrame(repeat);
		
		
	}


}

function roadRepeat(speed){
	roadCol.animate({
		'background-position-y':'0px'
	}).animate({
	 	'background-position-y': '300px'
	 });

	// container.css('animation','5s '+'linear '+'infinite');
}

function startGame(){
	roadRepeat(speed);
	driveCar();
	animation = requestAnimationFrame(repeat);
	scoreCounter =0;

}

function stopGame(){
	cancelAnimationFrame(animation);
	stopDrive();
	gamePlay = false;
	restart.fadeToggle();	
	restartDiv.fadeToggle();
	userCar.effect("bounce",{times:2});

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

function stopDrive (){
	$(document).off("keydown");
}

function selectCars(){
	var car1Image = Math.floor(Math.random() * cars.length);
	var car2Image = Math.floor(Math.random() * cars.length);
	var car3Image = Math.floor(Math.random() * cars.length);
	console.log(car1Image,car2Image,car3Image);
	car1.css('background-image','url(' +cars[car1Image] + ')');
	car2.css('background-image','url(' +cars[car2Image] + ')');
	car3.css('background-image','url(' +cars[car3Image] + ')');
}

});	

});