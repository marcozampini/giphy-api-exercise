const apiKey = 'y3bqReRxFqF6B636EYqM64egUF8j8pDs'
const numberOfImages = 4

const formElement = document.querySelector('#form')
const cityInput = formElement.querySelector('input#city')

function publishGifs(gifData) {
  console.log('publishGifs called')
  const picture = document.createElement('picture')
  gifData.forEach((gif) => {
    let imgUrl = gif.images.fixed_height.url
    let img = document.createElement('img')

    img.src = imgUrl
    picture.appendChild(img)
  })
  document.body.appendChild(picture)
}

function getAndPublishGifs(city) {
  const apiUrl = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${city}&limit=${numberOfImages}`
  const responsePromise = fetch(apiUrl)
  //console.log(responsePromise)
  const gifData = responsePromise
    .then((res) => {
      return res.json()
    })
    .then((gifObjectData) => {
      console.log('gifObjectData.data', gifObjectData.data)
      publishGifs(gifObjectData.data)
    })
}

formElement.addEventListener('submit', (event) => {
  event.preventDefault()
  getAndPublishGifs(cityInput.value)
})
