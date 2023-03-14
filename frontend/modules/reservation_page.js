import config from "../conf/index.js";

//Implementation of fetch call to fetch all reservations
async function fetchReservations() {
  // TODO: MODULE_RESERVATIONS
  // 1. Fetch Reservations by invoking the REST API and return them
  try{
    const res = await fetch(`${config.backendEndpoint}/reservations/`);
    const data = await res.json();
    return data
  }
  catch(err) {
    return null;
  }
  // Place holder for functionality to work in the Stubs
}

//Function to add reservations to the table. Also; in case of no reservations, display the no-reservation-banner, else hide it.
function addReservationToTable(reservations) {
  // TODO: MODULE_RESERVATIONS
  // 1. Add the Reservations to the HTML DOM so that they show up in the table
  //Conditionally render the no-reservation-banner and reservation-table-parent
  console.log(reservations)
  if(reservations.length>0) {
    document.getElementById("reservation-table-parent").style.display="block";
    document.getElementById("no-reservation-banner").style.display="none";
    let tb=document.getElementById("reservation-table");
    for(let i=0;i<reservations.length;++i) {
      let tr=document.createElement("tr");
      let a=new Date(reservations[i].date)
      let options1 = {year:'numeric',month:'numeric',day:'numeric'}
      let b=new Date(reservations[i].time)
      let options2 = {year:'numeric',month:'long',day:'numeric',hour:'numeric',minute:'numeric',second:'numeric'}
      tr.innerHTML=`
        <td>${reservations[i].id}</td>
        <td>${reservations[i].name}</td>
        <td>${reservations[i].adventureName}</td>
        <td>${reservations[i].person}</td>
        <td>${a.toLocaleDateString("en-IN",options1)}</td>
        <td>${reservations[i].price}</td>
        <td>${(b.toLocaleDateString("en-IN",options2)).replace(" at",",")}</td>
        <td><button type="button" class="reservation-visit-button" id="${reservations[i].id}"><a href="../detail/?adventure=${reservations[i].adventure}">Visit Adventure</a></button></td>
      `;
      tb.append(tr);
    }
  }
  else {
    document.getElementById("reservation-table-parent").style.display="none";
    document.getElementById("no-reservation-banner").style.display="block";
  }
  /*
    Iterating over reservations, adding it to table (into div with class "reservation-table") and link it correctly to respective adventure
    The last column of the table should have a "Visit Adventure" button with id=<reservation-id>, class=reservation-visit-button and should link to respective adventure page

    Note:
    1. The date of adventure booking should appear in the format D/MM/YYYY (en-IN format) Example:  4/11/2020 denotes 4th November, 2020
    2. The booking time should appear in a format like 4 November 2020, 9:32:31 pm
  */

}

export { fetchReservations, addReservationToTable };
