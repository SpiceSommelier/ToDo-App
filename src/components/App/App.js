import React, { useState } from 'react'
import './App.css'

import Header from '../Header'
import TaskList from '../TaskList'
import Footer from '../Footer'

const App = () => {
  const localStorageKey = 'Tasks'
  let initialDataArray = []
  let initialFilteredArray = []
  if (localStorage.getItem(localStorageKey)) {
    initialDataArray = JSON.parse(localStorage.getItem(localStorageKey)).dataArray
    initialFilteredArray = JSON.parse(localStorage.getItem(localStorageKey)).filteredArray
  }
  const [dataArray, setDataArray] = useState(initialDataArray)
  const [filteredArray, setFilteredArray] = useState(initialFilteredArray)

  const createToDoItem = (label, active = true, min = 5, sec = 0) => {
    return {
      label,
      timer: {
        min,
        sec,
      },
      time: new Date(),
      active,
      id: `${new Date().getTime()}`,
    }
  }

  const onToggleDone = (id) => {
    const idx = findIndex(id)
    const newArr = [...dataArray]
    newArr[idx].active = !newArr[idx].active
    setDataArray(newArr)
    setFilteredArray(newArr)
  }

  const findIndex = (id) => {
    return dataArray.findIndex((el) => el.id === id)
  }

  const deleteItem = (id) => {
    const idx = findIndex(id)
    const newArr = [...dataArray.slice(0, idx), ...dataArray.slice(idx + 1)]
    localStorage.setItem(localStorageKey, JSON.stringify(newArr))
    setDataArray(newArr)
    setFilteredArray(newArr)
  }

  const addItem = (value, min, sec) => {
    const newItem = createToDoItem(value, true, min, sec)
    const newArr = [...dataArray, newItem]
    localStorage.setItem(localStorageKey, JSON.stringify(newArr))
    setDataArray(newArr)
    setFilteredArray(newArr)
  }

  const taskFilter = (filterName = 'All') => {
    let newArr = [...dataArray]
    switch (filterName) {
      case 'Active':
        newArr = dataArray.filter((el) => el.active)
        setFilteredArray(newArr)
        break
      case 'Completed':
        newArr = dataArray.filter((el) => !el.active)
        setFilteredArray(newArr)
        break
      default:
        setFilteredArray(newArr)
        break
    }
  }

  const removeDone = () => {
    const newArr = dataArray.filter((el) => el.active)
    setDataArray(newArr)
    setFilteredArray(newArr)
  }

  const editItem = (id, newText) => {
    const newArr = []
    for (let i = 0; i < dataArray.length; i++) {
      const el = dataArray[i]
      if (el.id === id) el.label = newText
      newArr.push(el)
    }
    setDataArray(newArr)
    setFilteredArray(newArr)
  }

  const activeCount = dataArray.filter((el) => el.active).length

  localStorage.setItem(localStorageKey, JSON.stringify({ filteredArray, dataArray }))

  return (
    <section className="todoapp">
      <Header onTaskAdd={addItem} />
      <section className="main">
        <TaskList
          dataArray={filteredArray}
          onDeleted={deleteItem}
          onToggleDone={onToggleDone}
          taskFilter={taskFilter}
          onEdit={editItem}
        />
        <Footer activeCount={activeCount} taskFilter={taskFilter} removeDone={removeDone} />
      </section>
    </section>
  )
}

export default App
