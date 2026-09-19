import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { Role, getDashboardByRole } from "./roles";

export async function requireSession(requiredRole?: Role) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/signIn");
  }

  const userRole = session.user.role as Role;

  if (requiredRole && userRole !== requiredRole) {
    redirect(getDashboardByRole(userRole));
  }

  return session;
}