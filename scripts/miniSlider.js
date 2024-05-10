const handleClickPage = (e, className) => {
  const children = e.parentElement.children;
  for (const page of children) {
    page.classList.remove("page_active");
  }
  e.classList.add("page_active");
  const part = e.parentElement.dataset.part
  const parentBlocks = document.getElementById(part).children;
  for (const block of parentBlocks) {
    if (block.dataset.active === "true") {
      block.className = className;
      block.dataset.active = false;
    }
    if (block.dataset.block) {
      if (block.dataset.block === e.textContent) {
        block.className = className + " " + "block_active";
        block.dataset.active = true;
      }
    }
  }
};

const handleBlockMove = (e, route, className) => {
  const parentBlocks = document.getElementById(e.dataset.part);
  let blocks = [...parentBlocks.children].filter(block => block.dataset.block);
  let startClass, endClass;
  const pages = document.getElementsByClassName("page");
  if (route === "next") {
    blocks = blocks.reverse();
    startClass = "move_right-first";
    endClass = "move_right-last";
  } else {
    startClass = "move_left-first";
    endClass = "move_left-last";
  }
  blocks.forEach((active, index) => {
    if (active.dataset.active === "true") {
      if (index !== 0) {
        active.className = className + " " + startClass;
        active.dataset.active = "false";
        blocks[index - 1].className = className + " " + endClass;
        blocks[index - 1].dataset.active = "true";
        [...pages].forEach(page => {
          if (page.textContent === blocks[index - 1].dataset.block) {
            page.classList.add("page_active");
          } else {
            page.classList.remove("page_active");
          }
        });
      }
    }
  });
};

const clickCertificate = () => {
  const block = document.getElementsByClassName("block-wrapper")[0];
  if (block.className === "block-wrapper") {
    block.classList.add("show-document");
  } else {
    block.classList.remove("show-document");
  }
};

const openReview = (nameImage) => {
  clickCertificate();
  const block = document.getElementsByClassName("block-documents")[0];
  if (nameImage) {
    const image = document.createElement("img");
    image.src = `./image/${nameImage}.png`;
    block.appendChild(image);
  } else {
    block.removeChild(block.children[0]);
  }
};