import React, { Component } from 'react'
import './NewTaskForm.css'

export default class NewTaskForm extends Component {
  state = {
    label: '',
  }
  onLabelChange = (evt) => {
    this.setState({
      label: evt.target.value,
    })
  }
  formSubmit = (evt) => {
    const { label } = this.state
    const { onTaskAdded } = this.props
    evt.preventDefault()
    if (label) {
      onTaskAdded(label)
    }
    this.setState({
      label: '',
    })
  }
  clearInput = (evt) => {
    evt.target.value = ''
  }
  render() {
    return (
      <form onSubmit={this.formSubmit}>
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          autoFocus
          onChange={this.onLabelChange}
          value={this.state.label}
        ></input>
      </form>
    )
  }
}
