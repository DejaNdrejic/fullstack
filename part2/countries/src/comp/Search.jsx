import React from 'react'
import {useState, useEffect} from 'react'
import ShowOneCountry from './Country'

function SearchResults({countries}) {
  const [selectedCountry, setSelectedCountry] = useState(null)

// reset selected when countries change
  useEffect(() => {
    setSelectedCountry(null)
  }, [countries])

  if (countries.length > 10){
    return <p>To many matches, specify another filter</p>
  } 
  else if(countries.length <= 10 && countries.length > 1) {
      return (
      <div>
      <ul>
        {countries.map(c => (
          <li key={c.cca3}>
            {c.name.common}
            <button onClick={() => setSelectedCountry(c)}>Show</button>
          </li>
        ))}
      </ul>
      {selectedCountry && <ShowOneCountry country={selectedCountry} />}
      </div>
      )
  } 
  else if(countries.length === 1) {
     return <ShowOneCountry country={countries[0]}/>
    } 
  else {
      return null
      }
  }

export default SearchResults

