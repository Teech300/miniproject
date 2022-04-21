const usersList = [
  {
    mail: "taher@sysdata.it",
    password: "password",
    id: '01Axsert'
  },
  {
    mail: "andrea@sydata.it",
    password: "password",
    id: '4Ecfg35'
  },
  {
    mail: "alberto@sysdata.it",
    password: "password",
    id: 'Ait75!ssD'
  },
];
let khiave = []
usersList.map((x) => {
  khiave.push(x.id.slice(0))
})
window.localStorage.setItem('ciao', khiave);

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
      addErrorTemplate(3);
    } else {
      h4.innerText = "Email is invalid";
      addErrorTemplate(1);
    }
  } else if (password === "") {
    h4.innerText = "Password is invalid";
    addErrorTemplate(2);
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
