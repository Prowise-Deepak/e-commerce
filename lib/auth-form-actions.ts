import { authClient } from "@/lib/auth-client";
import { getDashboardByRole } from "@/lib/roles";

type AuthResult = {
  error?: string;
  redirectTo?: string;
};

type SignUpInput = {
  name: string;
  email: string;
  password: string;
  contact: string;
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function getAuthErrorMessage(error: unknown, fallback: string) {
  if (error instanceof Error && error.message) {
    return error.message;
  }

  return fallback;
}

export function validateEmail(email: string) {
  return emailPattern.test(email.trim());
}

export async function signInUser(
  email: string,
  password: string,
): Promise<AuthResult> {
  try {
    const result = await authClient.signIn.email({
      email: email.trim(),
      password,
    });

    if (result.error) {
      return { error: result.error.message || "Unable to sign in." };
    }

    const session = await authClient.getSession();
    const role = (session.data?.user as { role?: string } | undefined)?.role;

    return { redirectTo: getDashboardByRole(role) };
  } catch (error) {
    return {
      error: getAuthErrorMessage(error, "Unable to sign in. Please try again."),
    };
  }
}

export async function signUpUser(input: SignUpInput): Promise<AuthResult> {
  try {
    const signUpResult = await authClient.signUp.email({
      name: input.name.trim(),
      email: input.email.trim(),
      password: input.password,
      contact: input.contact.trim(),
    } as Parameters<typeof authClient.signUp.email>[0]);

    if (signUpResult.error) {
      return { error: signUpResult.error.message || "Unable to sign up." };
    }

    return signInUser(input.email, input.password);
  } catch (error) {
    return {
      error: getAuthErrorMessage(error, "Unable to sign up. Please try again."),
    };
  }
}

export async function signOutUser(): Promise<AuthResult> {
  try {
    const result = await authClient.signOut();

    if (result.error) {
      return { error: result.error.message || "Unable to sign out." };
    }

    return { redirectTo: "/signIn" };
  } catch (error) {
    return {
      error: getAuthErrorMessage(error, "Unable to sign out. Please try again."),
    };
  }
}
