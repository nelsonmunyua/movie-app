document.addEventListener("DOMContentLoaded", () => {
    const genreList = document.querySelector('.genre-list');

  const baseUrl = "https://api.themoviedb.org/3/";
  const apiKey = "50a540b448a228f9f2f710a36c248b31";


//   // Specify the endpoint to use.

//   //const endPoint = "movie/popular";

//   // Add the API key as the query parameter
//   const fullUrl = `${baseUrl}${endPoint}?api_key=${apiKey}`;

//   fetch(fullUrl)
//     .then((response) => {
//       if (!response.ok) {
//         // Check for network errors
//         throw new Error(`HTTP error: ${response.status}`);
//       }
//       return response.json();
//     })
//     .then((data) => {
//       // Log data to the console
//       console.log(data);
//     })
//     .catch((error) => {
//       // Catch any errors that occur during the fetch operation
//       console.error("Fetch error:", error);
//     });
fetch(`${baseUrl}genre/movie/list?api_key=${apiKey}`)
.then((response) => {
    if(!response.ok) {
        throw new Error(`HTTP Error:${response.status}`)
    }
    return response.json();
})
.then((data) => {
    // clear any exixsting content
    if (genreList) {
    genreList.innerHTML = '';

    data.genres.forEach((genre) => {
        const listItem = document.createElement('li');

        listItem.textContent = genre.name;
        console.log(listItem);
        genreList.appendChild(listItem)
    });
}else {
    console.error("The element with class 'genre-list' was not found")
}
})
.catch((error) => {
    console.error("Fetch error:", error);
});
});