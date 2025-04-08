"use client";

import { useState } from "react";
import { register } from "@/services/auth";

function AuthForm() {
    const [isLogin, setIsLogin] = useState(true);

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function switchAuthModeHandler() {
        setIsLogin((prevState) => !prevState);
    }

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
        } catch (error) {
            alert((error as Error).message);
        }
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