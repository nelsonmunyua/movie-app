document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const genreId = urlParams.get("id");
  const genreName = urlParams.get("name");

  if (!genreId || !genreName) {
    console.error("Genre ID or name missing from URL");
    return;
  }

  const baseUrl = "https://api.themoviedb.org/3/";
  const apiKey = "50a540b448a228f9f2f710a36c248b31";
  const posterBaseUrl = "https://image.tmdb.org/t/p/w500";

  const genreTitleElem = document.getElementById('genre-title');
  const genreDescElem = document.getElementById('genre-description');
  const movieGridElem = document.querySelector('.movie-grid');
  const loadingIndicator = document.querySelector('.loading-indicator');
  const sentinel = document.querySelector('.sentinel');

  // Set the title and description dynamically
  genreTitleElem.textContent = `${genreName} Movies & TV Shows`;
  genreDescElem.textContent = `Welcome to the edge of your seat, because it's time to dive into the ${genreName}.`;

  let currentPage = 1;
  let isLoading = false;

  const fetchMovies = (page) => {
    if (isLoading) return;
    isLoading = true;
    loadingIndicator.style.display = 'block';

    fetch(`${baseUrl}discover/movie?api_key=${apiKey}&with_genres=${genreId}&page=${page}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP Error: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        // Render the movies here
        data.results.forEach((movie) => {
          const movieCard = document.createElement('div');
          movieCard.classList.add('movie-card');
          const posterPath = movie.poster_path ? `${posterBaseUrl}${movie.poster_path}` : 'placeholder.png';
          movieCard.innerHTML = `
            <img src="${posterPath}" alt="${movie.title}">
            <div class="movie-title">${movie.title}</div>
          `;
          movieGridElem.appendChild(movieCard);
        });

        currentPage++; // Increment page only after a successful render
      })
      .catch((error) => {
        console.error("Fetch movies error:", error);
      })
      .finally(() => {
        isLoading = false;
        loadingIndicator.style.display = 'none';
      });
  };
  
  // IntersectionObserver logic to trigger `fetchMovies`
  // when the user scrolls to the sentinel element.
  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      fetchMovies(currentPage);
    }
  });

  observer.observe(sentinel);
  
});