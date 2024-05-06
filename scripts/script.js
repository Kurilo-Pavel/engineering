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

const addCount = (start, max, el, speed) => {
  el.innerText = start;
  if (start < max) {
    setTimeout(() => {
      addCount(start + 1, max, el, speed)
    }, speed);
  }
};


const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    const square = entry.target;
    if (entry.isIntersecting) {
      square.classList.add("show_section");
      if (square.dataset.show === "counter") {
        const customer = document.getElementById("customers");
        customer.innerText = 0;
        const objects = document.getElementById("objects");
        objects.innerText = 0;
        const years = document.getElementById("years");
        years.innerText = 0;
        Promise.all(
          square.getAnimations({subtree: true}).map((animation) => {
            return animation.finished
          })
        ).then(() => {
          addCount(0, 20, customer, 100);
          addCount(0, 20, objects, 120);
          addCount(0, 20, years, 80);
        });
      }
      return;
    }
    square.classList.remove("show_section");
  });
});
[...document.getElementsByTagName("section")].forEach(el => observer.observe(el));