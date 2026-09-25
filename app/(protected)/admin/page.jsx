import { requireSession } from "@/lib/auth/permissions.ts"
import LogoutButton from "@/app/components/auth/LogoutButton";

export default async function AdminPage() {
  await requireSession("admin");
  return(
    <div>
      <h1>Admin Dashboard</h1>
      <LogoutButton />
    </div>
  );
}