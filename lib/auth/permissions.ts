import { redirect } from "next/navigation";
import { Role, getDashboardByRole } from "./roles";
import { getAuthSession } from "./sessions";

export async function requireSession(requiredRole?: Role) {
  const session = await getAuthSession();

  if (!session) {
    redirect("/login");
  }

  const userRole = session.user.role as Role;

  if (requiredRole && userRole !== requiredRole) {
    redirect(getDashboardByRole(userRole));
  }

  return session;
}