
function Home(){
    return(
        <section id="home" className="mb-20 scroll-smooth">
            <div className="lg:flex lg:flex-row lg:items-center lg:gap-5 m-10">

            <div className="lg:h-110 lg:w-400 mb-5 border-10 border-white rounded-lg shadow-xl shadow-gray-600 overflow-hidden">
                <img src="./src/assets/Amrita_Gosh.png" className="h-full w-full object-cover hover:scale-120 transition-transform duration-600 ease-in-out" />
            </div>

                {/* <img 
                    src="./src/assets/Amrita_Gosh.png" className=" lg:h-110 lg:w-120 mb-5 border-10 border-white rounded-lg 
                    shadow-xl shadow-gray-600 hover:scale-105 transition-transform duration-600 ease-in-out">
                </img> */}
                <div className="text-center font-serif flex flex-col gap-5">
                    <p className="lg:text-4xl text-xl">Meet</p>
                    <p className="lg:text-5xl text-2xl">Dr.Amrita Ghosh</p>
                    <p className="text-justify"> Dr.Amrita Ghosh has completed her graduation from Govt. Medical College Nagpur, 
                        Post Graduate diploma and fellow ship in Diabetes from M.V Hospital for 
                        Diabetes and Professor M.Viswanathan Diabetes Research Centre (WHO collaborating centre) 
                        and Post graduate diploma in Clinical Endocrinology and Diabetes, certified by Royal college of Physicians , UK. 
                        
                    </p>
                    <p className="text-justify">
                        Her main areas of interest lies in type 1diabetes and new technology related to diabetes management, gestation diabetes.
                        She is actively involved in Type 1 Diabetes advocacy and support groups. She has publication is international journals and member of international bodies.
                    </p>
                </div>
            </div>
        </section>
    )
}

export default Home