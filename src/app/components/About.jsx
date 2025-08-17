import React from 'react'
import ImgStudy from '../../../public/assets/Study abroad-bro.svg'
import Image from 'next/image'
import { PiStudentFill } from 'react-icons/pi'
import { Fade } from 'react-awesome-reveal'


export default function About() {
  return (
    <section className="py-40 rounded-2xl bg-gradient-to-b from-blue-600 to-sky-400 text-white">
      <div className="max-w-6xl mx-auto px-6">

        <Fade cascade>
          <div className='flex flex-col md:flex-row-reverse gap-10 items-center'>
            <div className='w-full md:w-1/2'>

              <div className="bg-white text-black p-2 rounded-full shadow-lg  mb-8 flex flex-row items-center w-40">
                <PiStudentFill />
                <p className="text-xs">10+ Years Experiences</p>
              </div>

              <h2 className="text-4xl md:text-5xl font-bold mb-6 ">
                Your Complete Study Abroad Partner
              </h2>
              <p className="max-w-3xl mx-auto ">
                Get complete guidance in your study abroad journey from start to finish.
                Shabuj Global Education helps you with Course & University Selection, Interview and Test Preparation,
                Visa Application and Admission and more—so you can join your dream university with ease!
              </p>
            </div>

            <div className='w-full md:w-1/2'>
              <Image src={ImgStudy} alt='study' width='250px'></Image>
            </div>
          </div>
        </Fade>
      </div>
    </section>
  )
}
