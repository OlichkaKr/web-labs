var classTheme = "";
var img = false;
var online = true;

function hambMenu() {
	var x = document.getElementById("topnav");
	if (x.className === "topnav") {
		x.className += " responsive";
	} else {
		x.className = "topnav";
	}
}

window.addEventListener("load", function(){
	const loading = document.querySelector(".loading");
	loading.className += " hidden";
});

function showError(container, errorMessage) {
	container.className = 'error';
	var msgElem = document.createElement('span');
	msgElem.className = "error-message";
	msgElem.innerHTML = errorMessage;
	container.appendChild(msgElem);
}

function resetError(container) {
	container.className = '';
	if (container.lastChild.className == "error-message") {
		container.removeChild(container.lastChild);
	}
}

function validate(form) {
	var elems = form.elements;
	var valid = true;

	resetError(elems.fanname.parentNode);
	if (!elems.fanname.value) {
		showError(elems.fanname.parentNode, ' Please, enter your name.');
		valid = false;
	}

	resetError(elems.feedback.parentNode);
	if (!elems.feedback.value) {
		showError(elems.feedback.parentNode, ' Please, enter feedback.');
		valid = false;
	}

	if (valid) {
		addFeedback(elems.fanname.value, elems.feedback.value);
		form.reset();
	}	
}

function addElement(parentId, elementTag, html) {
	var p = document.getElementById(parentId);
	var newElement = document.createElement(elementTag);
	newElement.innerHTML = html;
	p.appendChild(newElement);
	var div = document.getElementById(parentId);
	div.insertBefore(newElement, div.childNodes[1]);
}

function addFeedback(name, feedback) {
	var divElem = document.getElementById('feedbacks');
	var classElem = divElem.childNodes[1].getAttribute("class");

	if (classElem == "feedbacks-light col-md-12" || classTheme == "light") {
		classTheme = "dark";
	} else {
		classTheme = "light";
	}
	var today = currentDate();
	var html = '<div class="feedbacks-' + classTheme + ' col-md-12"><p>' + feedback + '</p>'
	+'<div class="info">'
	+'<div class="author-' + classTheme + '">' + today + '</div>'
	+'<div class="author-' + classTheme + '">' + name + '</div>'
	+'</div>'
	+'</div>';
	addElement('feedbacks', 'div', html);
}

function currentDate() {
	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth()+1; 
	var yyyy = today.getFullYear();

	if(dd<10) {
		dd = '0'+dd
	} 
	if(mm<10) {
		mm = '0'+mm
	} 
	return today = mm + '.' + dd + '.' + yyyy;
}

document.getElementById('getval').addEventListener('change', readURL, true);
function readURL(){
	var file = document.getElementById("getval").files[0];
	var reader = new FileReader();
	reader.onloadend = function(){
		document.getElementById('clock').src = reader.result;      
		img = true; 
	}
	if(file){
		reader.readAsDataURL(file);
	}
}

function validateNew(form) {
	var elems = form.elements;
	var valid = true;
	resetError(elems.image.parentNode);
	if (!img) {
		showError(elems.image.parentNode, ' Please, add an image.');
		valid = false;
	}

	resetError(elems.nname.parentNode);
	if (!elems.nname.value) {
		showError(elems.nname.parentNode, ' Please, enter a title.');
		valid = false;
	}

	resetError(elems.feedback.parentNode);
	if (!elems.feedback.value) {
		showError(elems.feedback.parentNode, ' Please, enter a text of new.');
		valid = false;
	}

	if (valid) {
		form.reset();
		alert("Your new is successfully posted.")

	}	
}
