import { headers } from "next/headers";
import { auth } from "@/lib/auth/auth";

export async function getAuthSession() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return session;
}