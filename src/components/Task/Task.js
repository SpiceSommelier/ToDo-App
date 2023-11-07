import React, { Component } from 'react'
import './Task.css'

import formatDistanceToNow from 'date-fns/formatDistanceToNow'

export default class Task extends Component {
  static defaultProps = {
    onDeleted: () => {
      console.warn('Default task onDeleted')
    },
    onToggleDone: () => {
      console.warn('Default task onToggleDone')
    },
    onEdit: () => {
      console.warn('Default task onEdit')
    },
    label: 'Default label',
    time: new Date(),
    active: true,
  }

  static propTypes = {
    label: (props, propName, componentName) => {
      const value = props[propName]
      if (typeof value === 'string') return null
      return new TypeError(`${componentName}: ${propName} must be a string`)
    },
    time: (props, propName, componentName) => {
      const value = props[propName]
      if (value instanceof Date || typeof value === 'string') return null
      return new TypeError(
        `${componentName}: ${propName} must be a Date object or string`
      )
    },
    active: (props, propName, componentName) => {
      const value = props[propName]
      if (typeof value === 'boolean') return null
      return new TypeError(`${componentName}: ${propName} must be a boolean`)
    },
  }

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
    const { onEdit } = this.props
    const { newTaskText } = this.state
    onEdit(newTaskText)
    this.setState({
      newTaskText: '',
      editing: false,
    })
  }

  editTaskText = (evt) => {
    const { value } = evt.target
    if (value) {
      this.setState({
        newTaskText: value,
      })
    }
  }

  render() {
    const { label, time, active, onDeleted, onToggleDone } = this.props
    const { editing, newTaskText } = this.state
    let className = ''
    if (!active) className += ' completed'
    if (editing) className += ' editing'

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
            onChange={this.editTaskText}
            value={newTaskText}
          ></input>
        </form>
      </li>
    )
  }
}
