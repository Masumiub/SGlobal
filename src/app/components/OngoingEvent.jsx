import clientPromise from "../lib/db";
import { categorizeEvent } from "../lib/categorizeEvent";
import NoEvents from "./NoEvents";
import OngoingEventsSlider from "./OngoingEventsSlider";


export const revalidate = 60;

export default async function OngoingEvents() {
  const client = await clientPromise;
  const db = client.db("SGlobalDB");

  const events = await db.collection("events").find({}).sort({ startTime: 1 }).toArray();

  const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  const safeEvents = events.map(e => ({
    _id: e._id.toString(),
    title: e.title || "",
    location: e.location || "",
    description: e.description || "",
    bannerURL: e.bannerURL || "",
    whyAttend: e.whyAttend || [],
    topPartnerUniversities: e.topPartnerUniversities || [],
    contactNumber: e.contactNumber || "",
    date: e.date ? new Date(e.date).toISOString() : null,
    startTime: e.startTime ? new Date(e.startTime).toISOString() : null,
    endTime: e.endTime ? new Date(e.endTime).toISOString() : null
  }));



  const ongoingEvents = safeEvents.filter(event => categorizeEvent(event, userTimeZone) === "ongoing");

  if (!ongoingEvents.length) return <NoEvents />;


  return (
    <div className="mt-20">
      <h2 className="text-5xl font-bold mb-6 text-center text-blue-800">Ongoing Events</h2>
      <div className="w-full md:w-7/12 mx-auto">
      <p className="text-center">Our core belief is to ensure that our students receive comprehensive education and guidance at every stage of their study abroad journey.</p>
      </div>


      <div className="mt-10">
        <OngoingEventsSlider events={ongoingEvents} />
      </div>

    </div>
  );
}
