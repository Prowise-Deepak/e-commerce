"use server";
import { auth } from "@/lib/auth";
import {redirect} from "next/navigation";
import { headers } from "next/headers";

function getString(formData: FormData, field: string) {
    const value = formData.get(field);
    return typeof value === "string" ? value.trim() : "";
}

export type AuthActionState = { error?: string };

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function signUpAction(
    _previousState: AuthActionState,
    formData: FormData,
): Promise<AuthActionState> {
    const email = getString(formData, "email");
    const password = getString(formData, "password");
    const name = getString(formData, "name");
    const contact = getString(formData, "contact");

    if (!name || !contact || !emailPattern.test(email) || password.length < 6) {
        return { error: "Please enter valid signup details." };
    }

    try {
        await auth.api.signUpEmail({ body: { email, password, name, contact } });
    } catch (error) {
        return { error: error instanceof Error ? error.message : "Unable to sign up." };
    }

    redirect("/signIn");
}

export async function signInAction(
    _previousState: AuthActionState,
    formData: FormData,
): Promise<AuthActionState> {
    const email = getString(formData, "email");
    const password = getString(formData, "password");

    if (!emailPattern.test(email) || !password) {
        return { error: "Please enter a valid email and password." };
    }

    try {
        await auth.api.signInEmail({ body: { email, password } });
    } catch (error) {
        return { error: error instanceof Error ? error.message : "Unable to sign in." };
    }

    redirect("/");
}

export async function signOutAction(): Promise<AuthActionState> {
    try {
        await auth.api.signOut({ headers: await headers() });
    } catch (error) {
        return { error: error instanceof Error ? error.message : "Unable to sign out." };
    }

    redirect("/");
}