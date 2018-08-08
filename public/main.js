const baseUrl = 'https://api.openweathermap.org/data/2.5/' 

const search = (event) => {
  event.preventDefault()
  document.querySelector('.currentWeather').textContent = 'Current Weather in:'
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

document.querySelector('form').addEventListener('submit', search)
document.querySelector('.checkButton').addEventListener('click', search)
