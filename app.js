import { saveRSVP } from "./firebase.js";

/* ---------------------------
   COUNTDOWN TIMER
----------------------------*/

const weddingDate = new Date("May 13, 2027 08:30:00").getTime();

const timer = document.getElementById("timer");

function updateCountdown() {
  const now = new Date().getTime();
  const distance = weddingDate - now;

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  timer.innerHTML = `

<div class="time-box">
${days}<br>Days
</div>

<div class="time-box">
${hours}<br>Hours
</div>

<div class="time-box">
${minutes}<br>Minutes
</div>

<div class="time-box">
${seconds}<br>Seconds
</div>
`;

}

setInterval(updateCountdown, 1000);
updateCountdown();


/* ---------------------------
   RSVP FORM SUBMIT
----------------------------*/

const form = document.getElementById("rsvpForm");
const successMessage = document.getElementById("successMessage");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const attendance = document.getElementById("attendance").value;
  const guestCount = document.getElementById("guestCount").value;
  const message = document.getElementById("message").value;

  const data = {
    name,
    attendance,
    guestCount,
    message,
    createdAt: new Date().toISOString()
  };

  const result = await saveRSVP(data);

  if (result) {
    successMessage.innerHTML =
"💍 Thank you! Your RSVP has been received.<br>We look forward to celebrating with you ❤️";
    form.reset();
  } else {
    successMessage.innerHTML = "❌ Something went wrong. Try again.";
  }
});
