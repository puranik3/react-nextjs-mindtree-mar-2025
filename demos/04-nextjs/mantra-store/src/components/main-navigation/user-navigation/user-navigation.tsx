'use client';

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const authenticatedUserMenu = [
    { href: "/profile", text: "Profile" },
    { href: "/logout", text: "Logout" },
];

const unauthenticatedUserMenu = [
    { href: "/auth", text: "Login/Register" }
];

export default function UserNavigation() {
    const [userMenuOpen, setUserMenuOpen] = useState(false);

    const { data: session, status } = useSession();
    const router = useRouter();

    const toggleUserMenu = () => setUserMenuOpen(!userMenuOpen);

    const handleUserMenuClick = (href: string) => {
        setUserMenuOpen(false);
        router.push(href);
    };
    
    return (
        <div className="relative">
            <button
                onClick={toggleUserMenu}
                className="ml-4 rounded-full bg-gray-700 w-8 h-8 flex items-center justify-center text-sm font-bold"
            >
                {session?.user?.email?.charAt(0).toUpperCase() ||
                    "U"}
            </button>

            {userMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white text-gray-800 rounded shadow-lg py-1">
                    {(status === "authenticated"
                        ? authenticatedUserMenu
                        : unauthenticatedUserMenu
                    ).map((item) => (
                        <button
                            key={item.text}
                            onClick={() =>
                                handleUserMenuClick(item.href)
                            }
                            className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                        >
                            {item.text}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}