const allPokemon = [];
function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.id);
  chiamatasingle(ev.target)
}

function drop(ev) {
  ev.preventDefault();
  var data = ev.dataTransfer.getData("text");
  ev.target.appendChild(document.getElementById(data));
}

const divLeft = document.querySelector("#col-left");
const div1 = document.querySelector('#div1')
const div2 = document.querySelector("#div2");
const getAllpokemon = async () => {
  try {
    const data = await axios.get("https://pokeapi.co/api/v2/pokemon");
    data.data.results.map((x, i) => {
      let url = x.url
      allPokemon.push(url)
      const list1 = document.createElement("div");
      list1.innerHTML =
        '<div id="div1[' + i + ']" ondrop="drop(event)" ondragover="allowDrop(event)" style="border:1px solid grey;width:500px;height:50px;display:flex;justify-content:center;align-items:center;margin:2px;">' + '<p draggable="true" ondragstart="drag(event)" id="drag1[' + i + ']" class="immagini">' + x.name + "</p>" + "</div>";
      div1.appendChild(list1);



    });
  } catch (error) {
    console.error(error);
  }
};

function chiamatasingle(evt) {
  const i = evt.id.slice(-2, -1)
  const canc = document.querySelectorAll("#cancel");
  deletecancel(canc)
  AxyCall(i)

}


const jsonapi = document.querySelector("#jsonapi");
async function AxyCall(i) {
  const poke1 = await axios.get(allPokemon[i]);
  let one = poke1.data.moves;
  one.map((x) => {
    const list11 = document.createElement("div");
    list11.id = 'cancel'
    list11.innerHTML = x.move.name
    jsonapi.appendChild(list11);
  })

}


function deletecancel(canc) {
  var btnsArr = Array.prototype.slice.call(canc);
  btnsArr.map((x) => {
    x.remove()

  })

}
getAllpokemon();
