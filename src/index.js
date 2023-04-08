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

  const title = document.createElement("li");
  title.innerText = film.title;
  titles.appendChild(title);

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
    films.forEach(film => {
      const title = document.createElement("li");
      title.innerText = film.title;
      titles.appendChild(title);
    });
  }
fetch("http://localhost:3000/films")
  .then((response) => response.json())
  .then(movieTitles);

//Buy movie tickets
function buyTicketHandler(film) {
    let soldTickets = film.tickets_sold;
    film.forEach(
      buyTicket.addEventListener("click", () => {
        soldTickets = soldTickets + 1;
        remTickets.innerHTML = film.capacity - soldTickets;
        if (remTickets.innerHTML < 0) {
          setTimeout(() => alert("TICKETS SOLD OUT!!"), 100);
          remTickets.innerHTML = 0;
        }
      })
    );
  }
fetch("http://localhost:3000/films/1")
  .then((response) => response.json())
  .then(buyTicketHandler);
