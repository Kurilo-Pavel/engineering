const clickCertificate = () => {
  const block = document.getElementsByClassName("block-certificate")[0];
  if (block.className === "block-certificate") {
    block.classList.add("show-certificate");
  } else {
    block.classList.remove("show-certificate");
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
