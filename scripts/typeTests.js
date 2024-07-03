const handleClickProtocol = (el) => {
  if (el.parentElement.className.split(" ").includes("protocol_open")) {
    el.parentElement.classList.remove("protocol_open");
    el.parentElement.classList.add("protocol_close");
    el.classList.remove("button_close");
    el.classList.add("button_open");
  } else {
    el.parentElement.classList.add("protocol_open");
    el.parentElement.classList.remove("protocol_close");
    el.classList.remove("button_open");
    el.classList.add("button_close");
  }
};