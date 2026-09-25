"use client";

import { useActionState } from "react";
import { registerAction, type AuthActionState } from "@/app/actions/auth.actions";

const initialState: AuthActionState = {};

export default function RegisterForm() {
  const [state, formAction, isPending] = useActionState(
    registerAction,
    initialState,
  );

  return (
    <form action={formAction}>
      <div>
        <label htmlFor="name">
          Name
        </label>

        <input
          id="name"
          name="name"
          type="text"
          placeholder="Name"
          autoComplete="name"
          required
        />
      </div>

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
          autoComplete="new-password"
          required
        />
      </div>

      <div>
        <label htmlFor="contact">
          Contact
        </label>

        <input
          id="contact"
          name="contact"
          type="text"
          placeholder="Contact"
          inputMode="numeric"
          maxLength={10}
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
        {isPending ? "Signing up..." : "Sign Up"}
      </button>
    </form>
  );
}