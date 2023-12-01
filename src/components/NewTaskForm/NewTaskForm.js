import React, { useState } from 'react'
import './NewTaskForm.css'

const NewTaskForm = ({ onTaskAdd }) => {
  const [label, setLabel] = useState('')
  const [min, setMin] = useState('')
  const [sec, setSec] = useState('')

  const inputChange = (evt, name) => {
    const { value } = evt.target
    if (name === 'min' || name === 'sec') {
      const parsedValue = parseInt(value)
      if (!isNaN(parsedValue)) {
        if (parsedValue >= 0) {
          switch (name) {
            case 'min':
              setMin(parsedValue)
              break
            case 'sec':
              setSec(parsedValue)
              break
            default:
          }
        }
      }
    } else {
      if (value[0] !== ' ') {
        setLabel(value)
      }
    }
  }

  const onFormSubmit = () => {
    if (label && (min || min === 0) && sec) {
      onTaskAdd(label, min, sec)
      setLabel('')
      setSec('')
      setMin('')
    }
  }

  const formSubmit = (evt) => {
    if (evt.key === 'Enter') {
      onFormSubmit()
    }
  }

  return (
    <form onSubmit={formSubmit} className="new-todo-form" noValidate={true}>
      <input
        className="new-todo"
        placeholder="What needs to be done?"
        autoFocus
        onChange={(evt) => {
          inputChange(evt, 'label')
        }}
        value={label}
        type="text"
        onKeyDown={formSubmit}
      />
      <input
        className="new-todo-form__timer"
        placeholder="Min"
        value={min}
        onChange={(evt) => {
          inputChange(evt, 'min')
        }}
        type="text"
        onKeyDown={formSubmit}
      />
      <input
        className="new-todo-form__timer"
        placeholder="Sec"
        value={sec}
        onChange={(evt) => {
          inputChange(evt, 'sec')
        }}
        type="text"
        onKeyDown={formSubmit}
      />
    </form>
  )
}

export default NewTaskForm
