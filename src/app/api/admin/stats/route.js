import clientPromise from "@/app/lib/db";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("SGlobalDB");

    const totalEvents = await db.collection("events").countDocuments();

    const today = new Date();
    const upcomingEvents = await db
      .collection("events")
      .countDocuments({ date: { $gte: today } });

    const pastEvents = await db
      .collection("events")
      .countDocuments({ date: { $lt: today } });

    const totalUsers = await db.collection("users").countDocuments();

    return Response.json({
      totalEvents,
      upcomingEvents,
      pastEvents,
      totalUsers,
    });
  } catch (e) {
    return Response.json({ error: "Failed to fetch stats" }, { status: 500 });
  }
}
