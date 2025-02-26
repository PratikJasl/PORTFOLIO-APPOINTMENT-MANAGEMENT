
function Testimonials(){
    return(
        <section id="testimonials" className="mb-20 scroll-smooth flex flex-col items-center w-full">
            
            <h1 className="text-4xl font-serif mb-2">Testimonials</h1>
            <h2 className="text-2xl font-serif italic"> what patients say</h2>

            <div className="flex-wrap justify-center lg:flex lg:flex-row gap-10 m-10">

                <div className="shadow-lg shadow-gray-400 p-4 h-100 w-80 rounded-lg
                text-center flex flex-col justify-center gap-5 items-center"
                >
                    <img src="./src/assets/person.png" alt="" className="rounded-full border-1 h-20 w-20" />
                    <p className="text-justify text-gray-600 font-serif">We have visited many doctors but they were only changing one medicine to others with 
                        unsatisfactory results. Finally after Dr Amrita's treatment my dad's sugars are in control. 
                    </p>
                    <div className="text-xl font-bold font-serif italic">Mr. Sanjay Chaturvedi</div>
                </div>

                <div className="shadow-lg shadow-gray-400 p-4 h-100 w-80 rounded-lg
                text-center flex flex-col justify-center gap-5 items-center"
                >
                    <img src="./src/assets/person.png" alt="" className="rounded-full border-1 h-20 w-20" />
                    <p className="text-justify text-gray-600 font-serif">One of the best doctor I have ever met. We met so many doctors earlier, 
                    but the way she has explained and treated my diseases no one did it earlier. 
                    </p>
                    <div className="text-xl font-bold font-serif italic">Mr Rohit Tevatiya</div>
                </div>

                <div className="shadow-lg shadow-gray-400 p-4 h-100 w-80 rounded-lg
                text-center flex flex-col justify-center gap-5 items-center"
                >
                    <img src="./src/assets/person.png" alt="" className="rounded-full border-1 h-20 w-20" />
                    <p className="text-justify text-gray-600 font-serif">Her diagnoses and holistic approach to remedy is commendable. Recommended treatment was very practical. In addition to medicines, 
                    simple changes to diet and lifestyle advice was very helpful.
                    </p>
                    <div className="text-xl font-bold font-serif">Mr Abeer</div>
                </div>
            </div>
            
        </section>
    )
}

export default Testimonials