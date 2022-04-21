const allPokemon = [];
let arrayImmagini = [];
let eventTarget = null;
const userList = window.localStorage.getItem('ciao');
const idUrl = window.location.search.slice(1);

console.log(idUrl);

if (!userList.includes(idUrl)) window.location.replace('/src/index.html')

console.log(userList);

function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.id);
  eventTarget = ev.target;
}
// let arrayn = [
//   "div1[0]",
//   "div1[1]",
//   "div1[2]",
//   "div1[3]",
//   "div1[4]",
//   "div1[5]",
//   "div1[6]",
//   "div1[7]",
//   "div1[8]",
//   "div1[9]",
//   "div1[10]",
//   "div1[11]",
//   "div1[12]",
//   "div1[13]",
//   "div1[14]",
//   "div1[15]",
//   "div1[16]",
//   "div1[17]",
//   "div1[18]",
//   "div1[19]",
// ];
function drop(ev) {
  ev.preventDefault();
  var data = ev.dataTransfer.getData("text");
  ev.target.appendChild(document.getElementById(data));

  const canc = document.querySelectorAll("#cancel");

  if (arrayn.includes(ev.target.id)) {
    deletecancel(canc);
  } else {
    chiamatasingle(eventTarget);
  }
}
let inputdiRicerca = document.querySelector("#input");

inputdiRicerca.addEventListener("keyup", function (e) {
  deleter();

  let match = e.target.value;
  console.log(match);
  getAllpokemon(match);
});

const divLeft = document.querySelector("#col-left");
const div1 = document.querySelector("#div1");
const div2 = document.querySelector("#div2");

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

const getAllpokemon = async (match) => {
  try {
    const data = await axios.get("https://pokeapi.co/api/v2/pokemon");

    let dati = data.data.results;
    const filteredArray = dati.filter((pokemon) =>
      pokemon.name.includes(match)
    );

    filteredArray.map((pokemon, idx) => {
      getUser(pokemon.name);


      // contenitoremadredeipokemonElementopricipale
      const elementoContenitoreImmagini = document.createElement("div");
      elementoContenitoreImmagini.id = "div1[" + idx + "]"
      elementoContenitoreImmagini.addEventListener('drop', function (ev) {
        ev.preventDefault();
        var data = ev.dataTransfer.getData("text");
        ev.target.appendChild(document.getElementById(data));
        const canc = document.querySelectorAll("#cancel");
        if (arrayn.includes(ev.target.id)) {
          deletecancel(canc);
        } else {
          chiamatasingle(eventTarget);
        }
      }, false)
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
      elementoContenitoreImmagini.appendChild(elementoDraggabileNome);
      // elementoDraggabileNOMEparagrafo

      // const htmlelement =
      //   '<div id="div1[' + i + ']" ondrop="drop(event)" ondragover="allowDrop(event)" style="background-image:url(' + '../../img/' + x.name + '.png' + ');"  class="immagini1">' +
      //   '<div  draggable="true" ondragstart="drag(event)" id="drag1[' +
      //   i +
      //   ']" class="immagini">' +
      //   // `<img src="../../img/${x.name}.png" height="75px" width="75px" />` +
      //   "<br><p style='font-size:30px;color:#fff;text-shadow:1px 1px 1px black;'>" +
      //   x.name.toUpperCase() +
      //   "</p></div>" +
      //   "</div>";

      // CREAZIONECONTENITOREELEMENTODRAGGABILE
      // const contenitoreElementoDraggabile = document.createElement("div");
      // // contenitoreElementoDraggabile.style.width = "calc(50% - 0px)";
      // // contenitoreElementoDraggabile.innerHTML = elementoContenitoreImmagini;
      // div1.appendChild(contenitoreElementoDraggabile);
      // CREAZIONECONTENITOREELEMENTODRAGGABILE
      div1.appendChild(elementoContenitoreImmagini);

      let url = pokemon.url;
      allPokemon.push(url);

    });
  } catch (error) {
    console.error(error);
  }
};

function chiamatasingle(evt) {
  let i = evt.id;
  if (evt.id.length == 8) {
    i = evt.id.slice(-2, -1);
  } else if (evt.id.length == 9) {
    i = evt.id.slice(-3, -1);
  } else if (evt.id.length == 10) {
    i = evt.id.slice(-4, -1);
  }

  const canc = document.querySelectorAll("#cancel");
  deletecancel(canc);
  axioscall(i);
}

const jsonapi = document.querySelector("#jsonapi");

async function axioscall(i) {
  const poke1 = await axios.get(allPokemon[i]);
  let one = poke1.data.moves;
  one.map((x) => {
    const list11 = document.createElement("li");
    list11.id = "cancel";
    list11.innerHTML = i + x.move.name;
    jsonapi.appendChild(list11);
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
      // jsonapi.appendChild(image);
      // console.log(image)
    });
  } catch (error) {
    console.error(error);
  }
}

function deletecancel(canc) {
  var btnsArr = Array.prototype.slice.call(canc);
  btnsArr.map((x) => {
    x.remove();
  });
}


