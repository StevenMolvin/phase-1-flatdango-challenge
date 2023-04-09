// Access DOM elements
const poster = document.getElementById("poster");
const titles = document.getElementById("films");
const movieTitle = document.getElementById("title");
const descr = document.getElementById("film-info");
const runtime = document.getElementById("runtime");
const showtime = document.getElementById("showtime");
const remTickets = document.getElementById("ticket-num");
const buyTicket = document.getElementById("buy-ticket");

//Add the first movie
function addFilm(film) {
  poster.src = film.poster;
  poster.alt = film.title;

  movieTitle.innerHTML = film.title;

  descr.innerHTML = film.description;

  runtime.innerHTML = film.runtime;

  showtime.innerHTML = film.showtime;

  remTickets.innerHTML = film.capacity - film.tickets_sold;
}

fetch("http://localhost:3000/films/1")
  .then((response) => response.json())
  .then(addFilm);

//Add Movie titles
function movieTitles(films) {
  films.forEach((film) => {
    const title = document.createElement("li");
    title.innerText = film.title;
    title.setAttribute("id", `${film.id}`);
    titles.appendChild(title);

    title.addEventListener("click", () => {
      poster.src = film.poster;
      poster.alt = film.title;

      movieTitle.innerHTML = film.title;

      descr.innerHTML = film.description;

      runtime.innerHTML = film.runtime;

      showtime.innerHTML = film.showtime;

      remTickets.innerHTML = film.capacity - film.tickets_sold;
    });
  });
}
fetch("http://localhost:3000/films")
  .then((response) => response.json())
  .then(movieTitles);

//Buy movie tickets
function buyTicketHandler() {
  buyTicket.addEventListener("click", () => {
    let remTicketsNo = parseInt(remTickets.innerHTML);
    if (remTicketsNo > 0) {
      remTickets.innerHTML = remTickets.innerHTML - 1;
    } else {
      buyTicket.textContent = "Sold Out";

      setTimeout(() => alert("TICKETS SOLD OUT!!"), 100);
    }
  });
}
buyTicketHandler();
