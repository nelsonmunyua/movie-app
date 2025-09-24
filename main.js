// Method to attach an event handler to the document object
document.addEventListener("DOMContentLoaded", () => {
  // This line of code loads a class element into js for DOM manipulation
  const genreList = document.querySelector(".genre-list");
  const searchInput = document.querySelector(".search-input");
  const searchDropdownResults = document.querySelector(
    "#search-dropdown-results"
  );

  const searchContainer = document.querySelector(".search-container");
  //const moviesList = document.querySelector(".movies-list");

  const baseUrl = "https://api.themoviedb.org/3/";
  const apiKey = "50a540b448a228f9f2f710a36c248b31";
  const posterBaseUrl = "https://image.tmdb.org/t/p/w200";

  //Fetch function for the search input(search functionality)
  const fetchSearchMovie = (query) => {
    if (query.length < 3) {
      searchDropdownResults.classList.remove("show");
      return;
    }

    const url = `${baseUrl}search/movie?api_key=${apiKey}&query=${encodeURIComponent(
      query
    )}`;
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        renderDropdownResults(data.results);
      })
      .catch((error) => {
        console.error("Fetch search error:", error);
        searchDropdownResults.innerHTML = `<div class="dropdown-item">Error fetching results.</div>`;
        searchDropdownResults.classList.add("show");
      });
  };

  // Function to render search results in the dropdown
  const renderDropdownResults = (results) => {
    // clear the previous search item
    searchDropdownResults.innerHTML = "";
    if (results.length > 0) {
      results.slice(0, 10).forEach((movie) => {
        const movieItem = document.createElement("div");
        movieItem.classList.add("dropdown-item");

        // Add eventlistner to each search result
        movieItem.addEventListener("click", () => {
          // redirect to a movie details page
           alert(`You clicked on: ${movie.title}`); // Placeholder action
          searchDropdownResults.classList.remove("show"); // Hide dropdown after click
        });

        const posterPath = movie.poster_path
          ? `${posterBaseUrl}${movie.poster_path}`
          : "placeholder.png";

        movieItem.innerHTML = `<img src="${posterPath}" alt="${movie.title}">
        <span class="title">${movie.title}</span>`;
        searchDropdownResults.appendChild(movieItem);
      });
      searchDropdownResults.classList.add("show");
    } else {
      searchDropdownResults.innerHTML = `<div class="dropdown-item">No results found.</div>`;
      searchDropdownResults.classList.add("show");
    }
  };

  // Listen for input in the search bar
  searchInput.addEventListener("input", (event) => {
    const query = event.target.value;
    fetchSearchMovie(query);
  });

  // Hide dropdown when clicking outside
  document.addEventListener("click", (event) => {
    if (!searchContainer.contains(event.target)) {
      searchDropdownResults.classList.remove("show");
    }
  });

  // Fetch the movie genre list
  fetch(`${baseUrl}genre/movie/list?api_key=${apiKey}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP Error:${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      // clear any exixsting content
      if (genreList) {
        genreList.innerHTML = "";

        data.genres.forEach((genre) => {
          const listItem = document.createElement("li");

          // Create an anchor tag that links to genre,html with URL parameter
          const genreLink = document.createElement("a");
          genreLink.href = `genre.html?id=${genre.id}&name=${encodeURIComponent(
            genre.name
          )}`;
          genreLink.textContent = genre.name;

          listItem.appendChild(genreLink);
          genreList.appendChild(listItem);
        });
      } else {
        console.error("The element with class 'genre-list' was not found");
      }
    })
    .catch((error) => {
      console.error("Fetch error:", error);
    });

});
