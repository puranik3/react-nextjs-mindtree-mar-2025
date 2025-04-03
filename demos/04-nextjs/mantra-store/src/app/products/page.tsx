import type { Metadata } from "next";
// import { notFound } from "next/navigation";

import ProductsList from "@/components/products-list/products-list";
import { getProducts } from "@/data/services/products";
import type { IProduct } from "@/types/Product";

export const metadata : Metadata = {
  title: "List of products",
  description: "Mantra Store - search through our variety of products.",
};

export default async function ProductsPage() {
  try {
    const { count, page, products }: {
      count: number;
      page: number;
      products: IProduct[];
    } = await getProducts();

    // simulating an error
    // throw new Error('Ooops');

    return <ProductsList
        products={products}
        count={count}
        page={page}
      />;
  } catch (error) {
      // console.error("Failed to load products:", (error as Error).message);
      // Option 1: Render a fallback UI - Graceful Fallback UI that shows up on /products route in the client
      // return <div>Failed to load products. Please try again later.</div>;

      // Option 2: Interrupts rendering and bubbles up to error boundaries
      // go to the closest `error.tsx` boundary (or the root one) - Error page gets access to the error and reset method to retry page rendering and is a client component
      throw new Error("Failed to load products. Please try again later.");

      // Option 3
      // trigger the /app/not-found.tsx route (if defined) - Not Found page does not get access to the error and is a server component
      // notFound(); // if you want to mimic `return { notFound: true }`
  }
}