$(document).ready(function(){
var audio = $("audio")[0];
audio.loop=false;
var roadCol = $("#roadCol");
var userCar = $("#box");
var car1 = $("#car1");
var car2 = $("#car2");
var car3 = $("#car3");
var line1 = $('#line1');
var line2 = $('#line2');
var line3 = $('#line3');
var restart = $("#restart");
var restartDiv = $("#restartDiv");
var instruction = $("#instruction");
var currentSpeed = $("#currentSpeed");
var score =$("#score");
var roadColLeft = parseInt(roadCol.css('left'));
var roadColWidth = parseInt(roadCol.width());
var roadColHeight = parseInt(roadCol.height());
var carWidth = parseInt(userCar.width());
var carHeight = parseInt(userCar.height());
var speed = 2;
var fps = 0;
var lineSpeed = 5;
var scoreCounter = 0;
var animation;
var car1Array = new Array();
var car2Array = new Array();
var car3Array = new Array();
car1Array[0] = '../images/lotus-65x180.png';
car1Array[1] = '../images/bmw-65x180.png'
car2Array[0] = '../images/renaultY-63x173.png';
car3Array[0] = '../images/toyota-65x171.png'
startGame();
audio.loop=true;
audio.play();
restart.click(function(){
	location.reload();

});

function driveCar (){
		$(document).on("keydown",function(e){
			switch(e.which){
				case 37: //left arrow key
				if($("#box").position().left <= 20){
					$("#box").clearQueue();
				}else{
					$("#box").finish().animate({
						left: "-=50"

					},'fast');
				}
					break;
				case 38: // up arrow key
				if($("#box").position().top <= 10){
					$("#box").clearQueue();
				} else {
					$("#box").finish().animate({
						top: "-=50"
					});
				}
					break;
				case 39: // right arrow key
				if($("#box").position().left >=(roadColWidth-100)){
					$("#box").clearQueue();
				} else{
					$("#box").finish().animate({
						left: "+=50"
					});
				}
					break;
				case 40: // down arrow key
				if($("#box").position().top >=(roadColHeight-200)){
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


 function carDown(car) { // Makes the cars come down from top of the screen by checking the div heightand car top values. 
    var carCurrentTop = parseInt(car.css('top'));
    roadCol.css('background-image','url(' +"../images/road.jpg" + ')');
    
    if (carCurrentTop > roadColHeight) { // If car top attribute is greater than div height then deduct 200px. this function is called in a recursive function(repeat)
       carCurrentTop = -200;
       var carLeft = parseInt(Math.random() * (roadColWidth - carWidth));// determines the left position of the cars coming down by making it randomly placed.
    	car.css('left', carLeft);
     }
	   
    car.css('top', carCurrentTop +speed);
}
function lineDown(line){
	var lineCurrentTop = parseInt(line.css('top')); // same logic as making cars coming down. called inside repeat.
    if (lineCurrentTop > roadColHeight) {
        lineCurrentTop = -300;
    }
    line.css('top', lineCurrentTop + lineSpeed);
}

function repeat(){
	if(carCollide(userCar,car1)||carCollide(userCar,car2)||carCollide(userCar,car3)){ // checks if the the cars collide. if yes, stop game
		stopGame();

	} else{
		 carDown(car1); 
		 carDown(car2);
		 carDown(car3);
		 lineDown(line1);
		 lineDown(line2);
		 lineDown(line3);
		 scoreCounter++; // increment score counter and fps
		 fps++;

		 if((scoreCounter % 50 == 0) && (parseInt(currentSpeed.text()) !==310)){ // if the score counter is devisible by 50 then increase the score by one.
		 	score.text(parseInt(score.text())+1); 
		 	currentSpeed.text(parseInt(currentSpeed.text())+2+" mph"); // same logic as before but increments by 2 for speed
		 	 

		 } else if((scoreCounter % 50 == 0) && (parseInt(currentSpeed.text()) == 310)) { // limits the top speed to 310
		 		currentSpeed.text("310");
		 	}
		 else {
		 	//console.log("The score is counting!")
		 }
		 if(fps%1000 == 0){
		 	speed++;
		 	lineSpeed++;
		 	 selectCars();
		 } else {
		 	//console.log("Not ready to increase!")
		 }
		

		
		 restart.hide(); 
		 restartDiv.hide();
		requestAnimationFrame(repeat); // calling the function to make it recursive. 
		carCollisionEffect(); 
	
		

		
		
	}


}

function roadRepeat(){
	roadCol.animate({
		'background-position-y':'0px'
	}).animate({
	 	'background-position-y': '300px'
	 });

	// container.css('animation','5s '+'linear '+'infinite');
}

function startGame(){ // starts the game 
	roadRepeat();
	driveCar();
	animation = requestAnimationFrame(repeat);
	scoreCounter =0;

}

function stopGame(){
	cancelAnimationFrame(animation);
	stopDrive();
	restart.fadeToggle();	
	restartDiv.fadeToggle();
	userCar.effect("bounce",{times:2});
	audio.loop=false;
	audio.pause();
	$("#crashingCar")[0].play();
	$("body").css("animation","0s")
	currentSpeed.text(parseInt("0"));


}

function carCollide(car1,car2){ //logic to check the overlapping of divs of cars
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

function selectCars(){ // selecting cars randomly when the speed changes
	var car1Image = Math.floor(Math.random() * car1Array.length);
	var car2Image = Math.floor(Math.random() * car2Array.length);
	var car3Image = Math.floor(Math.random() * car3Array.length);
	car1.css('background-image','url(' +car1Array[car1Image] + ')');
	car2.css('background-image','url(' +car2Array[car2Image] + ')');
	car3.css('background-image','url(' +car3Array[car3Image] + ')');
}

function carCollisionEffect(){ //JQuery UI effects on collision
	if(carCollide(userCar,car1)){
		car1.effect("bounce",{times:2});
	} else if(carCollide(userCar,car2)){
		car2.effect("bounce",{times:2});
	} else if(carCollide(userCar,car3)){
		car3.effect("bounce",{times:2});
	}
}


});
