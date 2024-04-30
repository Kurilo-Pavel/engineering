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