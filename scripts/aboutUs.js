const clickCertificate = () => {
  const block = document.getElementsByClassName("block-wrapper")[0];
  if (block.className === "block-wrapper") {
    block.classList.add("show-document");
  } else {
    block.classList.remove("show-document");
  }
};

const viewer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    const square = entry.target;
      if (entry.isIntersecting) {
        square.classList.add("move_left");
        return;
      }
      square.classList.remove("move_left");
  });
});

viewer.observe(document.getElementsByClassName("aboutUs-block__field")[0]);
viewer.observe(document.getElementsByClassName("aboutUs-block__content")[0]);
viewer.observe(document.getElementsByClassName("aboutUs-images")[0]);
