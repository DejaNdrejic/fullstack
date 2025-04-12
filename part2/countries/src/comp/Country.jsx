import React from 'react'
import ShowWeather from './Weather'

function ShowOneCountry({country}) {
  return (
      <div>
        <h1>{country.name.common}</h1>
        <p>Capital {country.capital}</p>
        <p>Area {country.area}</p>
        <h2>Languages</h2>
        <ul>
          {Object.values(country.languages).map((l, i) =>  (
            <li key={i}>{l}</li>
          ))}
        </ul>
        <img
          src={country.flags.png}
          style={{
            width: '200px',
            border: '1px solid #ccc',
            marginTop: '10px'
          }}/>
       <ShowWeather country={country} />
      </div>
    )
}
export default ShowOneCountry
