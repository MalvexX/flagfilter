/*

Flagfilter.com
Version 0.12

*/

const pageTitle = "Flagfilter - Quick and easy keyword search for flags";

// Autofocus the text input field
let inputField = document.getElementById("myInput");
inputField.focus();

var buttonArray = new Array();	// Button search terms
var textInput = "";

/* Filter by input text field */
function textFilter() {
	let raw = document.getElementById("myInput");
	textInput = raw.value.toLowerCase().trim();

	console.log("textInput: " + textInput);
	
	showFlags();
}

function classFilter(input) {

	// Testing if input is new and should be added to buttonArray
	if (buttonArray.indexOf(input) == -1){
		buttonArray.push(input);	// Add input to buttonArray
	} else {
		buttonArray.splice(buttonArray.indexOf(input), 1);	// Removing input from buttonArray
	}

	// Show all flags if buttonArray is empty
	if (buttonArray.length == 0 || input == "all"){
		buttonArray = [];	// Reset buttonArray
		document.getElementById("myInput").value = "";		// Clear text search field

		setActiveButton("all");
		showAllFlags();
	} else {
		hideAllFlags();
		setActiveButton(input);
		showFlags();
	}
}

// Hiding all flags
function hideAllFlags() {
	let allFlags = document.getElementsByClassName("flag");
	for (let i = 0; i < allFlags.length; i++) {
		allFlags[i].style.display = "none";
	}
}

function showAllFlags() {
	let allFlags = document.getElementsByClassName("flag");
	for (let i = 0; i < allFlags.length; i++) {
		allFlags[i].style.display = "";
	}
	document.title = pageTitle;
}

function showFlags() {
	hideAllFlags();
	
	// Make the filter list from button inputs
	let buttonInput = ""
	for (k = 0; k < buttonArray.length; k++) {
		buttonInput = buttonInput + " " + buttonArray[k];
	}
	
	var list = "";
	
	if (buttonInput.length == 0 && textInput.length == 0) {
		showAllFlags();
	} else {
		let list = textInput + buttonInput;
		let visibleFlags = document.getElementsByClassName(list);
		for (let n = 0; n < visibleFlags.length; n++) {
			visibleFlags[n].style.display = "";
		}
	}
	
	// Set title to search terms
	if (list.length > 0) {
		document.title = "Flagfilter - " + list;
	} else {
		document.title = pageTitle;
	}
	
}

function setActiveButton(input) {
	if (input == "all") {
		let myButtons = document.getElementById("myButtons");
		let activeButtons = myButtons.getElementsByClassName("active");
		
		// Clear active status from all buttons
		while(activeButtons.length > 0){
			activeButtons[0].classList.remove("active");
		}
		
		let newActiveButton = myButtons.getElementsByClassName("all");
		newActiveButton[0].classList.add("active");		// Add active status to "Show all" button
	} else {
		let myButtons = document.getElementById("myButtons");
		let filterbuttons = myButtons.getElementsByClassName("filterbutton");
		filterbuttons[0].classList.remove("active");	// Clear active status of the "Show all" button
		
		let newActiveButton = myButtons.getElementsByClassName(input);
	
		if (newActiveButton.length > 0){
			if (newActiveButton[0].classList.contains("active")) {
			newActiveButton[0].classList.remove("active");			
			} else {
				newActiveButton[0].classList.add("active");
			}
		}
		
	}
	
}

// Popup using jQuery
$(window).on('load', function() {
	$(".trigger_popup_fricc").click(function(){
		$('.hover_bkgr_fricc').show();
	});
	$('.hover_bkgr_fricc').click(function(){
		$('.hover_bkgr_fricc').hide();
	});
});
