import React from 'react'
import './NewTaskForm.css'

const NewTaskForm = () => {
  return (
    <div>
      <input
        className="new-todo"
        placeholder="What needs to be done?"
        autoFocus
      ></input>
    </div>
  )
}

export default NewTaskForm
