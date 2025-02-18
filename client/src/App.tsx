import './App.css'
import {Route, Routes} from "react-router-dom"
import Navbar from './components/navbar'
import Home from './components/home'
import About from './components/about'
import Services from './components/services'
import Testimonials from './components/testimonials'
import Community from './components/community'
import Contact from './components/contact'

function App() {
  return (
    <>
      <Navbar/>

      <div className="pt-30">
        <Routes>
          <Route path="/Home" element={<Home/>}></Route>
          <Route path="/About" element={<About/>}></Route>
          <Route path="/Services" element={<Services/>}></Route>
          <Route path="/Testimonials" element={<Testimonials/>}></Route>
          <Route path="/Community" element={<Community/>}></Route>
          <Route path="/Contact" element={<Contact/>}></Route>
        </Routes>
      </div>
      
      
      <Home/>
      <About />
      <Services />
      <Testimonials />
      <Community />
      <Contact />
    </>
  )
}

export default App
