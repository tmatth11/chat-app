// Source: https://supabase.com/library/docs/nextjs/password-based-auth

"use client";

import { createClient } from "@/src/lib/client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const router = useRouter();

    const handleLogin = async (e: React.SubmitEvent) => {
        e.preventDefault();

        const supabase = createClient();
        setIsLoading(true);
        setError(null);

        try {
            const { error } = await supabase.auth.signInWithPassword({
                email,
                password
            });

            if (error) throw error;
            router.push("/chat-list");
        } catch (error: unknown) {
            setError(
                error instanceof Error ? error.message : "An error occurred",
            );
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-container-primary mt-2 flex w-sm flex-col rounded-md p-4 md:w-md">
            {/* Header */}
            <div className="flex flex-col">
                <h4>Log in</h4>
                <p>Log in using your email and password.</p>
            </div>
            {/* Divider */}
            <hr className="mt-4 border-t" />
            {/* Sign Up Form */}
            <form onSubmit={handleLogin} className="flex flex-col">
                {/* Email input */}
                <label className="form-group">
                    <span className="form-label">Email</span>
                    <input
                        className="form-input"
                        id="email"
                        type="email"
                        placeholder="Enter email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </label>
                {/* Password input */}
                <label className="form-group">
                    <span className="form-label">Password</span>
                    <input
                        className="form-input"
                        id="password"
                        type="password"
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </label>
                {/* Error message */}
                <div className="my-4 flex items-center justify-center">
                    {error && <p className="form-error">{error}</p>}
                </div>
                {/* Submit button */}
                <button
                    className="btn btn-primary"
                    type="submit"
                    disabled={isLoading}
                >
                    {isLoading ? "Logging in..." : "Log in"}
                </button>
            </form>
        </div>
    );
}
