import { getServerSession } from "next-auth/next";
import { authOptions } from "../lib/auth";


export async function adminAuth() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return { authorized: false, message: "Not authenticated" };
  }

  if (session.user.role !== "admin") {
    return { authorized: false, message: "Access denied. Admins only." };
  }

  return { authorized: true, session };
}
