import React, { Component } from 'react'
import './Task.css'

import formatDistanceToNow from 'date-fns/formatDistanceToNow'

export default class Task extends Component {
  state = {
    editing: false,
    newTaskText: '',
  }

  onEditClick = () => {
    this.setState(({ editing }) => {
      return {
        editing: !editing,
      }
    })
  }

  editTask = (evt) => {
    evt.preventDefault()
    this.props.onEdit(this.state.newTaskText)
    this.setState({
      newTaskText: '',
      editing: false,
    })
  }

  onEdit = (evt) => {
    if (evt.target.value) {
      this.setState({
        newTaskText: evt.target.value,
      })
    }
  }

  render() {
    const { label, time, active, onDeleted, onToggleDone } = this.props

    let className = ''
    if (!active) className += ' completed'
    if (this.state.editing) className += ' editing'

    return (
      <li className={className}>
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
          <button
            className="icon icon-edit"
            onClick={this.onEditClick}
          ></button>
          <button className="icon icon-destroy" onClick={onDeleted}></button>
        </div>
        <form onSubmit={this.editTask}>
          <input
            className="edit"
            type="text"
            onChange={this.onEdit}
            value={this.state.newTaskText}
          ></input>
        </form>
      </li>
    )
  }
}
