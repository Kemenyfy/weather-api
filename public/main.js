const baseUrl = 'https://api.openweathermap.org/data/2.5/' 

const main = () => {
  document.querySelector('h1').textContent += '?'
}

const search = (event) => {
  event.preventDefault()
  key = 'e903bc8a5448f296f28f3882ea390d9d'
  console.log('searching')
  console.log(event)
  const zipCode = document.querySelector('.zipCode').value
  const _url = `${baseUrl}weather?q=${zipCode}&appid=${key}&units=metric`
  fetch(_url)
    .then(resp => {
      if (resp.status === 200) {
        return resp.json()
      } else {
        displayErrorMessage(resp)
      }
    })
    .then(list => {
      console.log(list)
    })
}

document.addEventListener('DOMContentLoaded', main)
document.querySelector('form').addEventListener('submit', search)
