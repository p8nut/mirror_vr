function sendPopUp(text) {
	var msgbox = document.getElementById('msgbox');
	msgbox.innerHTML = text;
	msgbox.style.display = "block";
	msgbox.style.display = -100;
	animatePopUp();
}

function closePopUp() {
	var msgbox = document.getElementById('msgbox');
	msgbox.style.display = "none";
}

function animatePopUp() {
	var msgbox = document.getElementById('msgbox');
	var pos = -250;
	var id = setInterval(frame, 4);
	function frame() {
	    if (pos == 0) {
		clearInterval(id);
	    } else {
		pos += 2;
		msgbox.style.left = pos + 'px';
	    }
	}
}