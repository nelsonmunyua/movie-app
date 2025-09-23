// Method to attach an event handler to the document object
document.addEventListener("DOMContentLoaded", () => {
    // This line of code loads a class element into js for DOM manipulation
  const genreList = document.querySelector(".genre-list");
  const moviesList = document.querySelector(".movies-list");

  const baseUrl = "https://api.themoviedb.org/3/";
  const apiKey = "50a540b448a228f9f2f710a36c248b31";

  // Add an event listener to the parent <ul> element (event delegation)
  genreList.addEventListener("click", (event) => {
    // This code listens for the click event and cross checks if it is the expected element that was clicked
    const clickedGenre = event.target;
    if (clickedGenre.tagName === "LI") {
      const genreId = clickedGenre.dataset.id;
      fetchMoviesByGenre(genreId);
    }
  });

  //Function to fetch all the movies details belonging to each individual genre
  const fetchMoviesByGenre = (genreId) => {
    fetch(`${baseUrl}discover/movie?api_key=${apiKey}&with_genres=${genreId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP Error:${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        if (moviesList) {
            moviesList.innerHTML = '';
            data.results.forEach(movie => {
                const movieItem = document.createElement('div');
                movieItem.textContent = movie.title;
                moviesList.appendChild(movieItem);
            })
        }
      });
  };

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
           const genreLink = document.createElement('a');
           genreLink.href = `genre.html?id=${genre.id}&name=${encodeURIComponent(genre.name)}`
           genreLink.textContent = genre.name;


          // set the data-id attribute with genre's ID
          listItem.dataset.id = genre.id;

          // set the data-name attribute with genre's name
          listItem.textContent = genre.name;
          
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
