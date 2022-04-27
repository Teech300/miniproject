const loader = document.getElementById("loader");
loader.classList.add("hidden");

const buttonSearch = document.getElementById("btn-search");

const containerDetails = document.getElementById("card-details");
const containerPokemon = document.getElementById("card-pokemon");

const description = document.getElementById("description");
description.classList.add("hidden");
description.classList.remove("flex");

const pokemonName = document.getElementById("pokemon-name");
const pokemonImg = document.getElementById("pokemon-img");
const pokemonAbilities = document.getElementById("pokemon-abilities");

let eventTarget = null;
let dragAndDropCounter = 0;
function firmacontratto() {
  window.location.replace("/src/pages/canvas.html");
}

const searchPokemon = async () => {
  buttonSearch.classList.add("hidden");
  let userInput = document.getElementById("userInput").value;

  resetAll();

  setTimeout(async () => {
    await getAllPokemon().then((response) => {
      let filteredArray = response.filter((pokemon) =>
        pokemon.name.includes(userInput)
      );

      filteredArray.forEach(async (pokemon) => {
        let pokemonDetails = await axios.get(pokemon.url);
        let listOfAbilities = pokemonDetails.data.abilities.map(
          (details) => details.ability.name
        );

        let customJson = {
          id: pokemonDetails.data.id,
          imgUrl: `../../img/${pokemonDetails.data.name}.png`,
          abilities: listOfAbilities,
          name: pokemonDetails.data.name,
          type: pokemonDetails.data.types[0].type.name,
        };

        createCard(customJson);
        changeTemplate();
      });
    });
  }, 1000);
};

const createCard = (customPokemonJson) => {
  const { id, imgUrl, abilities, name, type } = { ...customPokemonJson };

  const card = document.createElement("div");

  card.id = id;
  card.addEventListener("dragover", (event) => event.preventDefault());
  card.classList.add("cardImage");
  card.style = `background-image:url(${imgUrl})`;
  card.classList.add(type);

  const dragElement = document.createElement("div");

  dragElement.id = name;
  dragElement.draggable = true;
  dragElement.addEventListener("dragstart", (event) => {
    if (dragAndDropCounter == 0) {
      dragAndDropCounter++;
      paragraph.innerText = "Is not available...";
      event.dataTransfer.setData("name", event.target.id);
      event.dataTransfer.setData("abilities", JSON.stringify(abilities));
      event.dataTransfer.setData(
        "type",
        event.target.parentElement.classList[1]
      );
      event.dataTransfer.setData("img", imgUrl);
      eventTarget = event.target;
    }
  });

  const paragraph = document.createElement("p");
  paragraph.classList.add("box-style");

  paragraph.innerText = name.toUpperCase();

  dragElement.appendChild(paragraph);
  card.appendChild(dragElement);
  // cardStorage.push(card);
  containerPokemon.appendChild(card);
};

const drop = (event) => {
  if (dragAndDropCounter == 1) {
    description.classList.add("hidden");
    containerDetails.classList.remove("hidden");
    dragAndDropCounter++;

    createCancelButton();

    let abilities = JSON.parse(event.dataTransfer.getData("abilities"));

    pokemonName.innerText = event.dataTransfer.getData("name").toUpperCase();
    pokemonImg.src = event.dataTransfer.getData("img");

    window.sessionStorage.setItem("allPokemon", JSON.stringify(abilities));

    abilities.forEach((ability) => {
      let elementLi = document.createElement("li");
      elementLi.innerText = ability;
      pokemonAbilities.appendChild(elementLi);
    });
  }
};

const getAllPokemon = async () => {
  let response;
  try {
    const data = await axios.get("https://pokeapi.co/api/v2/pokemon");
    response = data.data.results;
  } catch (error) {
    console.error(error);
  }
  return response;
};

const createCancelButton = () => {
  const buttonix = document.createElement("div");
  buttonix.classList.add("buttondelete");
  buttonix.innerHTML = "x";
  buttonix.addEventListener("click", () => {
    searchPokemon();
  });
  containerDetails.appendChild(buttonix);
};

const allowDrop = (event) => {
  event.preventDefault();
};

const changeTemplate = () => {
  loader.classList.add("hidden");
  loader.classList.remove("block");
  description.classList.remove("hidden");
  description.classList.add("flex");
};

const resetAll = () => {
  containerPokemon.innerHTML = "";
  loader.classList.remove("hidden");
  description.classList.add("hidden");
  description.classList.remove("flex");
  containerDetails.classList.add("hidden");
  pokemonAbilities.innerHTML = "";
  dragAndDropCounter = 0;
};
