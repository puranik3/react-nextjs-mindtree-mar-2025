import { IProduct } from "../types/Product";

type IGetProductsResponse = {
    status: "success" | "error";
    message: {
        count: number;
        page: number;
        products: IProduct[];
    };
};

export const getProducts = async (
    page = 1
): Promise<IGetProductsResponse["message"]> => {
    // const res = await fetch(`/api/products?page=${page}`)

    // Frotend fetch() - This fetch() IS NOT MODIFIED by Next JS
    //      - same as the browser fetch()
    // Backend fetch() - This fetch IS MODIFIED by Next JS
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"; // fallback for local

    const res = await fetch(`${baseUrl}/api/products?page=${page}`);

    if (!res.ok) {
        throw new Error("Failed to fetch products");
    }

    const data: IGetProductsResponse = await res.json();
    return data.message;
};
