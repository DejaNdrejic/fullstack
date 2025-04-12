import React from 'react'

function Filter({search}) {
 return (
   <div>
      filter shown with
      <input 
        type="text"
        placeholder="search"
        onChange={search}
      />
    </div>
  ) 
}

export default Filter
