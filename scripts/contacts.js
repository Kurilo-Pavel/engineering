const Login = {
  minSymbols: 3,
  maxSymbols: 50,
  regex: function () {
    return new RegExp("^[ a-z0-9а-я]{" +
      this.minSymbols + "," + this.maxSymbols + "}$", "i");
  }
};

const EmailReg = {
  minLength: 3,
  maxLength: 256,
  regex: function () {
    return new RegExp("^(([^<>()[\\]\\\\.,;:\\s@\"]" +
      "+(\\.[^<>()[\\]\\\\.,;:\\s@\"]+)*)|(\".+\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}" +
      "\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$", "i");
  }
};

const Message = {
  minSymbols: 1,
  maxSymbols: 300,
  regex: function () {
    return new RegExp("^[\"\\[\\]\\s-:)(/=!#$%&'*+?^_`{|}~.,<>@A-Z0-9А-Я]{" +
      this.minSymbols + "," + this.maxSymbols + "}$", "i");
  }
};

let data = {
  name: "",
  email: "",
  message: "",
  phone: "",
  topic: ""
};

const errors = {
  name: "Заполните поле",
  email: "Заполните поле",
  message: "Заполните поле",
  file: "",
  topic: "Заполните поле"
};

const checkValue = (value, reg) => {
  if (!value.trim()) {
    return {error: "Заполните поле"};
  } else if (!reg.test(value.trim())) {
    return {error: "Недопустимое значение"};
  } else {
    return {};
  }
};

const handleName = (e) => {
  if (checkValue(e.value, Login.regex()).error) {
    e.nextElementSibling.innerText = checkValue(e.value, Login.regex()).error;
    errors.name = checkValue(e.value, Login.regex()).error;
    e.style.borderColor = "red";
    data.name = "";
  } else {
    e.style.borderColor = "black";
    e.nextElementSibling.innerText = "";
    data.name = e.value;
    errors.name = "";
  }
};

const handleEmail = (e) => {
  if (checkValue(e.value, EmailReg.regex()).error) {
    e.nextElementSibling.innerText = checkValue(e.value, Login.regex()).error;
    errors.email = checkValue(e.value, Login.regex()).error;
    e.style.borderColor = "red";
    data.email = "";
  } else {
    e.style.borderColor = "black";
    e.nextElementSibling.innerText = "";
    data.email = e.value;
    errors.email = "";
  }
};
const pushPhone = (el) => {
  if (el.value === "") {
    el.value = "+375";
    handleChange(el);
  }
};

const handlePhone = (e) => {
  let x = e.value.replace(/\D/g, '').match(/(\d{0,3})(\d{0,2})(\d{0,3})(\d{0,2})(\d{0,2})/);
  e.value = '+' + x[1] + '(' + x[2] + ') ' + x[3] + '-' + x[4] + '-' + x[5];
  data.phone = e.value;
};

const handleMessage = (e) => {
  if (checkValue(e.value, Message.regex()).error) {
    e.nextElementSibling.innerText = checkValue(e.value, Login.regex()).error;
    errors.message = checkValue(e.value, Login.regex()).error;
    e.style.borderColor = "red";
    data.message = "";
  } else {
    e.style.borderColor = "black";
    e.nextElementSibling.innerText = "";
    data.message = e.value;
    errors.message = "";
  }
};

const handleChange = (el) => {
  if (el.value != "") {
    el.previousElementSibling.dataset.value = "";
  } else {
    el.previousElementSibling.dataset.value = "empty";
  }
};

const handleDrop = (e) => {
  const children = e.children;
  const isActive = e.dataset.status === "open";
  console.log(isActive)
  let image, drop, value, error;

  for (child of children) {
    if (child.tagName === "IMG") {
      image = child;
    }
    if (child.tagName === "UL") {
      drop = child;
    }
    if (child.tagName === "P") {
      value = child;
    }
    if (child.tagName === "SPAN") {
      error = child;
    }
  }

  if (!isActive) {
    e.dataset.status = "open";
    image.style.transform = "rotate(180deg)";
    drop.classList.remove("select__drop_close");
    drop.classList.add("select__drop_open");
    // window.addEventListener("scroll", closeDrop, {passive: true});
  } else {
    image.style.transform = "rotate(0)";
    e.dataset.status = "close";
    drop.classList.remove("select__drop_open");
    drop.classList.add("select__drop_close");
  }
  if (value.dataset.value === "default" && e.dataset.status === "close") {
    value.style.borderColor = "red";
    errors.topic = "Заполните поле";
    error.innerText = "Заполните поле";
  } else {
    value.style.borderColor = "black";
    error.innerText = "";
    errors.topic = "";
  }
};

const handleCheck = (el) => {
  const value = document.getElementById("value");
  value.dataset.value = "check";
  value.innerText = el.innerText;
  data.topic = el.innerText;
};

const closeDrop = (e) => {
  const select = document.getElementsByClassName("select__value")[0];
  const drop = document.getElementsByClassName("select__drop")[0];
  const image = document.getElementsByClassName("select__arrow")[0];
  const error = document.getElementsByClassName("input-error")[0];
  if (e.target != select && drop.className.includes("open")) {
    console.log(drop.parentElement.dataset.status)
    drop.parentElement.dataset.status = "close";
    drop.classList.remove("select__drop_open");
    drop.classList.add("select__drop_close");
    image.style.transform = "rotate(0)";
    if (select.dataset.value === "default") {
      drop.nextElementSibling.innerText = "Заполните поле";
      select.style.borderColor = "red";
      errors.topic = "Заполните поле";
    }
  }
  // window.removeEventListener("scroll", closeDrop);
};
window.addEventListener("click", (event) => closeDrop(event), {passive: true});

const handleSelectFile = (el) => {
  let input, error;
  for (child of el.parentElement.children) {
    if (child.className.includes("file_placeholder")) {
      input = child;
    }
    if (child.tagName === "SPAN") {
      error = child;
    }
  }
  input.value = el.value;
  if (el.files[0].size > 1000000) {
    input.style.borderColor = "red";
    error.innerText = "Размер файла превышает допустимый";
    errors.file = "Размер файла превышает допустимый";

  } else {
    input.style.borderColor = "black";
    error.innerText = "";
    errors.file = "";
    data.file = el.files[0];
  }
};

const handleSend = async () => {
  if (!errors.name && !errors.email && !errors.topic && !errors.message) {
    const formData = new FormData();
    formData.append("name", data.name)
    formData.append("doc", data.file)
    const response = await fetch("https://general-server-zhp1.onrender.com/engineering/message", {
      method: "POST",
      body: formData
    });
    const result = await response.json();
    if (result.status === "success") {
      const modal = document.getElementsByClassName("modal")[0];
      modal.classList.add("open__modal");
    }
  } else {
    const errorsEl = document.getElementsByClassName("input-error");
    for (er of errorsEl) {
      const value = er.dataset.name;
      if (errors[value]) {
        er.textContent = errors[value];
        er.previousElementSibling.style.borderColor = "red";
      }
    }
  }
};
