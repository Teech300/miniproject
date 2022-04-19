// const mail = [];

// async function AxyCall() {
//   const poke1 = await axios.get("https://pokeapi.co/api/v2/pokemon/1");
//   console.log(poke1);
//   let one = poke1.data.moves;

//   resel(one);
// }

// function ChangeImpostazioni(elem) {
//   let img = elem;
//   // img.style.width = '200px'
// }

// function resel(poke1) {
//   poke1.map((x) => {
//     let name = x.move.name;
//     let url = x.move.url;
//     mail.push({ name, url });
//     CreateTabledd();
//   });
// }

// // function allowDrop(ev) {
// //   ev.preventDefault();

// //   // ev.target.style.border = "1px solid red";
// // }

// // function drag(ev) {
// //   ev.dataTransfer.setData("text", ev.target.id);
// //   const element = ev.target

// // }

// // function drop(ev) {
// //   ev.preventDefault();
// //   var data = ev.dataTransfer.getData("text");

// //   ev.target.appendChild(document.getElementById(data));

// // }
// function allowDrop(ev) {
//   ev.preventDefault();
// }

// function drag(ev) {
//   ev.dataTransfer.setData("text", ev.target.id);
// }

// function drop(ev) {
//   // const y = ev.target
//   // y.remove()
//   ev.preventDefault();
//   var data = ev.dataTransfer.getData("text");
//   console.log(ev.target);
//   ev.target.appendChild(document.getElementById(data));
// }
// const dragTable = document.querySelector("#scoreboard");
// // const dragTablea = document.querySelector('#scoreboarda')
// const dragTableab = document.querySelector("#scoreboardb");
// function CreateTabledd() {
//   mail.map((x, i) => {
//     const list1 = document.createElement("div");
//     list1.innerHTML =
//       '<div id="div1[' +
//       i +
//       ']" ondrop="drop(event)" ondragover="allowDrop(event)" style="border:1px solid grey;width:500px;height:50px;display:flex;justify-content:center;align-items:center;margin:2px;">' +
//       '<p draggable="true" ondragstart="drag(event)" id="drag1[' +
//       i +
//       ']" class="immagini">' +
//       x.name +
//       "-" +
//       x.url +
//       "</p>" +
//       "</div>";
//     dragTable.appendChild(list1);

//     // // const maillist = document.createElement('div')
//     // // maillist.innerHTML = '<div id="div1" ondrop="drop(event)" ondragover="allowDrop(event)" style="border:1px solid grey;width:300px;height:50px;">' + '<p draggable="true" ondragstart="drag(event)" id="drag1[' + i + ']" class="immagini" onclick="ChangeImpostazioni(elem)">' + x.url + '</p>' + '</div>'
//     // // dragTablea.appendChild(maillist)

//     const maillista = document.createElement("div");
//     maillista.innerHTML =
//       '<div id="div2[' +
//       i +
//       ']" ondrop="drop(event)" ondragover="allowDrop(event)" style="border:1px solid grey;width:500px;height:50px;display:flex;justify-content:center;align-items:center;margin:2px;"></div>';
//     dragTableab.appendChild(maillista);
//   });
// }
// console.log(mail);
// // AxyCall();
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
    // const data = await fetchData.json();
    console.log(data.data.results)
    data.data.results.map((x, i) => {
      let url = x.url
      allPokemon.push(url)
      console.log(url)
      const list1 = document.createElement("div");
      list1.innerHTML =
        '<div id="div1[' +
        i +
        ']" ondrop="drop(event)" ondragover="allowDrop(event)" style="border:1px solid grey;width:500px;height:50px;display:flex;justify-content:center;align-items:center;margin:2px;">' +
        '<p draggable="true" ondragstart="drag(event)" id="drag1[' +
        i +
        ']" class="immagini">' +
        x.name +
        "</p>" +
        "</div>";
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
  // console.log(one);
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
    console.log(x)
  })
  // console.log(btnsArr)
  // canc.remove()
}
getAllpokemon();
