import SignOutButton from "@/app/components/auth/SignOutButton";
import { requireSession } from "@/lib/permissions";

export default async function StaffPage() {
  return(
    <div>
      <h1>Staff Dashboard</h1>
      <SignOutButton />
    </div>
  );
}