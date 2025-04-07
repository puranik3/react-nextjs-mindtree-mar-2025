import { getProductById, getProductIds } from "@/data/services/products";
import ProductDetail from "@/components/product-detail/product-detail";
import type { IProduct } from "@/types/Product";
import type { Metadata } from "next";

type Props = {
    params: { id: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { id } = await params;
    const product = await getProductById(id);

    return {
        title: product?.title ?? "Product details",
        description: product?.description ?? "",
    };
}

export default async function ProductDetailPage({ params }: Props) {
    const { id } = await params;

    const product: IProduct = await getProductById(id);

    return <ProductDetail productId={id} product={product} />;
}