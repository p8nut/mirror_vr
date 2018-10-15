class PopUp {
  constructor() {
    this.msgbox = document.getElementById("msgbox");
    //this.msgbox.onclick = ()=>{this.close()};
  }
  send(text) {
    this.msgbox.innerHTML = text;
    this.msgbox.style.display = "block";
    this.animatePopUp();
  }
  animatePopUp() {
    var pos = -250;
    this.msgbox.style.left = pos + "px";
    var id = setInterval(frame, 4);
    function frame() {
      if (pos == 0) {
        clearInterval(id);
      } else {
        pos += 2;
        this.msgbox.style.left = pos + "px";
      }
    }
    window.setTimeout(this.close, 3000);
  }
  close() {
    this.msgbox.style.display = "none";
  }
  static getInstance() {
    return popup;
  }
}

var popup = new PopUp();