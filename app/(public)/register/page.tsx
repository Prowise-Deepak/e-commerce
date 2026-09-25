import { getDashboardByRole } from "@/lib/auth/roles";
import { redirect } from "next/navigation";
import { getAuthSession } from "@/lib/auth/sessions";
import RegisterForm from "@/app/components/auth/RegisterForm";

export default async function RegisterationPage() {
  const session = await getAuthSession();

  if(session){
    redirect(getDashboardByRole(session?.user.role));
  }

  return <RegisterForm />;
}