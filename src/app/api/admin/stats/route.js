import clientPromise from "@/app/lib/db";
import { adminAuth } from "@/app/middlewares/adminAuth";

export async function GET() {


      const auth = await adminAuth();
    
      if (!auth.authorized) {
        return NextResponse.json(
          { error: auth.message },
          { status: 403 }
        );
      }
    


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
