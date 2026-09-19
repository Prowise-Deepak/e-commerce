import SignInForm from "@/app/components/auth/SignInForm";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { getDashboardByRole } from "@/lib/roles";
import { redirect } from "next/navigation"

export default async function SignInPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if(session){
    redirect(getDashboardByRole(session.user.role));
  }

  return <SignInForm />;
}