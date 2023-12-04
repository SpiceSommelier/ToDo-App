import React, { useState, useEffect } from 'react'
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

  const createToDoItem = (label, active = true, timer = 300) => {
    return {
      label,
      timer,
      time: new Date(),
      active,
      id: `${new Date().getTime()}`,
      isStartTimer: false,
    }
  }

  useEffect(() => {
    localStorage.setItem('starttimer', Date.now())
    const endTime = Number(localStorage.getItem('endtimer'))
    const StartTime = Number(localStorage.getItem('starttimer'))
    const delay = (StartTime - endTime) / 1000
    const timeout = setTimeout(() => {
      setFilteredArray((prev) => {
        return prev.map((element) => {
          if (element.timer <= 0) {
            element.active = false
            element.isStartTimer = false
            element.timer = 0
          }
          if (element.isStartTimer) {
            element.timer -= delay
          }
          return { ...element }
        })
      })
      setDataArray((prev) => {
        return prev.map((element) => {
          if (element.timer <= 0) {
            element.active = false
            element.isStartTimer = false
            element.timer = 0
          }
          if (element.isStartTimer) {
            element.timer -= delay
          }
          return { ...element }
        })
      })
    }, 1000)

    localStorage.setItem('endtimer', Date.now())
    return () => {
      clearTimeout(timeout)
    }
  }, [dataArray, filteredArray])

  const onTimerChange = (id, action) => {
    const idx = findIndex(id)
    const newArr = [...dataArray]
    newArr[idx].isStartTimer = action
    setDataArray(newArr)
    setFilteredArray(newArr)
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
          onTimerChange={onTimerChange}
        />
        <Footer activeCount={activeCount} taskFilter={taskFilter} removeDone={removeDone} />
      </section>
    </section>
  )
}

export default App
