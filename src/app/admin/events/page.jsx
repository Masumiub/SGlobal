
import clientPromise from "@/app/lib/db";
import EventsTable from "./EventsTable";

export default async function AllEventsPage() {
  const client = await clientPromise;
  const db = client.db('SGlobalDB');
  const events = await db.collection("events").find().toArray();


  const safeEvents = events.map(e => ({
    ...e,
    _id: e._id.toString(),
    date: e.date ? new Date(e.date).toISOString() : null,
    startTime: e.startTime ? new Date(e.startTime).toISOString() : null,
    endTime: e.endTime ? new Date(e.endTime).toISOString() : null,
  }));

  return (
    <div className="">
      <h1 className="text-2xl font-bold mb-6">All Events</h1>
      <EventsTable events={safeEvents} />
    </div>
  );
}
