import React from 'react'
import './Header.css'

import NewTaskForm from '../NewTaskForm'

const Header = () => {
  return (
    <header className="header">
      <h1>todos</h1>
      <NewTaskForm />
    </header>
  )
}

export default Header
