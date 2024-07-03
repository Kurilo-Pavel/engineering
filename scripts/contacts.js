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
  name: "",
  email: "",
  message: "",
  file: "",
  topic: ""
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

const handlePhone = (e) => {
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
    window.removeEventListener("scroll", closeDrop);
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
  } else {
    window.addEventListener("scroll", closeDrop, {passive: true});
  }
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

const handleSend = (e) => {
  Email.send({
    SecureToken : "90773d8e-ef06-44b7-85f5-65016dd76647",
    To : "kurilo.pavel@mail.ru",
    From : "kurilo.pavel@mail.ru",
    Subject : "This is the",
    Body : "And this is the body"
  }).then(
    message => console.log(message)
  );
    console.log(data)
    console.log(errors)
  };
