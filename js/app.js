let pageCount = 1

const API_KEY = "76844f7e-9823-436f-b686-587c52dccbfd"
const TOP_100_POPULAR_FILMS =
  "https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_100_POPULAR_FILMS&page="

const TOP_250_BEST_FILMS =
  "https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_250_BEST_FILMS&page="

let ACTIVE_URL =
  "https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_100_POPULAR_FILMS&page="

const API_URL_SEARCH =
  "https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword="

getMovies(TOP_100_POPULAR_FILMS + pageCount)

async function getMovies(url) {
  const response = await fetch(url, {
    headers: {
      "Content-Type": "Application/json",
      "X-API-KEY": API_KEY,
    },
  })
  const respdata = await response.json()
  showMovies(respdata)
}

function getClassByRate(params) {
  if (params > 7 || params > "70%") {
    return "green"
  } else if (params > 5 || params > "50%") {
    return "orange"
  } else {
    return "red"
  }
}

const top100list = document.querySelector(".top-100-popular")
top100list.addEventListener("click", (event) => {
  ACTIVE_URL = TOP_100_POPULAR_FILMS
  pageCount = 1
  getMovies(TOP_100_POPULAR_FILMS + pageCount)
})

const top250list = document.querySelector(".top-250-best")
top250list.addEventListener("click", (event) => {
  ACTIVE_URL = TOP_250_BEST_FILMS
  pageCount = 1
  getMovies(TOP_250_BEST_FILMS + pageCount)
})

function showMovies(data) {
  const moviesEl = document.querySelector(".movies")
  document.querySelector(".movies").innerHTML = ""

  data.films.forEach((movie) => {
    const movieEl = document.createElement("div")
    movieEl.classList.add("movie")
    movieEl.id = movie.filmId
    movieEl.innerHTML = `
    <div class="movie__cover-inner">
      <img
        src="${movie.posterUrlPreview}"
        alt="${movie.nameRu}"
        srcset=""
        class="movie__cover"
      />
      <div class="movie__cover--dark"></div>
    </div>
    <div class="movie__info">
      <div class="movie__title">${movie.nameRu}</div>
      <div class="movie__category">${movie.genres.map(
        (genre) => `${genre.genre}`
      )}</div>
      <div class="movie__average movie__average--${getClassByRate(
        movie.rating
      )}">${movie.rating === undefined ? "" : movie.rating}</div>
    </div>
    `
    movieEl.addEventListener("click", (event) => {
      getModal(API_URL_REVIEW + movieEl.id)
    })
    moviesEl.appendChild(movieEl)
  })
}

const form = document.querySelector("form")
const search = document.querySelector(".header__search")

form.addEventListener("submit", (e) => {
  e.preventDefault()

  const apiSearchUrl = `${API_URL_SEARCH}${search.value}`
  if (search.value) {
    getMovies(apiSearchUrl)
    search.value = ""
  }
})

const btnNext = document.querySelector(".pagination__next")
const btnPrev = document.querySelector(".pagination__prev")
const showPage = myPagination()
btnNext.addEventListener("click", (event) => {
  const pageList = myPagination(ACTIVE_URL)
  pageList.nextPage()
})
btnPrev.addEventListener("click", (event) => {
  const pageList = myPagination(ACTIVE_URL)
  pageList.prevPage()
})

function myPagination(options) {
  return {
    nextPage() {
      pageCount++
      console.log(pageCount)
      getMovies(options + pageCount)
    },
    prevPage() {
      if (pageCount > 1) {
        pageCount--
        console.log(pageCount)
        getMovies(options + pageCount)
      }
    },
  }
}
