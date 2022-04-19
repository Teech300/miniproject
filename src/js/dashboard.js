const mail = [];

async function AxyCall() {
  const poke1 = await axios.get("https://pokeapi.co/api/v2/pokemon/1");
  console.log(poke1);
  let one = poke1.data.moves;

  resel(one);
}

function ChangeImpostazioni(elem) {
  let img = elem;
  // img.style.width = '200px'
}

function resel(poke1) {
  poke1.map((x) => {
    let name = x.move.name;
    let url = x.move.url;
    mail.push({ name, url });
    CreateTabledd();
  });
}

// function allowDrop(ev) {
//   ev.preventDefault();

//   // ev.target.style.border = "1px solid red";
// }

// function drag(ev) {
//   ev.dataTransfer.setData("text", ev.target.id);
//   const element = ev.target

// }

// function drop(ev) {
//   ev.preventDefault();
//   var data = ev.dataTransfer.getData("text");

//   ev.target.appendChild(document.getElementById(data));

// }
function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
  // const y = ev.target
  // y.remove()
  ev.preventDefault();
  var data = ev.dataTransfer.getData("text");
  console.log(ev.target);
  ev.target.appendChild(document.getElementById(data));
}
const dragTable = document.querySelector("#scoreboard");
// const dragTablea = document.querySelector('#scoreboarda')
const dragTableab = document.querySelector("#scoreboardb");
function CreateTabledd() {
  mail.map((x, i) => {
    const list1 = document.createElement("div");
    list1.innerHTML =
      '<div id="div1[' +
      i +
      ']" ondrop="drop(event)" ondragover="allowDrop(event)" style="border:1px solid grey;width:500px;height:50px;display:flex;justify-content:center;align-items:center;margin:2px;">' +
      '<p draggable="true" ondragstart="drag(event)" id="drag1[' +
      i +
      ']" class="immagini">' +
      x.name +
      "-" +
      x.url +
      "</p>" +
      "</div>";
    dragTable.appendChild(list1);

    // // const maillist = document.createElement('div')
    // // maillist.innerHTML = '<div id="div1" ondrop="drop(event)" ondragover="allowDrop(event)" style="border:1px solid grey;width:300px;height:50px;">' + '<p draggable="true" ondragstart="drag(event)" id="drag1[' + i + ']" class="immagini" onclick="ChangeImpostazioni(elem)">' + x.url + '</p>' + '</div>'
    // // dragTablea.appendChild(maillist)

    const maillista = document.createElement("div");
    maillista.innerHTML =
      '<div id="div2[' +
      i +
      ']" ondrop="drop(event)" ondragover="allowDrop(event)" style="border:1px solid grey;width:500px;height:50px;display:flex;justify-content:center;align-items:center;margin:2px;"></div>';
    dragTableab.appendChild(maillista);
  });
}
console.log(mail);
// AxyCall();

const allPokemon = [];
const divLeft = document.querySelector("#col-left");

const getAllpokemon = async () => {
  try {
    const data = await axios.get("https://pokeapi.co/api/v2/pokemon");
    // const data = await fetchData.json();
    data.data.results.map((element, index) => {
      let paragraphElement = document.createElement("p");
      paragraphElement.id = index;
      paragraphElement.innerText = element.name;
      paragraphElement.style.backgroundColor = "#fffbf7";
      paragraphElement.style.border = "1px solid #ffb773";
      paragraphElement.style.borderRadius = "2px";
      paragraphElement.style.margin = "5px 0px";
      paragraphElement.style.display = "block";
      paragraphElement.style.textAlign = "center";

      divLeft.appendChild(paragraphElement);
    });
  } catch (error) {
    console.error(error);
  }
};

getAllpokemon();
