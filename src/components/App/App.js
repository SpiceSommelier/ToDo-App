import React, { Component } from 'react'
import './App.css'

import Header from '../Header'
import TaskList from '../TaskList'
import Footer from '../Footer'

export default class App extends Component {
  MaxID = 1
  firstRender = true
  state = {
    dataArray: [
      this.createToDoItem('Create App'),
      this.createToDoItem('Patch App'),
      this.createToDoItem('Drink Tea', false),
    ],
  }

  createToDoItem(label, active = true) {
    return {
      label,
      time: new Date(),
      active,
      id: this.MaxID++,
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

  render() {
    let { filteredArray, dataArray } = this.state
    if (this.firstRender) {
      filteredArray = dataArray
      this.firstRender = false
    }
    const activeCount = dataArray.filter((el) => el.active).length
    return (
      <section className="todoapp">
        <Header onAddedTask={this.addItem} />
        <section className="main">
          <TaskList
            dataArray={filteredArray}
            onDeleted={this.deleteItem}
            onToggleDone={this.onToggleDone}
            taskFilter={this.taskFilter}
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
