import React from 'react'
import './App.css'

import Header from '../Header'
import TaskList from '../TaskList'
import Footer from '../Footer'

const App = () => {
  return (
    <section className="todoapp">
      <Header />
      <section className="main">
        <TaskList />
        <Footer />
      </section>
    </section>
  )
}

export default App
