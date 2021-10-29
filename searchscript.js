// let apiUrl = `http://www.omdbapi.com/?apikey=1bee8ffd&i=${idMovie}`;
// fetch(apiUrl)
//   .then((response) => {
//     return response.json();
//   })
//   .then((result) => {
//     addMovieToDetail(result);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

window.onload = () => {
  moviesearch = location.search.split("=").pop();
  let apiUrl = `http://www.omdbapi.com/?apikey=1bee8ffd&s=${moviesearch}`;
  fetch(apiUrl)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      console.log(result);
      if (result.Response) {
        result.Search.map((element) => {
          addMovieToList(element);
        });
      } else {
        console.log("movie not found");
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

const addMovieToList = (source) => {
  carousel.innerHTML += `<div href="detailed.html" class = "tile-movie"  data-id = ${
    source.imdbID
  } onclick="savedata(this)">
  <img src = ${source.Poster} />
  <div>
  <p class = "title-movie">${source.Title.toUpperCase()}</p>
  <p class = 'year-movie'>${source.Year}</p>
  </div>
  </div>`;
};
