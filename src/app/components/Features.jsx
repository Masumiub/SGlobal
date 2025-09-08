// import React from 'react';

// import { FaUniversity, FaChalkboardTeacher, FaPassport } from 'react-icons/fa';

// const features = [
//   {
//     title: "Course & University Selection",
//     description: "Find the right course and university that matches your goals and aspirations.",
//     icon: <FaUniversity className="text-4xl  mb-4" />,
//   },
//   {
//     title: "Interview & Test Prep",
//     description: "Get training and guidance to excel in interviews, language tests, and admission exams.",
//     icon: <FaChalkboardTeacher className="text-4xl  mb-4" />,
//   },
//   {
//     title: "Visa & Admission Assistance",
//     description: "We assist in visa applications and ensure smooth admission to your chosen university.",
//     icon: <FaPassport className="text-4xl  mb-4" />,
//   },
// ];

// export default function Features() {
//   return (
//     <section id="features" className="pb-40">
//       <div className="max-w-7xl mx-auto px-6 ">
//         <h2 className="text-4xl md:text-5xl font-bold mb-12  text-center">
//           Why Choose Us?
//         </h2>

//         <div className="grid gap-8 md:grid-cols-3">
//           {features.map((feature, idx) => (

//               <div key={idx} className="px-6 py-16 bg-gradient-to-b from-blue-600 to-sky-500  rounded-2xl shadow hover:shadow-lg transition flex flex-col  h-full min-h-[280px] text-white">
//                 {feature.icon}
//                 <h3 className="text-xl font-semibold mb-3 ">
//                   {feature.title}
//                 </h3>
//                 <p className="text-sm flex-1 ">{feature.description}</p>
//               </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }


import React from 'react';
import { FaUniversity, FaChalkboardTeacher, FaPassport, FaHandshake, FaAward, FaUserTie } from 'react-icons/fa';

const features = [
  {
    title: "Course & University Selection",
    description: "Find the right course and university that matches your goals and aspirations with our expert guidance and extensive database of partner institutions.",
    icon: <FaUniversity className="text-4xl" />,
  },
  {
    title: "Interview & Test Prep",
    description: "Get comprehensive training and personalized guidance to excel in interviews, language tests, and admission exams with our experienced coaches.",
    icon: <FaChalkboardTeacher className="text-4xl" />,
  },
  {
    title: "Visa & Admission Assistance",
    description: "We provide end-to-end support for visa applications and ensure smooth admission processes to your chosen university with our proven track record.",
    icon: <FaPassport className="text-4xl" />,
  },
  {
    title: "Post-Admission Support",
    description: "Our assistance continues even after you secure admission, helping with accommodation, orientation, and settling into your new academic environment.",
    icon: <FaHandshake className="text-4xl" />,
  },
  {
    title: "Scholarship Guidance",
    description: "Maximize your opportunities with our expert advice on scholarships, financial aid, and funding options available for international students.",
    icon: <FaAward className="text-4xl" />,
  },
  {
    title: "Career Counseling",
    description: "Plan your future career path with our professional counseling services that connect your education to long-term career success.",
    icon: <FaUserTie className="text-4xl" />,
  },
];

export default function Features() {
  return (
    <section id="features" className="py-20 md:py-28 relative">
      {/* Background decorative elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {/* <div className="absolute -top-20 -right-20 w-96 h-96 bg-blue-100 rounded-full opacity-20 blur-3xl"></div> */}
        {/* <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-sky-200 rounded-full opacity-15 blur-3xl"></div> */}
      </div>
      
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 ">
            Why Choose <span className="text-blue-600">Shabuj Global</span>?
          </h2>
          <p className="text-lg  leading-relaxed mb-8">
            With over a decade of experience in guiding students toward their international education dreams, 
            we provide comprehensive support at every step of your study abroad journey. Our personalized approach 
            ensures you receive the right guidance tailored to your unique aspirations and goals.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-sky-500 mx-auto rounded-full"></div>
        </div>

        {/* Features Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, idx) => (
            <div 
              key={idx} 
              className="group relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:-translate-y-2"
            >
              {/* Gradient top border */}
              <div className="h-1 bg-gradient-to-r from-blue-600 to-sky-500"></div>
              
              <div className="p-8 flex flex-col h-full">
                {/* Icon container */}
                <div className="mb-6 p-3  rounded-xl inline-flex group-hover:bg-gradient-to-br group-hover:from-blue-100 group-hover: transition-colors duration-300">
                  <div className="text-blue-600 group-hover:text-blue-700 transition-colors duration-300">
                    {feature.icon}
                  </div>
                </div>
                
                {/* Content */}
                <h3 className="text-xl font-semibold mb-4 text-blue-400 group-hover:text-blue-600 transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-gray-600 flex-1 leading-relaxed">
                  {feature.description}
                </p>
                
                {/* Learn more link */}
                <div className="mt-6">
                  <span className="inline-flex items-center text-blue-600 font-medium group-hover:text-sky-600 transition-colors duration-300">
                    Learn more
                    <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-20 bg-gradient-to-r from-blue-600 to-sky-500 rounded-2xl p-8 md:p-12 text-white shadow-lg">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="p-4">
              <div className="text-3xl md:text-4xl font-bold mb-2">10+</div>
              <div className="text-sm md:text-base opacity-90">Years Experience</div>
            </div>
            <div className="p-4">
              <div className="text-3xl md:text-4xl font-bold mb-2">250+</div>
              <div className="text-sm md:text-base opacity-90">University Partners</div>
            </div>
            <div className="p-4">
              <div className="text-3xl md:text-4xl font-bold mb-2">153K+</div>
              <div className="text-sm md:text-base opacity-90">Students Helped</div>
            </div>
            <div className="p-4">
              <div className="text-3xl md:text-4xl font-bold mb-2">98%</div>
              <div className="text-sm md:text-base opacity-90">Success Rate</div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <p className="text-lg  mb-8">
            Ready to start your study abroad journey with a trusted partner?
          </p>
          <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-sky-500 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            Begin Your Journey Today
          </button>
        </div>
      </div>
    </section>
  );
}