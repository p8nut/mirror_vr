class PopUp {
  constructor() {
    this.msgbox = document.getElementById("msgbox");
    this.msgbox.onclick = () => {
      this.close();
    };
  }
  send(text, time = 3000, color = "#3ab41b", size = "normal") {
    if (this.timeout) clearTimeout(this.timeout);
    this.msgbox.innerHTML = text;
    this.msgbox.style.display = "block";
    this.msgbox.style.backgroundColor = color;
    this.animatePopUp(time, size);
  }
  animatePopUp(time, size) {
    var pos = -250;
    this.msgbox.style.left = pos + "px";
    var id = setInterval(frame, 4);
    var padding = 0;
    if (size == "big")
      padding = 750;
    function frame() {
      if (pos == 0 + padding) {
        clearInterval(id);
      } else {
        pos += 2;
        this.msgbox.style.left = pos + "px";
      }
    }
    this.timeout = setTimeout(this.close, time);
  }
  reload() {
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
