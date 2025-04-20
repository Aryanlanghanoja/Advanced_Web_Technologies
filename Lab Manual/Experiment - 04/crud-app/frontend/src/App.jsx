import { useState } from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import './Home.jsx'
import './App.css'
import Home from './Home.jsx'
import Create from '../src/Create.jsx'
import Read from './Read.jsx'
import Update from './Update.jsx'

function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/create' element={<Create/>}></Route>
        <Route path='/read/:id' element={<Read/>}></Route>
        <Route path='/edit/:id' element={<Update/>}></Route>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
