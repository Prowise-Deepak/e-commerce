"use server";

import { auth } from "@/lib/auth/auth";
import { getDashboardByRole } from "@/lib/auth/roles";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export type AuthActionState = {
  error?: string;
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function getString(formData: FormData, field: string): string {
  const value = formData.get(field);

  return typeof value === "string" ? value.trim() : "";
}

export async function registerAction(
  _previousState: AuthActionState,
  formData: FormData,
): Promise<AuthActionState> {
  const name = getString(formData, "name");
  const email = getString(formData, "email");
  const password = getString(formData, "password");
  const contact = getString(formData, "contact");

  if (!name) {
    return {
      error: "Name is required.",
    };
  }

  if (!emailPattern.test(email)) {
    return {
      error: "Please enter a valid email.",
    };
  }

  if (password.length < 6) {
    return {
      error: "Password must be at least 6 characters.",
    };
  }

  if (!/^\d{10}$/.test(contact)) {
    return {
      error: "Contact must be exactly 10 digits.",
    };
  }

  try {
    await auth.api.signUpEmail({
      body: {
        name,
        email,
        password,
        contact,
      },
    });
  } catch (error) {
    return {
      error:
        error instanceof Error
          ? error.message
          : "Unable to sign up. Please try again.",
    };
  }

  redirect("/login");
}

export async function loginAction(
  _previousState: AuthActionState,
  formData: FormData,
): Promise<AuthActionState> {
  const email = getString(formData, "email");
  const password = getString(formData, "password");

  if (!emailPattern.test(email)) {
    return {
      error: "Please enter a valid email.",
    };
  }

  if (!password) {
    return {
      error: "Password is required.",
    };
  }

  try {
    const result = await auth.api.signInEmail({
      body: {
        email,
        password,
      },
      headers: await headers(),
    });

    if (!result) {
      return {
        error: "Unable to sign in. Please try again.",
      };
    }
    const userRole = result.user.role;

    redirect(getDashboardByRole(userRole));
  } catch (error) {
    if (
      error &&
      typeof error === "object" &&
      "digest" in error &&
      typeof error.digest === "string" &&
      error.digest.startsWith("NEXT_REDIRECT")
    ) {
      throw error;
    }

    return {
      error:
        error instanceof Error
          ? error.message
          : "Unable to sign in. Please try again.",
    };
  }
}

export async function logoutAction(
  _previousState: AuthActionState,
  _formData: FormData,
): Promise<AuthActionState> {
  try {
    await auth.api.signOut({
      headers: await headers(),
    });
  } catch (error) {
    return {
      error:
        error instanceof Error
          ? error.message
          : "Unable to sign out. Please try again.",
    };
  }

  redirect("/login");
}