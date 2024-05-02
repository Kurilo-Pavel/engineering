const Login = {
  minSymbols: 3,
  maxSymbols: 50,
  regex: function () {
    return new RegExp("^[ a-z0-9а-я]{" +
      this.minSymbols + "," + this.maxSymbols + "}$", "i");
  }
};

const Email = {
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
  message: ""
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
    e.style.borderColor = "red";
    data.name = "";
  } else {
    e.style.borderColor = "black";
    e.nextElementSibling.innerText = "";
    data.name = e.value;
  }
};

const handleEmail = (e) => {
  if (checkValue(e.value, Email.regex()).error) {
    e.nextElementSibling.innerText = checkValue(e.value, Login.regex()).error;
    e.style.borderColor = "red";
    data.email = "";
  } else {
    e.style.borderColor = "black";
    e.nextElementSibling.innerText = "";
    data.email = e.value;
  }
};

const handlePhone = (e) => {
  data.phone = e.value;
};

const handleMessage = (e) => {
  if (checkValue(e.value, Message.regex()).error) {
    e.nextElementSibling.innerText = checkValue(e.value, Login.regex()).error;
    e.style.borderColor = "red";
    data.message = "";
  } else {
    e.style.borderColor = "black";
    e.nextElementSibling.innerText = "";
    data.message = e.value;
  }
};

const handleSend = (e) => {
  console.log(data)
}