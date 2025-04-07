import type { Metadata } from "next";
import AuthForm from "@/components/auth/auth-form";

export const metadata: Metadata = {
    title: "Login/Register | Mantra Store",
    description: "Login / Register with Mantra Store",
};

export default function AuthPage() {
    return <AuthForm />;
}