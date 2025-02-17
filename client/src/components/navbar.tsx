import { Link } from "react-router-dom"

function navbar(){
    return(
        <>
            <div className="flex flex-row justify-between shadow-lg w-full p-4 font-serif">
                <div className="text-xl font-semibold italic text-blue-600">
                    Dr Amrita Gosh
                </div>
                <div className="text-xl font-semibold font-sans">
                    +91 1234567890
                </div>
                <div className="flex flex-row list-none gap-2 text-lg ">
                    <Link to ="/About" className="hover:text-blue-600">About</Link>
                    <Link to ="/Services" className="hover:text-blue-600">Services</Link>
                    <Link to ="/Appointment" className="hover:text-blue-600">Appointement</Link>
                </div>
            </div>
        </>
    )
}

export default navbar