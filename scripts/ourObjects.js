const handleClickCircle = (e) => {
  const children = e.parentElement.children;
  for (const circle of children) {
    circle.className = "circle";
    document.getElementById(circle.dataset.photoId).className = "objects-slider-photo";
  }
  e.className = "circle circle-active";
  document.getElementById(e.dataset.photoId).className = "objects-slider-photo photo_active"
};

const handleClickMove = (value) => {
  const circle = document.getElementsByClassName("circle-active")[0];
  const photo = document.getElementById(circle.dataset.photoId)
  let route;
  if (value === "next" && circle.nextElementSibling) {
    route = circle.nextElementSibling;
    photo.className = "objects-slider-photo move_right-first";
    photo.nextElementSibling.className = "objects-slider-photo move_right-last";

  }
  if (value === "previous" && circle.previousElementSibling) {
    route = circle.previousElementSibling;
    photo.className = "objects-slider-photo move_left-first";
    photo.previousElementSibling.className = "objects-slider-photo move_left-last";
  }
  if (route) {
    circle.className = "circle";
    route.className = "circle circle-active";
   }
};
