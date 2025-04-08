import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ListBlog from './components/ListBlog'
import AddBlog from './components/AddBlog'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className='App'>
        <AddBlog/>
        <ListBlog/>
      </div>
    </>
  )
}

export default App
