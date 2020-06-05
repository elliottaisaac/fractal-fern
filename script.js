// JavaScript Document

//rotates the arrow when the slider thumb is moved
const rotation = document.querySelector("#rot");
rotation.addEventListener("input", () => {
	   const degrees = rotation.value;
       document.querySelector(".arrow").style.transform = `rotate(${degrees}deg)`; 
	   document.querySelector("canvas").style.transform = `rotate(${degrees}deg)`; 
    });

//changes the background style of the body while the checkbox is checked
document.querySelector("#check").addEventListener("input", () => {
	if (document.querySelector("#check").checked == true){
		document.querySelector("body").style.backgroundColor = "white";
	}
	else{document.querySelector("body").style.backgroundColor = "#1c1b1b";}
});


//hides the control box and creates a show controls button
document.querySelector("#show").style.display = "none";
document.querySelector("#hide").addEventListener("click", () => {
			document.querySelector(".controls").style.opacity= "0";
			const show = document.querySelector("#show");
			show.style.display="block";
});
//shows the control box
document.querySelector("#show").addEventListener("click", () => {
		document.querySelector(".controls").style.opacity= "1.0";
		document.querySelector("#show").style.display = "none";
});

//reloads the DOM to clear the canvas
document.querySelector("#reset").addEventListener("click", () => {
	location.reload();
});	



//the three color sliders
const red = document.querySelector("#red"); 
const green = document.querySelector("#green"); 
const blue = document.querySelector("#blue"); 

//coloring sliders & big dot + arrow upon page load
displayColors();
initSliderColors();
colorSliders();


// colors the big circle dot and the rotational arrow to show the combined color of the 3 RGB values
function displayColors(){
	const selectedColor = `rgb(${red.value}, ${green.value}, ${blue.value})`;
    document.querySelector("#color-display").style.backgroundColor = selectedColor;   
	document.querySelector(".arrow").style.borderColor = selectedColor;
	return selectedColor;
}


// calls sliderFill for each of the 3 colors
function initSliderColors(){
    sliderFill(red);
    sliderFill(green);
    sliderFill(blue);
}


//colors the slider rails with a gradient that divides at the point of the thumb
function sliderFill(clr){
    const val = clr.value / 255; //obtains the thumb location along the slider 
    const percent = val * 100; //converts the decimal to a %
	
    if(clr == red){
        clr.style.background = `linear-gradient(to right, rgb(${clr.value},0,0) ${percent}%, #cccccc 0%)`;    
    } else if (clr == green) {
        clr.style.background = `linear-gradient(to right, rgb(0,${clr.value},0) ${percent}%, #cccccc 0%)`;    
    } else if (clr == blue) {
        clr.style.background = `linear-gradient(to right, rgb(0,0,${clr.value}) ${percent}%, #cccccc 0%)`;    
    }
}


//calls the functions to color the sliders and display upon value change of a slider
function colorSliders(){
    red.addEventListener("input", () => {
        displayColors();
        initSliderColors();
    });

    green.addEventListener("input", () => {
        displayColors();
        initSliderColors();
    });

    blue.addEventListener("input", () => {
        displayColors();
        initSliderColors();
    });
}


document.querySelector("#draw").addEventListener("click", Draw);

//draws a pixel on the canvas, based upon a random generated number and the location of the previous dot

const canvasElement = document.querySelector("#canvas");
const context = canvasElement.getContext("2d");
canvasElement.height = 1500;
canvasElement.width = 1500;	

let X = 0;
let Y = 0;
let x;
let y;

function Draw(){
//adapted from python code found at https://en.wikipedia.org/wiki/Barnsley_fern#Python
	for(let n = 1; n <= 1000000; n++){
		const dot = setTimeout( () => { 
			r = Math.random()*100;
			if(r < 1.0){
				x = 0;
				y = 0.16 * Y;
			}
			else if(r < 86.0){
				x = (0.85 * X) + (0.04 * Y);
				y = (-0.04 * X) + (0.85 * Y + 1.6);
			}
			else if(r < 93.0){
				x = (0.2 * X) - (0.26 * Y);
				y = (0.23 * X) + (0.22 * Y + 1.6);
			}
			else{
				x = (-0.15 * X) + (0.28 * Y);
				y = (0.26 * X) + (0.24 * Y + 0.44);
			}

			X = x;
			Y = y;

			const color = displayColors();
			context.fillStyle = color;
			
			context.fillRect(x * 125 + 375, y * 125 + 225, 1,1);

			document.querySelector("p").innerHTML = `dots: ${n}`;
		}, n % 2);	
	}
}