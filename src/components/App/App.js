import React, { Component } from 'react'
import './App.css'

import Header from '../Header'
import TaskList from '../TaskList'
import Footer from '../Footer'

export default class App extends Component {
  localStorageKey = 'Tasks'

  state = JSON.parse(localStorage.getItem(this.localStorageKey))

  createToDoItem(label, active = true) {
    return {
      label,
      time: new Date(),
      active,
      id: new Date().getTime(),
    }
  }

  onToggleDone = (id) => {
    this.setState(({ dataArray }) => {
      const idx = this.findIndex(id)
      const newArr = [...dataArray]
      newArr[idx].active = !newArr[idx].active
      return {
        dataArray: newArr,
        filteredArray: newArr,
      }
    })
  }

  findIndex = (id) => {
    return this.state.dataArray.findIndex((el) => el.id === id)
  }

  deleteItem = (id) => {
    this.setState(({ dataArray, filteredArray }) => {
      const idx = this.findIndex(id)
      const newArr = [...dataArray.slice(0, idx), ...dataArray.slice(idx + 1)]
      localStorage.setItem(this.localStorageKey, JSON.stringify(newArr))
      return {
        dataArray: newArr,
        filteredArray: newArr,
      }
    })
  }

  addItem = (value) => {
    const newItem = this.createToDoItem(value)

    this.setState(({ dataArray }) => {
      const newArr = [...dataArray, newItem]
      localStorage.setItem(this.localStorageKey, JSON.stringify(newArr))
      return {
        dataArray: newArr,
        filteredArray: newArr,
      }
    })
  }

  taskFilter = (filterName = 'All') => {
    if (filterName === 'All') {
      this.setState(({ dataArray }) => {
        return {
          filteredArray: [...dataArray],
        }
      })
    }
    if (filterName === 'Active') {
      this.setState(({ dataArray }) => {
        const newArr = dataArray.filter((el) => el.active)
        return {
          filteredArray: newArr,
        }
      })
    }
    if (filterName === 'Completed') {
      this.setState(({ dataArray }) => {
        const newArr = dataArray.filter((el) => !el.active)
        return {
          filteredArray: newArr,
        }
      })
    }
  }

  removeDone = () => {
    this.setState(({ dataArray }) => {
      const newArr = dataArray.filter((el) => el.active)
      return {
        dataArray: newArr,
        filteredArray: newArr,
      }
    })
  }

  editItem = (id, newText) => {
    const { dataArray } = this.state
    const newArr = []
    for (let i = 0 ; i < dataArray.length; i++) {
      const el = dataArray[i]
      if (el.id === id) el.label = newText
      newArr.push(el)
    }    
    this.setState({
      dataArray: newArr,
      filteredArray: newArr,
    })
  }

  render() {
    let { filteredArray, dataArray } = this.state

    const activeCount = dataArray.filter((el) => el.active).length

    localStorage.setItem(this.localStorageKey, JSON.stringify(this.state))

    return (
      <section className="todoapp">
        <Header onAddedTask={this.addItem} />
        <section className="main">
          <TaskList
            dataArray={filteredArray}
            onDeleted={this.deleteItem}
            onToggleDone={this.onToggleDone}
            taskFilter={this.taskFilter}
            onEdit={this.editItem}
          />
          <Footer
            activeCount={activeCount}
            taskFilter={this.taskFilter}
            removeDone={this.removeDone}
          />
        </section>
      </section>
    )
  }
}
