import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import PagoCard from './feacture/Pago/presentation/UL/pagoCard'


function App() {
  const [count, setCount] = useState(0)

  return (
    <> 
    <div>
    <PagoCard/>
    </div> 
    </>
  )
}

export default App
