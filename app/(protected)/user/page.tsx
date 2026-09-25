import LogoutButton from "@/app/components/auth/LogoutButton";
import { requireSession } from "@/lib/auth/permissions";

export default async function UserPage() {
  await requireSession("user")
  return(
    <div>
      <h1>User Dashboard</h1>
      <LogoutButton />
    </div>
  );
}