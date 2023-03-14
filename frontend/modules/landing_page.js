import config from "../conf/index.js";

async function init() {
  //Fetches list of all cities along with their images and description
  console.log("from init()")
  console.log(config.backendEndpoint);
  let cities = await fetchCities();
  //Updates the DOM with the cities
  cities.forEach((key) => {
    addCityToDOM(key.id, key.city, key.description, key.image);
  });
}

//Implementation of fetch call
async function fetchCities() {
  // TODO: MODULE_CITIES
  // 1. Fetch cities using the Backend API and return the data
  try {
    const res = await fetch(`${config.backendEndpoint}/cities`);
    const data = await res.json();
    return data;
  } catch(err) {
    // catches errors both in fetch and response.json
    return null;
  }
}

//Implementation of DOM manipulation to add cities

function addCityToDOM(id, city, description, image) {
  // TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DOM
  let divM=document.getElementById("data");
  let divOb=document.createElement("div");
  divOb.setAttribute("class","col-12 col-sm-6 col-lg-3 mb-3");
  divOb.innerHTML=`
    <a href="pages/adventures/?city=${id}" id=${id}>
      <div class="tile">
      <img src=${image} alt=${id}>
         <div class="tile-text text-center">
           <h5>${city}</h5>
           <h6>${description}</h6>
         </div>
      </div>
    </a>
  `;
  divM.append(divOb);
}

export { init, fetchCities, addCityToDOM };
