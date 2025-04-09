"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode, useState } from "react";
import { SessionProvider } from 'next-auth/react';
import { CartProvider } from "@/context/shopping-cart";
import { updateCart } from "@/services/cart";
import { ICartItem } from '@/types/Cart';

interface Props {
    children: ReactNode,
    session: any
}

export default function Providers({ children, session }: Props) {
    const [queryClient] = useState(() => new QueryClient());

    const [cart, setCart] = useState<ICartItem[]>([]);

    const changeQuantity = async (
        productId: string | undefined,
        quantityToAdd: number
    ) => {
        if (!productId) return;

        let newCart = [...cart];
        const index = newCart.findIndex((item) => item.productId === productId);

        if (index >= 0) {
            newCart[index] = {
                ...newCart[index],
                quantity: newCart[index].quantity + quantityToAdd,
            };
        } else {
            newCart.push({
                productId,
                quantity: quantityToAdd
            });
        }

        newCart = newCart.filter((item) => item.quantity > 0);

        const cartToSend = newCart.map((item) => ({
            productId: (item.product as any)?._id ?? item.productId,
            quantity: item.quantity,
        }));

        const response = await updateCart(cartToSend); // backend API call to update cart
        const updatedCart = response.message.cart;

        setCart(updatedCart); // context cart will get updated
        return updatedCart;
    };

    const value = {
        cart,
        changeQuantity,
        setCart,
    };

    return (
        <SessionProvider session={session}>
            <QueryClientProvider client={queryClient}>
                <CartProvider value={value}>
                    {children}
                </CartProvider>
            </QueryClientProvider>
        </SessionProvider>
    );
}