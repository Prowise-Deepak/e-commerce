"use client";

import { useActionState } from "react";

import { loginAction, type AuthActionState } from "@/app/actions/auth.actions";

const initialState: AuthActionState = {};

export default function LoginForm() {
  const [state, formAction, isPending] = useActionState(
    loginAction,
    initialState,
  );

  return (
    <form action={formAction}>
      <div>
        <label htmlFor="email">
          Email
        </label>

        <input
          id="email"
          name="email"
          type="email"
          placeholder="Email"
          autoComplete="email"
          required
        />
      </div>

      <div>
        <label htmlFor="password">
          Password
        </label>

        <input
          id="password"
          name="password"
          type="password"
          placeholder="Password"
          autoComplete="current-password"
          required
        />
      </div>

      {state.error && (
        <p role="alert">
          {state.error}
        </p>
      )}

      <button
        type="submit"
        disabled={isPending}
      >
        {isPending ? "Logging in..." : "Login"}
      </button>
    </form>
  );
}