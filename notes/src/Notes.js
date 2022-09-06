import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './Components/Home'
import Nav from './Components/Nav'
import Show from './Components/Show'

function Notes() {
  return (
    <div>
      <Nav />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/allnotes' element={<Show />} />
      </Routes>
      {/* <Show /> */}
      
    </div>
  )
}

export default Notes