const handleCloseSlider = (e) => {
  e.parentElement.parentElement.classList.remove("open_slider");
};

const handleOpenSlider = () => {
  const slider = document.getElementById("slider");
  if (!slider.className.includes("open-slider")) {
    slider.classList.add("open_slider");
  }
};

const handleClickCard = (block) => {
  const blockContent = document.getElementsByClassName("objects-slider-wrapper");
  blockContent[0].innerHTML = "";
  const blockCircle = document.getElementsByClassName("slider-circle")[0];
  blockCircle.innerHTML = "";
  const children = block.children;
  for (const child of children) {
    if (child.className === "object__card-image") {
      const gallery = child.cloneNode(true);
      for (const el of gallery.children) {
        blockContent[0].appendChild(el.cloneNode(true));
        const circle = document.createElement("span");
        circle.className = "circle";
        circle.onclick = () => handleClickCircle(circle);
        circle.dataset.photo = [...gallery.children].indexOf(el);
        blockCircle.appendChild(circle);
      }
    }
  }
  blockCircle.firstElementChild.classList.add("circle-active");
  handleOpenSlider();
};

const handleClickCircle = (e) => {
  const children = e.parentElement.children;
  const gallery = document.getElementsByClassName("objects-slider-wrapper")[0];
  console.log()
  for (const child of children) {
    child.classList.remove("circle-active");
    gallery.children[child.dataset.photo].classList.remove("photo_active");
  }
  e.classList.add("circle-active");
  gallery.children[e.dataset.photo].classList.add("photo_active");
};
