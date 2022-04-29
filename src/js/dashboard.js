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

let dragAndDropCounter = 0;

const searchPokemon = async () => {
  let userInput = document.getElementById("userInput").value;
  disableSearchButton(true);
  resetTemplate();

  setTimeout(async () => {
    await getAllPokemon().then((response) => {
      let filteredArray = response.filter((pokemon) =>
        pokemon.name.includes(userInput)
      );

      createJsonAndCard(filteredArray);
      changeTemplate();
      disableSearchButton(false);
    });
  }, 1000);
};

const disableSearchButton = (isDisable) => {
  document.getElementById("btn-search").disabled = isDisable;
};

const resetTemplate = () => {
  containerPokemon.innerHTML = "";
  loader.classList.remove("hidden");
  description.classList.add("hidden");
  description.classList.remove("flex");
  containerDetails.classList.add("hidden");
  pokemonAbilities.innerHTML = "";
  dragAndDropCounter = 0;
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

const createJsonAndCard = (filteredArray) => {
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
  });
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
      paragraph.innerText = "Pokemon is not available...";
      event.dataTransfer.setData("name", name);
      event.dataTransfer.setData("abilities", JSON.stringify(abilities));
      // event.dataTransfer.setData("type", type);
      event.dataTransfer.setData("img", imgUrl);
    }
  });

  const paragraph = document.createElement("p");

  paragraph.classList.add("box-style");
  paragraph.classList.add("text-shadow");
  paragraph.innerText = name.toUpperCase();

  dragElement.appendChild(paragraph);
  card.appendChild(dragElement);
  containerPokemon.appendChild(card);
};

const changeTemplate = () => {
  loader.classList.add("hidden");
  loader.classList.remove("block");
  description.classList.remove("hidden");
  description.classList.add("flex");
};

const allowDrop = (event) => {
  event.preventDefault();
};

const drop = (event) => {
  if (dragAndDropCounter == 1) {
    description.classList.add("hidden");
    containerDetails.classList.remove("hidden");
    dragAndDropCounter++;

    createDeleteButton();

    let abilities = JSON.parse(event.dataTransfer.getData("abilities"));

    pokemonName.innerText = event.dataTransfer.getData("name").toUpperCase();
    pokemonImg.src = event.dataTransfer.getData("img");

    window.sessionStorage.setItem("allPokemon", JSON.stringify(abilities));

    abilities.forEach((ability) => {
      let li = document.createElement("li");
      li.innerText = ability;
      pokemonAbilities.appendChild(li);
    });
  }
};

const createDeleteButton = () => {
  const buttonix = document.createElement("div");
  buttonix.classList.add("buttondelete");
  buttonix.innerHTML = "x";
  buttonix.addEventListener("click", () => {
    searchPokemon();
  });
  containerDetails.appendChild(buttonix);
};

const firmacontratto = () => {
  window.location.replace("/src/pages/canvas.html");
};

searchPokemon();
