import React from 'react'

function PersonForm({add, name, number, newNumber, newName}) {
  return (      
    <div>
      <form onSubmit={add}>
          <div>
            <label htmlFor="name">Name:</label>
            <input id="name"onChange={name} value={newName} placeholder="name" /><br/>
            <label htmlFor="number">Number:</label>
            <input id="number"onChange={number} value={newNumber} placeholder="number" />
          </div>
          <div>
            <button type="submit">add</button>
          </div>
        </form>
    </div>
 )
}

export default PersonForm
