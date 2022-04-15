const allPokemon = [];
let scoreDiv = document.querySelector("div.scoreboard");
let tableHeaders = ["Id", "Name", "Abilities", "Experience"];
let displayRow = [5, 10, 15, 20];

const filterTable = (usersInput) => {
  if (usersInput !== null || usersInput !== "") {
    apiAllPokemon();
  } else {
    // filter
  }
};

const apiAllPokemon = () => {
  fetch("https://pokeapi.co/api/v2/pokemon")
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data);
      detailsPokemon(data.results);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

const detailsPokemon = (data) => {
  data.map((element) => {
    fetch(element.url)
      .then((res) => res.json())
      .then((response) => {
        console.log(response);
        allPokemon.push({
          id: response.id,
          name: response.name,
          abilities: response.abilities.length,
          experience: response.base_experience,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  });
  //   createHeaderTable();
};

const createHeaderTable = () => {
  while (scoreDiv.firstChild) scoreDiv.removeChild(scoreDiv.firstChild);

  let scoreTable = document.createElement("table");
  scoreTable.style.tableLayout = "fixed";
  scoreTable.style.width = "75%";
  scoreTable.style.border = "1px solid gray";
  scoreTable.style.margin = "5% 10%";

  let scoreThead = document.createElement("thead");
  let scoreTr = document.createElement("tr");
  let scoreTbody = document.createElement("tbody");

  tableHeaders.forEach((header) => {
    let scoreTh = document.createElement("th");
    scoreTh.innerText = header;
    scoreTr.append(scoreTh);
  });
  scoreThead.append(scoreTr);

  let scoreTdId = (document.createElement("td").innerText = allPokemon[0].id);

  scoreTable.append(scoreThead, scoreTbody);
  scoreDiv.append(scoreTable);
  console.log(allPokemon[0]);
};

apiAllPokemon();
