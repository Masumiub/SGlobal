import clientPromise from "@/app/lib/db";

export default async function AdminHomePage() {
  const client = await clientPromise;
  const db = client.db("SGlobalDB");

  // Total events
  const totalEvents = await db.collection("events").countDocuments();

  // Upcoming events: events with date >= today
  const today = new Date();
  const upcomingEvents = await db
    .collection("events")
    .countDocuments({ date: { $gte: today } });

  // Total users
  const totalUsers = await db.collection("users").countDocuments();

  return (
    <div className="">
      <h1 className="text-3xl font-bold mb-6">Welcome, Admin!</h1>
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <div className="px-4 py-8 bg-base-100 shadow rounded-lg">
          <h1 className="font-bold text-xl">Total Events: {totalEvents}</h1>
        </div>
        <div className="px-4 py-8 bg-base-100 shadow rounded-lg">
          <h1 className="font-bold text-xl">Upcoming Events: {upcomingEvents}</h1>
        </div>
        <div className="px-4 py-8 bg-base-100 shadow rounded-lg">
          <h1 className="font-bold text-xl">Users: {totalUsers}</h1>
        </div>
      </div>
    </div>
  );
}
