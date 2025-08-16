import Image from "next/image";
import clientPromise from "../lib/db";
import Link from "next/link";
import EventCard from "../components/EventCard";
import OngoingEvents from "../components/OngoingEvent";
import UpcomingEvents from "../components/UpcomingEvents";

export const revalidate = 60;


export const metadata = {
  title: "Events - Shabuj Global",
  description: "Explore all ongoing and upcoming events organized by Shabuj Global for students planning to study abroad.",
  keywords: "Shabuj Global, study abroad, events, student programs, workshops, seminars",
  authors: [{ name: "Shabuj Global", url: "https://yourwebsite.com" }],
  robots: "index, follow",
  openGraph: {
    title: "Events - Shabuj Global",
    description: "Stay updated with all ongoing and upcoming events for students planning to study abroad.",
    url: "https://yourwebsite.com/events",
    siteName: "Shabuj Global",
    images: [
      {
        url: "https://yourwebsite.com/og-events.jpg",
        width: 1200,
        height: 630,
        alt: "Shabuj Global Events",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Events - Shabuj Global",
    description: "Stay updated with all ongoing and upcoming events for students planning to study abroad.",
    site: "@YourTwitterHandle",
    creator: "@YourTwitterHandle",
    images: ["https://yourwebsite.com/og-events.jpg"],
  },
};

export default async function EventsPage() {
  //Fetch events from MongoDB
  const client = await clientPromise;
  const db = client.db("SGlobalDB");
  const events = await db.collection("events").find({}).sort({ date: 1 }).toArray();

  return (

    <div className="">
    <div className="max-w-7xl mx-auto px-4 pb-30">

      <OngoingEvents></OngoingEvents>

      <UpcomingEvents></UpcomingEvents>


      <h2 className="text-5xl font-bold mb-6 text-center ">All Events</h2>
      <div className="w-full md:w-7/12 mx-auto">
        <p className="text-center">Our core belief is to ensure that our students receive comprehensive education and guidance at every stage of their study abroad journey.</p>
      </div>


      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-20">
        {events.map(event => (
          <EventCard key={event._id.toString()} event={event} showViewDetailsButton={true} />
        ))}
      </div>


    </div>
    </div>
  );
}


// placeholder="blur"
// blurDataURL="/placeholder.svg"