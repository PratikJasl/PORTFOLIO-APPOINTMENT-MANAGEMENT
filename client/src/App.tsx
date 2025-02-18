import './App.css'
import {Route, Routes} from "react-router-dom"
import Navbar from './components/navbar'
import Home from './components/home'
import About from './components/about'
import Services from './components/services'

function App() {
  return (
    <>
      <Navbar/>
      <Routes>
        <Route path="/Home" element={<Home/>}></Route>
        <Route path="/About" element={<About/>}></Route>
        <Route path="/Services" element={<Services/>}></Route>
      </Routes>
    </>
  )
}

export default App
