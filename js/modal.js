const API_URL_REVIEW = "https://kinopoiskapiunofficial.tech/api/v2.1/films/"

const API_KEY_REVIEW = "76844f7e-9823-436f-b686-587c52dccbfd"

// getModal(API_URL_PREVIEW)

async function getModal(url) {
  const response = await fetch(url, {
    headers: {
      "Content-Type": "Application/json",
      "X-API-KEY": API_KEY_REVIEW,
    },
  })
  const respdata = await response.json()
  const modal = _createModal(respdata)

  return modal
}

function _createModal(params) {
  const modal = document.createElement("div")
  modal.classList.add("modal")
  modal.insertAdjacentHTML(
    "afterbegin",
    `
    <div class="modal__body" data-close="true">
    <div class="modal__content">
      <a href="#" class="modal__close close-modal" data-close="true">&times;</a>
      <div class="modal__middle">
        <div class="modal__img">
          <img class="modal__img" src="${
            params.data.posterUrl
          }" alt="film poster">
        </div>
        <div class="modal__film-info">
          <div class="modal__title">
            <p class="modal__title-ru">${params.data.nameRu}</p>
            <p class="modal__title-en">${params.data.nameEn}</p>
          </div>
          <p class="modal__film-year">Год выпуска: ${params.data.year}</p>
          <p class="modal__film-length">Продолжительность: ${
            params.data.filmLength === null
              ? "неизвестно"
              : params.data.filmLength
          }</p>
          <p class="modal__film-genres">Жанры:${params.data.genres.map(
            (genre) => `${genre.genre}`
          )}</p>
          <p class="modal__film-country">Страна: ${params.data.countries.map(
            (country) => `${country.country}`
          )}</p>
          <div class="age-limit">${params.data.ratingAgeLimits}+</div>
        </div>
      </div>
      <div class="modal__film-descr">
        <p>${params.data.description}</p>
      </div>
    </div>
  </div>
`
  )
  document.body.appendChild(modal)
  const myModal = showModal(modal)
  const openBtn = document.getElementsByClassName("movie")
  for (let index = 0; index < openBtn.length; index++) {
    const element = openBtn[index]
    element.addEventListener("click", myModal.open())
  }

  document.addEventListener("click", (event) => {
    if (event.target.dataset.close) {
      myModal.close()
    }
  })
  return modal
}

function showModal(params) {
  const $modal = params
  const movies = document.querySelector(".movies")
  return {
    open() {
      $modal.classList.add("open")
      setTimeout(() => {
        movies.classList.add("hide")
      }, 200)
    },
    close() {
      $modal.classList.remove("open")
      movies.classList.remove("hide")
    },
  }
}
