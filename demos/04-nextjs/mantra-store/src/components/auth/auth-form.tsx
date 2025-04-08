"use client";

import { useState, useEffect } from "react";
import { signIn, getSession } from "next-auth/react";
import { register } from "@/services/auth";
import { useRouter } from "next/navigation"

function AuthForm() {
    const router = useRouter();
    const [isLogin, setIsLogin] = useState(true);
    // prevent navigation to this page if session exists


    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function switchAuthModeHandler() {
        setIsLogin((prevState) => !prevState);
    }

    // Consider refactoring to a custom hook that prevents navigation to a page on logged in / not logged in
    // ---
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getSession().then((session) => {
            if (session) {
                // bad but a temporray fix for router.push() giving problems
                // window.location.href = "/profile";
                router.push('/profile');
            } else {
                setIsLoading(false);
            }
        });
    }, []);
    // ---

    async function submitHandler(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault(); // prevents browser default action

        try {
            // registration
            if (!isLogin) {
                await register({ email, username, password });
                alert(username + " registered successfully");
                setIsLogin(true);
                return;
            }

            // login
            if (isLogin) {
                // login
                const result = await signIn("credentials", {
                    redirect: false,
                    email,
                    password,
                })

                if (result?.ok && !result.error) {
                    router.push("/products")
                } else {
                    alert("Login failed")
                }
            }
        } catch (error) {
            alert((error as Error).message);
        }
    }

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-screen px-4">
                Wait a second...
            </div>
        );
    }

    return (
        <section className="max-w-xl mx-auto p-6 bg-white shadow-md rounded-md">
            <h1 className="text-2xl font-semibold mb-6 text-center">
                {isLogin ? "Login" : "Sign Up"}
            </h1>

            <form
                className="space-y-4"
                onSubmit={submitHandler}
            >
                {!isLogin && (
                    <div>
                        <label
                            htmlFor="username"
                            className="block text-sm font-medium mb-1"
                        >
                            Username
                        </label>
                        <input
                            required
                            type="text"
                            id="username"
                            name="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full max-w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                )}

                <div>
                    <label
                        htmlFor="email"
                        className="block text-sm font-medium mb-1"
                    >
                        Email
                    </label>
                    <input
                        required
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full max-w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div>
                    <label
                        htmlFor="password"
                        className="block text-sm font-medium mb-1"
                    >
                        Password
                    </label>
                    <input
                        required
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full max-w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="space-y-4">
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white font-semibold py-2 rounded hover:bg-blue-700 transition"
                    >
                        {isLogin ? "Login" : "Create Account"}
                    </button>

                    <button
                        type="button"
                        onClick={switchAuthModeHandler}
                        className="w-full text-blue-600 hover:underline text-sm"
                    >
                        {isLogin
                            ? "Create new account"
                            : "Login with existing account"}
                    </button>
                </div>
            </form>
        </section>
    );
}

export default AuthForm;