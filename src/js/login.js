const usersList = [
  {
    mail: "taher@sysdata.it",
    password: "password",
    id: "01Axsert",
  },
  {
    mail: "andrea@sysdata.it",
    password: "password",
    id: "4Ecfg35",
  },
  {
    mail: "alberto@sysdata.it",
    password: "password",
    id: "Ait75!ssD",
  },
];

const errorBorder = "error-border";
const messageError = document.createElement("h4");
const boxUsername = "box-username";
const boxPassword = "box-password";


function submitForm(event) {
  event.preventDefault();

  const username = document.getElementById("user").value;
  const password = document.getElementById("psw").value;
  const errorDiv = document.querySelector("#error");

  //check the errorDiv element and see if it has a children at position 0
  //it is used to avoid appending another element to errorDiv
  if (errorDiv.children[0]) {
    errorDiv.removeChild(errorDiv.children[0]);
  }
  messageError.classList.add("color-error");
  messageError.innerText = "";
  errorDiv.appendChild(messageError);
  //check username and password
  checkUsernameAndPassword(username, password);
}

function checkUsernameAndPassword(username, password) {
  if (validateUsername(username) === null) {
    if (password === "") {
      messageError.innerText = "Username and password are invalid";
      addErrorClass("both");
    } else {
      messageError.innerText = "Username is invalid";
      addErrorClass(boxUsername);
    }
  } else if (password === "") {
    messageError.innerText = "Password is invalid";
    addErrorClass(boxPassword);
  } else {
    login(username, password);
  }
}

function validateUsername(username) {
  //check username with Regex
  return String(username)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
}

function login(username, password) {
  usersList.forEach((user) => {
    if (user.mail.match(username) && user.password.match(password)) {
      messageError.remove();
      // const userIds = usersList.map((user) => user.id);
      window.sessionStorage.setItem("userIds", JSON.stringify(user.id));

      window.location.replace("/src/pages/dashboard.html?" + user.id);
    } else {
      messageError.innerText = "Username or Password is invalid";
    }
  });
}

function removeErrorClass(boxId, errorClass) {
  document.getElementById(boxId).classList.remove(errorClass);
}

function addErrorClass(target) {
  if (target === "both") {
    document.getElementById(boxUsername).classList.add(errorBorder);
    document.getElementById(boxPassword).classList.add(errorBorder);
  } else {
    document.getElementById(target).classList.add(errorBorder);
  }
}
