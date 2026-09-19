import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import SignUpForm from "@/app/components/auth/SignUpForm";
import { getDashboardByRole } from "@/lib/roles";
import { redirect } from "next/navigation";

export default async function SignUpPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if(session){
    redirect(getDashboardByRole(session?.user.role));
  }

  return <SignUpForm />;
}