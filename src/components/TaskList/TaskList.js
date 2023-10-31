import React from 'react'
import './TaskList'

import Task from '../Task'

const TaskList = () => {
  return (
    <ul className="todo-list">
      <Task className="completed" label="CompletedTask" />
      <Task className="editing" label="EditingTask" />
      <Task label="ActiveTask" />
    </ul>
  )
}

export default TaskList
