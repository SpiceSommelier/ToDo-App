import React from 'react'
import './Footer.css'

import TaskFilter from '../TaskFilter'

const Footer = ({ activeCount, taskFilter, removeDone }) => {
  return (
    <footer className="footer">
      <span className="todo-count">{activeCount} items left</span>
      <TaskFilter taskFilter={taskFilter} />
      <button className="clear-completed" onClick={removeDone}>
        Clear completed
      </button>
    </footer>
  )
}

export default Footer
