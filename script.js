const handleClick = (e) => {
  const children = e.parentElement.children;
  for (const page of children) {
    page.className = "page";
  }
  e.className = "page page_active";
};

const scrollStart = () => {
  window.scroll(0, 0);
};

const handleClickButton = (e) => {
  const children = e.parentElement.children;
  for (const page of children) {
    if (page.tagName === "SPAN") {
      page.className = "button objects__button-arrow";
    }
    e.className = "button objects__button-arrow button_active";
  }
};