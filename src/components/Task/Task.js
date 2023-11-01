import React from 'react'
import './Task.css'

import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const Task = (props) => {
  return (
    <li className={props.className}>
      <div className="view">
        <input className="toggle" type="checkbox"></input>
        <label>
          <span className="description">{props.label}</span>
          <span className="created">
            {formatDistanceToNow(new Date(props.time))}
          </span>
        </label>
        <button className="icon icon-edit"></button>
        <button className="icon icon-destroy"></button>
      </div>
    </li>
  )
}

export default Task
