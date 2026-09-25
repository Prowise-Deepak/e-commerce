import { getDashboardByRole } from "@/lib/auth/roles";
import { redirect } from "next/navigation"
import { getAuthSession } from "@/lib/auth/sessions";
import LoginForm from "@/app/components/auth/LoginForm";

export default async function LoginPage() {
  const session = await getAuthSession()

  if(session){
    redirect(getDashboardByRole(session.user.role));
  }

  return <LoginForm />;
}