/*

Flagfilter.com
Version 0.16

*/

const pageTitle = "Flagfilter - Quick and easy keyword search for flags";

// Autofocus the text input field
let inputField = document.getElementById("myInput");
inputField.focus();

// Filter parameters
var buttonArray = new Array();	// Button
var textInput = "";				// Text
var theURL = new URL(document.location); // URL query

// console.log("theURL.searchParams: " + theURL.searchParams.toString());
// console.log("theURL.searchParams.toString().length: " + theURL.searchParams.toString().length);

var list = "";	// Preparation of concatenated list of filters
var visibleCount = 0;

var URLparams = "";
if (theURL.searchParams.toString().length > 0) { // Perform initial filtering based on the URL query
	// Saving URL query by deleting the first two characters ("q=") and replace "+" with spaces
	URLparams = theURL.searchParams.toString().substring(2).replace(/\+/g,' ');
	let textField = document.getElementById("myInput");
	textField.value = URLparams;
	textInput = URLparams;
	
	showFlags();
}

updateCount();

// Update count of visible flags
function updateCount(input) {
	// console.log("updateCount input: " + input);
	// console.log("updateCount list.length: " + list.length);
	
	if (input == "all" || list.length == 0) {
		visibleCount = document.getElementsByClassName("flag").length;
	} else {
		visibleCount = document.getElementsByClassName(list).length;
	}
	
	// Set new search counter
	document.getElementById("searchCounter").innerHTML = visibleCount;
	// console.log("visibleCount new value: " + visibleCount);
}

function updateTitle() {
	document.title = "Flagfilter - " + list;
}

function resetTitle() {
	document.title = pageTitle;
}

function clearURL() {
	window.history.replaceState({}, '', `${location.pathname}`);	// Clear URL
	// console.log("clearURL URL cleared.");
}

function setURL() {
	theURL.searchParams.set('q', list);
	window.history.replaceState({}, '', `${location.pathname}?${theURL.searchParams}`);	// Update URL
}

function mergeFilters() {
	// Make the filter list from button inputs
	let buttonInput = buttonArray.join(' ');
	
	// console.log("mergeFilters buttonInput: " + buttonInput);
	// console.log("mergeFilters textInput: " + textInput);
	// console.log("mergeFilters URLparams: " + URLparams);
	
	// list = buttonInput + " " + textInput + " " + URLparams;
	list = buttonInput + " " + textInput;
	// console.log("mergeFilters list before trim: " + list);
	list = list.trim();
	// console.log("mergeFilters list after trim: " + list);
}

function hideAllFlags() {
	let allFlags = document.getElementsByClassName("flag");
	for (let i = 0; i < allFlags.length; i++) {
		allFlags[i].style.display = "none";
	}
	// console.log("hideAllFlags");
}

function showAllFlags() {
	let allFlags = document.getElementsByClassName("flag");
	for (let i = 0; i < allFlags.length; i++) {
		allFlags[i].style.display = "";
	}
	// console.log("showAllFlags");
}

// Clear active status from all buttons
function clearActiveButtons() {
	let myButtons = document.getElementById("myButtons");
	let activeButtons = myButtons.getElementsByClassName("active");
	
	while(activeButtons.length > 0) {
		activeButtons[0].classList.remove("active");
	}
}

// Add active status to matching buttons
function setActiveButtons(input) {
	if (input == "all") {
		let newActiveButton = myButtons.getElementsByClassName("all");
		newActiveButton[0].classList.add("active");		// Add active status to "Show all" button
		// console.log("setActiveButtons setting 'All' button to active.");
	} else {
		// console.log("setActiveButtons list: " + list);
		let splitList = list.split(" ");
		// console.log("setActiveButtons split list: " + splitList);
		let item = "";
		let myButtons = document.getElementById("myButtons");
		
		for (let i = 0; i < splitList.length; i++) {
			item = splitList[i];
			// console.log("setActiveButtons item: " + item);
			let activeButtons = myButtons.getElementsByClassName(item);
			// console.log("setActiveButtons activeButtons count: " + activeButtons.length);
			for (let k = 0; k < activeButtons.length; k++) {
				activeButtons[k].classList.add("active");
			}
		}
	}
	
}

function clearButtonArray() {
	buttonArray = [];	// Reset buttonArray
	// console.log("clearButtonArray array reset.");
}

function clearTextField() {
	document.getElementById("myInput").value = ""; // Clear input field
	textInput = ""; // Reset text input variable
	// console.log("clearTextField Resetting textInput.");
}

// Filter by text
function textFilter() {
	let raw = document.getElementById("myInput");
	textInput = raw.value.toLowerCase().trim(); // Convert input to lower case for matching
	textInput = textInput.replace(/,+/g, ' '); // Replace repeating commas with spaces
	textInput = textInput.replace(/ +/g, ' '); // Replace repeating spaces with a single space
	showFlags();
}

// Filter by buttons
function buttonFilter(input) {
	// console.log("buttonFilter input: " + input);
	// console.log("buttonFilter URLparams.indexOf(input): " + URLparams.indexOf(input));
	if (URLparams.indexOf(input) > -1) { // Don't do anything if the button was already "pressed" from URL query
		// console.log("buttonFilter input matches buttonArray: " + input);
	} else if (buttonArray.indexOf(input) == -1) { // Add entry if not already there
		// console.log("buttonFilter input match not found - adding " + input + " to array");
		buttonArray.push(input); // Add input to buttonArray
	} else { // Remove entry if it already exists
		// console.log("buttonFilter input match found - removing " + input + " from array");
		buttonArray.splice(buttonArray.indexOf(input), 1); // Removing input from buttonArray
	}
	showFlags();
}

function showFlags() {
	
	// console.log("showFlags buttonArray.length: " + buttonArray.length);
	// console.log("showFlags buttonArray last entry: " + buttonArray[buttonArray.length-1]);
	if (buttonArray[buttonArray.length-1] == "all" || (buttonArray.length == 0 && textInput.length == 0 && URLparams.length == 0)) {
		// console.log("showFlags show all if entry");
		showAllFlags();
		clearActiveButtons();
		clearButtonArray();
		setActiveButtons("all");
		updateCount("all");
		clearTextField();
		resetTitle();
		clearURL();
		URLparams = "";
	} else {
		hideAllFlags();
		mergeFilters();
	
		let visibleFlags = document.getElementsByClassName(list);
		for (let n = 0; n < visibleFlags.length; n++) {
			visibleFlags[n].style.display = ""; // Show all flags matching filter
		}
		
		clearActiveButtons();
		setActiveButtons();
		updateCount();
		updateTitle();
		setURL();
	}
}
