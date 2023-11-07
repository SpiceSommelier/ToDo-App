import React, { Component } from 'react'
import './TaskFilter.css'

export default class TaskFilter extends Component {
  state = {
    All: true,
    Active: false,
    Completed: false,
  }

  setFilter = (evt) => {
    const {textContent} = evt.target
    this.props.taskFilter(textContent)
    try {
      this.setState((state) => {
        const newState = { ...state }
        for (let el in newState) {
          newState[el] = false
        }
        newState[textContent] = true
        return newState
      })
    } catch (error) {
      console.log(error)
    }
  }

  highlightElement = (element) => {
    if (this.state[element]) return 'selected'
  }

  render() {
    return (
      <ul className="filters" onClick={this.setFilter}>
        <li>
          <button className={this.highlightElement('All')}>All</button>
        </li>
        <li>
          <button className={this.highlightElement('Active')}>Active</button>
        </li>
        <li>
          <button className={this.highlightElement('Completed')}>
            Completed
          </button>
        </li>
      </ul>
    )
  }
}
