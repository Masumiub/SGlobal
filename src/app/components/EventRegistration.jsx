"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import ImgReg from '../../../public/assets/Study abroad-rafiki.svg'
import { register } from "next/dist/next-devtools/userspace/pages/pages-dev-overlay-setup";

export default function EventRegistration({ safeEvent }) {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const body = {
      ...form,
      eventId: safeEvent._id,
      eventName: safeEvent.title,
    };

    try {
      const res = await fetch("/api/registration", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (res.ok) {
        alert("✅ Registered successfully!");
      } else {
        alert("❌ Registration failed");
      }
    } catch (err) {
      console.error(err);
      alert("Error submitting form.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid md:grid-cols-2 gap-6 items-center my-20">
      {/* Left Side: Event Image */}
      <div className="relative w-full h-72 md:h-96">
        <Image
          src={ImgReg}
          alt="registration"
          fill
          className="object-cover rounded-2xl shadow-xl"
        />
      </div>

      {/* Right Side: Registration Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-base-200 shadow-lg p-6 rounded-2xl space-y-4"
      >
        <h2 className="text-2xl font-bold">Register for {safeEvent.title}</h2>

        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Full Name"
          required
          className="w-full p-2 input rounded-lg"
        />
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email Address"
          required
          className="w-full p-2 input rounded-lg"
        />
        <input
          type="tel"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="Phone Number"
          required
          className="w-full p-2 input rounded-lg"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 disabled:opacity-50"
        >
          {loading ? "Submitting..." : "Register Now"}
        </button>
      </form>
    </div>
  );
}
