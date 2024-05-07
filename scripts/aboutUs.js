const clickCertificate = () => {
  const block = document.getElementsByClassName("block-certificate")[0];
  if (block.className === "block-certificate") {
    block.classList.add("show-certificate");
  } else {
    block.classList.remove("show-certificate");
  }
};
