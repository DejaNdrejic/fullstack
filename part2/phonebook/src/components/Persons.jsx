import React from 'react'
import Person from './Person'

function Persons({show, handleDelete}) {
  return show.map((p) => (
      <Person key={p.id} id={p.id} name={p.name} number={p.number} handleDelete={handleDelete}/>
  ))
}

export default Persons
