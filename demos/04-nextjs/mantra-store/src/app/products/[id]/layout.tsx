// This page uses Incremental SSG (ISR) - the page will be regenerated every 60 seconds (1 minute)
export const revalidate = 60;

import { getProductById, getProductIds } from "@/data/services/products";
import ProductDetail from "@/components/product-detail/product-detail";
import type { IProduct } from "@/types/Product";
import type { Metadata } from "next";
import type { ReactNode } from "react";

type Props = {
    params: { id: string };
    children: ReactNode;
};

// generateStaticParams() runs at build time - SSG
export async function generateStaticParams() {
    const ids = await getProductIds(); // e.g. from DB
    return ids.map((id) => ({ id: String(id) }));
}

// export generateMetadata() for setting metadata dynamically
// runs at build time (in case of SSG)
// in case of ISR (revalidate is exported), it runs periodically
export async function generateMetadata({
    params,
}: {
    params: { id: string };
}): Promise<Metadata> {
    const product = await getProductById(params.id);
    return {
        title: product?.title ?? "Product details",
        description: product?.description ?? "",
    };
}

export default async function Layout({ children, params } : Props ) {
    const { id } = await params;
    const product: IProduct = await getProductById(id);

    return (
        <>
            <ProductDetail product={product} productId={id} />
            {children}
        </>
    )
}