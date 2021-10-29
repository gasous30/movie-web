const carousel = document.getElementById("carousel");

window.onload = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const searchQuery = urlParams.get("searchQuery");
  if (searchQuery !== null) {
    document.title = `searching "${searchQuery}" - MOVIE.ID`;
    let apiUrl = `http://www.omdbapi.com/?apikey=1bee8ffd&s=${searchQuery}`;
    fetch(apiUrl)
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        console.log(result);
        if (result.Response == "True") {
          document.getElementById("sub-menu").innerHTML = `
          <h2>SEARCHING "${searchQuery.toUpperCase()}"</h2>
          `;
          result.Search.map((element) => {
            addMovieToList(element);
          });
        } else {
          document.getElementById("sub-menu").innerHTML = `
          <h2>"${searchQuery.toUpperCase()}" NOT FOUND</h2>
          `;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    let topRatedMoviesID = [
      "tt0111161",
      "tt0068646",
      "tt0071562",
      "tt0468569",
      "tt0050083",
      "tt0108052",
      "tt0167260",
      "tt0110912",
      "tt0060196",
      "tt0120737",
    ];
    topRatedMoviesID.map(async (movieID) => {
      let apiUrl = `http://www.omdbapi.com/?apikey=1bee8ffd&i=${movieID}`;
      fetch(apiUrl)
        .then((response) => {
          return response.json();
        })
        .then((result) => {
          addMovieToList(result);
        })
        .catch((err) => {
          console.log(err);
        });
    });
  }
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

let width = carousel.offsetWidth;
const scrollingbar = (rightleft) => {
  if (rightleft === "left") {
    carousel.scrollBy(-width, 0);
  } else {
    carousel.scrollBy(width, 0);
  }
};

const savedata = (elem) => {
  console.log(elem.href);
  sessionStorage.setItem("idMovie", elem.dataset.id);
  location.href = "/detailed.html?idMovie=" + sessionStorage.getItem("idMovie");
};

const searchmovie = (event) => {
  event.preventDefault();
  const searchname = document.getElementById("searchname").value;
  window.location.href = "/index.html?searchQuery=" + searchname;
};
