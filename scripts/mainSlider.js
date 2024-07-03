const dataAnimate = {
  duration: 800,
  fill: "both",
  delay: "100",
  easing: "ease-out"
};

const handleClick = (e) => {
  const children = e.parentElement.children;
  const data = dataElements();
  if (e.textContent != data.large.id) {
    for (const page of children) {
      page.className = "page";
    }
    e.className = "page page_active";
    data.block.animate([
      {left: `${data.positionBlock}px`},
      {left: `${-(e.textContent - 1) * 363}px`}
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

    Promise.all(
      data.large.getAnimations({subtree: true}).map(animation => animation.finished),
    ).then(() => {
      data.large.className = "small_block";
    });

    Promise.all(
      small.getAnimations({subtree: true}).map(animation => animation.finished),
    ).then(() => {
      small.className = "large_block";
    });
  }
};


const handleNext = () => {
  const data = dataElements();
  const small = document.getElementById(`${data.large.id - 1}`);
  if (data.large.id - 1 != 0) {
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

    Promise.all(
      data.large.getAnimations({subtree: true}).map(animation => animation.finished),
    ).then(() => {
      data.large.className = "small_block";
      small.className = "large_block";
      activePage(small.id);
    });
  }
};

const handlePrev = () => {
  const data = dataElements();
  const small = document.getElementById(`${data.large.id * 1 + 1}`);
  if (data.block.children.length > data.large.id) {

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

    Promise.all(
      data.large.getAnimations({subtree: true}).map(animation => animation.finished),
    ).then(() => {
      data.large.className = "small_block";
      small.className = "large_block";

      activePage(small.id);
    });
  }
};

const dataElements = () => {
  const block = document.getElementsByClassName("slider-object")[0];
  const large = document.getElementsByClassName("large_block")[0];
  const positionBlock = parseInt(block.getBoundingClientRect().left) - 190;
  return {
    block: block,
    positionBlock: positionBlock,
    large: large,
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