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
      addCount(start + 1, max, el, speed);
    }, speed);
  }
};


const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    const square = entry.target;
    if (entry.isIntersecting && !square.dataset.viewed) {
      square.classList.add("show_section");
      square.dataset.viewed = true;
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
          addCount(0, 4, customer, 100);
          addCount(0, 4, objects, 120);
          addCount(0, 5, years, 80);
        });
      }
      return;
    }
    // square.classList.remove("show_section");
  });
}, {
  root: null,
  rootMargin: "0px",
  threshold: 0.1,
});
[...document.getElementsByTagName("section")].forEach(el => observer.observe(el));

let navOldTop = 0;

const handleScroll = () => {
  const burger = document.getElementById("burger");
  const burgerDouble = document.getElementById("burger-double");
  // if (burger.checked || burgerDouble) {
  //   burger.checked = false;
  //   burgerDouble.checked = false;
  // }
  const navigation = document.getElementsByClassName("scroll__header")[0];
  let navCurTop = window.scrollY;
  const heightHeader = document.getElementsByClassName("header")[0].getBoundingClientRect().height;
  if (navOldTop > navCurTop) {
    navigation.style.display = "flex";
    navigation.style.position = "fixed";
    navigation.classList.add("show-header");
    if (window.scrollY < heightHeader) {
      navigation.style.display = "none";
    }
  } else {
    if (window.scrollY >= heightHeader && navigation.getBoundingClientRect().top === 0) {
      navigation.style.position = "absolute";
      navigation.style.top = window.scrollY + "px";
      navigation.classList.remove("show-header");
    }
  }
  navOldTop = navCurTop;
};