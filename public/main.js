class WeatherSearch {
  constructor(placeToSearch) {
    this.location = placeToSearch
  }
  getResults () {
    const baseUrl = 'https://api.openweathermap.org/data/2.5/'
    const key = 'e903bc8a5448f296f28f3882ea390d9d'
    const _url = `${baseUrl}weather?q=${this.location}&appid=${key}&units=metric`
    fetch(_url)
      .then(resp => {
        if (resp.status === 200) {
          return resp.json()
        } else {
          displayErrorMessage(resp)
        }
      })
      .then(list => {
        console.log(list.name)
        console.log(list.main.temp)
        let newLi = document.createElement('li')
        newLi.textContent = list.name
        document.querySelector('.currentWeather').appendChild(newLi);
        newLi = document.createElement('li')
        newLi.textContent = list.main.temp
        document.querySelector('.currentWeather').appendChild(newLi);
        document.querySelector('.currentWeather').style.listStyle = "none"
      })
  }
}

const search = (event) => {
  event.preventDefault()
  document.querySelector('.currentWeather').textContent = 'Current Weather in:'
  console.log('searching')
  console.log(event)
  const zipCode = document.querySelector('.zipCode').value
  const search = new WeatherSearch(zipCode)
  search.getResults()
}


document.querySelector('form').addEventListener('submit', search)
document.querySelector('.checkButton').addEventListener('click', search)
