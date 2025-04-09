"use client";

import { ReactNode, useState } from 'react';
import { createContext, useContext } from 'react';
import { IProduct, IReview } from '@/types/Product';

export type ProductContextValue = {
    product: IProduct;
    productId: string;
    updateReviews: (reviews: IReview[]) => void;
};

export const ProductContext = createContext<ProductContextValue | null>(null);

// used by consumers of the data - in our case the product reviews, add review components
export const useProduct = () => {
    const context = useContext(ProductContext);
    if (!context) {
        throw new Error(
            "useProduct must be used within <ProductContext.Provider>"
        );
    }
    return context;
};

// used by the component that provides the shared context data - in our case the product detail layout page
export function ProductProvider({
    children,
    value,
}: {
    children: ReactNode;
    value: Omit<ProductContextValue, 'updateReviews'>;
}) {
    const [reviews, setReviews] = useState<IReview[]>(value.product.reviews);

    const updateReviews = (newReviews: IReview[]) => {
        setReviews(newReviews);
    };

    const valueWithUpdatedReviews = {
        ...value,
        product: {
            ...value.product,
            reviews: reviews,
        },
        updateReviews,
    };

    return (
        <ProductContext.Provider value={valueWithUpdatedReviews}>
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