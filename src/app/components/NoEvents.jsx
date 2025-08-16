"use client";

import { useState } from "react";

export default function NoEvents() {
  const [email, setEmail] = useState("");

  const handleSubscribe = () => {
    if (!email) return alert("Please enter your email");
    alert(`Thank you! We will notify you at ${email} about upcoming events.`);
    setEmail("");
  };

  return (
    <section className="py-40 bg-sky-50 text-center rounded-2xl">
      <div className="max-w-3xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-blue-500 mb-4">
          Stay tuned for your exciting events in the future!
        </h2>
        <p className=" mb-8">
          Our core belief is to ensure that our students receive comprehensive education and guidance at every stage of their study abroad journey. 
          Presented below are a few of our previous international educational events.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-3 w-full sm:w-72 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            onClick={handleSubscribe}
            className="px-6 py-3 bg-gradient-to-r from-sky-400 to-blue-500 text-white font-semibold rounded shadow hover:from-blue-500 hover:to-sky-400 transition"
          >
            Notify Me
          </button>
        </div>
      </div>
    </section>
  );
}
