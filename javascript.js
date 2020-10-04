const pagetitle = "DEV - Flagfilter - Quick and easy keyword search for flags";

/* Filter by buttons */
function filterSelection(input) {
	document.getElementById("myInput").value = "";	//clear text search field
	
	//set title to search terms
	if (input == "all") {
		document.title = pagetitle;
	} else {
		let buttonpressed = document.getElementsByClassName("filterbutton" + " " + input);
		document.title = "Flagfilter - " + buttonpressed[0].innerHTML;
	}			
	
	classFilter(input);
}

/* Filter by input text field */
function textFilter() {
	console.log("text input entered");
	
	let rawinput = document.getElementById("myInput");
	let input = rawinput.value.toLowerCase().trim();
	
	console.log("input.length: " + input.length);
	
	//clear active button
	if (input.length > 0) {
		let current = document.getElementsByClassName("active");
		if (current.length > 0) {
			for (let i = 0; i < current.length; i++) {
				current[i].classList.remove("active");
			}
		}
	}

	//set title to search terms
	if (input.length > 0) {
		document.title = "Flagfilter - " + input;
	} else {
		document.title = pagetitle;
	}
	
	classFilter(input);
}

function classFilter(input) {

	console.log("Input: \"" + input + "\"");			
	
	if (!input.trim().length || input== "all") {
		//show all flags if no input or "Show all" button is pressed
		let allflags = document.getElementsByClassName("flag");
		for (let i = 0; i < allflags.length; i++) {
			allflags[i].style.display = "";
		}
	} else {
		//hide all flags and show only matching flags
		let allflags = document.getElementsByClassName("flag");
		for (let i = 0; i < allflags.length; i++) {
			allflags[i].style.display = "none";
		}
		let visibleflags = document.getElementsByClassName(input);
		for (let i = 0; i < visibleflags.length; i++) {
			visibleflags[i].style.display = "";
		}
	}
	
	/*
	for (let i = 0; i < flags.length; i++) {
		image = flags[i].getElementsByClassName("image");
			if (splitinput.length == 1) {	//only one search term for quicker results
				for (let k = 0; k < image[0].classList.length; k++) {
					let textmatch = image[0].classList[k].toLowerCase().indexOf(input);
					if (textmatch !== -1) {
						flags[i].style.display = "";
						break;
					} else {
						flags[i].style.display = "none";
					}
				}
			} else {	//for more than one search term all of the words need to match perfectly
				let textmatch = 0;
				for (let n = 0; n < splitinput.length; n++) {
					if (image[0].classList.contains(splitinput[n])) {
						textmatch++;
						if (textmatch == splitinput.length) {
							flags[i].style.display = "";
							break;
						} else {
							flags[i].style.display = "none";
						}
					}
				}
				
			}
	} */
}

/* Adding class "active" to the button pressed */
let myButtons = document.getElementById("myButtons");
let filterbuttons = myButtons.getElementsByClassName("filterbutton");
for (let i = 0; i < filterbuttons.length; i++) {
	filterbuttons[i].addEventListener("click", function(){
		let current = document.getElementsByClassName("active");
		if (current.length == 0) {
			this.className += " active";
		} else {
			current[0].classList.remove("active");
			this.className += " active";
		}
	});
}
/*
$(window).load(function () {
	$(".trigger_popup_fricc").click(function(){
		$('.hover_bkgr_fricc').show();
	});
	$('.hover_bkgr_fricc').click(function(){
		$('.hover_bkgr_fricc').hide();
	});
});*/

//autofocus the text input field
let inputfield = document.getElementById("myInput");
inputfield.focus();
