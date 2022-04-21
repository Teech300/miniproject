const usersList = [
  {
    mail: "taher@sysdata.it",
    password: "password",
    id: "01Axsert",
  },
  {
    mail: "andrea@sydata.it",
    password: "password",
    id: "4Ecfg35",
  },
  {
    mail: "alberto@sysdata.it",
    password: "password",
    id: "Ait75!ssD",
  },
];
const userIds = usersList.map((user) => user.id);
window.sessionStorage.setItem("userIds", JSON.stringify(userIds));

function checkForm(event) {
  event.preventDefault();

  const email = document.querySelector("#mail").value;
  const password = document.querySelector("#password").value;

  const errorDiv = document.getElementById("error");
  const messageError = document.createElement("h4");

  //check the errorDiv element and see if it has a children at position 0
  if (errorDiv.children[0]) {
    errorDiv.removeChild(errorDiv.children[0]);
  }

  messageError.classList.add("h4-error");
  messageError.innerText = "";
  errorDiv.appendChild(messageError);

  if (validateEmail(email) === null) {
    if (password === "") {
      messageError.innerText = "Email and Password are invalid";
      addErrorTemplate(3);
    } else {
      messageError.innerText = "Email is invalid";
      addErrorTemplate(1);
    }
  } else if (password === "") {
    messageError.innerText = "Password is invalid";
    addErrorTemplate(2);
  } else {
    checkEmailAdnPassword(email, password, messageError);
  }
}

function validateEmail(email) {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
}

function checkEmailAdnPassword(matchMail, matchPassword, errorText) {
  usersList.forEach((user) => {
    if (user.mail.match(matchMail) && user.password.match(matchPassword)) {
      errorText.remove();
      window.location.replace("/src/pages/dashboard.html");
    } else {
      errorText.innerText = "Email or Password is invalid";
    }
  });
}

function removeErrorTemplate(id, removeClass) {
  document.getElementById(id).classList.remove(removeClass);
}

function addErrorTemplate(target) {
  if (target === 1) {
    document.getElementById("mail").classList.add("email-error");
  }

  if (target === 2) {
    document.getElementById("password").classList.add("password-error");
  }

  if (target === 3) {
    document.getElementById("password").classList.add("password-error");
    document.getElementById("mail").classList.add("email-error");
  }
}
