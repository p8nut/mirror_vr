class PopUp {
  constructor() {
    var msgbox = this.msgbox = document.getElementById("msgbox");
  }
  send(text) {
    this.msgbox.innerHTML = text;
    this.msgbox.style.display = "block";
    this.msgbox.style.display = -100;
    animatePopUp();
  }
  close() {
    this.msgbox.style.display = "none";
  }
  animatePopUp() {
    var pos = -250;
    var id = setInterval(frame, 4);
    function frame() {
      if (pos == 0) {
        clearInterval(id);
      } else {
        pos += 2;
        this.msgbox.style.left = pos + "px";
      }
    }
  }
}
