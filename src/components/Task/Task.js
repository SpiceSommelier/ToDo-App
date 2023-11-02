import React, { Component } from 'react'
import './Task.css'

import formatDistanceToNow from 'date-fns/formatDistanceToNow'

export default class Task extends Component {
  state = {
    active: true,
    important: false,
  }

  changeTaskState = () => {
    this.setState(({ active }) => {
      return {
        active: !active,
      }
    })
  }

  render() {
    const { label, time, onDeleted } = this.props
    const { active } = this.state

    let className = ''
    if (!active) className = 'completed'

    return (
      <li className={className}>
        <div className="view">
          <input
            className="toggle"
            type="checkbox"
            onChange={this.changeTaskState}
            checked={!active}
          ></input>
          <label>
            <span className="description" onClick={this.changeTaskState}>
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
