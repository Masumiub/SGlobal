// import React from 'react'
// import ImgStudy from '../../../public/assets/Study abroad-bro.svg'
// import Image from 'next/image'
// import { PiStudentFill } from 'react-icons/pi'

// export default function About() {
//   return (
//     <section className="py-40 rounded-2xl bg-gradient-to-b from-blue-600 to-sky-400 text-white">
//       <div className="max-w-6xl mx-auto px-6">


//           <div className='flex flex-col md:flex-row-reverse gap-10 items-center'>
//             <div className='w-full md:w-1/2'>

//                 <div className="bg-white text-black p-2 rounded-full shadow-lg  mb-8 flex flex-row items-center w-40">
//                   <PiStudentFill />
//                   <p className="text-xs">10+ Years Experiences</p>
//                 </div>

//                 <h2 className="text-4xl md:text-5xl font-bold mb-6 ">
//                   Your Complete Study Abroad Partner
//                 </h2>
//                 <p className="max-w-3xl mx-auto ">
//                   Get complete guidance in your study abroad journey from start to finish.
//                   Shabuj Global Education helps you with Course & University Selection, Interview and Test Preparation,
//                   Visa Application and Admission and more—so you can join your dream university with ease!
//                 </p>

//             </div>

//             <div className='w-full md:w-1/2'>
//               <Image src={ImgStudy} alt='study' width='250px'></Image>
//             </div>
//           </div>

//       </div>
//     </section>
//   )
// }


import React from 'react'
import ImgStudy from '../../../public/assets/Study abroad-bro.svg'
import Image from 'next/image'
import { PiStudentFill } from 'react-icons/pi'

export default function About() {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      {/* Background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-500 to-sky-400 -z-10 rounded-2xl"></div>
      
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-5">
        <div className="absolute -top-20 -left-20 w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-64 h-64 bg-sky-300/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/4 w-48 h-48 bg-white/5 rounded-full blur-3xl"></div>
      </div>
      
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className='flex flex-col md:flex-row gap-14 items-center'>
          {/* Image Section */}
          <div className='w-full md:w-2/5 flex justify-center'>
            <div className="relative">
              <div className="absolute -inset-6 bg-white/10 rounded-2xl transform rotate-3"></div>
              <div className="relative">
                <Image 
                  src={ImgStudy} 
                  alt='Students studying abroad' 
                  width={400}
                  height={400}
                  className="drop-shadow-2xl"
                  priority
                />
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className='w-full md:w-3/5'>
            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-2xl shadow-lg mb-10 inline-flex items-center border border-white/20">
              <div className="bg-white p-2 rounded-full text-blue-600 mr-3">
                <PiStudentFill size={20} />
              </div>
              <p className="text-sm font-medium text-white">10+ Years Experience</p>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white leading-tight">
              Your Complete<br />
              <span className="relative">
                Study Abroad Partner
                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 300 12" xmlns="http://www.w3.org/2000/svg">
                  <path d="M 0 10 Q 75 2 150 10 Q 225 18 300 10" stroke="rgba(255,255,255,0.3)" strokeWidth="4" fill="none" />
                </svg>
              </span>
            </h2>
            
            <div className="space-y-4 text-lg text-white/90 leading-relaxed">
              <p>
                Get complete guidance in your study abroad journey from start to finish.
              </p>
              <p>
                Shabuj Global Education helps you with Course & University Selection, Interview and Test Preparation,
                Visa Application and Admission and more—so you can join your dream university with ease!
              </p>
            </div>
            
            {/* Stats section - optional addition */}
            <div className="grid grid-cols-2 gap-6 mt-10 pt-8 border-t border-white/20">
              <div className="text-center">
                <div className="text-3xl font-bold text-white">1000+</div>
                <div className="text-sm text-white/80">Students Helped</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">98%</div>
                <div className="text-sm text-white/80">Success Rate</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}