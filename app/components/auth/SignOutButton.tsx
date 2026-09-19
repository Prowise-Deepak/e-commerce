"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { signOutUser } from "@/lib/auth-form-actions";

export default function SignOutButton() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSignOut() {
    setError("");
    setIsSubmitting(true);

    try {
      const result = await signOutUser();

      if (result.error) {
        setError(result.error);
        return;
      }

      router.replace(result.redirectTo || "/signIn");
      router.refresh();
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div>
      <button type="button" onClick={handleSignOut} disabled={isSubmitting}>
        {isSubmitting ? "Signing out..." : "Sign Out"}
      </button>
      {error && <p role="alert">{error}</p>}
    </div>
  );
}