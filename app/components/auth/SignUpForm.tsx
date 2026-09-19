"use client";

import { signUpUser, validateEmail } from "@/lib/auth-form-actions";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignUpForm() {
    const router = useRouter();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [contact, setContact] = useState("");
    const [error, setError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    async function handleSignUp(e: React.FormEvent) {
        e.preventDefault();
        setError("");

        if (!name.trim()) {
            setError("Name is required.");
            return;
        }

        if (!validateEmail(email)) {
            setError("Please enter a valid email.");
            return;
        }

        if (password.length < 6) {
            setError("Password must be at least 6 characters.");
            return;
        }

        if (contact.trim().length !== 10) {
            setError("Contact must be 10 characters.");
            return;
        }

        setIsSubmitting(true);

        try {
            const result = await signUpUser({ name, email, password, contact });

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

    return (
        <form onSubmit={handleSignUp}>
            <input
                type="text"
                placeholder="Name"
                autoComplete="name"
                value={name}
                onChange={(e) => {
                    setName(e.target.value);
                    setError("");
                }}
            />
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
                autoComplete="new-password"
                value={password}
                onChange={(e) => {
                    setPassword(e.target.value);
                    setError("");
                }}
            />
            <input
                type="text"
                placeholder="Contact"
                value={contact}
                onChange={(e) => {
                    setContact(e.target.value);
                    setError("");
                }}
            />
            {error && <p role="alert">{error}</p>}
            <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Signing up..." : "Sign Up"}
            </button>
        </form>
    );
}
