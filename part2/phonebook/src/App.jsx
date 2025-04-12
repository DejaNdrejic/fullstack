import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm' 
import Persons from './components/Persons'
import service from './service/service'
import Message from './components/Message'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [message, setMessage] = useState('')
  const [isOk, setIsOk] = useState(true)

// fetch data from server and populate persons state
  useEffect(() => {
    service
      .getAll()
      .then(initialNotes => {
        setPersons(initialNotes)
      })
  }, [])

  const filteredPersons = persons.filter(p => 
     p.name.toLowerCase().includes(searchTerm.toLowerCase())
  )
  const displayPersons = filteredPersons.length === 0 ? persons : filteredPersons

// add new person, if exists in db prompt to update number
  function addOrUpdate(e) {
    e.preventDefault()
    const newPeople = {
      name: newName,
      number: newNumber,
    }
    const existingPerson = persons.find(p => newPeople.name === p.name)
    if (existingPerson) {
      if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const updatedPerson = {...existingPerson, number: newPeople.number}
        service
        .updatePeople(updatedPerson)
        .then(response => {
          setIsOk(true)
          setPersons(persons.map(p => p.id === response.id ? response : p))
          newMessage(`Number of ${newPeople.name} updated`)
          setNewName('')
          setNewNumber('')
        })
        .catch((error) => {
          setIsOk(false)
          newMessage(`Information of ${newPeople.name} has already been removed from server`)
        })
      }
    } else {
      service
        .addPeople(newPeople)
        .then(response => {
          setPersons(persons.concat(response))
          setIsOk(true)
          newMessage(`Added ${newPeople.name}`)
          setNewName('')
          setNewNumber('')
        })
        .catch((error) => {
          setIsOk(false)
          newMessage(`Error`)
        })
    }
  }
// remove a person from db, ask for confirmation
  function removePerson(id) {
    const person = persons.find(p => p.id === id)
    const confirmation = window.confirm(`Delete ${person?.name}?`)
    if(confirmation) {
      service
        .deletePeople(id)
        .then(() => {
          setPersons(prev => prev.filter(p => (p.id !== id)))
          setIsOk(true)
          newMessage(`Deleted ${person.name} from server`)
        })
        .catch((error) => {
            setIsOk(false)
            newMessage(`That persons is not in the phonebook`)
        })
    }
  }
  function newMessage(msg) {
    setMessage(msg)
    setTimeout(() => {
      setMessage(null)
    },3000)
  }

  function handleNameChange(e) {
    setNewName(e.target.value) 
  }
  function handleNumberChange(e) {
    setNewNumber(e.target.value) 
  }
  function handleSearch(e) {
    setSearchTerm(e.target.value)
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <Message message={message} type={isOk}/>
      <Filter search={handleSearch}/>
      <h3>add a new</h3>
      <PersonForm add={addOrUpdate} name={handleNameChange} 
        number={handleNumberChange} newNumber={newNumber} newName={newName}/>
      <h3>Numbers</h3>
      <Persons show={displayPersons} handleDelete={removePerson}/>
    </div>
  )
}

export default App
