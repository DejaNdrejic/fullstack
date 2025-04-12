import React from 'react'

function Person({name, number, id, handleDelete}) {
  return (
    <>
      <p>
        {name} {number}
        <button onClick={() => handleDelete(id)}>
          delete
        </button>
      </p>
    </>
  )
}

export default Person
