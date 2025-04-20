import { useState } from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import './Home.jsx'
import './App.css'
import Home from './Home.jsx'
import Create from '../src/Create.jsx'
import Read from './Read.jsx'
import Update from './Update.jsx'
import Leave from './Leave.jsx'
import MainPage from './MainPage.jsx'
import LeaveCreate from './LeaveCreate.jsx'
import LeaveRead from './LeaveRead.jsx'
import LeaveUpdate from './LeaveUpdate.jsx'
import Login from './Login.jsx'
import LeaveList from './LeaveList.jsx'
import EmpDash from './EmpDash.jsx'
import Report from './Report.jsx'

function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<MainPage/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/employee' element={<Home/>}></Route>
        <Route path='/create' element={<Create/>}></Route>
        <Route path='/read/:id' element={<Read/>}></Route>
        <Route path='/edit/:id' element={<Update/>}></Route>
        <Route path='/leave' element={<Leave/>}></Route>
        <Route path='/leave/create' element={<LeaveCreate/>}></Route>
        <Route path='/leave/read/:id' element={<LeaveRead/>}></Route>
        <Route path='/leave/edit/:id' element={<LeaveUpdate/>}></Route>
        <Route path='/leave/list' element={<LeaveList/>}></Route>
        <Route path='/emp_dash' element={<EmpDash/>}></Route>
        <Route path='/report' element={<Report/>}></Route>

      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
