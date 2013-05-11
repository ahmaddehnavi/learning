

// const numberOfImage=5;
// const imageWidth=900;
// var imageNumber=0;
// function show(){
// 	document.getElementById("slideshow").style.left=-imageNumber*imageWidth-1+'px';
// }

// function pre () {
// 	if(imageNumber>0)
// 	{
// 		imageNumber--;
// 	}
// 	else
// 	{
// 		imageNumber=numberOfImage-1;
// 	}
// 	show();
// }

// function next () {
// 	if(imageNumber<numberOfImage-1)
// 	{
// 		imageNumber++;
// 	}
// 	else
// 	{
// 		imageNumber=0;
// 	}
// 	show();
// }
// var autoStart=null;
// function startSlider(){
// 	 autoStart=setInterval(function(){next()},3000);
// 	 imageNumber=Math.round(Math.random()*numberOfImage);
// 	 imageNumber--;
// 	 next();
// }

// function resumeSlider(){
// 	 autoStart=setInterval(function(){next()},3000);
// }
// function pauseSlider(){
// 	clearInterval(autoStart);
// }




var numberOfImage=5;
var imageWidth=900;
var imageNumber=0;
var beforBullet=0;

function next () {
	if(imageNumber<numberOfImage-1)
	{
		imageNumber++;
	}
	else
	{
		imageNumber=0;
	}
	show(imageNumber);
}

function show(i) {
	if(i<numberOfImage && i>=0){
		document.getElementById("bullet"+beforBullet).className ="";
		document.getElementById("slideshow").style.left=-i*imageWidth+'px';
		document.getElementById("bullet"+i).className="active";
		beforBullet=i;
	}
}

var autoStart=null;
function startSlider(){
	 autoStart=setInterval(function(){next()},3000);
	 imageNumber=Math.round(Math.random()*numberOfImage);
	 imageNumber--;
	 next();
}

function resumeSlider(){
	 autoStart=setInterval(function(){next()},3000);
}

function pauseSlider(){
	clearInterval(autoStart);
}
