import React, { Component } from 'react'
import './NewTaskForm.css'

export default class NewTaskForm extends Component {
  state = {
    label: '',
    min: '',
    sec: '',
  }

  inputChange = (evt, name) => {
    const { value } = evt.target
    if (name === 'min' || name === 'sec') {
      const parsedValue = parseInt(value)
      if (!isNaN(parsedValue)) {
        if (parsedValue >= 0) {
          this.setState({
            [name]: parsedValue,
          })
        }
      }
    } else {
      if (value[0] !== ' ') {
        this.setState({
          [name]: value,
        })
      }
    }
  }

  onFormSubmit = () => {
    const { label, min, sec } = this.state
    if (label && (min || min === 0) && sec) {
      this.props.onTaskAdd(label, min, sec)
      this.setState({
        label: '',
        sec: '',
        min: '',
      })
    }
  }

  formSubmit = (evt) => {
    if (evt.key === 'Enter') {
      this.onFormSubmit()
    }
  }

  render() {
    const { label, min, sec } = this.state
    return (
      <form onSubmit={this.formSubmit} className="new-todo-form" noValidate={true}>
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          autoFocus
          onChange={(evt) => {
            this.inputChange(evt, 'label')
          }}
          value={label}
          type="text"
          onKeyDown={this.formSubmit}
        />
        <input
          className="new-todo-form__timer"
          placeholder="Min"
          value={min}
          onChange={(evt) => {
            this.inputChange(evt, 'min')
          }}
          type="text"
          onKeyDown={this.formSubmit}
        />
        <input
          className="new-todo-form__timer"
          placeholder="Sec"
          value={sec}
          onChange={(evt) => {
            this.inputChange(evt, 'sec')
          }}
          type="text"
          onKeyDown={this.formSubmit}
        />
      </form>
    )
  }
}
