
import LogoutButton from "@/app/components/auth/LogoutButton";
import { requireSession } from "@/lib/auth/permissions";

export default async function StaffPage() {
  await requireSession("staff")
  return(
    <div>
      <h1>Staff Dashboard</h1>
      <LogoutButton />
    </div>
  );
}