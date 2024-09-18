const dataAnimate = {
  duration: 800,
  fill: "both",
  delay: "100",
  easing: "ease-out"
};
let active = false;

const handleClick = (e) => {
  const children = e.parentElement.children;
  const data = dataElements();
  activePage(e.textContent);
  if (document.body.clientWidth > 530) {
    if (e.textContent != data.large.id && !active) {
      active = true;
      data.block.animate([
        {left: `${data.positionBlock}px`},
        {left: `${-(e.textContent - 1) * 363 + data.paddingLeft}px`}
      ], dataAnimate);

      data.large.animate([
        {width: "696px"},
        {width: "333px"}
      ], dataAnimate);

      const small = document.getElementById(e.textContent);
      small.animate([
          {width: "333px"},
          {width: "696px"}],
        dataAnimate);

      data.large.className = "small_block";

      Promise.all(
        data.large.getAnimations({subtree: true}).map(animation => animation.finished),
      ).then(() => {
        small.className = "large_block";
        active = false;
      });
    }
  } else {
    data.block.style.left = `${-(e.textContent - 1) * (data.block.getBoundingClientRect().width - data.paddingLeft * 2) / data.block.children.length}px`;
    data.block.style.transition = "1s";
    showBlock(data.block.children, e.textContent - 1);
  }
};

const handleNext = () => {
  const data = dataElements();
  const small = document.getElementById(`${data.large.id - 1}`);
  if (data.large.id - 1 != 0 && !active) {
    active = true;
    data.block.animate([
      {
        left: `${data.positionBlock + "px"}`,
      },
      {
        left: `${data.positionBlock + 363 + "px"}`,
      }
    ], dataAnimate);

    data.large.animate([{
      width: "696px",
    }, {
      width: "333px",
    }], dataAnimate);

    small.animate([
      {
        width: "333px",
      },
      {
        width: "696px",
      }], dataAnimate);

    data.large.className = "small_block";

    Promise.all(
      data.large.getAnimations({subtree: true}).map(animation => animation.finished),
    ).then(() => {
      small.className = "large_block";
      activePage(small.id);
      active = false;
    });
  }
};

const handlePrev = () => {
  const data = dataElements();
  const small = document.getElementById(`${data.large.id * 1 + 1}`);
  if (data.block.children.length > data.large.id && !active) {
    active = true;
    data.block.animate([
      {
        left: `${data.positionBlock + "px"}`,
      },
      {
        left: `${data.positionBlock - 363 + "px"}`,
      }
    ], dataAnimate);

    data.large.animate([{
      width: "696px",
    }, {
      width: "333px",
    }], dataAnimate);

    small.animate([
      {
        width: "333px",
      },
      {
        width: "696px",
      }], dataAnimate);

    data.large.className = "small_block";

    Promise.all(
      data.large.getAnimations({subtree: true}).map(animation => animation.finished),
    ).then(() => {
      small.className = "large_block";
      activePage(small.id);
      active = false;
    });
  }
};

const dataElements = () => {
  const block = document.getElementsByClassName("slider-object")[0];
  const large = document.getElementsByClassName("large_block")[0];
  const positionBlock = parseInt(block.getBoundingClientRect().left);
  const wrapper = document.getElementsByClassName("slider")[0];
  const blockLeft = positionBlock - parseInt(wrapper.getBoundingClientRect().left);
  const paddingLeft = parseInt(document.getElementsByClassName("slider-content")[0].getBoundingClientRect().left);
  return {
    block,
    positionBlock,
    large,
    blockLeft,
    paddingLeft
  };
};

const activePage = (itemId) => {
  const pages = document.getElementsByClassName("page");
  for (const page of pages) {
    if (page.textContent === itemId) {
      page.classList.add("page_active");
    } else {
      page.className = "page";
    }
  }
};

for (let el of document.querySelectorAll("div[data-slider]")) {
  let cardBlock = el;
  let x = 0;
  const gap = parseInt(getComputedStyle(cardBlock).getPropertyValue("gap"));
  const cardWidth = cardBlock.children[0].getBoundingClientRect().width;
  const cardPos = cardBlock.getBoundingClientRect().left
  let start = 0;
  let mouseValue = 0;
  const slider = document.querySelectorAll("div[data-slider]")[0];
  const mouseUpdate = (e) => {
    return e.clientX;
  };

  cardBlock.addEventListener("touchstart", (event) => {
    cardBlock.style.transition = "0s";
    if (cardBlock.style.left) {
      x = parseInt(cardBlock.style.left);
    }
    mouseValue = mouseUpdate(event.touches[0]);
    start = x - mouseValue;
  });

  cardBlock.addEventListener("touchmove", (event) => {
    cardBlock.style.left = start + mouseUpdate(event.touches[0]) + "px";
  });

  cardBlock.addEventListener("touchend", (event) => {
    if (mouseValue + 100 < mouseUpdate(event.changedTouches[0])) {
      if (x) {
        showBlock(cardBlock.children, Math.round(-((x + (cardWidth + gap)) / (cardWidth + gap))));
        cardBlock.style.left = x + (cardWidth + gap) + "px";
      } else {
        cardBlock.style.left = x + "px";
      }
    } else if (mouseValue - 100 > mouseUpdate(event.changedTouches[0])) {
      if (-x < (cardBlock.children.length - 1) * (cardWidth + gap)) {
        showBlock(cardBlock.children, Math.round(-((x - (cardWidth + gap)) / (cardWidth + gap))));
        cardBlock.style.left = x - (cardWidth + gap) + "px";
      } else {
        cardBlock.style.left = x + "px";
      }
    } else {
      cardBlock.style.left = x + "px";
    }
    cardBlock.style.transition = "1s";
    if (event.currentTarget.className === "slider-object") {
      activePage((Math.abs(Math.round(parseInt(cardBlock.style.left) / cardWidth)) + 1).toString());
    }
  });

}

const showBlock = (block, index) => {
  for (const children of block) {
    if (children === block[index]) {
      for (const child of children.children) {
        child.style.opacity = 1;
      }
    } else {
      for (const child of children.children) {
        if (child.tagName !== "DIV")
          child.style.opacity = 0;
      }
    }
  }
};