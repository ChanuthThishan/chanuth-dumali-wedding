import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
  getFirestore,
  collection,
  onSnapshot
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDFj1Ppb-2iJHlc6kR-RV5FaW3--Zwwb-o",
  authDomain: "chanuth-dumali-wedding.firebaseapp.com",
  projectId: "chanuth-dumali-wedding",
  storageBucket: "chanuth-dumali-wedding.firebasestorage.app",
  messagingSenderId: "240243255855",
  appId: "1:240243255855:web:31a8c90ac39389201f74da"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const list = document.getElementById("list");
const searchBox = document.getElementById("searchBox");

let allData = [];

function renderGuests(data){

  let accepted = 0;
  let declined = 0;
  let guestTotal = 0;

  list.innerHTML = "";

  data.forEach((guest)=>{

    if(guest.attendance === "accept"){
      accepted++;
      guestTotal += Number(guest.guestCount || 1);
    }

    if(guest.attendance === "decline"){
      declined++;
    }

    list.innerHTML += `
      <div class="card">
        <h3>${guest.name}</h3>

        <p class="${guest.attendance}">
          ${guest.attendance}
        </p>

        <p>Guests: ${guest.guestCount}</p>

        <p>${guest.message || ""}</p>
      </div>
    `;
  });

  document.getElementById("total").innerHTML =
    "Total RSVPs: " + data.length;

  document.getElementById("accepted").innerHTML =
    "Accepted: " + accepted;

  document.getElementById("declined").innerHTML =
    "Declined: " + declined;

  document.getElementById("guestTotal").innerHTML =
    "Total Guests: " + guestTotal;
}

onSnapshot(collection(db,"rsvps"),(snapshot)=>{

  allData = [];

  snapshot.forEach((doc)=>{
    allData.push(doc.data());
  });

  renderGuests(allData);
});

searchBox.addEventListener("input",()=>{

  const keyword =
    searchBox.value.toLowerCase();

  const filtered =
    allData.filter((guest)=>
      guest.name.toLowerCase().includes(keyword)
    );

  renderGuests(filtered);
});

window.exportCSV = function(){

  let csv =
    "Name,Status,Guests,Message\n";

  allData.forEach((guest)=>{

    csv +=
      `"${guest.name}","${guest.attendance}","${guest.guestCount}","${guest.message || ""}"\n`;
  });

  const blob =
    new Blob([csv],{type:"text/csv"});

  const url =
    URL.createObjectURL(blob);

  const a =
    document.createElement("a");

  a.href = url;
  a.download = "rsvp-list.csv";
  a.click();
}