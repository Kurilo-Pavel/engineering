const ob = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    const square = entry.target.children[0];
    console.log(square)
    if (entry.isIntersecting) {
      square.classList.add("move_left");
      return;
    }
    square.classList.remove("move_left");
  });
});

ob.observe(document.getElementsByClassName("services-photo-wrapper-1")[0]);
ob.observe(document.getElementsByClassName("services-photo-wrapper-2")[0]);
ob.observe(document.getElementsByClassName("services-photo-wrapper-3")[0]);
