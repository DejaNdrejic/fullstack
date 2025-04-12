import React from 'react'
import {useState, useEffect} from 'react'
import axios from 'axios'


function ShowWeather({country}) {
  const city=country.capital[0]
  const [weather, setWeather] = useState(null)
  const api_key=import.meta.env.VITE_WEATHER_KEY
  console.log('API KEY: ',api_key, 'CITY: ',city)
  useEffect(() => {
    if (!city || !api_key) return
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}&units=metric`
    axios
      .get(url)
      .then(response => {
       if (response.data?.main && response.data?.wind && response.data?.weather?.[0]) {
          setWeather({
            temp: response.data.main?.temp?.toFixed(), 
            wind: response.data.wind?.speed,
            icon: response.data.weather[0]?.icon
          })
       }
      })
        .catch(error => console.error('Error', error))
  },[city,api_key])
  if (!weather) return <div>Loading weather data...</div>
  return (
    <>
      <h2>Weather in {city}</h2>
      <p>Temperature {weather.temp} Celsius</p>
      <img src={`http://openweathermap.org/img/wn/${weather.icon}@2x.png`} />
      <p>Wind {weather.wind} m/s</p>
    </>
  ) 
}

export default ShowWeather
