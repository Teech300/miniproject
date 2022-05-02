const loader = document.getElementById("loader");
loader.classList.add("hidden");

const inputSearch = document.getElementById("userInput");

const containerDetails = document.getElementById("card-details");
const containerPokemon = document.getElementById("card-pokemon");

const description = document.getElementById("description");
description.classList.add("hidden");
description.classList.remove("flex");

const pokemonName = document.getElementById("pokemon-name");
const pokemonImg = document.getElementById("pokemon-img");
const pokemonAbilities = document.getElementById("pokemon-abilities");

let timer = 0;
let saveParentId = "";

inputSearch.addEventListener("keyup", (event) => {
  if (timer !== 0) {
    clearTimeout(timer);
  }
  resetTemplate();
  timer = setTimeout(() => {
    searchPokemon(event.target.value);
    changeTemplate();
  }, 1500);
});

const searchPokemon = async (userInput) => {
  getAllPokemon().then((response) => {
    let filteredArray = response.filter((pokemon) =>
      pokemon.name.includes(userInput)
    );
    createJsonAndCard(filteredArray);
  });
};

const resetTemplate = () => {
  loader.classList.remove("hidden");
  description.classList.add("hidden");
  description.classList.remove("flex");
  containerDetails.classList.add("hidden");
  removeChildElement(pokemonAbilities);
  removeChildElement(containerPokemon);
  saveParentId = "";
};

//TODO
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
    event.dataTransfer.setData("name", name);
    event.dataTransfer.setData("idParent", event.target.parentElement.id);
    event.dataTransfer.setData("abilities", JSON.stringify(abilities));
    // event.dataTransfer.setData("type", type);
    event.dataTransfer.setData("img", imgUrl);
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
  description.classList.add("hidden");
  containerDetails.classList.remove("hidden");
  let parentId = event.dataTransfer.getData("idParent");

  removeChildElement(pokemonAbilities);

  if (saveParentId === "") {
    document.getElementById(parentId).style.display = "none";
    saveParentId = parentId;
  } else {
    document.getElementById(saveParentId).style.display = "block";
    document.getElementById(parentId).style.display = "none";
    saveParentId = parentId;
  }

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
};

const createDeleteButton = () => {
  const buttonix = document.createElement("div");
  buttonix.classList.add("buttondelete");
  buttonix.innerHTML = "x";
  buttonix.addEventListener("click", () => {
    searchPokemon("");
  });
  containerDetails.appendChild(buttonix);
};

const firmacontratto = () => {
  window.location.replace("/src/pages/canvas.html");
};

const removeChildElement = (container) => {
  //pokemonAbilities //containerPokemon
  if (container.children[0]) {
    let childArray = Array.from(container.children);
    childArray.forEach((child) => {
      container.removeChild(child);
    });
  }
};
