import React, { Component } from 'react'
import './App.css'

import Header from '../Header'
import TaskList from '../TaskList'
import Footer from '../Footer'

export default class App extends Component {
  state = {
    dataArray: [
      {
        label: 'Create App',
        time: 'November 1 2023 12:35:00',
        id: 1,
      },
      {
        label: 'Patch App',
        time: 'November 1 2023 12:35:00',
        id: 2,
      },
      {
        label: 'Drink Tea',
        time: 'November 1 2023 12:35:00',
        id: 3,
      },
    ],
  }

  deleteItem = (id) => {
    this.setState(({ dataArray }) => {
      const idx = dataArray.findIndex((el) => el.id === id)
      const newArr = [...dataArray.slice(0, idx), ...dataArray.slice(idx + 1)]
      return {
        dataArray: newArr,
      }
    })
  }

  render() {
    return (
      <section className="todoapp">
        <Header />
        <section className="main">
          <TaskList
            dataArray={this.state.dataArray}
            onDeleted={this.deleteItem}
          />
          <Footer />
        </section>
      </section>
    )
  }
}
