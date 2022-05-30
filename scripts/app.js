// Get final standings of a searched year from ergast api
outputDiv = document.querySelector(".output");
searchForm = document.querySelector(".container form");
infoline = document.getElementById("info");
outputHTML = [];

// On submit
searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  // clear previous if exists
  outputHTML = [];
  //cont
  searchResult = searchForm.season.value.trim();
  searchForm.reset();
  // Make sure not an empty search
  if (searchResult != "") {
    getStandings(searchResult);
    infoline.classList.remove("d-none");
  }
});

// Doing fetch
const getStandings = async (season) => {
  const url = `https://ergast.com/api/f1/${season}/driverStandings.json`;

  const response = await fetch(url);
  const data = await response.json();
  /*
  console.log(data.MRData.StandingsTable["StandingsLists"][0]);
  console.log(data.MRData.StandingsTable["StandingsLists"][0].DriverStandings);

  */

  data.MRData.StandingsTable["StandingsLists"][0].DriverStandings.forEach(
    (item, index) => {
      outputHTML[index] = `<div class="driver-data">
      <div>
      #${item.position}</div>
      <div>
      ${item.Driver.givenName + " " + item.Driver.familyName}</div>
      <div>
      ${item.points}
      </div>
      </div>`;
    }
  );
  outputHTML = outputHTML.join("");
  outputDiv.innerHTML = outputHTML;
};
