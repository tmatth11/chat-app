import { LoginForm } from "./_components/login-form";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Log In",
    description: "Log in using your email and password",
};

export default function LoginPage() {
    return (
        <div className="flex justify-center p-4">
            <LoginForm />
        </div>
    );
}
