import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL
  console.log(search);
  let i=search.indexOf("=");
  let aid=search.slice(i+1);
  console.log(aid);
  return aid;
  // Place holder for functionality to work in the Stubs
}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call
  try{
    const res = await fetch(`${config.backendEndpoint}/adventures/detail/?adventure=${adventureId}`);
    const data = await res.json();
    return data
  }
  catch(err) {
    return null;
  }

  // Place holder for functionality to work in the Stubs
  return null;
}

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM
  console.log(adventure);
  let div1=document.getElementById("adventure-name");
  div1.innerHTML=adventure.name;
  let div2=document.getElementById("adventure-subtitle");
  div2.innerHTML=adventure.subtitle;
  let div3=document.getElementById("photo-gallery");
  for(let i=0;i<adventure.images.length;++i) {
    let imgOb=document.createElement("img");
    imgOb.setAttribute("class","activity-card-image");
    imgOb.src=adventure.images[i];
    div3.append(imgOb);
  }
  let div4=document.getElementById("adventure-content");
  div4.innerHTML=adventure.content;
}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images
  let div=document.getElementById("photo-gallery");
  div.innerHTML=`
    <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
      <div class="carousel-indicators">
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
      </div>
    </div>
  `;
  let divOb=document.getElementById("carouselExampleIndicators");
  let div1=document.createElement("div");
  div1.setAttribute("class","carousel-inner");
  for(let i=0;i<images.length;++i) {
    if(i==2) {
      let div2=document.createElement("div");
      div2.setAttribute("class","carousel-item active");
      let img=document.createElement("img");
      img.setAttribute("class","activity-card-image");
      img.src=images[i];
      div2.append(img);
      div1.append(div2);
    }
    else {
      let div2=document.createElement("div");
      div2.setAttribute("class","carousel-item");
      let img=document.createElement("img");
      img.setAttribute("class","activity-card-image");
      img.src=images[i];
      div2.append(img);
      div1.append(div2);
    }
    divOb.append(div1);
  }
  let b1=document.createElement("button");
  b1.setAttribute("class","carousel-control-prev");
  b1.setAttribute("type","button");
  b1.setAttribute("data-bs-target","#carouselExampleIndicators");
  b1.setAttribute("data-bs-slide","prev");
  b1.innerHTML=`
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  `;
  let b2=document.createElement("button");
  b2.setAttribute("class","carousel-control-next");
  b2.setAttribute("type","button");
  b2.setAttribute("data-bs-target","#carouselExampleIndicators");
  b2.setAttribute("data-bs-slide","next");
  b2.innerHTML=`
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  `;
  divOb.append(b1);
  divOb.append(b2);
}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.
  console.log(adventure.available);
  if(adventure.available==true) {
    let r1=document.getElementById("reservation-panel-sold-out");
    r1.style.display="none";
    let r2=document.getElementById("reservation-panel-available");
    r2.style.display="block";
    let c=document.getElementById("reservation-person-cost");
    c.innerHTML=adventure.costPerHead;
  }
  else {
    let r1=document.getElementById("reservation-panel-available");
    r1.style.display="none";
    let r2=document.getElementById("reservation-panel-sold-out");
    r2.style.display="block";
  }
}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field
  let c=document.getElementById("reservation-cost");
  c.innerHTML=(persons*adventure.costPerHead);
}

//Implementation of reservation form submission
function captureFormSubmit(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using fetch() to make the reservation
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".
  console.log(adventure);
  console.log(config.backendEndpoint);
  document.getElementById("myForm").addEventListener("submit",FormData);
  function FormData(event) {
    event.preventDefault();
    let n=document.getElementById("myForm").elements["name"].value;
    let d=document.getElementById("myForm").elements["date"].value;
    let p=document.getElementById("myForm").elements["person"].value;
    const data = {
      name: n,
      date: d,
      person: p,
      adventure:adventure.id
    };
    const calll = {
      method: 'POST',
      headers: {
      'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };
    fetch(`${config.backendEndpoint}/reservations/new`,calll)
    .then(data => {
        if (!data.ok) {
          throw Error(data.status);
        }
        alert("Success!");
        }).catch(e => {
        alert("Failure");
        });
  }
}

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't
  if(adventure.reserved) {
    document.getElementById("reserved-banner").style.display="block";
  }
  else {
    document.getElementById("reserved-banner").style.display="none";
  }
}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmit,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};
