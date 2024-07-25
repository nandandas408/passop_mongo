import { useState } from 'react'
import Navbar from './components/navbar'
import Manager from './components/Manager'
import Footer from './components/footer'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
  <Navbar/>
  <div className='min-h-[89.9vh]'>

  <Manager/>
  </div>
  <Footer/>
    </>
  )
}

export default App
