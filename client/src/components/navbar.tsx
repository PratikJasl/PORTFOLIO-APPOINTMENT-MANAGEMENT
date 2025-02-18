import { useState } from "react"
import { Link } from "react-router-dom"
import { Bars3Icon } from "@heroicons/react/24/outline";
import { XMarkIcon } from "@heroicons/react/24/outline";


function Navbar(){
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () =>{
        setMenuOpen(!menuOpen);
    }

    return(
        <>
            <div className="flex flex-row justify-between shadow-lg w-full p-4 font-serif">
                <div className="text-xl font-semibold italic text-blue-600">
                    Dr Amrita Gosh
                </div>

                <div className="lg:hidden flex items-center">
                    <button onClick={toggleMenu} className="p-2">
                        {menuOpen ? (
                            <XMarkIcon className="h-6 w-6 text-gray-500" />
                        ) : (
                            <Bars3Icon className="h-6 w-6 text-gray-600" />
                        )}
                    </button>
                </div>
                
                <div className="hidden lg:flex flex-row list-none gap-4 text-lg">
                    <Link to="/Home" className="hover:text-blue-600">Home</Link>
                    <Link to="/About" className="hover:text-blue-600">About</Link>
                    <Link to="/Appointment" className="hover:text-blue-600">Services</Link>
                    <Link to="/Appointment" className="hover:text-blue-600">Testimonials</Link>
                    <Link to="/Appointment" className="hover:text-blue-600">Community</Link>
                    <Link to="/Appointment" className="hover:text-blue-600">Contacts</Link>
                </div>

                <div className={`lg:hidden ${ menuOpen ? "block absolute top-16 right-0 shadow-lg" : "hidden"}`}>
                    <div className="flex flex-col items-center p-4 gap-4">
                        <Link to="/Home" className="hover:text-blue-300">Home</Link>
                        <Link to="/About" className="hover:text-blue-300">About</Link>
                        <Link to="/Appointment" className="hover:text-blue-300">Services</Link>
                        <Link to="/Appointment" className="hover:text-blue-300">Testimonials</Link>
                        <Link to="/Appointment" className="hover:text-blue-300">Community</Link>
                        <Link to="/Appointment" className="hover:text-blue-300">Contacts</Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Navbar