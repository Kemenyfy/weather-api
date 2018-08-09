class WeatherSearch {
  constructor(placeToSearch) {
    this.location = placeToSearch
  }
  getResults() {
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
        document.querySelector('.currentWeather').style.listStyle = "none"
        let name = new AddNameToDom(list.name)
        name.render()
        let currentTemp = new AddCurrentTempToDom(list.main.temp)
        currentTemp.render()
      })
  }

  craftURL() {

  }
}

class AddNameToDom {
  constructor(variableToAdd) {
    this.item = variableToAdd
  }
  render() {
    let newLi = document.createElement('li')
    newLi.textContent = this.item
    document.querySelector('.currentWeather').appendChild(newLi);
  }
}

class AddCurrentTempToDom {
  constructor(variableToAdd) {
    this.item = variableToAdd
  }
  render() {
    let newLi = document.createElement('li')
    newLi.textContent = this.item
    document.querySelector('.currentWeather').appendChild(newLi);
  }
}

class Geolocation {
  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.showPosition);
    } else {
      console.log('Geolocation is not supported by this browser.')
    }
  }
  showPosition(position) {
    const baseUrl = 'https://api.openweathermap.org/data/2.5/'
    const key = 'e903bc8a5448f296f28f3882ea390d9d'
    let LAT = position.coords.latitude
    let LON = position.coords.longitude
    console.log(LAT, LON)
    const _url = `${baseUrl}weather?lat=${LAT}&lon=${LON}&appid=${key}&units=metric`
    
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
      document.querySelector('.currentWeather').style.listStyle = "none"
      document.querySelector('.currentWeather').textContent = ""
        let name = new AddNameToDom(list.name)
        name.render()
        let currentTemp = new AddCurrentTempToDom(list.main.temp)
        currentTemp.render()
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

const localWeather = (event) => {
  document.querySelector('.currentWeather').textContent = ""
  document.querySelector('.currentWeather').textContent = "Finding your location..."
  console.log('Event Clicked')
  const localZipCode = new Geolocation()
  localZipCode.getLocation()
}

document.querySelector('form').addEventListener('submit', search)
document.querySelector('.localWeather').addEventListener('click', localWeather)
