import { getProductById } from "@/data/services/products";
import type { IProduct } from "@/types/Product";
import { notFound } from "next/navigation";
import ProductReviews from "@/components/product-detail/product-reviews/product-reviews";

type Props = {
    params: { id: string };
};

// in case of ISR (revalidate is exported), it runs periodically
// in case product is not one of them generated at build-time, this function runs at request time! In case such a product exists, the page is shown, else not found page is shown
export default async function Page({ params }: Props) {
    const { id } = await params;

    const product: IProduct = await getProductById(id);

    if (!product) {
        return notFound();
    }

    return <ProductReviews />;
}