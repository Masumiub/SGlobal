import React from 'react';
import { Fade } from 'react-awesome-reveal';
import { FaUniversity, FaChalkboardTeacher, FaPassport } from 'react-icons/fa';

const features = [
  {
    title: "Course & University Selection",
    description: "Find the right course and university that matches your goals and aspirations.",
    icon: <FaUniversity className="text-4xl  mb-4" />,
  },
  {
    title: "Interview & Test Prep",
    description: "Get training and guidance to excel in interviews, language tests, and admission exams.",
    icon: <FaChalkboardTeacher className="text-4xl  mb-4" />,
  },
  {
    title: "Visa & Admission Assistance",
    description: "We assist in visa applications and ensure smooth admission to your chosen university.",
    icon: <FaPassport className="text-4xl  mb-4" />,
  },
];

export default function Features() {
  return (
    <section id="features" className="pb-40">
      <div className="max-w-7xl mx-auto px-6 ">
        <h2 className="text-4xl md:text-5xl font-bold mb-12  text-center">
          Why Choose Us?
        </h2>

        <div className="grid gap-8 md:grid-cols-3">
          {features.map((feature, idx) => (
            <Fade key={idx} cascade>
              <div className="px-6 py-16 bg-gradient-to-b from-blue-600 to-sky-500  rounded-2xl shadow hover:shadow-lg transition flex flex-col  h-full min-h-[280px] text-white">
                {feature.icon}
                <h3 className="text-xl font-semibold mb-3 ">
                  {feature.title}
                </h3>
                <p className="text-sm flex-1 ">{feature.description}</p>
              </div>
            </Fade>
          ))}
        </div>
      </div>
    </section>
  );
}
