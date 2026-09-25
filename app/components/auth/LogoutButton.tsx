"use client";

import { useActionState } from "react";
import {
  logoutAction,
  type AuthActionState,
} from "@/app/actions/auth.actions";

const initialState: AuthActionState = {};

export default function LogoutButton() {
  const [state, formAction, isPending] = useActionState(
    logoutAction,
    initialState,
  );

  return (
    <form action={formAction}>
      <button type="submit" disabled={isPending}>
        {isPending ? "Logging out..." : "Logout"}
      </button>

      {state.error && (
        <p role="alert">
          {state.error}
        </p>
      )}
    </form>
  );
}