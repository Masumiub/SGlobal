"use client";

import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FF8042"];

export default function AdminHomePage() {
  const [stats, setStats] = useState({
    totalEvents: 0,
    upcomingEvents: 0,
    pastEvents: 0,
    totalUsers: 0,
  });

  useEffect(() => {
    async function fetchData() {
      const res = await fetch("/api/admin/stats");
      const data = await res.json();

      const events = data.events || [];
      const now = new Date();
      const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

      // Helper function
      const categorizeEvent = (event, tz) => {
        const eventDate = new Date(event.startTime);
        const now = new Date();
        return eventDate >= now ? "upcoming" : "past";
      };

      const upcomingEvents = events.filter((e) => categorizeEvent(e, userTimeZone) === "upcoming").length;
      const pastEvents = events.filter((e) => categorizeEvent(e, userTimeZone) === "past").length;

      setStats({
        totalEvents: events.length,
        upcomingEvents,
        pastEvents,
        totalUsers: data.totalUsers || 0,
      });
    }
    fetchData();
  }, []);

  const pieData = [
    { name: "Upcoming Events", value: stats.upcomingEvents },
    { name: "Past Events", value: stats.pastEvents },
    { name: "Total Events", value: stats.totalEvents },
  ];

//  console.log(stats.upcomingEvents, stats.pastEvents)


  return (
    <div className="">
      <h1 className="text-3xl font-bold mb-6">Welcome, Admin!</h1>

      {/* Stat Cards */}
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <div className="px-4 py-8 bg-base-100 shadow rounded-lg">
          <h1 className="font-bold text-xl">Total Events: {stats.totalEvents}</h1>
        </div>
        <div className="px-4 py-8 bg-base-100 shadow rounded-lg">
          <h1 className="font-bold text-xl">Upcoming Events: {stats.upcomingEvents}</h1>
        </div>
        <div className="px-4 py-8 bg-base-100 shadow rounded-lg">
          <h1 className="font-bold text-xl">Users: {stats.totalUsers}</h1>
        </div>
      </div>

      {/* Pie Chart */}
      <div className="mt-10 bg-base-100 shadow rounded-lg p-6 w-full h-96">
        <h2 className="text-xl font-semibold mb-4">Events Overview</h2>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              outerRadius={120}
              fill="#8884d8"
              dataKey="value"
              label={({ name, percent }) =>
                `${name}: ${(percent * 100).toFixed(0)}%`
              }
            >
              {pieData.map((entry, index) => (
                <Cell
                  key={`cell-${entry.name}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}



  // const client = await clientPromise;
  // const db = client.db("SGlobalDB");

  // const totalEvents = await db.collection("events").countDocuments();


  // const today = new Date();
  // const upcomingEvents = await db
  //   .collection("events")
  //   .countDocuments({ date: { $gte: today } });


  // const totalUsers = await db.collection("users").countDocuments();