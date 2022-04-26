let allPokemon = [];
let arrayNamePokemonJson = [];
let arrayImmagini = [];
let eventTarget = null;
let inputdiRicerca = document.querySelector("#input");
let match = null
const userList = window.localStorage.getItem('ciao');
const idUrl = window.location.search.slice(1);
const divLeft = document.querySelector("#col-left");
const div1 = document.querySelector("#div1");
const div2 = document.querySelector("#div2");
const jsonapi = document.querySelector("#jsonapi");
const canc = document.querySelectorAll("#cancel");

function firmacontratto() {
  window.location.replace("/src/pages/canvas.html");
}

// VERIFICACHIAVEURL
if (!userList.includes(idUrl)) window.location.replace('/src/index.html')
// VERIFICACHIAVEURL

// FUNZIONERICERCA
inputdiRicerca.addEventListener("keyup", function (e) {

  setTimeout(() => {

    deleter();
    match = e.target.value;
    getAllpokemon(match);

  }, "1500")

});


// FUNZIONERICERCA

//DRAG AND DROP
function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.id);
  eventTarget = ev.target;
}

document.addEventListener("dragenter", function (event) {
  if (event.target.id == "div2") {
    const eventObj = event.target
    // eventObj.style.border = "3px dotted red";
    eventObj.style = "background-image:url('../../img/pokemonlogo.png' );"
  }
});
document.addEventListener("dragleave", function (event) {
  if (event.target.id == "div2") {
    const eventObj = event.target
    // eventObj.style.border = "1px solid grey";
    eventObj.style.backgroundImage = ""

  }
});

function drop(ev) {
  ev.preventDefault();
  var data = ev.dataTransfer.getData("text");
  ev.target.appendChild(document.getElementById(data));
  if (ev.target.id == 'div2') {
    console.log(ev.target)
    cancelButton(eventTarget)
  }
  chiamatasingle(eventTarget);
}
//DRAG AND DROP

// CANCELLA FILTRO RICERCA
function deleter() {
  // foto
  const immaginipoke = document.querySelectorAll("#immaginipokem");
  var arraypokemonImmagini = Array.prototype.slice.call(immaginipoke);
  arraypokemonImmagini.map((immagine) => {
    immagine.remove();
    console.log(immagine);
  });
  // elemento foto
  const singleElement = document.querySelectorAll(".immagini1");
  var elementoScheda = Array.prototype.slice.call(singleElement);
  elementoScheda.map((scheda) => {
    scheda.remove();
  });
}
// CANCELLA FILTRO RICERCA

// STAMPA ELEMENTO CONTENITORE POKEMON SCHEDA
const getAllpokemon = async (match) => {
  try {
    const data = await axios.get("https://pokeapi.co/api/v2/pokemon");

    let dati = data.data.results;
    const filteredArray = dati.filter((pokemon) =>
      pokemon.name.includes(match)
    );
    designcontainer(filteredArray)

  } catch (error) {
    console.error(error);
  }
};

function designcontainer(filteredArray) {
  filteredArray.map((pokemon, idx) => {
    getUser(pokemon.name);

    // contenitoremadredeipokemonElementopricipale
    const elementoContenitoreImmagini = document.createElement("div");
    elementoContenitoreImmagini.id = "div1[" + idx + "]"
    elementoContenitoreImmagini.addEventListener('dragover', function (ev) {
      ev.preventDefault();
    }, false)
    elementoContenitoreImmagini.classList.add("styleContenitoreImmagini");
    elementoContenitoreImmagini.classList.add("immagini1");
    elementoContenitoreImmagini.style = 'background-image:url(' + '../../img/' + pokemon.name + '.png' + ');'
    // contenitoremadredeipokemonElementopricipale

    // elementoDraggabileNOMEeIMMAGINE
    const elementoDraggabileNomeEImmagine = document.createElement("div");
    elementoDraggabileNomeEImmagine.id = "drag1[" + idx + "]"
    elementoDraggabileNomeEImmagine.draggable = "true"
    elementoDraggabileNomeEImmagine.addEventListener('dragstart', function (ev) {
      ev.dataTransfer.setData("text", ev.target.id);
      eventTarget = ev.target;
    }, false)
    elementoDraggabileNomeEImmagine.classList.add("immagini");
    elementoContenitoreImmagini.appendChild(elementoDraggabileNomeEImmagine);
    // elementoDraggabileNOMEeIMMAGINE

    // elementoDraggabileNOMEparagrafo
    const elementoDraggabileNome = document.createElement("p");
    elementoDraggabileNome.classList.add("elementoDraggabileNOMEparagrafo");
    elementoDraggabileNome.innerHTML = pokemon.name.toUpperCase()
    elementoDraggabileNomeEImmagine.appendChild(elementoDraggabileNome);
    // elementoDraggabileNOMEparagrafo
    div1.appendChild(elementoContenitoreImmagini);

    let url = pokemon.url;
    allPokemon.push(url);


  });
}


// STAMPA ELEMENTO CONTENITORE POKEMON SCHEDA

function chiamatasingle(evt) {
  let idContenitoriPokemon = evt.id;
  if (evt.id.length == 8) {
    idContenitoriPokemon = evt.id.slice(-2, -1);
  } else if (evt.id.length == 9) {
    idContenitoriPokemon = evt.id.slice(-3, -1);
  } else if (evt.id.length == 10) {
    idContenitoriPokemon = evt.id.slice(-4, -1);
  }
  deletecancel(canc);
  axioscall(idContenitoriPokemon);
}
// CHIAMATA APIAPIAPIAPIAPIAPIAPIAPIAPIAPIAPIAPI
async function axioscall(i) {
  const poke1 = await axios.get(allPokemon[i]);
  let one = poke1.data.moves;
  one.map((x) => {
    const listaNomiPokemon = document.createElement("p");
    listaNomiPokemon.id = "cancel";
    listaNomiPokemon.innerHTML = x.move.name;
    arrayNamePokemonJson.push(x.move.name)
    window.sessionStorage.setItem("allPokemon", JSON.stringify(arrayNamePokemonJson));
    jsonapi.appendChild(listaNomiPokemon);

  });
}

// apiimapixabay
async function getUser(name) {
  try {
    const response = await axios.get(
      "https://pixabay.com/api/?key=26732894-7ab7a716c214b455a08379fe1&q=" +
      name +
      "&image_type=photo&per_page=200"
    );
    const apiImage = response.data.hits;
    apiImage.map((x) => {
      const image = document.createElement("img");
      image.style.width = "100px";
      image.id = "immaginipokem";
      image.src = x.largeImageURL;
    });
  } catch (error) {
    console.error(error);
  }
}
// CHIAMATA APIAPIAPIAPIAPIAPIAPIAPIAPIAPIAPIAPI

//DELETE ELEMENT AFTER DROP
function cancelButton(element) {
  const buttonix = document.createElement("div");
  buttonix.classList.add("buttondelete");
  buttonix.innerHTML = 'x'
  buttonix.addEventListener('click', function () {
    const canc = document.querySelectorAll("#cancel");
    deleter();
    deletecancel(canc)
    element.remove();
    getAllpokemon(match);
    // div2.style.border = "1px solid grey";
    div2.style.backgroundImage = ""
  })
  div2.appendChild(buttonix);
}

function deletecancel(canc) {
  var btnsArr = Array.prototype.slice.call(canc);
  btnsArr.map((x) => {
    x.remove();
  });
}
//DELETE ELEMENT AFTER DROP

