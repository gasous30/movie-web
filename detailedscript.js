window.onload = () => {
  idMovie = location.search.split("=").pop();

  let apiUrl = `http://www.omdbapi.com/?apikey=1bee8ffd&i=${idMovie}`;
  fetch(apiUrl)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      addMovieToDetail(result);
    })
    .catch((err) => {
      console.log(err);
    });

  const addMovieToDetail = (source) => {
    document.title = `${source.Title} - MOVIE.ID`;
    const maincontent = document.getElementById("main-content");
    console.log(maincontent);
    maincontent.innerHTML += `
    <img src="${source.Poster}"/>
    <div class="text-content">
    <h2>${source.Title}</h2>
    <p>Released: ${source.Released}</p>
    <p>Genre: ${source.Genre}</p>
    <p>Duration: ${source.Runtime}</p>
    <p>Rated: ${source.Rated}</p>
    <p>Plot: ${source.Plot}</p>
    <div class='column-rating'>
    <div class="imdbrating">
    <p>RATING</p>
    <p>${source.imdbRating}/10.0</p>
    </div>
    <div class="imdbvotes">
    <p>VOTES</p>
    <p>${source.imdbVotes}</p>
    </div>
    <div class="metascore">
    <p>SCORE</p>
    <p>${source.Metascore}</p>
    </div>

    </div>
    </div>`;
  };
};

const searchmovie = (event) => {
  event.preventDefault();
  const searchname = document.getElementById("searchname").value;
  window.location.href = "/index.html?searchQuery=" + searchname;
};
