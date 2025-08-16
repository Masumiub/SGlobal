import clientPromise from "@/app/lib/db";


export default async function UsersPage() {
    const client = await clientPromise;
    const db = client.db("SGlobalDB");
    const users = await db.collection("users").find().toArray();

    // Convert Mongo ObjectId and Dates to plain JSON-safe values
    const safeUsers = users.map(u => ({
        ...u,
        _id: u._id.toString(),
        createdAt: u.createdAt ? new Date(u.createdAt).toISOString() : null,
    }));

    return (
        <div className="">
            <h1 className="text-2xl font-bold mb-6">All Users</h1>

            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                        </tr>
                    </thead>
                    <tbody>
                        {safeUsers.map(user => (
                            <tr key={user._id}>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.role}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
