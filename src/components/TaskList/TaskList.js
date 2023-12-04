import React from 'react'
import './TaskList.css'

import Task from '../Task'

const TaskList = ({ dataArray, onDeleted, onToggleDone, onEdit, onTimerChange }) => {
  const elements = dataArray.map((item) => {
    const { id, ...props } = item
    return (
      <Task
        {...props}
        key={id}
        onDeleted={() => onDeleted(id)}
        onToggleDone={() => onToggleDone(id)}
        onEdit={(newText) => onEdit(id, newText)}
        changeTimer={(action) => onTimerChange(id, action)}
      />
    )
  })

  return <ul className="todo-list">{elements}</ul>
}

export default TaskList
