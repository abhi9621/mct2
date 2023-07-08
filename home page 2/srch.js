const searchInput = document.getElementsByClassName("search-input")[0];

searchInput.addEventListener("keyup", async () => {
  try {
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchInput.value}`;
    const response = await fetch(url);
    const data = await response.json();
    if (searchInput.value == "") {
      location.reload();
    }
    const movies = data.results;
    const container = document.getElementsByClassName("movie-cards")[0];
    document.getElementsByClassName("movie-cards")[1].style.display = "none";
    container.innerHTML = ``;
    console.log(movies);
    movies.forEach((movie) => {
      const posterUrl = `https://image.tmdb.org/t/p/w185${movie.poster_path}`;
      const card = document.createElement("div");
      card.className = "movie-card";
      card.innerHTML = `
  <img src="${posterUrl}" alt="">
  <p>${movie.title}</p>
  <p>&#11088 ${movie.vote_average}</p>
`;
      const modal = document.createElement("div");
      modal.className = "modal";
      modal.innerHTML = `
      <div class="modal-content">
        <span class="close">&times;</span>
        <div class="modal-page">
        <div class="modal-image">
            <img src="https://image.tmdb.org/t/p/w185${
              movie.poster_path
            }" alt="">
            </div>
            <div class="modal-text">
        
        <h2> ${movie.title}</h2>
        <p><pre> ${movie.release_date.slice(0, 4)} | &#11088 ${
        movie.vote_average
      }</pre></p>
        <hr>
        <p>${movie.overview}</p>
    </div>
    </div>
      </div>
    `;
      card.addEventListener("click", () => {
        modal.style.display = "block";
      });
      modal.querySelector(".close").addEventListener("click", () => {
        modal.style.display = "none";
      });
      container.appendChild(modal);

      container.appendChild(card);
    });
  } catch (error) {
    console.error(error);
  }
});
let currentPage = 1;
const moviesPerPage = 20;

async function genreSearch(genreId, genreName) {
  try {
    const genreApiUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${genreId}&page=${currentPage}`;
    const response = await fetch(genreApiUrl);
    const data = await response.json();
    const movies = data.results;
    document.getElementsByClassName("movie-cards")[1].style.display = "none";
    const container = document.getElementsByClassName("movie-cards")[0];
    container.innerHTML = `<h2 style="width:100%;">Top ${genreName} Movies</h2>`;

    movies.forEach((movie) => {
      const posterUrl = `https://image.tmdb.org/t/p/w185${movie.poster_path}`;
      const card = document.createElement("div");
      card.className = "movie-card";
      card.innerHTML = `
        <img src="${posterUrl}" alt="">
        <p>${movie.title}</p>
        <p>&#11088 ${movie.vote_average}</p>
      `;

      const modal = document.createElement("div");
      modal.className = "modal";
      modal.innerHTML = `
        <div class="modal-content">
          <span class="close">&times;</span>
          <div class="modal-page">
            <div class="modal-image">
              <img src="https://image.tmdb.org/t/p/w185${
                movie.poster_path
              }" alt="">
            </div>
            <div class="modal-text">
              <h2>${movie.title}</h2>
              <p>${movie.release_date.slice(0, 4)} | &#11088 ${
        movie.vote_average
      }</p>
              <hr>
              <p>${movie.overview}</p>
            </div>
          </div>
        </div>
      `;

      card.addEventListener("click", () => {
        modal.style.display = "block";
      });

      modal.querySelector(".close").addEventListener("click", () => {
        modal.style.display = "none";
      });

      container.appendChild(modal);
      container.appendChild(card);
    });

    const totalMovies = data.total_results;
    const totalPages = Math.ceil(totalMovies / moviesPerPage);

    // Next Page Button
    const nextButton = document.createElement("button");
    nextButton.innerText = "Next Page";
    nextButton.classList.add("nxtBtn");
    nextButton.addEventListener("click", () => {
      currentPage++;
      if (currentPage <= totalPages) {
        genreSearch(genreId, genreName);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    });

    // Add Next Page button if there are more pages
    if (currentPage < totalPages) {
      container.appendChild(nextButton);
    }
  } catch (error) {
    console.error(error);
  }
}

async function languageSearch(languageCode, languageName) {
  try {
    document.getElementsByClassName("movie-cards")[1].style.display = "none";
    const languageApiUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_original_language=${languageCode}`;
    const response = await fetch(languageApiUrl);
    const data = await response.json();
    const movies = data.results;
    const container = document.getElementsByClassName("movie-cards")[0];
    container.innerHTML = `<h2 style="width:100%;">Top ${languageName} Movies</h2>`;

    movies.forEach((movie) => {
      const posterUrl = `https://image.tmdb.org/t/p/w185${movie.poster_path}`;
      const card = document.createElement("div");
      card.className = "movie-card";
      card.innerHTML = `
        <img src="${posterUrl}" alt="">
        <p>${movie.title}</p>
        <p>&#11088 ${movie.vote_average}</p>
      `;

      const modal = document.createElement("div");
      modal.className = "modal";
      modal.innerHTML = `
        <div class="modal-content">
          <span class="close">&times;</span>
          <div class="modal-page">
            <div class="modal-image">
              <img src="https://image.tmdb.org/t/p/w185${
                movie.poster_path
              }" alt="">
            </div>
            <div class="modal-text">
              <h2>${movie.title}</h2>
              <p>${movie.release_date.slice(0, 4)} | &#11088 ${
        movie.vote_average
      }</p>
              <hr>
              <p>${movie.overview}</p>
            </div>
          </div>
        </div>
      `;

      card.addEventListener("click", () => {
        modal.style.display = "block";
      });

      modal.querySelector(".close").addEventListener("click", () => {
        modal.style.display = "none";
      });

      container.appendChild(modal);
      container.appendChild(card);
    });
  } catch (error) {
    console.error(error);
  }
}

// Get all the navbar links
const navbarLinks = document.querySelectorAll(".navbar-link");

// Function to handle link click event
function handleLinkClick(e) {
  // Remove 'active' class from all links
  navbarLinks.forEach((link) => {
    link.classList.remove("active");
  });

  // Add 'active' class to the clicked link
  e.target.classList.add("active");
}

// Attach click event listener to each navbar link
navbarLinks.forEach((link) => {
  link.addEventListener("click", handleLinkClick);
});
