const loader = document.getElementById("loader");
loader.classList.add("hidden");

const inputSearch = document.getElementById("userInput");

const containerDetails = document.getElementById("card-details");
const containerPokemon = document.getElementById("card-pokemon");

const description = document.getElementById("description");
description.classList.add("hidden");
description.classList.remove("flex");

const pokemonName = document.getElementById("pokemon-name");
const pokemonId = document.getElementById("pokemon-id");
const pokemonTypes = document.getElementById("pokemon-types");
const pokemonImg = document.getElementById("pokemon-img");
const pokemonAbilities = document.getElementById("pokemon-abilities");

let timer = 0;
let saveParentId = "";
let saveParentBackground = "";
const startSearch = (event) => {
  let input;
  if (event === "") {
    input = event;
  } else {
    input = event.target.value;
  }
  if (timer !== 0) {
    clearTimeout(timer);
  }
  resetTemplate();
  timer = setTimeout(() => {
    searchPokemon(input);
  }, 1500);
};
let filteredArray = [];
const searchPokemon = async (userInput) => {
  resetTemplate();
  changeTemplate();
  getAllPokemon().then((response) => {
    filteredArray = response.filter((pokemon) =>
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

    let listOfType = pokemonDetails.data.types.map((type) => type.type.name);

    let customJson = {
      id: pokemonDetails.data.id,
      imgUrl: `../../img/${pokemonDetails.data.name}.png`,
      abilities: listOfAbilities,
      name: pokemonDetails.data.name,
      type: listOfType,
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
  card.classList.add(type[0]);

  const idPokemonNumber = document.createElement("span");
  let idPokemon;

  if (id < 10) {
    idPokemon = `#00${id}`;
  } else {
    idPokemon = `#0${id}`;
  }
  idPokemonNumber.innerText = idPokemon;
  idPokemonNumber.classList.add("id-pokemon");

  const dragElement = document.createElement("div");
  dragElement.id = name;
  dragElement.draggable = true;
  dragElement.classList.add("pokemon");
  dragElement.addEventListener("dragstart", (event) => {
    event.dataTransfer.setData("name", name);
    event.dataTransfer.setData("idParent", id);
    event.dataTransfer.setData("abilities", JSON.stringify(abilities));
    event.dataTransfer.setData("types", JSON.stringify(type));
    event.dataTransfer.setData("img", imgUrl);
    event.dataTransfer.setData("idPokemonNumber", idPokemon);
  });

  const spanElement = document.createElement("span");

  spanElement.classList.add("text-style");
  spanElement.classList.add("uppercase");
  spanElement.innerText = name;

  const typeSection = document.createElement("div");

  type.forEach((kind) => {
    let textElement = document.createElement("span");
    textElement.innerText = kind;
    textElement.classList.add("typeText");
    typeSection.append(textElement);
  });

  dragElement.appendChild(spanElement);
  dragElement.appendChild(typeSection);
  card.appendChild(idPokemonNumber);
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
  let listOfTypes = JSON.parse(event.dataTransfer.getData("types"));
  let abilities = JSON.parse(event.dataTransfer.getData("abilities"));

  removeChildElement(pokemonAbilities);
  removeChildElement(pokemonTypes);
  saveIdAndBackgroundColor(parentId, listOfTypes[0]);

  pokemonName.innerText = event.dataTransfer.getData("name");
  pokemonId.innerText = event.dataTransfer.getData("idPokemonNumber");
  pokemonImg.src = event.dataTransfer.getData("img");

  // window.sessionStorage.setItem("allPokemon", JSON.stringify(abilities));

  listOfTypes.forEach((type) => {
    let span = document.createElement("span");
    span.innerText = type;
    span.classList.add("typeText");
    pokemonTypes.appendChild(span);
  });

  abilities.forEach((ability) => {
    let li = document.createElement("li");
    li.innerText = ability;
    pokemonAbilities.appendChild(li);
  });
};

const firmacontratto = () => {
  window.location.replace("/src/pages/canvas.html");
};

const removeChildElement = (container) => {
  //pokemonAbilities //containerPokemon
  if (container) {
    if (container.children[0]) {
      let childArray = Array.from(container.children);
      childArray.forEach((child) => {
        container.removeChild(child);
      });
    }
  }
};

const saveIdAndBackgroundColor = (parentId, backgroundColor) => {
  if (saveParentId === "") {
    document.getElementById(parentId).style.display = "none";
    saveParentId = parentId;
    containerDetails.classList.add(backgroundColor);
    saveParentBackground = backgroundColor;
  } else {
    document.getElementById(saveParentId).style.display = "block";
    document.getElementById(parentId).style.display = "none";
    containerDetails.classList.remove(saveParentBackground);
    containerDetails.classList.add(backgroundColor);
    saveParentId = parentId;
    saveParentBackground = backgroundColor;
  }
};
