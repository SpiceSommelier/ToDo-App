import React, { useState } from 'react'
import './TaskFilter.css'

const TaskFilter = (props) => {
  const [All, setAll] = useState(true)
  const [Active, setActive] = useState(false)
  const [Completed, setCompleted] = useState(false)

  const setFilter = (evt) => {
    const { textContent } = evt.target
    props.taskFilter(textContent)
    try {
      setActive(false)
      setAll(false)
      setCompleted(false)
      switch (textContent) {
        case 'All':
          setAll(true)
          break
        case 'Active':
          setActive(true)
          break
        case 'Completed':
          setCompleted(true)
          break
        default:
          break
      }
    } catch (error) {
      console.log(error)
    }
  }

  const highlightElement = (element) => {
    const obj = { Active, Completed, All }
    if (obj[element]) return 'selected'
  }

  return (
    <ul className="filters" onClick={setFilter}>
      <li>
        <button className={highlightElement('All')}>All</button>
      </li>
      <li>
        <button className={highlightElement('Active')}>Active</button>
      </li>
      <li>
        <button className={highlightElement('Completed')}>Completed</button>
      </li>
    </ul>
  )
}

export default TaskFilter
