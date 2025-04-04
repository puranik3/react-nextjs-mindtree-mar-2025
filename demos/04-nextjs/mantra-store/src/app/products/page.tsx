// export const dynamic = 'force-dynamic';

import type { Metadata } from "next";
import { notFound } from "next/navigation";

import ProductsList from "@/components/products-list/products-list";
import { getProducts } from "@/data/services/products";
import type { IProduct } from "@/types/Product";

import HydrateClient from "@/components/lib/react-query/hydrate-client";
import { dehydrate, QueryClient } from "@tanstack/react-query";

export const metadata : Metadata = {
  title: "List of products",
  description: "Mantra Store - search through our variety of products.",
};

export default async function ProductsPage() {
  try {
    // SSG with React Query hydration
    const queryClient = new QueryClient();

    // Preload the page=1 data into React Query's cache
    await queryClient.prefetchQuery({
      queryKey: ["products", 1],
      queryFn: () => getProducts(1),
    });

    const { count, page, products }: {
      count: number;
      page: number;
      products: IProduct[];
    } = await getProducts(1);

    const dehydratedState = dehydrate(queryClient);

    // simulating an error
    // if( Math.random() < 0.5 ) {
    //    throw new Error('Ooops');
    // }

    return (
      <HydrateClient state={dehydratedState}>
        <ProductsList
          products={products}
          count={count}
          page={page}
        />
      </HydrateClient>
    );
  } catch (error) {
      // console.error("Failed to load products:", (error as Error).message);
      // Option 1: Render a fallback UI - Graceful Fallback UI that shows up on /products route in the client
      // return <div>Failed to load products. Please try again later.</div>;

      // Option 2: Interrupts rendering and bubbles up to error boundaries
      // go to the closest `error.tsx` boundary (or the root one) - Error page gets access to the error and reset method to retry page rendering and is a client component
      // throw new Error("Failed to load products. Please try again later.");

      // Option 3
      // trigger the /app/not-found.tsx route (if defined) - Not Found page does not get access to the error and is a server component
      notFound(); // if you want to mimic `return { notFound: true }`
  }
}