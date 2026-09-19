"use client";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { signInUser, validateEmail } from "@/lib/auth-form-actions";

export default function SignInForm() {

    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    async function handleSignIn(e: FormEvent) {
        e.preventDefault();
        setError("");

        if(!email.trim() || !password.trim()){
            setError("Email and password are required.");
            return;
        }

        if (!validateEmail(email)) {
            setError("Please enter a valid email.");
            return;
        }

        setIsSubmitting(true);

        try {
            const result = await signInUser(email, password);

            if (result.error) {
                setError(result.error);
                return;
            }

            if (result.redirectTo) {
                router.replace(result.redirectTo);
            }
        } finally {
            setIsSubmitting(false);
        }
    }

    return(
        <form onSubmit={handleSignIn}>
            <input
                type="email"
                placeholder="Email"
                autoComplete="email"
                value={email}
                onChange={(e) => {
                    setEmail(e.target.value);
                    setError("");
                }}
            />
            <input
                type="password"
                placeholder="Password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => {
                    setPassword(e.target.value);
                    setError("");
                }}
            />
            {error && <p role="alert">{error}</p>}
            <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Signing in..." : "Sign In"}
            </button>
        </form>
    );
}