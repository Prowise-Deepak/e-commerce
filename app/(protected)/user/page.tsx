import SignOutButton from "@/app/components/auth/SignOutButton";
import { requireSession } from "@/lib/permissions";

export default async function UserPage() {

  return(
    <div>
      <h1>User Dashboard</h1>
      <SignOutButton />
    </div>
  );
}