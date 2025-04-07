// This page uses Incremental SSG (ISR) - the page will be regenerated every 60 seconds (1 minute)
export const revalidate = 60;

import { getProductById, getProductIds } from "@/data/services/products";
import ProductDetail from "@/components/product-detail/product-detail";
import type { IProduct } from "@/types/Product";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

type Props = {
    params: { id: string };
};

// export generateMetadata() for setting metadata dynamically
// runs at build time (in case of SSG)
// in case of ISR (revalidate is exported), it runs periodically
export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { id } = await params;
    const product = await getProductById(id);

    // return the metadata object
    return {
        title: product?.title ?? "Product details",
        description: product?.description ?? "",
    };
}

// generateStaticParams() runs at build time - SSG
export async function generateStaticParams() {
    const ids = await getProductIds();

    // [ { id: '123' }, { id: '234'}, ... ]
    const idsMap = ids.map((id: number | string) => ({ id: String(id) }));

    return idsMap;
}

// in case of ISR (revalidate is exported), it runs periodically
// in case product is not one of them generated at build-time, this function runs at request time! In case such a product exists, the page is shown, else not found page is shown
export default async function ProductDetailPage({ params }: Props) {
    const { id } = await params;

    const product: IProduct = await getProductById(id);

    if (!product) {
        return notFound();
    }

    return <ProductDetail productId={id} product={product} />;
}