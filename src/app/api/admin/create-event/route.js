import clientPromise from "@/app/lib/db";
import { adminAuth } from "@/app/middlewares/adminAuth";


export async function POST(req) {
  const auth = await adminAuth();

  if (!auth.authorized) {
    return NextResponse.json(
      { error: auth.message },
      { status: 403 }
    );
  }
  
  try {
    const body = await req.json();
    const {
      title,
      location,
      date,
      startTime,
      endTime,
      description,
      whyAttend,
      topPartnerUniversities,
      contactNumber,
      bannerURL,
    } = body;

    if (!title || !location || !date || !startTime || !endTime || !description) {
      return new Response(
        JSON.stringify({ error: "Missing required fields." }),
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db('SGlobalDB');
    const eventsCollection = db.collection("events");

    const newEvent = {
      title,
      location,
      date: new Date(date),
      startTime,
      endTime,
      description,
      whyAttend: Array.isArray(whyAttend) ? whyAttend : [],
      topPartnerUniversities: Array.isArray(topPartnerUniversities)
        ? topPartnerUniversities
        : [],
      contactNumber: contactNumber || "",
      bannerURL: bannerURL || "",
      createdAt: new Date(),
    };

    const result = await eventsCollection.insertOne(newEvent);

    return new Response(
      JSON.stringify({ message: "Event created successfully", eventId: result.insertedId }),
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Server error" }), { status: 500 });
  }
}
