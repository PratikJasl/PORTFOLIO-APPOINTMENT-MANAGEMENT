
function Testimonials(){
    return(
        <section id="testimonials" className="mb-20 flex flex-col items-center p-10">
            
            <h1 className="text-4xl font-serif mb-2">Testimonials</h1>
            <h2 className="text-2xl font-serif italic"> what patients say</h2>

            <div className="flex gap-10 m-10 w-full p-5 overflow-x-auto scrollbar-custom">

                <div className="flex-shrink-0 shadow-lg shadow-gray-400 p-5 w-90 rounded-xl text-center flex flex-col justify-center gap-3 items-center relative">
                    <img src="./src/assets/person.png" alt="person" className="rounded-full border-1 h-25 w-25 absolute top-5" />
                    <p className="text-justify text-gray-600 font-serif">
                        We have visited many doctors but they were only changing one medicine to others with 
                        unsatisfactory results. Finally after Dr Amrita's treatment my dad's sugars are in control. 
                    </p>
                    <div className="text-xl font-bold font-serif italic absolute bottom-5 left-0 w-50">Mr. Sanjay Chaturvedi</div>
                    <img src="./src/assets/pat-1.png" alt="pattern-1" className="h-15 w-15 absolute bottom-5 right-5"/>
                </div>

                <div className="flex-shrink-0 shadow-lg shadow-gray-400 p-5 h-100 w-90 rounded-xl text-center flex flex-col justify-center gap-3 items-center relative"
                >
                    <img src="./src/assets/person.png" alt="person" className="rounded-full border-1 h-25 w-25 absolute top-5" />
                    <p className="text-justify text-gray-600 font-serif">
                        One of the best doctor I have ever met. We met so many doctors earlier, 
                        but the way she has explained and treated my diseases no one did it earlier. 
                    </p>
                    <div className="text-xl font-bold font-serif italic absolute bottom-5 left-0 w-40">Mr. Rohit Tevatiya</div>
                    <img src="./src/assets/pat-1.png" alt="pattern-1" className="h-15 w-15 absolute bottom-5 right-5"/>
                </div>

                <div className="flex-shrink-0 shadow-lg shadow-gray-400 p-5 h-100 w-90 rounded-xl text-center flex flex-col justify-center gap-3 items-center relative"
                >
                    <img src="./src/assets/person.png" alt="person" className="rounded-full border-1 h-25 w-25 absolute top-5" />
                    <p className="text-justify text-gray-600 font-serif">
                    Her diagnoses and holistic approach to remedy is great. Recommended treatment was very practical. In addition to medicines, 
                    simple changes to diet and lifestyle advice was very helpful. 
                    </p>
                    <div className="text-xl font-bold font-serif italic absolute bottom-5 left-0 w-50">Mr. Adeer</div>
                    <img src="./src/assets/pat-1.png" alt="pattern-1" className="h-15 w-15 absolute bottom-5 right-5"/>
                </div>

                <div className="flex-shrink-0 shadow-lg shadow-gray-400 p-5 h-100 w-90 rounded-xl text-center flex flex-col justify-center gap-3 items-center relative"
                >
                    <img src="./src/assets/person.png" alt="person" className="rounded-full border-1 h-25 w-25 absolute top-5" />
                    <p className="text-justify text-gray-600 font-serif">
                    Her diagnoses and holistic approach to remedy is great. Recommended treatment was very practical. In addition to medicines, 
                    simple changes to diet and lifestyle advice was very helpful. 
                    </p>
                    <div className="text-xl font-bold font-serif italic absolute bottom-5 left-0 w-50">Mr. Adeer</div>
                    <img src="./src/assets/pat-1.png" alt="pattern-1" className="h-15 w-15 absolute bottom-5 right-5"/>
                </div>
            </div>
            
        </section>
    )
}

export default Testimonials