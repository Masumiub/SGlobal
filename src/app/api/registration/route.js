import clientPromise from "@/app/lib/db";


export async function POST(req) {
  try {
    const body = await req.json();
    const { name, email, phone, eventId, eventName } = body;

    if (!name || !email || !phone || !eventId) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("SGlobalDB"); 
    const registrations = db.collection("registrations");

    const result = await registrations.insertOne({
      name,
      email,
      phone,
      eventId,
      eventName,
      createdAt: new Date(),
    });

    return new Response(
      JSON.stringify({ message: "Registration successful", result }),
      { status: 201 }
    );
  } catch (err) {
    console.error(err);
    return new Response(
      JSON.stringify({ error: "Something went wrong" }),
      { status: 500 }
    );
  }
}
