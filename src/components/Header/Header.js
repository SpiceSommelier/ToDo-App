import React from 'react'
import './Header.css'

import NewTaskForm from '../NewTaskForm'

const Header = (props) => {
  return (
    <header className="header">
      <h1>todos</h1>
      <NewTaskForm onTaskAdded={props.onAddedTask} />
    </header>
  )
}

export default Header
