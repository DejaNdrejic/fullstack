import {useState, useEffect} from 'react'
import axios from 'axios'
import SearchResults from './comp/Search'

function App() {
  const [countries, setCountries] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const url ='https://studies.cs.helsinki.fi/restcountries/api/all'
  useEffect(() => {
    if(searchTerm) {
      axios
        .get(url)
        .then(response => {
          const filtered = response.data.filter(c =>{
            return c.name.common.toLowerCase().includes(searchTerm.toLowerCase())
          })
          setCountries(filtered) 
        })
    } else {
      setCountries([])
    }
  },[searchTerm])

  function handleChange(e) {
    setSearchTerm(e.target.value)
  }

  return (
    <div>
      Find countries: <input value={searchTerm} onChange={handleChange}/>
      <SearchResults countries={countries} />
    </div>
  )
}

export default App
