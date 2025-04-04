import { IProduct } from "../types/Product";

type IGetProductsResponse = {
    status: "success" | "error";
    message: {
        count: number;
        page: number;
        products: IProduct[];
    };
};

export const getProducts = async (page = 1): Promise<IGetProductsResponse> => {
    // const res = await fetch(`/api/products?page=${page}`)

    // NOTE: process.env.NEXT_PUBLIC_SITE_URL -> Needs dev server to be running during build to work. Work around @todo -> SSG in `app/products/page.tsx` needs to fetch from DB service rather than this frontend API service, but yet construct cached response for frontend in this response format - i.e. { status: 'success', message: { count, page, products } }
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_SITE_URL}/api/products?page=${page}`
    );

    if (!res.ok) {
        throw new Error("Failed to fetch products");
    }

    const data: IGetProductsResponse = await res.json();
    return data;
};
