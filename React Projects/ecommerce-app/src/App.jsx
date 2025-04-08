import { useState } from 'react'
import './App.css'
import { useEffect } from 'react'

function App() {

  const [counter , setCounter] = useState(0)
  const [myVal , setmyVal] = useState(0)

  // to Handle Event 

  const handleClick = () => {
    setCounter(counter + 1) ;


  };

  useEffect(() => {
    // First
    console.log("From First " + counter);

    if (counter % 2 == 0) {
      setmyVal(counter * counter) ;
    }

    return () => {
      // Second 
      console.log("From Second " + counter);
      
    }
  } , [counter,myVal]);


  return (
    <>
      <div>
        <button onClick={handleClick}>Count:{counter}</button>
        <p>{myVal}</p>
      </div>
    </>
  )
}

export default App
