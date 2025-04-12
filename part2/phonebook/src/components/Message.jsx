import React from 'react'

function Message({message, type}) {
  if(message === null){
    return null
  }
  if (!type){
    return (
      <div className='error'>
        {message}
      </div>
    )
  }
    return (
      <div className='success'>
        {message}
      </div>
    )
}
export default Message
