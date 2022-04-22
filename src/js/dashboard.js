const loader = document.getElementById("loader");
loader.classList.add("hidden");

const container = document.getElementById("container");

function filterPokemon(event) {
  loader.classList.remove("hidden");
  loader.classList.add("block");
  deleteImg();
}

function deleteImg() {
  // foto
  const pokemonImage = document.querySelectorAll("#pokemonImage");
  let pokemonImageList = Array.prototype.slice.call(pokemonImage);
  pokemonImageList.map((img) => {
    img.remove();
  });
  // elemento foto
  const singleElement = document.querySelectorAll(".firstImage");
  let cardElement = Array.prototype.slice.call(singleElement);
  cardElement.map((card) => {
    card.remove();
  });
}
