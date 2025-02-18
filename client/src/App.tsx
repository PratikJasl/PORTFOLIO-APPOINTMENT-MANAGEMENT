import './App.css'
import {Route, Routes} from "react-router-dom"
import Navbar from './components/navbar'
import Home from './components/home'
import About from './components/about'

function App() {
  return (
    <>
      <Navbar/>
      <Routes>
        <Route path="/Home" element={<Home/>}></Route>
        <Route path="/About" element={<About/>}></Route>
      </Routes>
    </>
  )
}

export default App
