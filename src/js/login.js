const usersList = [
  {
    mail: "taher@sysdata.com",
    password: "password",
  },
  {
    mail: "andrea@sydata.com",
    password: "password",
  },
  {
    mail: "alberto@sysdata.com",
    password: "password",
  },
];

function validateEmail(email) {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
}

function checkLogin(event) {
  changeTemplate("password", "password", "password-error");
  changeTemplate("mail", "email", "email-error");
  document.getElementById("error").innerHTML = "<h2></h2>";

  event.preventDefault();
  let email = document.querySelector("#mail").value;
  let password = document.querySelector("#password").value;

  if (validateEmail(email) === null) {
    if (password === "") {
      changeTemplate("password", "password-error", "password");
      changeTemplate("mail", "email-error", "email");
      document.getElementById("error").innerHTML =
        "<h2 class='h2-error'>Email or Password is invalid</h2>";
    } else {
      changeTemplate("mail", "email-error", "email");
      document.getElementById("error").innerHTML =
        "<h2 class='h2-error'>Email is invalid</h2>";
    }
  } else if (password === "") {
    changeTemplate("password", "password-error", "password");
    document.getElementById("error").innerHTML =
      "<h2 class='h2-error'> Password is invalid</h2>";
  } else {
    controlEmailAndPassword(email, password);
  }

  // if (matchMail && matchPassword) {
  //   Filtro(matchMail, matchPassword);
  // } else {
  //   document.getElementById('error').innerHTML = '<h2 style="background: -webkit-linear-gradient(#D91CF0, #ED684C);-webkit-background-clip: text;-webkit-text-fill-color: transparent;">COMPILA TUTTI I CAMPI,GRAZIE</h2>'
  // }
}

function controlEmailAndPassword(matchMail, matchPassword) {
  filterMailPassword = usersList.filter(
    (data) =>
      data.mail.toLowerCase().includes(matchMail) &&
      data.password.toLowerCase().includes(matchPassword)
  );
  console.log(filterMailPassword);
  if (filterMailPassword.length == 1) {
    filterMailPassword.map((x) => {
      if (x.mail === matchMail && x.password === matchPassword) {
        console.log("yes");
        window.location.replace("/src/pages/dashboard.html");
      } else {
        console.log("no");
      }
    });
  } else {
    changeTemplate("password", "password-error", "password");
    changeTemplate("mail", "email-error", "email");
    document.getElementById("error").innerHTML =
      "<h2 class='h2-error'>Email or Password is invalid</h2>";
  }
}

function changeTemplate(id, newClass, oldClass) {
  document.getElementById(id).classList.add(newClass);
  document.getElementById(id).classList.remove(oldClass);
}
