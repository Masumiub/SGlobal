"use client";

import { useState } from "react";
import ImgSub from '../../../public/assets/Study abroad-amico.svg';
import Image from "next/image";

export default function NoEvents() {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return alert("Please enter your email");
    setIsSubscribed(true);
    setTimeout(() => {
      alert(`Thank you! We will notify you at ${email} about upcoming events.`);
      setEmail("");
      setIsSubscribed(false);
    }, 1500);
  };

  return (
    <section className="relative py-20 md:py-28 overflow-hidden rounded-3xl mb-5 mt-5">
      {/* Background with animated gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-500 to-sky-400 animate-gradient-x"></div>
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -left-20 w-80 h-80 bg-white/10 rounded-full animate-pulse-slow"></div>
        <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-sky-300/20 rounded-full animate-pulse-slow" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/3 right-1/4 w-16 h-16 bg-white/15 rounded-full animate-bounce-slow"></div>
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          {/* Image Section */}
          <div className="w-full md:w-2/5 order-2 md:order-1 flex justify-center">
            <div className="relative">
              <div className="absolute -inset-6 bg-white/20 rounded-2xl transform rotate-3 animate-float"></div>
              <div className="relative">
                <Image 
                  src={ImgSub} 
                  alt="Stay tuned for upcoming events" 
                  width={350}
                  height={350}
                  className="drop-shadow-2xl"
                  priority
                />
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="w-full md:w-3/5 order-1 md:order-2">
            {/* Animated Notification Badge */}
            <div className="bg-white/15 backdrop-blur-md flex gap-3 items-center w-fit rounded-full shadow-2xl pl-3 pr-5 py-2 mb-8 border border-white/20 animate-pulse-gentle">
              <span className="relative flex h-4 w-4">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-4 w-4 bg-red-600"></span>
              </span>
              <p className="text-white text-sm font-medium">Upcoming Events</p>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white leading-tight">
              Exciting Events <br />
              <span className="relative">
                Coming Soon!
                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 300 12" xmlns="http://www.w3.org/2000/svg">
                  <path d="M 0 10 Q 75 2 150 10 Q 225 18 300 10" stroke="rgba(255,255,255,0.4)" strokeWidth="4" fill="none" />
                </svg>
              </span>
            </h2>
            
            <p className="text-lg text-white/90 mb-10 leading-relaxed max-w-2xl">
              Our core belief is to ensure that our students receive comprehensive education and guidance at every stage of their study abroad journey. Be the first to know when we announce new events!
            </p>

            {/* Subscription Form */}
            {isSubscribed ? (
              <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 text-center animate-fade-in">
                <div className="flex justify-center mb-4">
                  <svg className="w-16 h-16 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">You're on the list!</h3>
                <p className="text-white/80">We'll notify you about upcoming events.</p>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20">
                <h3 className="text-xl font-semibold text-white mb-4">Get notified first</h3>
                <p className="text-white/80 mb-6">Enter your email to be the first to know about our upcoming events.</p>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="relative flex-grow">
                    <input
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full p-4 bg-white/90 rounded-lg border border-white focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-800 placeholder-gray-500"
                      required
                    />
                    <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                    </svg>
                  </div>
                  <button
                    type="submit"
                    className="px-8 py-4 bg-gradient-to-r from-sky-400 to-blue-500 text-white font-semibold rounded-lg shadow-lg hover:from-blue-500 hover:to-sky-400 transition-all duration-300 transform hover:-translate-y-1 flex-shrink-0"
                  >
                    Notify Me
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}


// "use client";

// import { useState } from "react";
// import ImgSub from '../../../public/assets/Study abroad-amico.svg'
// import Image from "next/image";

// export default function NoEvents() {
//   const [email, setEmail] = useState("");

//   const handleSubscribe = () => {
//     if (!email) return alert("Please enter your email");
//     alert(`Thank you! We will notify you at ${email} about upcoming events.`);
//     setEmail("");
//   };

//   return (
//     <section className="py-40 bg-gradient-to-b from-blue-600 to-sky-400 text-white rounded-2xl mb-5 mt-5">
//       <div className="max-w-5xl mx-auto px-6">

//         <div className="flex flex-col md:flex-row gap-10 items-center">
//           <div className="w-full md:w-1/2">

//             <div className="bg-white flex gap-2 items-center w-33 rounded-full shadow-2xl pl-1 mb-4 py-1">
//             <span className="relative flex h-4 w-4">
//               <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
//               <span className="relative inline-flex rounded-full h-4 w-4 bg-red-600"></span>
//             </span>
//             <p className="text-black text-sm">Oning Events</p>
//             </div>



//             <h2 className="text-4xl md:text-5xl font-bold  mb-4">
//               Stay tuned for your exciting events in the future!
//             </h2>
//             <p className=" mb-8 ">
//               Our core belief is to ensure that our students receive comprehensive education and guidance at every stage of their study abroad journey.
//               Presented below are a few of our previous international educational events.
//             </p>

//             <div className="flex flex-col sm:flex-row items-center gap-4">
//               <input
//                 type="email"
//                 placeholder="Enter your email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 className="p-3 w-full sm:w-72 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 text-white"
//               />
//               <button
//                 onClick={handleSubscribe}
//                 className="px-6 py-3 bg-gradient-to-r from-sky-400 to-blue-500 text-white font-semibold rounded shadow hover:from-blue-500 hover:to-sky-400 transition"
//               >
//                 Notify Me
//               </button>
//             </div>
//           </div>

//           <div className="w-full md:w-1/2">
//             <Image src={ImgSub} alt='ImgSub' width='250px'></Image>
//           </div>
//         </div>



//       </div>
//     </section>
//   );
// }
