const apiKey = "ee3e541c01c3d073f1cae0944d0a22cd";
const apiUrl = `https://api.themoviedb.org/3/discover/movie?primary_release_date.gte=2014-09-15&primary_release_date.lte=2014-10-22&api_key=ee3e541c01c3d073f1cae0944d0a22cd`;

fetch(apiUrl)
  .then((response) => response.json())
  .then((data) => {
    const movies = data.results.slice(0, 8);
    const container = document.getElementsByClassName("movie-cards")[0];
    container.innerHTML = `<h2 style="width:100%;">Weekly Top Rated Movies</h2>`;

    movies.forEach((movie) => {
      const posterUrl = `https://image.tmdb.org/t/p/w185${movie.poster_path}`;
      const card = document.createElement("div");
      card.className = "movie-card";
      card.innerHTML = `
  <img src="${posterUrl}" alt="">
  <p>${movie.title}</p>
  <p>&#11088 ${movie.vote_average}</p>

`;
      let newMovie = null;

      fetch(
        `https://api.themoviedb.org/3/movie/${movie.id}?api_key=${apiKey}&append_to_response=casts,videos,images,release_dates`
      )
        .then((response) => response.json())
        .then((NewData) => {
          newMovie = NewData;

          // access the newMovie variable here or perform any further operations with the data
          console.log(newMovie);
        })
        .catch((error) => {
          console.error("Error fetching movie details:", error);
        });

      // Outside of the fetch function, the value of newMovie will be null until the fetch is complete and the data is assigned to it
      console.log(newMovie);

      const modal = document.createElement("div");
      modal.className = "modal";
      modal.innerHTML = `
  <div class="modal-content">
    <span class="close">&times;</span>
    <div class="modal-page">
    <div class="modal-image">
        <img src="https://image.tmdb.org/t/p/w185${movie.poster_path}" alt="">
        </div>
        <div class="modal-text">
    
    <h2> ${movie.title}</h2>
    <p><pre> ${movie.release_date.slice(0, 4)} | &#11088 ${
        movie.vote_average
      }</pre></p> 
      <p class="cast"></p>
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
  })
  .catch((error) => console.log(error));

 

// const apiUrl2 = `https://api.themoviedb.org/3/movie/343611?api_key=${apiKey}`;
// var movieData;
// fetch(apiUrl2)
//   .then((response) => response.json())
//   .then((data) => {
//     movieData = data; // store the JSON object data in a variable
//     console.log(movieData); // log the variable to the console
//     // do something with the data, such as display it on the page
//   })
//   .catch((error) => console.error(error)); // handle any errors
// console.log(movieData);

const apiUrl3 = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}`;
// const apiurl3 ='https://api.themoviedb.org/3/discover/movie?primary_release_date.gte=2014-09-15&primary_release_date.lte=2014-10-22&api_key=ee3e541c01c3d073f1cae0944d0a22cd'

fetch(apiUrl3)
  .then((response) => response.json())
  .then((data) => {
    const movies = data.results.slice(0,8);
    const container = document.getElementsByClassName("movie-cards")[1];
    container.innerHTML = `<h2 style="width:100%;">Now playing Movies</h2>`;
    movies.forEach((movie) => {
      const posterUrl = `https://image.tmdb.org/t/p/w185${movie.poster_path}`;
      const card = document.createElement("div");
      card.className = "movie-card";
      card.innerHTML = `
        <img src="${posterUrl}" alt="">
        <p>${movie.title}</p>
        <p>&#11088 ${movie.vote_average}</p>
        <div class="video-container"></div>
      `;
      const modal = document.createElement("div");
      modal.className = "modal";
      modal.innerHTML = `
  <div class="modal-content">
    <span class="close">&times;</span>
    <div class="modal-page">
    <div class="modal-image">
        <img src="https://image.tmdb.org/t/p/w185${movie.poster_path}" alt="">
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
  });
