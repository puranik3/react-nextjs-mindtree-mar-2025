'use client';

import { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FaShoppingCart } from "react-icons/fa";
import { useCart } from "@/context/shopping-cart";
import { getCart } from "@/services/cart";

const authenticatedUserMenu = [
    { href: "/profile", text: "Profile" },
    { href: "/logout", text: "Logout" },
];

const unauthenticatedUserMenu = [
    { href: "/auth", text: "Login/Register" }
];

export default function UserNavigation() {
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    // const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(
    //     null
    // )

    const { data: session, status } = useSession();
    const router = useRouter();

    const toggleUserMenu = () => setUserMenuOpen(!userMenuOpen);

    // const handleUserMenuClick = (href: string) => {
    //     setUserMenuOpen(false);
    //     router.push(href);
    // };

    const handleCloseUserMenu = async (event: React.MouseEvent, href?: string) => {
        event.preventDefault();

        setUserMenuOpen(false);
        // setAnchorElUser(null);

        console.log("href=", href);

        if (!href) return;

        if (href === "/logout") {
            await signOut({
                callbackUrl: "/auth",
            });
            // window.location.href = "/auth
        } else {
            router.push(href);
        }
    };

    // required values from the shopping cart context
    const { cart, setCart } = useCart();

    // Fetch the cart on page load, and every time user logs in (session value changes and is set)
    useEffect(() => {
        const fetchCart = async () => {
            const data = await getCart();
            console.log("fetchCart data in main-navigation = ", data);
            setCart(
                data.message.cart.map((item) => {
                    return {
                        productId: (item.product as any)._id,
                        product: item.product,
                        quantity: item.quantity,
                    };
                })
            );
        };

        if (session) {
            fetchCart();
        }
    }, [session, setCart]);

    return (
        <div className="relative">
            <div className="relative flex items-center">
                {/* Cart Icon */}
                {session && status === "authenticated" && (
                    <div
                        className="relative mr-6 cursor-pointer"
                        onClick={(event) => handleCloseUserMenu(event, "/cart")}
                        aria-label="Go to cart"
                    >
                        <FaShoppingCart className="text-white text-xl" />
                        {cart.length > 0 && (
                            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-semibold px-2 py-0.5 rounded-full">
                                {cart.length}
                            </span>
                        )}
                    </div>
                )}

                {/* Avatar Button */}
                <button
                    onClick={toggleUserMenu}
                    className="ml-4 rounded-full bg-gray-700 w-8 h-8 flex items-center justify-center text-sm font-bold"
                >
                    {session?.user?.email?.charAt(0).toUpperCase() || "U"}
                </button>
            </div>

            {userMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white text-gray-800 rounded shadow-lg py-1">
                    {(status === "authenticated"
                        ? authenticatedUserMenu
                        : unauthenticatedUserMenu
                    ).map((item) => (
                        <button
                            key={item.text}
                            onClick={(event) => {
                                handleCloseUserMenu(event, item.href);
                                // handleUserMenuClick(item.href);
                            }}
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