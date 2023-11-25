import React from 'react'
import './Header.css'

import NewTaskForm from '../NewTaskForm'

const Header = ({onTaskAdd}) => {
  return (
    <header className="header">
      <h1>todos</h1>
      <NewTaskForm onTaskAdd={onTaskAdd} />
    </header>
  )
}

export default Header
