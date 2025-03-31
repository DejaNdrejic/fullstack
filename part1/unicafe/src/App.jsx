import { useState } from 'react'

const Button = ({onClick,  text}) => {
    return <button onClick={onClick}>{text}</button>
    } 
const StatisticLine = ({text, value}) => {
    return <tr><td>{text}</td> <td>{value}</td></tr>
}
const Statistics = ({good, neutral, bad}) => {
    const sum=good+bad+neutral
    const average=((good - bad) / sum).toFixed(1)
    const positive = `${((good / sum) * 100).toFixed(1)} %`
    return sum === 0 ? (<p>No feedback was given</p>) : 
        (
        <table>
            <tbody>
              <StatisticLine text="good" value={good}/>
              <StatisticLine text="neutral" value={neutral}/>
              <StatisticLine text="bad" value={bad}/>
              <StatisticLine text="average" value={average}/>
              <StatisticLine text="positive" value={positive}/>
            </tbody>
        </table>
    )
}
const App = () => {
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)
    return (
        <div>
            <h2>give feedback</h2>
            <div style={{ marginBottom: '1rem' }}>
                <Button text='good' onClick = {() => setGood(good + 1)} />
                <Button text='bad' onClick = {() => setBad(bad + 1)} />
                <Button text='neutral' onClick = {() => setNeutral(neutral + 1)}/>
            </div>
            <h2>statistics</h2>
            <Statistics good={good} neutral={neutral} bad={bad} />
        </div>
    )
}
export default App
    
