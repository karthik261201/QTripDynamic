
import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it
  console.log(search);
  let i=search.indexOf("=");
  let cityid=search.slice(i+1);
  console.log(cityid);
  return cityid;
}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data
  try{
    const res = await fetch(`${config.backendEndpoint}/adventures?city=${city}`);
    const data = await res.json();
    return data
  }
  catch(err) {
    return null;
  }
}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM
  let divM=document.getElementById("data");
  for(let i=0;i<adventures.length;++i)
  {
    let c=adventures[i]
    let divOb=document.createElement("div");
    divOb.setAttribute("class","col-12 col-sm-6 col-lg-3 mb-3");
    divOb.innerHTML=`
      <a href="detail/?adventure=${c.id}" id=${c.id}>
        <div class="card activity-card">
          <div class="category-banner">${c.category}</div>
          <img src=${c.image} alt=${c.name}>
          <div class="d-flex justify-content-between w-100 p-3 pb-0">
            <p class="card-title">${c.name}</p>
            <p class="card-text">₹${c.costPerHead}</p>
          </div>
          <div class="d-flex justify-content-between w-100 p-3 pt-2">
            <p class="card-title">Duration</p>
            <p class="card-text">${c.duration} Hours</p>
          </div>
        </div>
      </a>
    `;
    divM.append(divOb);
  }
}

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list
  let filteredList = [];
  for(let i=0;i<list.length;++i) {
    if(list[i].duration>=low && list[i].duration<=high)
      filteredList.push(list[i]);
  }
  return filteredList;
}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list
  let filteredList = [];
  for(let i=0;i<list.length;++i) {
    for(let j=0;j<categoryList.length;++j) {
      if(list[i].category==categoryList[j]) {
        filteredList.push(list[i]);
      }
    }
  }
  return filteredList;
}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods
  // Place holder for functionality to work in the Stubs
  if(filters.duration!="" ) {
    let a=filters.duration.split("-");
    let l=a[0];
    let h=a[1];
    list=filterByDuration(list,l,h);
  }
  if(filters.category.length>0) {
    list=filterByCategory(list,filters.category);
  }
  return list;
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage
  window.localStorage.setItem('filters',JSON.stringify(filters));
  return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object
  let r=JSON.parse(window.localStorage.getItem('filters'));
  // Place holder for functionality to work in the Stubs
  return r;
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills
  let c=filters.category;
  let divList = document.getElementById("category-list");
  for(let i=0;i<c.length;++i) {
    let div = document.createElement("div");
    div.setAttribute("class","category-filter");
    div.innerText=c[i];
    divList.append(div);
  }
}
export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
