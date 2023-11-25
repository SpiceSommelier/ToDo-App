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
      return new TypeError(`${componentName}: ${propName} must be a Date object or string`)
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
    isTimerActive: false,
    timer: this.props.timer,
    timerLink: null,
  }

  stopTimer = () => {
    const { timerLink } = this.state
    if (timerLink) {
      clearInterval(timerLink)
    }
  }

  componentDidUpdate = () => {
    const { timerLink, timer } = this.state
    if (timer.sec <= 0 && timer.min <= 0) clearInterval(timerLink)
  }

  startTimer = () => {
    const timerInterval = setInterval(() => {
      this.setState(({ timer }) => {
        const newTimer = { ...timer }
        if (newTimer.sec === 0) {
          newTimer.min = newTimer.min - 1
          newTimer.sec = 60
        }
        newTimer.sec = newTimer.sec - 1
        return {
          timer: newTimer,
        }
      })
    }, 1000)
    this.setState({
      timerLink: timerInterval,
    })
  }

  onEditClick = () => {
    clearInterval(this.state.timerLink)
    this.setState(({ editing }) => {
      return {
        editing: !editing,
        newTaskText: this.props.label,
      }
    })
  }

  spaceCheck = (s) => {
    if (s.trim() !== '') return true
    return false
  }

  editTask = (evt) => {
    evt.preventDefault()
    const { onEdit, label } = this.props
    const { newTaskText } = this.state
    if (this.spaceCheck(newTaskText)) onEdit(newTaskText)
    this.setState({
      newTaskText: label,
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
    const { editing, timer, newTaskText } = this.state
    let className = ''
    if (!active) className += ' completed'
    if (editing) className += ' editing'

    return (
      <li className={className}>
        <div className="view">
          <input className="toggle" type="checkbox" onChange={onToggleDone} checked={!active} />
          <label>
            <span className="title" onClick={onToggleDone}>
              {label}
            </span>
            <span className="description">
              <button className="icon icon-play" onClick={this.startTimer} />
              <button className="icon icon-pause" onClick={this.stopTimer} />
              {timer.min}:{timer.sec}
            </span>
            <span className="description">{formatDistanceToNow(new Date(time)) + ' ago'}</span>
          </label>
          <button className="icon icon-edit" onClick={this.onEditClick} />
          <button className="icon icon-destroy" onClick={onDeleted} />
        </div>
        <form onSubmit={this.editTask}>
          <input className="edit" type="text" onChange={this.editTaskText} value={newTaskText} />
        </form>
      </li>
    )
  }
}
