class PopUp {
  constructor() {
    this.msgbox = document.getElementById("msgbox");
    this.msgbox.onclick = () => {
      this.close();
    };
  }
  send(text, time = 3000) {
    if (this.timeout) clearTimeout(this.timeout);
    this.msgbox.innerHTML = text;
    this.msgbox.style.display = "block";
    this.animatePopUp(time);
  }
  animatePopUp(time) {
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
    this.timeout = setTimeout(this.close, time);
  }
  close() {
    if (this.timeout) clearTimeout(this.timeout);
    this.msgbox.style.display = "none";
  }
  static getInstance() {
    return popup;
  }
}

var popup = new PopUp();
