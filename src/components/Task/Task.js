import React from 'react'
import './Task.css'

const Task = (props) => {
  return (
    <li className={props.className}>
      <div className="view">
        <input className="toggle" type="checkbox"></input>
        <label>
          <span className="description">{props.label}</span>
          <span className="created">created 17 seconds ago</span>
        </label>
        <button className="icon icon-edit"></button>
        <button className="icon icon-destroy"></button>
      </div>
    </li>
  )
}

export default Task
