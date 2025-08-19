import React from 'react'
import Image from "next/image";
import Link from 'next/link';
import { PiStudentFill } from "react-icons/pi";
import { LuNotebook } from "react-icons/lu";
import { LiaUniversitySolid } from "react-icons/lia";
import { HiOutlineDesktopComputer } from "react-icons/hi";
import { Fade } from 'react-awesome-reveal';

export default function Header() {
    return (
        <header>
            <div className="w-full lg:max-w-4xl mx-auto px-6 py-20 text-center">
                <Fade cascade>
                <div className='w-full flex flex-col justify-center mx-auto items-center'>

                    <div className="bg-white text-black p-2 rounded-full shadow-lg  mb-8 flex flex-row items-center">
                        <PiStudentFill />
                        <p className="text-xs">153,000+ Successful Students</p>
                    </div>

                    <p className='text-center text-sm '>No more lack of trust and transparency – we treat your dream as our own!</p>

                </div>


                <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-4 mt-5 
  bg-gradient-to-r from-blue-500 to-sky-500 bg-clip-text text-transparent">
                    Start Your Path to <span>Global Education</span>
                </h1>

                <p className="mb-8">
                    We take pride in our ability to help students achieve their academic goals and succeed in life. Get complete guidance in your study abroad journey from start to finish.
                </p>

                <div className='max-w-3xl mb-10 mx-auto'>
                    <div className='grid grid-cols-1 md:grid-cols-3 gap-5 items-center justify-center'>

                        <div className='bg-white p-4 flex shadow-2xl items-center gap-5 rounded-2xl  text-blue-500 transform transition duration-300 hover:shadow-2xl hover:-translate-y-2 bg-gradient-to-t from-base-100 to-base-300'>
                            <div>

                                <LiaUniversitySolid size={35} />
                            </div>

                            <div className='text-left '>
                                <h1 className='font-bold text-xl'>250+</h1>
                                <p className='text-xs'>University Partners</p>
                            </div>
                        </div>

                        <div className='bg-white p-4 flex shadow-2xl items-center gap-5 rounded-2xl  text-blue-500 transform transition duration-300 hover:shadow-2xl hover:-translate-y-2 bg-gradient-to-t from-base-100 to-base-300'>
                            <div>
                                <LuNotebook size={35} />
                            </div>

                            <div className='text-left'>
                                <h1 className='font-bold text-xl'>100,000+</h1>
                                <p className='text-xs'>Courses Offered</p>
                            </div>
                        </div>

                        <div className='bg-white p-4 flex shadow-2xl items-center gap-5 rounded-2xl text-blue-500 transform transition duration-300 hover:shadow-2xl hover:-translate-y-2 bg-gradient-to-t from-base-100 to-base-300'>
                            <div>
                                <HiOutlineDesktopComputer size={35} />
                            </div>

                            <div className='text-left'>
                                <h1 className='font-bold text-xl'>100+</h1>
                                <p className='text-xs'>UK Education Fair</p>
                            </div>
                        </div>


                    </div>
                </div>
                <Link href='/register' className='btn bg-blue-500 text-white rounded-full border-0 btn-lg hover:bg-blue-700'>Join Now</Link>
                </Fade>
            </div>
        </header>
    )
}
