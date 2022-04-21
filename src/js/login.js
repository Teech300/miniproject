const usersList = [
  {
    mail: "taher@sysdata.it",
    password: "password",
  },
  {
    mail: "andrea@sydata.it",
    password: "password",
  },
  {
    mail: "alberto@sysdata.it",
    password: "password",
  },
];

function checkLogin(event) {
  event.preventDefault();

  let errorDiv = document.getElementById("error");
  let h4 = document.createElement("h4");

  let email = document.querySelector("#mail").value;
  let password = document.querySelector("#password").value;

  if (errorDiv.children[0]) {
    errorDiv.removeChild(errorDiv.children[0]);
  }

  h4.classList.add("h2-error");
  h4.innerText = "";
  errorDiv.appendChild(h4);

  if (validateEmail(email) === null) {
    if (password === "") {
      h4.innerText = "Email and Password are invalid";
      errorEmailPassword();
    } else {
      h4.innerText = "Email is invalid";
      changeTemplate("mail", "email-error", "email");
    }
  } else if (password === "") {
    h4.innerText = "Password is invalid";
    changeTemplate("password", "password-error", "password");
  } else {
    controlEmailAndPassword(email, password, h4);
  }
}

function validateEmail(email) {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
}

function controlEmailAndPassword(matchMail, matchPassword, errorText) {
  usersList.map((user) => {
    if (!(user.mail === matchMail && user.password === matchPassword)) {
      errorEmailPassword();
      errorText.innerText = "Email and/or Password is invalid";
    } else {
      window.location.replace("/src/pages/dashboard.html");
    }
  });
}

function changeTemplate(id, newClass, oldClass) {
  document.getElementById(id).classList.add(newClass);
  document.getElementById(id).classList.remove(oldClass);
}

function errorEmailPassword() {
  document.getElementById("mail").classList.add("email-error");
  document.getElementById("mail").classList.remove("email");

  document.getElementById("password").classList.add("password-error");
  document.getElementById("password").classList.remove("password");
}
