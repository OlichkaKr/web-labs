class ndexedDB {
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

		this.getFeedbackData = function(){
			var store = db.transaction(["feedbacks"]).objectStore("feedbacks");
		   	store.openCursor().onsuccess = function(event) {
		    	var cursor = event.target.result;
		    	if (cursor) {
		    		addFeedback(cursor.value.fanname, cursor.value.feedback, cursor.value.date);
		    		cursor.continue();
		    	}
		    	else {
		    		console.log("No more entries!");
		    	}
		    };
		}

		this.putFeedbackData = function(name, feedback){
			var dict = {
				'fanname': name,
				'feedback': feedback,
				'date': currentDate()
			};
			var store = db.transaction(["feedbacks"], "readwrite").objectStore("feedbacks");
			var request = store.add(dict);
		}

		this.getNewData = function(){
			addElement('news', 'div', '<div class="col-md-12" id=0></div>')
		    var store = db.transaction(["news"]).objectStore("news");
		   	store.openCursor().onsuccess = function(event) {
		    	var cursor = event.target.result;
		    	if (cursor) {
		    		var imgFile = cursor.value.img;
		    		var URL = window.URL || window.webkitURL;
			        var imgURL = URL.createObjectURL(imgFile);
		    		addNew(imgURL, cursor.value.newname, 0);
		    		cursor.continue();
		    	}
		    	else {
		    		console.log("No more entries!");
		    	}
		    };
		}

		this.putNewData = function(name, news){
			var img = document.getElementById("getval").files[0];
			var dict = {
				'newname': name,
				'newtext': news,
				'img': img
			};
			var store = db.transaction(["news"], "readwrite").objectStore("news").add(dict);
		}
	}
}

