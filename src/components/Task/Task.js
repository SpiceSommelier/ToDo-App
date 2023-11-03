import React, { Component } from 'react'
import './Task.css'

import formatDistanceToNow from 'date-fns/formatDistanceToNow'

export default class Task extends Component {
  render() {
    const { label, time, active, onDeleted, onToggleDone } = this.props

    let className = ''
    if (!active) className = 'completed'

    return (
      <li className={className} >
        <div className="view">
          <input
            className="toggle"
            type="checkbox"
            onChange={onToggleDone}
            checked={!active}
          ></input>
          <label>
            <span className="description" onClick={onToggleDone}>
              {label}
            </span>
            <span className="created">
              {formatDistanceToNow(new Date(time))}
            </span>
          </label>
          <button className="icon icon-edit"></button>
          <button className="icon icon-destroy" onClick={onDeleted}></button>
        </div>
      </li>
    )
  }
}
