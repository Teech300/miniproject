const allPokemon = [];
let arrayImmagini = [];
let eventTarget = null;
function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.id);
  eventTarget = ev.target;
}

function drop(ev) {
  ev.preventDefault();
  var data = ev.dataTransfer.getData("text");
  ev.target.appendChild(document.getElementById(data));
  chiamatasingle(eventTarget)
}
let inputdiRicerca = document.querySelector('#input')

inputdiRicerca.addEventListener("keyup", function (e) {
  deleter()
  let match = e.target.value
  console.log(match)
  getAllpokemon(match);

})

const divLeft = document.querySelector("#col-left");
const div1 = document.querySelector('#div1')
const div2 = document.querySelector("#div2");


function deleter() {
  // foto
  const singlemaps = document.querySelectorAll('.immagini1')
  var btsmaps = Array.prototype.slice.call(singlemaps);
  btsmaps.map((xx) => {
    xx.remove()
    console.log(xx)
  })
  // elemento foto
  const singleElement = document.querySelectorAll('#immaginipokem')
  var btnsArr = Array.prototype.slice.call(singleElement);
  btnsArr.map((x) => {
    x.remove()
  })

}

const getAllpokemon = async (match) => {
  try {
    const data = await axios.get("https://pokeapi.co/api/v2/pokemon");


    let dati = data.data.results

    const filteredArray = dati.filter((pokemon) => pokemon.name.includes(match));
    console.log(filteredArray)

    filteredArray.map((x, i) => {
      getUser(x.name)

      const htmlelement = '<div id="div1[' + i + ']" ondrop="drop(event)" ondragover="allowDrop(event)" style="border:1px solid grey;width:500px;height:100px;display:flex;justify-content:center;align-items:center;margin:2px;"  class="immagini1">' + '<p draggable="true" ondragstart="drag(event)" id="drag1[' + i + ']" class="immagini">' + i + ' - ' + x.name + "</p>" + "</div>";
      let url = x.url
      allPokemon.push(url)
      const list1 = document.createElement("div");
      list1.innerHTML = htmlelement

      div1.appendChild(list1);
    });
  } catch (error) {
    console.error(error);
  }
};

function chiamatasingle(evt) {
  let i = evt.id
  if (evt.id.length == 8) {
    i = evt.id.slice(-2, -1)
  } else if (evt.id.length == 9) {
    i = evt.id.slice(-3, -1)
  } else if (evt.id.length == 10) {
    i = evt.id.slice(-4, -1)
  }

  const canc = document.querySelectorAll("#cancel");
  deletecancel(canc)
  axioscall(i)
}


const jsonapi = document.querySelector("#jsonapi");

async function axioscall(i) {
  const poke1 = await axios.get(allPokemon[i]);
  let one = poke1.data.moves;
  one.map((x) => {
    const list11 = document.createElement("div");
    list11.id = 'cancel'
    list11.innerHTML = i + x.move.name
    jsonapi.appendChild(list11);
  })
}

// apiimapixabay
async function getUser(name) {

  try {
    const response = await axios.get('https://pixabay.com/api/?key=26732894-7ab7a716c214b455a08379fe1&q=' + name + '&image_type=photo&per_page=200');
    const apiImage = response.data.hits;
    apiImage.map((x) => {


      const image = document.createElement('img')
      image.style.width = '100px'
      image.id = 'immaginipokem'
      image.src = x.largeImageURL
      div1.appendChild(image);
      console.log(image)

    })
  } catch (error) {
    console.error(error);
  }

}

function deletecancel(canc) {
  var btnsArr = Array.prototype.slice.call(canc);
  btnsArr.map((x) => {
    x.remove()
  })
}
// getUser();

