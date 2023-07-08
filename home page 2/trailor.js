const trailerUrl = "https://api.themoviedb.org/3";

// Function to fetch upcoming movies
async function fetchUpcomingMovies() {
  try {
    const response = await fetch(
      `${trailerUrl}/movie/upcoming?api_key=${apiKey}`
    );
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("Error fetching upcoming movies:", error);
    return [];
  }
}

// Function to fetch movie trailers for a movie ID
async function fetchMovieTrailers(movieId) {
  try {
    const response = await fetch(
      `${trailerUrl}/movie/${movieId}/videos?api_key=${apiKey}`
    );
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("Error fetching movie trailers:", error);
    return [];
  }
}

// Function to create a card for each movie trailer
function createMovieCard(trailer) {
  const card = document.createElement("div");
  card.classList.add("Trailer-card");

  const title = document.createElement("h3");
  title.textContent = trailer.name;
  card.appendChild(title);

  const video = document.createElement("iframe");
  video.src = `https://www.youtube.com/embed/${trailer.key}`;
  video.setAttribute("frameborder", "0");
  video.setAttribute("allowfullscreen", "true");
  card.appendChild(video);

  return card;
}

// Function to display movie trailers in card format
function displayMovieTrailers(trailers) {
  const container = document.getElementById("trailer-container");

  // Filter trailers that contain "trailer" in their name
  const filteredTrailers = trailers
    .filter((trailer) => {
      const trailerName = trailer.name.toLowerCase();
      return trailerName.includes("trailer");
    })
    .splice(1, 8);

  filteredTrailers.forEach((trailer) => {
    const card = createMovieCard(trailer);
    container.appendChild(card);
  });
}

// Example usage
fetchUpcomingMovies()
  .then((movies) => {
    // Fetch trailers for all upcoming movies
    if (movies.length > 0) {
      const movieIds = movies.map((movie) => movie.id);
      return Promise.all(movieIds.map(fetchMovieTrailers));
    } else {
      return Promise.reject("No upcoming movies found.");
    }
  })
  .then((trailersArray) => {
    const trailers = trailersArray.flat();
    displayMovieTrailers(trailers);
  })
  .catch((error) => {
    console.error("Error:", error);
  });
