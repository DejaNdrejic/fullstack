import React from 'react'
import Header from './Header'
import Content from './Content'

function Course ({course}) {
  return (
    <>
      <Header course={course}/> 
      <Content course={course}/>
    </>
  )
}

export default Course
