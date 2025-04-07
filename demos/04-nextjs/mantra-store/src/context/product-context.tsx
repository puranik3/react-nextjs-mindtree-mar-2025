"use client";

import { ReactNode } from "react";
import { createContext, useContext } from "react";
import { IProduct } from "@/types/Product";

export type ProductContextValue = {
    product: IProduct | null;
    productId: string;
};

export const ProductContext = createContext<ProductContextValue | null>(null);

export const useProduct = () => {
    const context = useContext(ProductContext);
    if (!context) {
        throw new Error(
            "useProduct must be used within <ProductContext.Provider>"
        );
    }
    return context;
};

export function ProductProvider({
    children,
    value,
}: {
    children: ReactNode;
    value: ProductContextValue;
}) {
    return (
        <ProductContext.Provider value={value}>
            {children}
        </ProductContext.Provider>
    );
}

{/* <ProductProvider value={x}>
    <ProductReviews />
</ProductProvider> */}

{/* <ProductContext.Provider value={x}>
    <ProductReviews />
</Product.Provider> */}