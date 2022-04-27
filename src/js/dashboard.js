const loader = document.getElementById("loader");
loader.classList.add("hidden");

const containerDetails = document.getElementById("card-details");
const containerPokemon = document.getElementById("card-pokemon");
const description = document.getElementById("description");

const pokemonName = document.getElementById("pokemon-name");
const pokemonType = document.getElementById("pokemon-type");
const pokemonImg = document.getElementById("pokemon-img");
const pokemonAbilities = document.getElementById("pokemon-abilities");

let eventTarget = null;
let dragOneElemet = 0;

const filterPokemon = async () => {
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
        loader.classList.add("hidden");
        loader.classList.remove("block");
        description.classList.remove("hidden");
      });
    });
  }, 2000);
};

const resetAll = () => {
  containerPokemon.innerHTML = "";
  loader.classList.remove("hidden");
  description.classList.add("hidden");
  containerDetails.classList.add("hidden");
  pokemonAbilities.innerHTML = "";
  dragOneElemet = 0;
};

const createCard = (customPokemonJson) => {
  const { id, imgUrl, abilities, name, type } = { ...customPokemonJson };

  const card = document.createElement("div");

  card.id = id;
  card.addEventListener("dragover", (event) => event.preventDefault());
  card.classList.add("styleContenitoreImmagini");
  card.classList.add(type);

  const dragElement = document.createElement("div");

  dragElement.id = name;
  dragElement.draggable = true;
  dragElement.addEventListener("dragstart", (event) => {
    if (dragOneElemet == 0) {
      dragOneElemet++;
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

const drop = (event) => {
  description.classList.add("hidden");
  containerDetails.classList.remove("hidden");
  if (dragOneElemet == 1) {
    dragOneElemet++;
    let iconCancel = document.createElement("i");
    iconCancel.classList.add("fa-solid");
    iconCancel.classList.add("fa-x");
    iconCancel.addEventListener("click", () => {
      filterPokemon();
    });
    let abilities = JSON.parse(event.dataTransfer.getData("abilities"));
    pokemonName.innerText = event.dataTransfer.getData("name").toUpperCase();
    pokemonType.innerText = event.dataTransfer.getData("type");
    pokemonImg.src = event.dataTransfer.getData("img");
    abilities.forEach((ability) => {
      let elementLi = document.createElement("li");
      elementLi.innerText = ability;
      pokemonAbilities.appendChild(elementLi);
    });
  }
};

const allowDrop = (event) => {
  event.preventDefault();
};
const loader = document.getElementById("loader");
loader.classList.add("hidden");

const containerDetails = document.getElementById("card-details");
const containerPokemon = document.getElementById("card-pokemon");
const description = document.getElementById("description");

const pokemonName = document.getElementById("pokemon-name");
const pokemonType = document.getElementById("pokemon-type");
const pokemonImg = document.getElementById("pokemon-img");
const pokemonAbilities = document.getElementById("pokemon-abilities");

let eventTarget = null;
let dragOneElemet = 0;

const filterPokemon = async () => {
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
        loader.classList.add("hidden");
        loader.classList.remove("block");
        description.classList.remove("hidden");
      });
    });
  }, 2000);
};

const resetAll = () => {
  containerPokemon.innerHTML = "";
  loader.classList.remove("hidden");
  description.classList.add("hidden");
  containerDetails.classList.add("hidden");
  pokemonAbilities.innerHTML = "";
  dragOneElemet = 0;
};

const createCard = (customPokemonJson) => {
  const { id, imgUrl, abilities, name, type } = { ...customPokemonJson };

  const card = document.createElement("div");

  card.id = id;
  card.addEventListener("dragover", (event) => event.preventDefault());
  card.classList.add("styleContenitoreImmagini");
  card.classList.add(type);

  const dragElement = document.createElement("div");

  dragElement.id = name;
  dragElement.draggable = true;
  dragElement.addEventListener("dragstart", (event) => {
    if (dragOneElemet == 0) {
      dragOneElemet++;
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

const drop = (event) => {
  description.classList.add("hidden");
  containerDetails.classList.remove("hidden");
  if (dragOneElemet == 1) {
    dragOneElemet++;
    let iconCancel = document.createElement("i");
    iconCancel.classList.add("fa-solid");
    iconCancel.classList.add("fa-x");
    iconCancel.addEventListener("click", () => {
      filterPokemon();
    });
    let abilities = JSON.parse(event.dataTransfer.getData("abilities"));
    pokemonName.innerText = event.dataTransfer.getData("name").toUpperCase();
    pokemonType.innerText = event.dataTransfer.getData("type");
    pokemonImg.src = event.dataTransfer.getData("img");
    abilities.forEach((ability) => {
      let elementLi = document.createElement("li");
      elementLi.innerText = ability;
      pokemonAbilities.appendChild(elementLi);
    });
  }
};

const allowDrop = (event) => {
  event.preventDefault();
};
