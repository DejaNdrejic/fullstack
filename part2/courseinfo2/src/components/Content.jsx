import React from 'react'
import Part from './Part'

function Content ({course}) {
const totalExercises = course.parts.reduce(
  (sum,part) => sum+part.exercises,0)
  return (
    <>
      {course.parts.map(part => {
        return <Part key={part.id} part={part}/>
      })}
      <p><strong>total of {totalExercises}</strong></p>
    </>
  )
}

export default Content
