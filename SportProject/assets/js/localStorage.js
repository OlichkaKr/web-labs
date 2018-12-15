class ocalStorage {
	constructor(){

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

		function addElement(parentId, elementTag, html, position) {
			var p = document.getElementById(parentId);
			var newElement = document.createElement(elementTag);
			newElement.innerHTML = html;
			p.appendChild(newElement);
			var div = document.getElementById(parentId);
			if (position == 'before') {
				div.insertBefore(newElement, div.childNodes[1]);
			}
			else {
				div.insertBefore(newElement, div.lastChild.nextSibling);
			}	
		}

		function addFeedback(name, feedback, date) {
			var divElem = document.getElementById('feedbacks');
			var classElem = divElem.childNodes[1].getAttribute("class");

			if (classElem == "feedbacks-light col-md-12" || classTheme == "light") {
				classTheme = "dark";
			} else {
				classTheme = "light";
			}
			if (!date) {
				date = currentDate();
			}
			
			var html = '<div class="feedbacks-' + classTheme + ' col-md-12"><p>' + feedback + '</p>'
			+'<div class="info">'
			+'<div class="author-' + classTheme + '">' + date + '</div>'
			+'<div class="author-' + classTheme + '">' + name + '</div>'
			+'</div>'
			+'</div>';
			addElement('feedbacks', 'div', html, 'before');
		}

		function addNew(img, name, id) {
			var divElem = document.getElementById(id);
			var html = '<div class="col-md-3">' +
						'<div class="news-content">' +
						'<div class="cell-content">' +
						'<img src="' + img + '" alt="">' +
						'<a href="#"><span id="clickable-area"></span>' +
						'<h3>' + name + '</h3>' +
						'</a>' +
						'</div>' +
						'</div>' +
						'</div>';
			addElement(id, 'div', html, 'after');
		}

		function getImageURL(img) {
		    var canvas = document.createElement("canvas");
		    canvas.width = img.width;
		    canvas.height = img.height;

		    var ctx = canvas.getContext("2d");
		    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

		    var dataURL = canvas.toDataURL("image/png");

		    return dataURL;
		}

		this.getFeedbackData = function(){
			var amount = localStorage.getItem('feedbacks');
			for (var i = 1; i <= amount; i++) {
				var value = JSON.parse(localStorage.getItem('feedbacks' + ("" + i)));
				addFeedback(value["fanname"], value["feedback"], value["date"]);
			}
		}

		this.putFeedbackData = function(name, feedback){
			var dict = {
				'fanname': name,
				'feedback': feedback,
				'date': currentDate()
			};
			var amount = localStorage.getItem('feedbacks');
			if (!amount) {
				localStorage.setItem('feedbacks', 0);
				amount = 0;
			}
			amount++;
			localStorage.setItem('feedbacks' + ("" + amount), JSON.stringify(dict));
			localStorage.setItem('feedbacks', amount);
		}

		this.getNewData = function(){
			var amount = localStorage.getItem('news');
			var id;
			for (var i = 1; i <= amount; i++) {
				var value = JSON.parse(localStorage.getItem('news' + i));
				if (i%4 == 1) {
					id = 'news' + i;
					addElement('news', 'div', '<div class="col-md-12" id=' + id +'></div>')
				}
				addNew(value["img"], value["newname"], id);
			}
		}

		this.putNewData = function(){
			img = document.getElementById('clock');
			imgNew = getImageURL(img);
			var dict = {
				'img': imgNew,
				'newname': name,
				'newtext': news
			};
			var amount = localStorage.getItem('news');
			if (!amount) {
				localStorage.setItem('news', 0);
				amount = 0;
			}
			amount++;
			localStorage.setItem('news' + ("" + amount), JSON.stringify(dict));
			localStorage.setItem('news', amount);
		}
	}
}
