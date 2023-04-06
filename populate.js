/*

Flagfilter.com
Version 0.1 of populate.js

*/
// Creating the wall of flags based on the json file content
function populateFlags(obj){
	const gallery = document.getElementById("gallery");

	for (let k = 0; k < obj.length; k++) {
		let flagdiv = document.createElement('div');	// Creating div for flag object

		const tags = obj[k].tags.split(" ");
		// console.log(tags);
		for (let m = 0; m < tags.length; m++) {
			flagdiv.classList.add(tags[m]);
		}
		flagdiv.innerHTML = 
				"<img class=\"image\" src=" + obj[k].imagelink + ">" +
				"<div class=\"overlay\" onclick=\"showModal('modal_" + obj[k].shortname + "')\">" + obj[k].name + "</div>" +
			"</div>";
		gallery.appendChild(flagdiv);

		let modaldiv = document.createElement('div');		// Creating modal
		modaldiv.classList.add("modal");
		modalId = "modal_" + obj[k].shortname;
		modaldiv.id = modalId;

		modaldiv.innerHTML = 
				"<div class=\"modal-content\">" + 
					"<div class=\"modal-header\">" + 
						"<h2>" + obj[k].name + "</h2>" + 
						"<span class=\"close\">&times;</span>" + 
						"<img class=\"modal-image\" src=" + obj[k].imagelink + ">" + 
					"</div>" + 
					"<div class=\"modal-body\">" + 
						"<table class=\"modal-table\">" + 
							"<tr><td>Proportion:</td><td>" + obj[k].proportion + "</td></tr>" + 
							"<tr><td>Year adopted:</td><td>" + obj[k].adopted + "</td></tr>" + 
						"</table>" + 
						"<br>" + 
						"<p><b>Symbolism:</b></p>" + obj[k].symbolism +
						"<br>" + 
						"<p><b>Fun facts:</b></p>" + obj[k].funfacts + 
					"</div>" + 
					"<div class=\"modal-footer\">" + 
						"<a href=" + obj[k].wikipedialink + " target=\"_blank\" rel=\"noopener noreferrer\">" + obj[k].wikipedialink + "</a>" + 
					"</div>" + 
				"</div>" + 
		// "</div>";

		gallery.appendChild(modaldiv);
	}
}

async function populate() {

	const request = new Request('flaginfo.json');
  
	const response = await fetch(request);
	const jsonFlags = await response.json();
  
	// console.log("populate function");

	populateFlags(jsonFlags);
}

populate(); // Creating all flag objects from the flaginfo.json file
