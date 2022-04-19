const mail = [
  {
    mail: "ufficiopmaddesso.procura.milano@giustizia.it",
    password: "password",
  },
  {
    mail: "ufficiopmalbertini.procura.milano@giustizia.it",
    password: "password",
  },
  { mail: "ufficiopmamadeo.procura.milano@giustizia.it", password: "password" },
  {
    mail: "ufficiopmammendola.procura.milano@giustizia.it",
    password: "password",
  },
  {
    mail: "ufficiopmarduini.procura.milano@giustizia.it",
    password: "password",
  },
  {
    mail: "ufficiopmascione.procura.milano@giustizia.it",
    password: "password",
  },
  {
    mail: "ufficiopmbaimabollone.procura.milano@giustizia.it",
    password: "password",
  },
  {
    mail: "ufficiopmbajmacario.procura.milano@giustizia.it",
    password: "password",
  },
  {
    mail: "ufficiopmbarilli.procura.milano@giustizia.it",
    password: "password",
  },
  {
    mail: "ufficiopmbartolucci.procura.milano@giustizia.it",
    password: "password",
  },
  {
    mail: "ufficiopmbiondolillo.procura.milano@giustizia.it",
    password: "password",
  },
  { mail: "ufficiopmblasco.procura.milano@giustizia.it", password: "password" },
  {
    mail: "ufficiopmbonardi.procura.milano@giustizia.it",
    password: "password",
  },
  {
    mail: "ufficiopmbordieri.procura.milano@giustizia.it",
    password: "password",
  },
  { mail: "ufficiopmcajani.procura.milano@giustizia.it", password: "password" },
  {
    mail: "ufficiopmcalanducci.procura.milano@giustizia.it",
    password: "password",
  },
  {
    mail: "ufficiopmcardellicchio.procura.milano@giustizia.it",
    password: "password",
  },
  {
    mail: "ufficiopmcarrara.procura.milano@giustizia.it",
    password: "password",
  },
  {
    mail: "ufficiopmcavalleri.procura.milano@giustizia.it",
    password: "password",
  },
  { mail: "ufficiopmcelle.procura.milano@giustizia.it", password: "password" },
  {
    mail: "ufficiopmcerreti.procura.milano@giustizia.it",
    password: "password",
  },
  {
    mail: "ufficiopmcivardi.procura.milano@giustizia.it",
    password: "password",
  },
  {
    mail: "ufficiopmclerici.procura.milano@giustizia.it",
    password: "password",
  },
  {
    mail: "ufficiopmcolacicco.procura.milano@giustizia.it",
    password: "password",
  },
  {
    mail: "ufficiopmcolangelo.procura.milano@giustizia.it",
    password: "password",
  },
  {
    mail: "ufficiopmcristillo.procura.milano@giustizia.it",
    password: "password",
  },
  { mail: "ufficiopmcrupi.procura.milano@giustizia.it", password: "password" },
  {
    mail: "ufficiopmdeiorio.procura.milano@giustizia.it",
    password: "password",
  },
  {
    mail: "ufficiopmdepasquale.procura.milano@giustizia.it",
    password: "password",
  },
  {
    mail: "ufficiopmdetommasi.procura.milano@giustizia.it",
    password: "password",
  },
  {
    mail: "ufficiopmdimarco.procura.milano@giustizia.it",
    password: "password",
  },
  { mail: "ufficiopmdolci.procura.milano@giustizia.it", password: "password" },
  {
    mail: "ufficiopmferraiuolo.procura.milano@giustizia.it",
    password: "password",
  },
  {
    mail: "ufficiopmfilippini.procura.milano@giustizia.it",
    password: "password",
  },
  {
    mail: "ufficiopmfontana.procura.milano@giustizia.it",
    password: "password",
  },
  {
    mail: "ufficiopmfraioli.procura.milano@giustizia.it",
    password: "password",
  },
  { mail: "ufficiopmfusco.procura.milano@giustizia.it", password: "password" },
  { mail: "ufficiopmgaglio.procura.milano@giustizia.it", password: "password" },
  {
    mail: "ufficiopmgentilini.procura.milano@giustizia.it",
    password: "password",
  },
  { mail: "ufficiopmgobbis.procura.milano@giustizia.it", password: "password" },
  {
    mail: "ufficiopmguareschi.procura.milano@giustizia.it",
    password: "password",
  },
  {
    mail: "ufficiopmincardona.procura.milano@giustizia.it",
    password: "password",
  },
  { mail: "ufficiopmlesti.procura.milano@giustizia.it", password: "password" },
  { mail: "ufficiopmluzi.procura.milano@giustizia.it", password: "password" },
  {
    mail: "ufficiopmmannella.procura.milano@giustizia.it",
    password: "password",
  },
  {
    mail: "ufficiopmmenegazzo.procura.milano@giustizia.it",
    password: "password",
  },
  { mail: "ufficiopmmilli.procura.milano@giustizia.it", password: "password" },
  {
    mail: "ufficiopmmocciaro.procura.milano@giustizia.it",
    password: "password",
  },
  {
    mail: "ufficiopmmondovi.procura.milano@giustizia.it",
    password: "password",
  },
  { mail: "ufficiopmnobili.procura.milano@giustizia.it", password: "password" },
];

let boolmail = false;
let boolpass = false;

function Ricerca() {
  // mail
  let inputMail = document.querySelector("#mail");
  let matchMail = inputMail.value;
  console.log(matchMail);

  // password
  let inputPassword = document.querySelector("#password");
  let matchPassword = inputPassword.value;
  console.log(matchPassword);

  if (matchMail && matchPassword) {
    Filtro(matchMail, matchPassword);
  } else {
    document.getElementById('error').innerHTML = '<h2 style="background: -webkit-linear-gradient(#D91CF0, #ED684C);-webkit-background-clip: text;-webkit-text-fill-color: transparent;">COMPILA TUTTI I CAMPI,GRAZIE</h2>'
  }

}

function Filtro(matchMail, matchPassword) {
  filterMailPassword = mail.filter(
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
    console.log("nope");
  }
}
