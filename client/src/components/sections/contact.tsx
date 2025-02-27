import { PhoneIcon } from "@heroicons/react/24/outline";


function Contact(){
    return(
        <section id="contact" className="flex flex-col gap-5 scroll-smooth lg:p-10 p-5 text-center shadow-2xl shadow-black w-full">
            
            <div className="flex flex-row gap-5 w-full justify-center">
                <a href=""><i className="fab fa-instagram text-3xl text-red-500 hover:scale-150 transition transform duration-500 ease-in-out"></i></a>
                <a href=""><i className="fab fa-linkedin text-3xl text-blue-500 hover:scale-150 transition transform duration-500 ease-in-out"></i></a>
                <a href=""><i className="fab fa-youtube text-3xl text-red-500 hover:scale-150 transition transform duration-500 ease-in-out"></i></a> 
                <div className="flex items-center gap-2">
                    <PhoneIcon className="h-6 w-6 text-black" />
                    <h3 className="text-lg">+91 1234567890</h3>
                </div>
            </div>

            <div className="font-serif italic">
                <h2>Made with ❤️ by <span className="text-lg">Pratik Jussal</span></h2>
            </div>
        </section>
    )
}

export default Contact


   
