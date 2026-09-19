import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function GET() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return Response.json(
      { message: "Unauthorized" },
      { status: 401 }
    );
  }

  if (session.user.role !== "admin") {
    return Response.json(
      { message: "Forbidden" },
      { status: 403 }
    );
  }

  return Response.json({
    user: session.user,
  });
}